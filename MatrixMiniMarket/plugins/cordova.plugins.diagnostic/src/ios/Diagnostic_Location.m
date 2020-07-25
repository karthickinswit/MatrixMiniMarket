/*
 *  Diagnostic_Location.m
 *  Diagnostic Plugin - Location Module
 *
 *  Copyright (c) 2018 Working Edge Ltd.
 *  Copyright (c) 2012 AVANTIC ESTUDIO DE INGENIEROS
 */

#import "Diagnostic_Location.h"

@implementation Diagnostic_Location

// Internal reference to Diagnostic singleton instance
static Diagnostic* diagnostic;

// Internal constants
static NSString*const LOG_TAG = @"Diagnostic_Location[native]";


/********************************/
#pragma mark - Plugin API
/********************************/

- (void) isLocationAvailable: (CDVInvokedUrlCommand*)command
{
    [self.commandDelegate runInBackground:^{
        @try {
            [diagnostic sendPluginResultBool:[CLLocationManager locationServicesEnabled] && [self isLocationAuthorized] :command];
        }
        @catch (NSException *exception) {
            [diagnostic handlePluginException:exception :command];
        }
    }];
}

- (void) isLocationEnabled: (CDVInvokedUrlCommand*)command
{
    [self.commandDelegate runInBackground:^{
        @try {
            [diagnostic sendPluginResultBool:[CLLocationManager locationServicesEnabled] :command];
        }
        @catch (NSException *exception) {
            [diagnostic handlePluginException:exception :command];
        }
    }];
}


- (void) isLocationAuthorized: (CDVInvokedUrlCommand*)command
{
    [self.commandDelegate runInBackground:^{
        @try {
            [diagnostic sendPluginResultBool:[self isLocationAuthorized] :command];
        }
        @catch (NSException *exception) {
            [diagnostic handlePluginException:exception :command];
        }
    }];
}

- (void) getLocationAuthorizationStatus: (CDVInvokedUrlCommand*)command
{
    [self.commandDelegate runInBackground:^{
        @try {
            NSString* status = [self getLocationAuthorizationStatusAsString:[self getAuthorizationStatus]];
            [diagnostic logDebug:[NSString stringWithFormat:@"Location authorization status is: %@", status]];
            [diagnostic sendPluginResultString:status:command];
        }
        @catch (NSException *exception) {
            [diagnostic handlePluginException:exception :command];
        }
    }];
}

- (void) requestLocationAuthorization: (CDVInvokedUrlCommand*)command
{
    [self.commandDelegate runInBackground:^{
        @try {
            if ([CLLocationManager instancesRespondToSelector:@selector(requestWhenInUseAuthorization)])
            {
                BOOL always = [[command argumentAtIndex:0] boolValue];
                if(always){
                    NSAssert([[[NSBundle mainBundle] infoDictionary] valueForKey:@"NSLocationAlwaysUsageDescription"], @"Your app must have a value for NSLocationAlwaysUsageDescription in its Info.plist");
                    [self.locationManager requestAlwaysAuthorization];
                    [diagnostic logDebug:@"Requesting location authorization: always"];
                }else{
                    NSAssert([[[NSBundle mainBundle] infoDictionary] valueForKey:@"NSLocationWhenInUseUsageDescription"], @"Your app must have a value for NSLocationWhenInUseUsageDescription in its Info.plist");
                    [self.locationManager requestWhenInUseAuthorization];
                    [diagnostic logDebug:@"Requesting location authorization: when in use"];
                }
            }
        }
        @catch (NSException *exception) {
            [diagnostic handlePluginException:exception :command];
        }
        self.locationRequestCallbackId = command.callbackId;
        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_NO_RESULT];
        [pluginResult setKeepCallback:[NSNumber numberWithBool:YES]];
        [diagnostic sendPluginResult:pluginResult :command];
    }];
}

