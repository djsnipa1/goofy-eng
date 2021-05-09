function setProperties(){
    // Parameter description: chimildic.github.io/goofy/#/guide?id=Параметры
    UserProperties.setProperty('CLIENT_ID', 'yourClientID');
    UserProperties.setProperty('CLIENT_SECRET', 'yourSecretID');
    UserProperties.setProperty('LASTFM_API_KEY', 'yourID');
    UserProperties.setProperty('ON_SPOTIFY_RECENT_TRACKS', 'true');
    UserProperties.setProperty('ON_LASTFM_RECENT_TRACKS', 'false');
    UserProperties.setProperty('LASTFM_RANGE_RECENT_TRACKS', '30');
    UserProperties.setProperty('LASTFM_LOGIN', 'yourLogin');
    UserProperties.setProperty('REQUESTS_IN_ROW', '40');
}

// To see the current parameter values
// console.log(UserProperties.getProperties());

// To reset authorization and settings
// Admin.reset();