- (void) getLocationAccuracyAuthorization: (CDVInvokedUrlCommand*)command{
    [self.commandDelegate runInBackground:^{
        @try {
            if ([CLLocationManager instancesRespondToSelector:@selector(requestTemporaryFullAccuracyAuthorizationWithPurposeKey:completion:)]){
#if defined(__IPHONE_14_0) && __IPHONE_OS_VERSION_MAX_ALLOWED >= __IPHONE_14_0
            NSString* locationAccuracyAuthorization = [self getLocationAccuracyAuthorizationAsString:[self.locationManager accuracyAuthorization]];
            [diagnostic logDebug:[NSString stringWithFormat:@"Location accuracy authorization is: %@", locationAccuracyAuthorization]];
            [diagnostic sendPluginResultString:locationAccuracyAuthorization:command];
#endif
            }else{
                [diagnostic sendPluginError:@"getLocationAccuracyAuthorization is not supported below iOS 14":command];
            }
        }
        @catch (NSException *exception) {
            [diagnostic handlePluginException:exception :command];
        }
    }];
}

- (void) requestTemporaryFullAccuracyAuthorization: (CDVInvokedUrlCommand*)command{
    [self.commandDelegate runInBackground:^{
        @try {
            if ([CLLocationManager instancesRespondToSelector:@selector(requestTemporaryFullAccuracyAuthorizationWithPurposeKey:completion:)]){
#if defined(__IPHONE_14_0) && __IPHONE_OS_VERSION_MAX_ALLOWED >= __IPHONE_14_0
                NSAssert([[[NSBundle mainBundle] infoDictionary] valueForKey:@"NSLocationTemporaryUsageDescriptionDictionary"], @"For iOS 14 and above, your app must have a value for NSLocationTemporaryUsageDescriptionDictionary in its Info.plist");
                NSString* purpose = [command argumentAtIndex:0];
                [self.locationManager  requestTemporaryFullAccuracyAuthorizationWithPurposeKey:purpose completion:^(NSError* error){
                    if(error != nil){
                        [diagnostic sendPluginError:[NSString stringWithFormat:@"Error when requesting temporary full location accuracy authorization: %@", error] :command];
                    }else{
                        self.locationAccuracyRequestCallbackId = command.callbackId;
                        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_NO_RESULT];
                        [pluginResult setKeepCallback:[NSNumber numberWithBool:YES]];
                        [diagnostic sendPluginResult:pluginResult :command];
                    }
                }];
#endif
            }else{
                [diagnostic sendPluginError:@"requestTemporaryFullAccuracyAuthorization is not supported below iOS 14":command];
            }
        }
        @catch (NSException *exception) {
            [diagnostic handlePluginException:exception :command];
        }
    }];
}

/********************************/
#pragma mark - Internals
/********************************/

- (void)pluginInitialize {

    [super pluginInitialize];

    diagnostic = [Diagnostic getInstance];

    self.locationRequestCallbackId = nil;
    self.locationAccuracyRequestCallbackId = nil;
    self.currentLocationAuthorizationStatus = nil;
    self.locationManager = [[CLLocationManager alloc] init];
    self.locationManager.delegate = self;
}

- (NSString*) getLocationAuthorizationStatusAsString: (CLAuthorizationStatus)authStatus
{
    NSString* status;
    if(authStatus == kCLAuthorizationStatusDenied || authStatus == kCLAuthorizationStatusRestricted){
        status = AUTHORIZATION_DENIED;
    }else if(authStatus == kCLAuthorizationStatusNotDetermined){
        status = AUTHORIZATION_NOT_DETERMINED;
    }else if(authStatus == kCLAuthorizationStatusAuthorizedAlways){
        status = AUTHORIZATION_GRANTED;
    }else if(authStatus == kCLAuthorizationStatusAuthorizedWhenInUse){
        status = @"authorized_when_in_use";
    }
    return status;
}

#if defined(__IPHONE_14_0) && __IPHONE_OS_VERSION_MAX_ALLOWED >= __IPHONE_14_0
- (NSString*) getLocationAccuracyAuthorizationAsString: (CLAccuracyAuthorization)accuracyAuthorization
{
    NSString* accuracy;
    if(accuracyAuthorization == CLAccuracyAuthorizationFullAccuracy){
        accuracy = @"full";
    }else{
        accuracy = @"reduced";
    }
    return accuracy;
}
#endif

- (BOOL) isLocationAuthorized
{
    CLAuthorizationStatus authStatus = [self getAuthorizationStatus];
    NSString* status = [self getLocationAuthorizationStatusAsString:authStatus];
    if([status  isEqual: AUTHORIZATION_GRANTED] || [status  isEqual: @"authorized_when_in_use"]) {
        return true;
    } else {
        return false;
    }
}

-(CLAuthorizationStatus) getAuthorizationStatus{
    CLAuthorizationStatus authStatus;
#if defined(__IPHONE_14_0) && __IPHONE_OS_VERSION_MAX_ALLOWED >= __IPHONE_14_0
    authStatus = [self.locationManager authorizationStatus];
#else
    authStatus = [CLLocationManager authorizationStatus];
#endif
    return authStatus;
}

#if defined(__IPHONE_14_0) && __IPHONE_OS_VERSION_MAX_ALLOWED >= __IPHONE_14_0
-(void)locationManagerDidChangeAuthorization:(CLLocationManager *)manager{
    // Location authorization status
    [self reportChangeAuthorizationStatus:[self.locationManager authorizationStatus]];
    
    // Location accuracy authorization
    NSString* locationAccuracyAuthorization = [self getLocationAccuracyAuthorizationAsString:[self.locationManager accuracyAuthorization]];
    BOOL locationAccuracyAuthorizationChanged = false;
    if(self.currentLocationAccuracyAuthorization != nil && ![locationAccuracyAuthorization isEqual: self.currentLocationAccuracyAuthorization]){
        locationAccuracyAuthorizationChanged = true;
    }
    self.currentLocationAccuracyAuthorization = locationAccuracyAuthorization;

    if(locationAccuracyAuthorizationChanged){
        [diagnostic logDebug:[NSString stringWithFormat:@"Location accuracy authorization changed to: %@", locationAccuracyAuthorization]];

        if(self.locationAccuracyRequestCallbackId != nil){
            CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:locationAccuracyAuthorization];
            [self.commandDelegate sendPluginResult:pluginResult callbackId:self.locationAccuracyRequestCallbackId];
            self.locationAccuracyRequestCallbackId = nil;
        }

        [diagnostic executeGlobalJavascript:[NSString stringWithFormat:@"cordova.plugins.diagnostic.location._onLocationAccuracyAuthorizationChange(\"%@\");", locationAccuracyAuthorization]];
    }
}
#else
- (void)locationManager:(CLLocationManager *)manager didChangeAuthorizationStatus:(CLAuthorizationStatus)authStatus {
    [self reportChangeAuthorizationStatus:authStatus];
}
#endif


- (void)reportChangeAuthorizationStatus:(CLAuthorizationStatus)authStatus{
    
    NSString* locationAuthorizationStatus = [self getLocationAuthorizationStatusAsString:authStatus];
    BOOL locationAuthorizationStatusChanged = false;
    if(self.currentLocationAuthorizationStatus != nil && ![locationAuthorizationStatus isEqual: self.currentLocationAuthorizationStatus]){
        locationAuthorizationStatusChanged = true;
    }
    self.currentLocationAuthorizationStatus = locationAuthorizationStatus;

    if(locationAuthorizationStatusChanged){
        [diagnostic logDebug:[NSString stringWithFormat:@"Location authorization status changed to: %@", locationAuthorizationStatus]];

        if(self.locationRequestCallbackId != nil){
            CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:locationAuthorizationStatus];
            [self.commandDelegate sendPluginResult:pluginResult callbackId:self.locationRequestCallbackId];
            self.locationRequestCallbackId = nil;
        }

        [diagnostic executeGlobalJavascript:[NSString stringWithFormat:@"cordova.plugins.diagnostic.location._onLocationStateChange(\"%@\");", locationAuthorizationStatus]];
    }
}

@end
