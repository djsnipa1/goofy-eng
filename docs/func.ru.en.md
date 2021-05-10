# List of functions

## Source

Source for getting Spotify tracks

### getTracks

Returns an array of tracks from one or more playlists.

Arguments
- (array) `playlistArray` - one or more playlists. 

Single playlist format
- `id` - [playlist id] (/ guide? id = Playlist).
- `userId` - [user identification number] (/ guide? id = User).
- `name` - playlist name.

| id | name | userId | Action |
|: -: |: -: |: -: |: - |
| ✓ | ☓ | ☓ | Take a playlist with the specified id |
| ☓ | ✓ | ☓ | Search for a playlist by name among your |
| ☓ | ✓ | ✓ | Search playlist by username |

> 💡 It is recommended to always include `id` and` name`. The fastest and most convenient way.

> ❗️ If `name` is specified without` id` and there are several playlists with the same name, the tracks from the first one will be returned.
> 
> When no playlist is found, an empty array will be returned.

Example 1 - Get tracks of two playlists by `id`. The `name` value is optional. Indicated for convenience.
`` `js
let tracks = Source.getTracks ([
 {name: 'Major hits', id: '37i9dQZF1DX12G1GAEuIuj'},
 {name: 'Cardio', id: '37i9dQZF1DWSJHnPb1f0X3'},
]);
``,

Example 2 - Retrieve The Best Personal Playlist Tracks and Soundtracks.
`` `js
let tracks = Source.getTracks ([
 {name: 'The Best'},
 {name: 'Soundtracks'},
]);
``,

Example 3 - Get the tracks of a playlist named mint from a spotify user.
`` `js
let tracks = Source.getTracks ([
 {name: 'mint', userId: 'spotify'},
]);
``,

### getTracksRandom

Returns an array of tracks from one or more playlists. Playlists are randomly selected.

Arguments
- (array) `playlistArray` - one or more playlists. Same as [getTracks] (/ func? Id = gettracks).
- (number) `countPlaylist` - the number of randomly selected playlists. The default is one.

Example 1 - Get tracks of one randomly selected playlist out of three.
`` `js
let tracks = Source.getTracksRandom ([
 {name: 'Major hits', id: '37i9dQZF1DX12G1GAEuIuj'},
 {name: 'Cardio', id: '37i9dQZF1DWSJHnPb1f0X3'},
 {name: 'Dark Side', id: '37i9dQZF1DX73pG7P0YcKJ'},
]);
``,

Example 2 - Get tracks from two randomly selected playlists from three.
`` `js
let playlistArray = [
 {name: 'Major hits', id: '37i9dQZF1DX12G1GAEuIuj'},
 {name: 'Cardio', id: '37i9dQZF1DWSJHnPb1f0X3'},
 {name: 'Dark Side', id: '37i9dQZF1DX73pG7P0YcKJ'},
];
let tracks = Source.getTracksRandom (playlistArray, 2);
``,

### getPlaylistTracks

Returns an array of tracks from one playlist. Likewise [getTracks] (/ func? Id = gettracks) with one playlist.

Arguments
- (string) `name` - playlist name.
- (string) `id` - [playlist id] (/ guide? id = Playlist).
- (string) `user` - [user ID] (/ guide? id = User). The default is yours.

Example 1 - Get tracks from one playlist
`` `js
let tracks = Source.getPlaylistTracks ('Locked Tracks', 'abcdef');
``,

### getTopArtists

Returns the top performers for the selected period. Up to 98 performers.

Arguments
- (string) `timeRange` - period. The default is `medium`. Possible values ​​are given in [getTopTracks] (/ func? Id = gettoptracks).

Example 1 - Get top tracks from top 10 artists
`` `js
let artists = Source.getTopArtists ('long');
Selector.keepFirst (artists, 10);
let tracks = Source.getArtistsTopTracks (artists);
``,

### getTopTracks

Returns an array of top-listened tracks for the selected period. Up to 98 tracks.

Arguments
- (string) `timeRange` - period. The default is `medium`.

| timeRange | Period |
| - | - |
| short | About the last month |
| medium | About the last 6 months |
| long | For several years |

> ❗️ Such tracks do not contain information about the date of addition. When using [rangeDateRel] (/ func? Id = rangedaterel) or [rangeDateAbs] (/ func? Id = rangedateabs) they are assigned the date 01.01.2000

Example 1 - Get the top for the last month.
`` `js
let tracks = Source.getTopTracks ('short');
``,

Example 2 - Get the top in several years.
`` `js
let tracks = Source.getTopTracks ('long');
``,

### getSavedTracks

Returns an array of favorite tracks (likes).

There are no arguments.

> 💡 If you have many favorite tracks and need to perform different actions on them in the script, create a copy of the [sliceCopy] array (/ func? Id = slicecopy) instead of new requests to Spotify.

Example 1 - Get an array of favorite tracks.
`` `js
let tracks = Source.getSavedTracks ();
``,

### getSavedAlbumTracks

Returns an array of tracks from all saved albums. Albums can be selected randomly.

Arguments:
- (number) `limit` - if used, albums are randomly selected up to the specified value.

Example 1 - Get Tracks from Three Random Albums
`` `js
let tracks = Source.getSavedAlbumTracks (3);
``,

Example 2 - Retrieve Tracks from All Saved Albums
`` `js
let tracks = Source.getSavedAlbumTracks ();
``,

### getFollowedTracks

Returns an array of tracks of the tracked playlists and / or personal playlists of the specified user.

> 💡 If you need to perform different actions on the source, create a copy of the [sliceCopy] array (/ func? Id = slicecopy) instead of new requests to Spotify via getFollowedTracks.

Arguments
- (object) `params` - playlist selection arguments.

Description of keys
- (string) `type` - the type of playlists to be selected. The default is `followed`.
- (string) `userId` - [user id] (# id). If not specified, the `userId` of the authorized user is set, that is, yours.
- (number) `limit` - if used, playlists are randomly selected.
- (array) `exclude` - list of playlists to exclude. Only `id` is meaningful. The value of `name` is optional, it is only needed to understand which playlist it is. You can get by with a comment.

| type | Selection |
| - | - |
| owned | Personal playlists only |
| followed | Tracked playlists only |
| all | All playlists |

The complete `params` object
`` `js
{
 type: 'followed',
 userId: 'abc',
 limit: 2,
 exclude: [
 {name: 'playlist 1', id: 'abc1'},
 {id: 'abc2'}, // playlist 2
 ],
}
``,

Example 1 - Get tracks only from my tracked playlists.
`` `js
// All default values, no arguments specified
let tracks = Source.getFollowedTracks ();

// Same thing with explicitly specifying the type of playlists
let tracks = Source.getFollowedTracks ({
 type: 'followed',
});
``,

Example 2 - Get the tracks of only two randomly selected personal playlists of the user `example`, excluding several playlists by their id. 
`` `js
let tracks = Source.getFollowedTracks ({
 type: 'owned',
 userId: 'example',
 limit: 2, 
 exclude: [
 {id: 'abc1'}, // playlist 1
 {id: 'abc2'}, // playlist 2
 ],
});
``,

> ❗️ Avoid users with too many playlists. For example, `glennpmcdonald` has almost 5 thousand playlists. The limit is related to the Apps Script execution quota. It will not be possible to get such a volume of tracks in the allotted time. More details in [description of restrictions] (/ desc? Id = Restrictions).


### getRecomTracks

Returns an array of recommended tracks according to the specified parameters. Up to 100 tracks.

> Spotify note: for new or little-known artists, tracks - there may not be enough accumulated data to generate recommendations. 

Arguments
- (object) `queryObj` - parameters for selecting recommendations.

Valid parameters
- limit - the number of tracks. Maximum 100.
- seed_ * - up to ** 5 values ​​** in any combinations:
 - seed_artists - [artist IDs] (/ guide? id = ID), separated by commas.
 - seed_tracks - [track IDs] (/ guide? id = ID), separated by commas.
- seed_genres - genres separated by commas. For permissible values ​​see [here] (/ guide? Id = Genres-to-select-recommendations).
- max_ * - limit value of one of the [features of the track] (/ guide? id = Features-track-features).
- min_ * - the minimum value of one of the [features of the track] (/ guide? id = Track-features).
- target_ * - the target value for one of the [features of the track] (/ guide? id = Track-features). The closest ones are selected.

> In addition, the `populatiry` key is available in` features`. For example, `target_popularity`. The Spotify API documentation doesn't say this.

> Specifying a specific genre in `seed_genres` will not necessarily return tracks of that genre.

Example of an object with parameters
`` `js
let queryObj = {
 seed_artists: '',
 seed_genres: '',
 seed_tracks: '',
 max_ *: 0,
 min_ *: 0,
 target_ *: 0,
};
``,

Example 1 - Get recommendations for indie genre and positive mood alternatives:
`` `js
let tracks = Source.getRecomTracks ({
 seed_genres: 'indie, alternative',
 min_valence: 0.65,
});
``,

Example 2 - Get rock and electronic recommendations based on 3 random favorite artists (up to 5 values).
`` `js
let savedTracks = Source.getSavedTracks ();
Selector.keepRandom (savedTracks, 3);

let artistIds = savedTracks.map (track => track.artists [0] .id);

let tracks = Source.getRecomTracks ({
 seed_artists: artistIds.join (','),
 seed_genres: 'rock, electronic'
});
``,

### getRelatedArtists

Returns an array of similar artists from Spotify.

Arguments
- (array) `artists` - a list of artists for whom to get similar ones. Only `id` is meaningful.
- (bool) `isFlat` - if` false` the result contains executors in a separate array. If true, all executors are in the same array. The default is `true`.

Example 1 - `isFlat = true`
`` `js
let relatedArtists = Source.getRelatedArtists (artists);
relatedArtists [0]; // first performer
relatedArtists [10]; // 11 performer
``,

Example 2 - `isFlat = false`
`` `js
let relatedArtists = Source.getRelatedArtists (artists, false);
relatedArtists [0] [0]; // first performer, similar to first from source
relatedArtists [1] [0]; // the first performer, similar to the second from the source
``,

### getCategoryTracks

Returns an array of tracks from playlists in the specified category. Sort playlists by popularity. [Category list] (/ guide? Id = Playlist categories).

Arguments
- (string) `category_id` - category name.
- (object) `params` - additional parameters.

Description of `params`
- (number) `limit` - limit the number of selectable playlists. Maximum 50, default 20.
- (number) `offset` - skip the specified number of tracks. The default is 0.
- (string) `country` - the name of the country in which to watch the playlists of the category. For example, `RU` or` AU`.

Example 1 - Get the tracks of the second ten playlists of the "focus" category from Australia.
`` `js
let tracks = Source.getCategoryTracks ('focus', {limit: 10, offset: 10, country: 'AU'});
``,

Example 2 - Get the tracks of 20 playlists in the party category.
`` `js
let tracks = Source.getCategoryTracks ('party');
``,

### getListCategory

Returns an array of valid categories for [getCategoryTracks] (/ func? Id = getcategorytracks).

Arguments
- (object) `params` - parameters for selecting categories.

Description of `params`
- (number) `limit` - limit the number of selected categories. Maximum 50, default 20.
- (number) `offset` - skip the specified number of categories. The default is 0. Used to get categories after 50+.
- (string) `country` - the name of the country in which to view the categories. For example, `RU` or` AU`. If not, globally available. But availability error is possible. To avoid getting errors, specify the same `country` for the list of categories and the request for playlists.

Example 1 - Get tracks of 10 playlists from a random category
`` `js
let listCategory = Source.getListCategory ({limit: 50, country: 'RU'});
let category = Selector.sliceRandom (listCategory, 1);
let tracks = Source.getCategoryTracks (category [0] .id, {limit: 10, country: 'RU'});
``,

### getArtists

Returns an array of artists according to the given `paramsArtist`.

Arguments
- (object) `paramsArtist` - list of criteria for selecting artists. The object matches the description from [getArtistsTracks] (/ func? Id = getartiststracks) in the artist part.

Example 1 - Get an array of tracked artists
`` `js
let artists = Source.getArtists ({
 followed_include: true,
});
``,

### getArtistsAlbums

Returns an array with all the albums of the specified artists.

Arguments
- (array) `artists` - array of artists
- (object) `paramsAlbum` - list of album selection criteria. The object matches the description from [getArtistsTracks] (/ func? Id = getartiststracks) in the album part.

Example 1 - Get an array of singles from one artist
`` `js
let artist = Source.getArtists ({
 followed_include: false,
 include: [ 
 {id: 'abc', name: 'Avril'}, 
 ],
});
let albums = Source.getArtistsAlbums (artist, {
 groups: 'single',
});
``,

### getArtistsTracks

Returns an array of artist tracks according to the given `params`.

> ❗️ The selection includes many albums. Especially with a large number of tracked performers (100+). Use filters for artist and album to shorten execution time. You can specify a random selection of N-number.

Arguments
- (object) `params` - a list of criteria for selecting performers and their tracks

| Key | Type | Description |
| - | - | - |
| followed_include | bul | If true, includes tracked artists. If `false`, executors are taken only from` include` |
| include | array | Selecting artists by `id` to get albums. The `name` key is for convenience and optional. |
| exclude | array | Selection of performers by `id` to exclude performers from the selection. Use in combination with `followed_include` |
| popularity | object | Artist popularity range |
| followers | object | Artist follower range |
| genres | array | List of genres. If at least one is present, the performer passes the filter. |
| ban_genres | array | List of genres to block. If at least one is present, the executor is removed from the selection. |
| groups | string | Album type. Valid: `album`,` single`, `appears_on`,` compilation` |
| release_date | object | Album release date. The relative period for `sinceDays` and` beforeDays`. Absolute period at `startDate` and` endDate` |
| _limit | number | If specified, a random number of specified items is selected (artist, album, track) |

An example of a `params` object with all keys
`` `js
{
 artist: {
 followed_include: true,
 popularity: {min: 0, max: 100},
 followers: {min: 0, max: 100000},
 artist_limit: 10,
 genres: ['indie'],
 ban_genres: ['rap', 'pop'],
 include: [
 {id: '', name: ''}, 
 {id: '', name: ''},
 ],
 exclude: [
 {id: '', name: ''}, 
 {id: '', name: ''},
 ],
 },
 album: {
 groups: 'album, single',
 release_date: {sinceDays: 6, beforeDays: 0},
 // release_date: {startDate: new Date ('2020.11.30'), endDate: new Date ('2020.12.30')},
 album_limit: 10,
 track_limit: 1,
 }
}
``,

Example 1 - Get tracks from singles of tracked artists released in the last week including today. Exclude multiple performers.
`` `js
let tracks = Source.getArtistsTracks ({
 artist: {
 followed_include: true,
 exclude: [
 {id: 'abc1', name: ''}, 
 {id: 'abc2', name: ''},
 ],
 },
 album: {
 groups: 'single',
 release_date: {sinceDays: 7, beforeDays: 0},
 },
});
``,

Example 2 - Get tracks from albums and singles per week of ten tracked artists, selected at random. Artists with no more than 10 thousand subscribers. Only one track from the album.
`` `js
let tracks = Source.getArtistsTracks ({
 artist: {
 followed_include: true,
 artist_limit: 10,
 followers: {min: 0, max: 10000},
 },
 album: {
 groups: 'album, single',
 track_limit: 1,
 release_date: {sinceDays: 7, beforeDays: 0},
 },
});
``,

Example 3 - Get tracks from albums and singles of specified artists
`` `js
let tracks = Source.getArtistsTracks ({
 artist: {
 followed_include: false,
 include: [
 {id: 'abc1', name: ''}, 
 {id: 'abc2', name: ''},
 ],
 },
 album: {
 groups: 'album, single',
 },
});
``,

### getArtistsTopTracks

Returns the top tracks of the artist as an array. Up to 10 tracks per artist.

Arguments
- (array) `artists` - an array of artists. Only `id` is meaningful.
- (bool) `isFlat` - if` false`, the result contains tracks in a separate array for each artist. If `true` all tracks are in one array. The default is `true`.

Example 1 - `isFlat = true`
`` `js
let tracks = Source.getArtistsTopTracks (artists);
tracks [0]; // first track of the first artist
tracks [10]; // the first track of the second artist, if the first has 10 tracks
``,

Example 2 - `isFlat = false`
`` `js
let tracks = Source.getArtistsTopTracks (artists, false);
tracks [0] [0]; // first track of the first artist
tracks [1] [0]; // first track of the second artist
``,



### getAlbumTracks

Returns an array of tracks from the specified album.

Arguments
- (object) `album` - object of one album
- (number) `limit` - if specified, selects tracks randomly up to the specified number.

Example 1 - Get the tracks of the first album of an array
`` `js
let albums = Source.getArtistsAlbums (artists, {
 groups: 'album',
});
let albumTracks = Source.getAlbumTracks (albums [0]);
``,

Example 2 - Get Tracks from All Albums
`` `js
let albums = Source.getArtistsAlbums (artists, {
 groups: 'album',
});
let tracks = [];
albums.forEach ((album) => Combiner.push (tracks, Source.getAlbumTracks (album)));
``,

### getAlbumsTracks

Returns an array of tracks from all albums.

Arguments
- (array) `albums` - list of albums

Example 1 - Get Tracks from Top 10 Lastfm Albums
`` `js
let albums = Lastfm.getTopAlbums ({user: 'login', limit: 10});
let tracks = Source.getAlbumsTracks (albums);
``,

### mineTracks

Returns an array of tracks found when searching for playlists, albums, or tracks by keywords. Duplicates are removed from the result.

Arguments
- (object) `params` - search parameters.

Description of `params`
- (string) `type` - search type. Allowed: `playlist`,` album`, `track`. The default is `playlist`. With `track`, you can use [advanced search] (https://support.spotify.com/by-ru/article/search/).
- (array) `keyword` - list of keywords to search for elements.
- (number) `requestCount` - number of requests per one keyword. From one request 50 elements, if any. Maximum 40 requests. The default is one.
- (number) `itemCount` - the number of selected items from all found per one keyword. The default is three.
- (bool) `inRow` - if not specified or` false`, elements are selected randomly. If `true` takes the first` N` items (by value of `itemCount`).
- (number) `popularity` - the minimum value of the popularity of the track. The default is zero.
- (object) `followers` - range of the number of playlist followers (boundaries inclusive). Filter before selecting `itemCount`. Use only with a small amount of `requestCount` with` type = playlist`.

> The balance of values ​​in `params` must be observed. Several large values ​​can take a long time to execute and make many queries. Find out in practice the acceptable combinations.

> You can display the number of requests made. Add a line to the end of the function:
> `console.log ('Number of requests', CustomUrlFetchApp.getCountRequest ());`

Example 1 - Selecting 5 random playlists for each keyword with track popularity over 70. With a limited number of playlist subscribers.
`` `js
let tracks = Source.mineTracks ({
 keyword: ['synth', 'synthpop', 'rock'],
 followers: {min: 2, max: 1000},
 itemCount: 5,
 requestCount: 3,
 popularity: 70,
});
``,

Example 2 - Selecting the top 10 playlists by keyword with any track popularity
`` `js
let tracks = Source.mineTracks ({
 keyword: ['indie'],
 itemCount: 10,
 inRow: true,
});
``,

Example 3 - Selecting tracks from random albums
`` `js
let tracks = Source.mineTracks ({
 type: 'album',
 keyword: ['winter', 'night'],
});
``,

Example 4 - Selecting indie tracks for 2020
`` `js
let tracks = Source.mineTracks ({
 type: 'track',
 keyword: ['genre: indie + year: 2020'],
});
``,

### craftTracks

Returns an array of tracks from [getRecomTracks] (/ func? Id = getrecomtracks) for each 5 of the original track items. Duplicates of the original tracks are ignored, the recommended ones are deleted. The five-item limit is dictated by the Spotify API for the recommendation feature.

> You can partially influence the formed fives of elements. Before calling the function, applying one of the `Order` sorts.

Arguments
- (array) `tracks` - tracks for which to receive recommendations. If `key` is equal to` seed_artists`, an array of artists is allowed.
- (object) `params` - additional parameters.

Parameter Description
- (string) `key` - defines by which key of the recommendation. Valid: `seed_tracks` and` seed_artists`. The default is `seed_tracks`.
- (object) `query` - optional parameter, all keys [getRecomTracks] (/ func? id = getrecomtracks) are available, except for the one specified in` key`.

> In `query`, you can specify two of:` seed_tracks`, `seed_artists`,` seed_genres`. The third is selected based on `key`. Thus, you can set a static track / artist / genre (up to 4 values ​​for all). The remaining free space will be substituted based on `key`.

> Specifying a specific genre in `seed_genres` will not necessarily return tracks of that genre. This is the starting point for recommendations.

Example 1 - Get recommendations for all your favorite tracks by their artist
`` `js
let tracks = Source.getSavedTracks ();
let recomTracks = Source.craftTracks (tracks, {
 key: 'seed_artists',
 query: {
 limit: 20, // default and maximum 100
 min_energy: 0.4,
 min_popularity: 60,
 // target_popularity: 60,
 }
});
``,

Example 2 - Recommendations indicating a static genre and track. The remaining 3 places are occupied by `seed_artists`.
`` `js
let recomTracks = Source.craftTracks (tracks, {
 key: 'seed_artists',
 query: {
 seed_genres: 'indie',
 seed_tracks: '6FZDfxM3a3UCqtzo5pxSLZ'
 }
});
``,

Example 3 - Only an array of tracks can be specified. Then there will be recommendations for the `seed_tracks` key.
`` `js
let tracks = Source.getSavedTracks ();
let recomTracks = Source.craftTracks (tracks);
``,

## RecentTracks

Listening history source 

### appendTracks

Adds an array of tracks to the listening history file. The date added to the playlist `added_at` becomes the listening date of` played_at`. If there is no date, the value is set to `01.01.2000`. Sorted by date of listening from newest to oldest.

> If the date of the added track from the playlist is later than the date of the last listening, the added track will become the first in the list. This will cause a logical error to compute the last listen in the trigger. Therefore, instead of ignoring or a couple of tracks, the trigger will add the entire available array. The default is 50 tracks for Spotify, 30 for Lastfm. The next trigger will fire correctly.

> Note the 20K track limit for listening history. All items over the limit are removed.

Arguments
- (string) `filename` - name of the listening history file. Valid: `SpotifyRecentTracks` and` LastfmRecentTracks`.
- (array) `tracks` - tracks to add.

Example 1 - Add all favorite tracks to the listening history
`` `js
let tracks = Source.getSavedTracks ();
RecentTracks.appendTracks ('SpotifyRecentTracks', tracks);
``,

### compress

Compresses tracks in existing cumulative listening history files depending on [parameters] (/ guide? Id = Parameters). Pre-creates a copy of the file.

There are no arguments. There is no return value.

> Used for backward compatibility with the library. One execution is enough to compress the listening history files. New history tracks are compressed automatically.

Example 1 - Compress existing listening history files. Files are selected based on [active options] (/ guide? Id = Options).
``,
RecentTracks.compress ();
``,

### get

Returns an array of listening history tracks depending on [parameters] (/ guide? Id = Parameters). Sort by date of listening from newest to oldest.

Arguments
- (number) `limit` - if specified, limit the number of returned tracks. If not, all are available.

| Included option | Returned array |
| - | - |
| `ON_SPOTIFY_RECENT_TRACKS` | Spotify Listening History Only |
| `ON_LASTFM_RECENT_TRACKS` | Listening history of Lastfm only. |
| `ON_SPOTIFY_RECENT_TRACKS` and` ON_LASTFM_RECENT_TRACKS` | Combining both sources, removing duplicate tracks. |

Example 1 - Get an array of listening history tracks. The source of the tracks depends on the parameters.
``,
let tracks = RecentTracks.get ();
``,

Example 2 - Get 100 tracks of listening history.
``,
let tracks = RecentTracks.get (100);
``,

### getPlayingTrack

Returns the active track (playing or paused). If there is no data, an empty object.

There are no arguments.

Example
`` `js
let track = RecentTracks.getPlayingTrack ();
``,

## Combiner

Combining tracks from different sources 

### alternate

Returns a new array in which the elements of the source arrays are alternated.

Arguments
- (string) bound - valid value of `max` or` min`.
- If the elements in one of the arrays run out, add the remaining elements of the other array to the end (`max`). With several remaining arrays, their elements continue to alternate.
- If at least one array has run out of elements, it immediately returns the result (`min`). The remaining items are discarded.
- (list of arrays) `... arrays` - list of arrays whose elements need to be interleaved.

Example 1 - Interleave the elements of three arrays.
`` `js
let firstArray = [1, 3, 5];
let secondeArray = [2, 4, 6, 8, 10];
let thirdArray = [100, 200, 300];
let resultArray = Combiner.alternate ('max', firstArray, secondeArray, thirdArray);
// result 1, 2, 100, 3, 4, 200, 5, 6, 300, 8, 10
``,

Example 2 - Alternate monthly top streams and favorite tracks.
`` `js
let topTracks = Source.getTopTracks ('short'); // let's say 50 tracks
let savedTracks = Source.getSavedTracks (20); // let's say 20 tracks
let resultArray = Combiner.alternate ('min', topTracks, savedTracks);
// result contains 40 tracks
``,

### mixin

Returns a new array in which the elements of the two arrays alternate in the specified proportion. Internally, [mixinMulti] (/ func? Id = mixinmulti) is called with two arrays.

Arguments
- (array) `xArray` - first source array.
- (array) `yArray` - second source array.
- (number) `xRow` - the number of consecutive elements of the first array.
- (number) `yRow` - number of consecutive elements of the second array.
- (boolean) `toLimitOn` - elements alternate as long as the proportion can be maintained. If true, extra elements are not included in the result. If false are appended to the end of the result.

Example 1 - Alternate tracks of playlists-sources and favorite tracks in a ratio of 5 to 1. Remove unnecessary ones.
`` `js
let tracks = Source.getTracks (playlistArray);
let savedTracks = Source.getSavedTracks ();
let resultArray = Combiner.mixin (tracks, savedTracks, 5, 1, true);
``,

### mixinMulti

Returns a new array in which the elements of the source arrays are alternated in the specified ratio. The number of sources is unlimited.

Argument
- (object) `params` - parameters that specify the source and ratio.

Parameters
- (array) `source` - list of source arrays
- (array) `inRow` - list with the number of elements for each array
- (bool) `toLimitOn` - elements alternate as long as the ratio can be saved. If true, extra elements are not included in the result. If false are appended to the end of the result, keeping the aspect ratio if possible. The default is `false`.

> Important: the number of elements in `source` must match the number of elements in` inRow`. That is, each array is assigned the number of consecutive elements.

> When `toLimitOn = true`, the first iteration checks the number of elements. If there are fewer elements than specified by the ratio, an empty array will be returned.

Example 1 - Alternate elements in a 1: 1: 1 ratio. Save all items.
`` `js
let x = [1, 2, 3, 4, 5];
let y = [10, 20, 30, 40];
let z = [100, 200, 300];
let result = Combiner.mixinMulti ({
 source: [x, y, z],
 inRow: [1, 1, 1],
});
// 1, 10, 100, 2, 20, 200, 3, 30, 300, 4, 40, 5
``,

Example 2 - Alternate elements in a 2: 4: 2 ratio until the sequence can be maintained
`` `js
let x = [1, 2, 3, 4, 5];
let y = [10, 20, 30, 40];
let z = [100, 200, 300];
let result = Combiner.mixinMulti ({
 toLimitOn: true,
 source: [x, y, z],
 inRow: [2, 4, 2],
});
// 1, 2, 10, 20, 30, 40, 100, 200
``,

Example 3 - Alternate recommendations, favorite tracks and listening history in a 4: 1: 1 ratio until the sequence can be saved
`` `js
let recom = Source.getRecomTracks (...);
let saved = Source.getSavedTracks ();
let recent = RecentTracks.get ();
let tracks = Combiner.mixinMulti ({
 toLimitOn: true,
 source: [recom, saved, recent],
 inRow: [4, 1, 1],
});
``,

### push

Add all the elements of the second array to the end of the first array, and so on.

Arguments
- (array) `sourceArray` - the first array to which the elements of the others are added.
- (list of arrays) `... additionalArray` - list of other arrays.

Example 1 - Add the elements of the second array to the end of the first array.
`` `js
let firstArray = Source.getTracks (playlistArray); // let's say 20 tracks
let secondeArray = Source.getSavedTracks (); // let's say 40 tracks
Combiner.push (firstArray, secondeArray);
// now firstArray contains 60 tracks
``,

Example 2 - Add elements of the other two to the first array.
`` `js
let firstArray = Source.getTracks (playlistArray); // let's say 25 tracks
let secondeArray = Source.getSavedTracks (); // let's say 100 tracks
let thirdArray = Source.getPlaylistTracks (); // let's say 20 tracks
Combiner.push (firstArray, secondeArray, thirdArray);
// now firstArray contains 145 tracks
``,

## Filter

Filtering tracks for different reasons

### dedupTracks

Removes duplicate tracks by `id` and` name`.

Arguments
- (array) `tracks` - an array of tracks in which you want to remove duplicates.

Example 1 - Remove duplicates.
`` `js
let tracks = Source.getTracks (playlistArray);
Filter.dedupTracks (tracks);
``,

### dedupArtists

Removes duplicate main executors by `id`. There is only one item left from one performer.

Arguments
- (array) `items` - an array of tracks or artists in which you want to remove duplicate main artists.

Example 1 - Remove duplicate main artists in tracks.
`` `js
let tracks = Source.getTracks (playlistArray);
Filter.dedupArtists (tracks);
``,

Example 2 - Remove duplicate artists from an array.
`` `js
let relatedArtists = Source.getRelatedArtists (artists);
Filter.dedupArtists (relatedArtists);
``,

### match

Leaves tracks that satisfy the `strRegex` condition only by the track name and album name. In the case of an array of performers, by their name.

Arguments
- (array) `items` - an array of tracks or artists.
- (string) `strRegex` - regular expression string.
- (boolean) `invert` - if` true` is the inverse of the result. The default is `false`.

Example 1 - Delete tracks containing the words `cover` or` live` in their title.
`` `js
let tracks = Source.getTracks (playlistArray);
Filter.match (tracks, 'cover | live', true);
``,

### matchExcept

Leaves only tracks that ** do not ** satisfy the `strRegex` condition by track name and album name.

Arguments
- (array) `items` - an array of tracks or artists.
- (string) `strRegex` - regular expression string.

Same as [match] (/ func? Id = match) with argument `invert = true`

### matchExceptMix

Removes tracks containing `mix` and` club`.

Arguments
- (array) `tracks` - an array of tracks.

Same as [matchExcept] (/ func? Id = matchexcept) with argument `strRegex = 'mix | club'`

### matchExceptRu

Deletes tracks containing Cyrillic.

Arguments
- (array) `tracks` - an array of tracks.

Same as [matchExcept] (/ func? Id = matchexcept) with argument `strRegex = '[a-ya-yoyo] +' '

### matchLatinOnly

Leaves tracks that contain only Latin names. That is, it removes hieroglyphs, Cyrillic and so on.

Arguments
- (array) `tracks` - an array of tracks.

Same as [match] (/ func? Id = match) with argument `strRegex = '^ [a-zA-Z0-9] + $' '

### matchOriginalOnly

Removes non-original versions of tracks.

Arguments
- (array) `tracks` - an array of tracks.

Likewise [matchExcept] (/ func? Id = matchexcept) with argument `strRegex = 'mix | club | radio | piano | acoustic | edit | live | version | cover | karaoke' '

### rangeTracks

Leaves only tracks that match the `args` conditions. Tracks that fail validation are removed from the original `tracks` array.

Arguments
- (array) `tracks` - tracks to check. 
- (object) `args` - conditions for checking whether it belongs to the range` min` - `max` (inclusive), equality or presence of the genre.

Parameter validation categories
- `meta` - track
- `features` - track features
- `artist` - the main performer of the track
- `album` - track album

> ❗️ The function requests additional data for `features`,` artist`, `album`. To reduce the number of requests, use it after minimizing the track array in other ways (for example, [rangeDateRel] (/ func? Id = rangedaterel), [match] (/ func? Id = match), and others). The received data is cached for the ** current ** execution. Calling the function again or sorting [sort] (/ func? Id = sort) with the same categories does not send new requests.

Below is an example of an `args` object with all valid test conditions. Read the description of parameters [here] (/ guide? Id = Description-of-parameters-objects).
`` `js
let args = {
 meta: {
 popularity: {min: 0, max: 100},
 duration_ms: {min: 0, max: 10000},
 explicit: false,
 },
 artist: {
 popularity: {min: 0, max: 100},
 followers: {min: 0, max: 100000},
 genres: ['indie'],
 ban_genres: ['rap', 'pop'],
 },
 features: {
 acousticness: {min: 0.0, max: 1.0},
 danceability: {min: 0.0, max: 1.0},
 energy: {min: 0.0, max: 1.0},
 instrumentalness: {min: 0.0, max: 1.0},
 liveness: {min: 0.0, max: 1.0},
 loudness: {min: -60, max: 0},
 speechiness: {min: 0.0, max: 1.0},
 valence: {min: 0.0, max: 1.0},
 tempo: {min: 30, max: 210},
 key: 0,
 mode: 0,
 time_signature: 1,

 // duplicates args.meta.duration_ms, one is enough (the choice depends on the category)
 duration_ms: {min: 0, max: 10000},
 },
 album: {
 popularity: {min: 30, max: 70},
 genres: [], // Tests show that albums have an empty genre list
 release_date: {sinceDays: 6, beforeDays: 0},
 // or release_date: {startDate: new Date ('2020.11.30'), endDate: new Date ('2020.12.30')},
 },
};
``,

Example 1 - Exclude rap tracks.
`` `js
let tracks = Source.getTracks (playlistArray);
Filter.rangeTracks (tracks, {
 artist: {
 ban_genres: ['rap'],
 }
});
``,

Example 2 - Leave only indie and alternate tracks.
`` `js
let tracks = Source.getTracks (playlistArray);
Filter.rangeTracks (tracks, {
 artist: {
 genres: ['indie', 'alternative'],
 },
});
``,

Example 3 - Leave only unpopular tracks from little-known artists.
`` `js
let tracks = Source.getTracks (playlistArray);
Filter.rangeTracks (tracks, {
 meta: {
 popularity: {min: 0, max: 49},
 },
 artist: {
 followers: {min: 0, max: 9999},
 },
});
``,

### rangeDateAbs

Leave only tracks added (`added_at`) or listened to (` played_at`) for the specified absolute period.

> Use [rangeTracks] (/ func? Id = rangetracks) to filter by release date.

> ❗️ The warning is described in [rangeDateRel] (/ func? Id = rangedaterel).

Arguments
- (array) `tracks` - an array of tracks.
- (date) `startDate` - start boundary.
- (date) `endDate` - limit limit.

Date format `YYYY-MM-DDTHH: mm: ss.sss` where
- `YYYY-MM-DD` - year, month, day
- `T` - separator for specifying time. Indicate if time is added.
- `HH: mm: ss.sss` - hours, minutes, seconds, milliseconds

Example 1 - Tracks added between September 1st and 3rd.
`` `js
let tracks = Source.getTracks (playlistArray);
let startDate = new Date ('2020-09-01');
let endDate = new Date ('2020-09-03');
Filter.rangeDateAbs (tracks, startDate, endDate);
``,

Example 2 - Tracks added from August 1 15:00 to August 20 10:00.
`` `js
let tracks = Source.getTracks (playlistArray);
let startDate = new Date ('2020-08-01T15: 00');
let endDate = new Date ('2020-08-20T10: 00');
Filter.rangeDateAbs (tracks, startDate, endDate);
``,

Example 3 - Tracks added from September 1st to the current date and time.
`` `js
let tracks = Source.getTracks (playlistArray);
let startDate = new Date ('2020-09-01');
let endDate = new Date ();
Filter.rangeDateAbs (tracks, startDate, endDate);
``,

### rangeDateRel

Leave only tracks added (`added_at`) or listened to (` played_at`) for the specified period relative to today. 

> Use [rangeTracks] (/ func? Id = rangetracks) to filter by release date.

> ❗️ If the track contains no date, 01.01.2000 is set. This is possible, for example, if a track was added to Spotify a long time ago, the source is [getTopTracks] (/ func? Id = gettoptracks), these are "My Mix of the Day #N" playlists, or a number of other sources.

Arguments
- (array) `tracks` - an array of tracks.
- (number) `sinceDays` - start boundary. By default, today is 00:00.
- (number) `beforeDays` - limit limit. By default, today is 23:59.

Below is an example for `sinceDays` = 7 and` beforeDays` = 2. That is, to get tracks added to the playlist from September 3 00:00 to September 8 23:59 relative to today, September 10. 

! [Example using sinceDays and beforeDays] (/ img / DaysRel.png)

Example 1 - Tracks added in the last 5 days and today.
`` `js
let tracks = Source.getTracks (playlistArray);
Filter.rangeDateRel (tracks, 5);
// similar to Filter.rangeDateRel (tracks, 5, 0);
``,

Example 2 - Tracks from the last 7 days excluding today.
`` `js
let tracks = Source.getTracks (playlistArray);
Filter.rangeDateRel (tracks, 7, 1);
``,

Example 3 - Tracks from one day, which was 14 days ago.
`` `js
let tracks = Source.getTracks (playlistArray);
Filter.rangeDateRel (tracks, 14, 14);
``,

Example 4 - Tracks for today only.
`` `js
let tracks = Source.getTracks (playlistArray);
Filter.rangeDateRel (tracks);
// similar to Filter.rangeDateRel (tracks, 0, 0);
``,

### replaceWithSimilar

Replaces tracks with similar ones. For one replacement one random track from the results of [getRecomTracks] (/ func? Id = getrecomtracks).

Arguments
- (array) `originTracks` - where to replace
- (array) `replacementTracks` - what to replace

Example 1 - Replace recently played playlist tracks with close counterparts
`` `js
let tracks = Source.getPlaylistTracks ('', 'id');
Filter.replaceWithSimilar (tracks, RecentTracks.get (2000));
``,

Example 2 - Replace favorite tracks from the playlist with close analogs
`` `js
let tracks = Source.getPlaylistTracks ('', 'id');
Filter.replaceWithSimilar (tracks, Source.getSavedTracks ());
``,

### removeArtists

Removes the executors from `sourceArray` that are in` removedArray`. The match is determined by the `id` of the main artist of the track.

Arguments
- (array) `sourceArray` - an array of tracks or artists to delete.
- (array) `removedArray` - an array of tracks or artists to be removed.
- (bool) `invert` - inversion of the result. If `true`, remove everything except what is in` removedArray`. The default is `false`.

Example 1 - Get Playlist Tracks and Exclude Favorite Track Artists.
`` `js
let sourceArray = Source.getTracks (playlistArray);
let removedArray = Source.getSavedTracks ();
Filter.removeArtists (sourceArray, removedArray);
``,

### removeTracks

Removes tracks from `sourceArray` that are in` removedArray`. The match is determined by the `id` of the track or by the name of the track along with the artist.

Arguments
- (array) `sourceArray` - an array of tracks in which you want to delete tracks.
- (array) `removedArray` - an array of tracks to be removed.
- (bool) `invert` - inversion of the result. If true, remove all tracks except those in removedArray. The default is `false`.

Example 1 - Get playlist tracks and exclude favorite tracks.
`` `js
let sourceArray = Source.getTracks (playlistArray);
let removedArray = Source.getSavedTracks ();
Filter.removeTracks (sourceArray, removedArray);
``,

### removeUnavailable

Deletes tracks that cannot be listened to. Modifies the content of the original array. Does not replace the original with an analogue ([relink] (https://developer.spotify.com/documentation/general/guides/track-relinking-guide/), ie there is no redirection to another similar track).

> Makes additional requests (1 for 50 tracks). In case the track is in an undefined state.
> It is allowed to apply the filter for tracks from `Cache`, compressed [compressTracks] (/ func? Id = compresstracks). If there was no compression, the state is determined by the value in the cached track.

Arguments
- (array) `tracks` - tracks to filter.
- (string) `market` - country in which the availability of tracks is checked. The default is `RU`.

Example 1 - Delete unavailable playlist tracks in Russia
`` `js
let tracks = Source.getPlaylistTracks ('', 'id');
Filter.removeUnavailable (tracks);
``,

### getDateRel

Returns the date offset in days from today. 

Arguments
- (number) `days` - number of days to offset.
- (string) `bound` - zeroing the clock. At `startDay` 00:00, at` endDay` 23:59. If not specified, the time is according to the moment of contact.

Example in template [loved and forgotten] (/ template? Id = Loved and forgotten).

### getLastOutRange

Get a new array with tracks that did not pass the last check of the [rangeTracks] function (/ func? Id = rangetracks).

There are no arguments.

Example 1 - Get tracks that did not pass validation.
`` `js
let tracks = Source.getTracks (playlistArray);
Filter.rangeTracks (tracks, args);
let outRangeTracks = Filter.getLastOutRange ();
``,

## Selector

Selecting the number of tracks by position

### keepFirst / sliceFirst

Modifies / returns an array consisting of the first `count` elements of the` array` array.

> Difference between `keep *` and `slice *` functions:
> 
> - `keep *` changes the contents of the original array, 
> - `slice *` returns a new array without changing the original.

Arguments
- (array) `array` - the array from which the elements are taken.
- (number) `count` - number of elements.

Example 1 - Get the first 100 tracks.
`` `js
let tracks = Source.getTracks (playlistArray);
tracks = Selector.sliceFirst (tracks, 100);
``,

### keepLast / sliceLast

Modifies / returns an array consisting of the last `count` elements of` array`.

Arguments
- (array) `array` - the array from which the elements are taken.
- (number) `count` - number of elements.

Example 1 - Get the last 100 tracks.
`` `js
let tracks = Source.getTracks (playlistArray);
tracks = Selector.sliceLast (tracks, 100);
``,

### keepAllExceptFirst / sliceAllExceptFirst

Modifies / returns an array consisting of all elements of the array except the first skipCount.

Arguments
- (array) `array` - the array from which the elements are taken.
- (number) `skipCount` - the number of items to skip.

Example 1 - Get all tracks except the first 10.
`` `js
let tracks = Source.getTracks (playlistArray);
tracks = Selector.sliceAllExceptFirst (tracks, 10);
``,

### keepAllExceptLast / sliceAllExceptLast

Modifies / returns an array consisting of all the elements of the array `array` except for the last` skipCount`.

Arguments
- (array) `array` - the array from which the elements are taken.
- (number) `skipCount` - the number of items to skip.

Example 1 - Get all tracks except the last 10.
`` `js
let tracks = Source.getTracks (playlistArray);
tracks = Selector.sliceAllExceptLast (tracks, 10);
``,

### keepRandom / sliceRandom

Modifies / returns an array of randomly selected elements of the original array.

Arguments
- (array) `array` - the array from which the elements are taken.
- (number) `count` - the number of randomly selected items.

Example 1 - Get 20 random tracks.
`` `js
let tracks = Source.getTracks (playlistArray);
tracks = Selector.sliceRandom (tracks, 20);
``,

### keepNoLongerThan / sliceNoLongerThan

Modifies / returns an array of tracks with a total duration of no more than `minutes` minutes.

Arguments
- (array) `tracks` - source array of tracks.
- (number) `minutes` - number of minutes.

Example 1 - Get tracks with a total duration of no more than 60 minutes.
`` `js
let tracks = Source.getTracks (playlistArray);
tracks = Selector.sliceNoLongerThan (tracks, 60);
``,

### pickYear

Returns an array of tracks that were released in the specified year. If there are no such tracks, the next year is selected.

Arguments
- (array) `tracks` - tracks to choose from.
- (string) `year` - release year.
- (number) `offset` - valid offset for the next year. The default is 5.

Example 1 - Choose your favorite tracks released in 2020
`` `js
let tracks = Selector.pickYear (savedTracks, '2020');
``,

### sliceCopy

Returns a new array that is a copy of the original array.

> 💡 Use create a copy if you need to perform different actions on the source in one script. Allows you to speed up execution time and not send the same requests twice.

Arguments
- (array) `array` - the original array to create a copy of.

Example 1 - Create a copy of an array.
`` `js
let tracks = Source.getTracks (playlistArray);
let tracksCopy = Selector.sliceCopy (tracks);
``,

### isWeekend

Returns a boolean value: `true` if today is Saturday or Friday and` false` if not.

There are no arguments.

Usage example
`` `js
if (Selector.isWeekend ()) {
 // today is a day off
} else {
 // Weekdays
}
``,

### isDayOfWeekRu

Returns a boolean value: `true` if today is the day of the week` strDay` and `false` if not. The value of the day of the week in Cyrillic.

Arguments
- (string) `strDay` - day of the week. Valid values: `Monday`,` Tuesday`, `Wednesday`,` Thursday`, `Friday`,` Saturday`, `Sunday`.

Usage example
`` `js
if (Selector.isDayOfWeekRu ('Monday')) {
 // Today is Monday
} else if (Selector.isDayOfWeekRu ('Wednesday')) {
 // Today is Wednesday
} else {
 // another day of the week
}
``,

### isDayOfWeek

Returns a boolean value: `true` if today is the day of the week` strDay` and `false` if not.

Arguments
- (string) `strDay` - day of the week.
- (string) `locale` - locale of the day of the week. The default is `en-US`, for which the following values ​​are allowed:` sunday`, `monday`,` tuesday`, `wednesday`,` thursday`, `friday`,` saturday`.

Usage example
`` `js
if (Selector.isDayOfWeek ('friday')) {
 // today is Friday
} else {
 // another day of the week
}
``,

## Order

Sorting tracks

### reverse

Reverse sorting. The first item will become the last and vice versa.

Arguments
- (array) `array` - an array whose elements must be sorted in the opposite direction.

Example 1 - Reverse sort
`` `js
let array = [1, 2, 3, 4, 5, 6];

Order.reverse (array);
// result is 6, 5, 4, 3, 2, 1

Order.reverse (array);
// result is 1, 2, 3, 4, 5, 6
``,

Example 2 - Reverse sorting of playlist tracks
`` `js
let tracks = Source.getTracks (playlistArray);
Order.reverse (tracks);
``,

### separateArtists

Sorting that maintains the minimum spacing between the same performer. Tracks that could not be placed will be excluded.

Arguments
- (array) `tracks` - an array of tracks to be sorted.
- (number) `space` - minimum padding value.
- (boolean) `isRandom` - affects sorting. If `true`, the original array is randomly sorted, which will affect the order when splitting the performers. If `false` no random sorting. Then the result with the same input tracks will also be the same. The default is `false`.

Example 1 - Conditional split example
`` `js
let array = ['cat', 'cat', 'dog', 'lion']
Order.separateArtists (array, 1, false);
// result cat, dog, cat, lion

array = ['cat', 'cat', 'dog', 'lion']
Order.separateArtists (array, 1, false);
// call again, same result: cat, dog, cat, lion

array = ['cat', 'cat', 'dog', 'lion']
Order.separateArtists (array, 1, true);
// call again and random sort: cat, lion, dog, cat
``,

Example 2 - Split the same performer with at least two others.
`` `js
let tracks = Source.getTracks (playlistArray);
Order.separateArtists (tracks, 2);
``,

### separateYears

Returns an object containing an array with the tracks released in this year by the key with the year. Array tracks are not sorted.

Arguments
- (array) `tracks` - an array of tracks to be divided by year.

Example 1 - Get tracks released only in 2020
`` `js
let tracks2020 = Order.separateYears (tracks) ['2020'];
``,

EXAMPLE 2 It is possible that there is no specified year among the tracks. Choose one of:
- Use [pickYear] (/ func? Id = pickyear)
- Replace with empty array
- Check by condition
 
`` `js
// Replace with an empty array if there are no tracks of the specified year
let tracks2020 = Order.separateYears (tracks) ['2020'] || [];

// Check through the condition
let tracksByYear = Order.separateYears (tracks);
if (typeof tracksByYear ['2020']! = 'undefined') {
 // there are tracks
} else {
 // no tracks
}
``,

### shuffle

Shuffles the elements of the array randomly.

Arguments
- (array) `array` - an array whose elements need to be shuffled.

Example 1 - Random Shuffle
`` `js
let array = [1, 2, 3, 4, 5, 6];

Order.shuffle (array);
// result is 3, 5, 4, 6, 2, 1

Order.shuffle (array);
// result is 6, 1, 2, 3, 5, 4

Order.shuffle (array);
// result is 6, 5, 2, 3, 1, 4
``,

Example 2 - Shuffle tracks
`` `js
let tracks = Source.getTracks (playlistArray);
Order.shuffle (tracks);
``,

### sort

Sorts the original array by the given key.

> ❗️ The function makes additional requests. To reduce the number of requests, use it after minimizing the track array in other ways. More details in [rangeTracks] (/ func? Id = rangetracks).

Arguments
- (array) `tracks` - an array of tracks to be sorted.
- (string) `pathKey` - sorting key.
- (string) `direction` - sorting direction:` asc` ascending, `desc` descending. The default is `asc`.

Valid keys are in the format `category.key`. Description of keys [here] (/ guide? Id = Description of object parameters).

| Category | Key |
| - | - |
| meta | name, popularity, duration_ms, explicit, added_at, played_at |
| features | acousticness, danceability, energy, instrumentalness, liveness, loudness, speechiness, valence, tempo, key, mode, time_signature, duration_ms |
| artist | popularity, followers, name |
| album | popularity, name, release_date |

> If multiple track sources are mixed, not all have the specified key. For example, only the play history has `played_at`.

Example 1 - Sorted by Descending Artist Popularity
`` `js
Order.sort (tracks, 'artist.popularity', 'desc');
``,

Example 2 - Sort by ascending vigor
`` `js
Order.sort (tracks, 'features.energy', 'asc');
``,

## Playlist

Create or update a playlist

### saveAsNew

Creates a playlist. New every time.

Arguments
- (object) `data` - data for creating a playlist.

Data format for creating a playlist
- (string) `name` - playlist name, required.
- (array) `tracks` - an array of tracks, required.
- (string) `description` - playlist description. Up to 300 characters.
- (boolean) `public` - if` false` the playlist will be private. The default is `true`.
- (string) `sourceCover` - direct link to the cover (up to 256 kb). If specified, `randomCover` is ignored.
- (string) `randomCover` - add a random cover if the value is` once`. No use, standard Spotify mosaic.

Example 1 - Create a public playlist with favorite tracks without description with random cover
`` `js
let tracks = Source.getSavedTracks ();
Playlist.saveAsNew ({
 name: 'A copy of your favorite tracks',
 tracks: tracks,
 randomCover: 'once',
 // sourceCover: tracks [0] .album.images [0] .url,
});
``,

Example 2 - Create a private playlist with recent listening history and description without cover.
`` `js
let tracks = RecentTracks.get (200);
Playlist.saveAsNew ({
 name: 'Listening history',
 description: '200 recently played tracks'
 public: false,
 tracks: tracks,
});
``,

### saveWithAppend

Adds tracks to those already in the playlist. Updates the rest of the data (title, description). If there is no playlist yet, it creates a new one.

Arguments
- (object) `data` - playlist data. Playlist data format as described in [saveWithReplace] (/ func? Id = savewithreplace).
- (boolean) `toEnd` - if` true`, add tracks to the end of the list. If false, start. The default is `false`.

Example 1 - Add tracks to the beginning of the playlist.
`` `js
let tracks = Source.getTracks (playlistArray);
Playlist.saveWithAppend ({
 id: 'fewf4t34tfwf4',
 name: 'Mix of the day',
 tracks: tracks
});
``,

Example 2 - Add tracks to the end of the playlist, update the title and description.
`` `js
let tracks = Source.getTracks (playlistArray);
Playlist.saveWithAppend ({
 id: 'fewf4t34tfwf4',
 name: 'New name',
 description: 'New description',
 tracks: tracks,
 toEnd: true,
});
``,

> ❗️ If you update the playlist name without specifying the `id`, a new playlist will be created. Because the search did not find a playlist with a new name.

### saveWithReplace

Replaces playlist tracks. Updates the rest of the data (title, description). If there is no playlist yet, it creates a new one.

Arguments
- (object) `data` - playlist data.

Playlist data format
- (string) `id` - [playlist id] (# id).
- (string) `name` - playlist name, required.
- (array) `tracks` - an array of tracks, required.
- (string) `description` - playlist description. Up to 300 characters.
- (boolean) `public` - if` false` the playlist will be private. The default is `true`.
- (string) `sourceCover` - direct link to the cover (up to 256 kb). If specified, `randomCover` is ignored.
- (string) `randomCover` - if` once` will add a random cover. With `update`, it updates the skin every time. No use, standard Spotify mosaic.
> 💡 It is recommended to always use `id`. If `id` is not specified, search by name. If there is no such playlist, a new one is created.

Example 1 - Update playlist content and cover art
`` `js
let tracks = Source.getTracks (playlistArray);
Playlist.saveWithReplace ({
 id: 'fewf4t34tfwf4',
 name: 'Mix of the day',
 description: 'Playlist description',
 tracks: tracks,
 randomCover: 'update',
 // sourceCover: tracks [0] .album.images [0] .url,
});
``,

Example 2 - Refresh the contents of the playlist from example 1. Search by title.
`` `js
let tracks = RecentTracks.get ();
Playlist.saveWithReplace ({
 name: 'History',
 description: 'New playlist description',
 tracks: tracks,
 randomCover: 'update',
});
``,

### saveWithUpdate

Updates playlist tracks: adds new ones; removes those that are not in the array; keeps the original date of adding tracks. The sorting specified in the array is lost. Duplicates by `id` are ignored.

Arguments
- (object) `data` - playlist data, corresponds to [saveWithReplace] (/ func? id = savewithreplace).

Additional mode for `data`
- (boolean) `toEnd` - if` true`, add tracks to the end of the list. If false, start. The default is `false`.

### getDescription

Returns a string of the form: `Artist 1, Artist 2 ... and not only`.

Arguments
- (array) `tracks` - tracks from which artists are randomly selected.
- (number) `limit` - the number of randomly selected artists. The default is 5.

Example 1 - Create a playlist with description
`` `js
let tracks = Source.getTracks (playlistArray);
Playlist.saveWithReplace ({
 id: 'abcd',
 name: 'Big Mix of the Day',
 tracks: tracks,
 description: Playlist.getDescription (tracks),
});
``,

## Library

Actions on favorite tracks and artist subscriptions

### followArtists

Subscribe to performers

Arguments
- (array) `artists` - list of artists. Only `id` is meaningful.

Example in [Yandex.getArtists] (/ func? Id = getartists)

### unfollowArtists

Unsubscribe from artists

Arguments
- (array) `artists` - list of artists. Only `id` is meaningful.

An example is similar to [Yandex.getArtists] (/ func? Id = getartists). Only use `unfollowArtists`.

### saveFavoriteTracks

Add tracks to favorites (like)

Arguments
- (array) `tracks` - list of tracks. Only `id` is meaningful.

Example 1 - Add last 50 likes from Yandex to Spotify
`` `js
let yandexTracks = Yandex.getTracks ('owner', '3', 50);
let savedTracks = Source.getSavedTracks ();
Filter.removeTracks (yandexTracks, savedTracks);
Library.saveFavoriteTracks (yandexTracks);
``,

### deleteFavoriteTracks

Remove tracks from favorites (remove likes)

Arguments
- (array) `tracks` - list of tracks. Only `id` is meaningful.

Example 1 - Clear All Spotify Likes
`` `js
let savedTracks = Source.getSavedTracks ();
Library.deleteFavoriteTracks (savedTracks);
``,

### saveAlbums

Add albums to the library.

Arguments
- (array) `albums` - list of albums to add. Only `id` is meaningful.

### deleteAlbums

Remove albums from library.

Arguments
- (array) `albums` - list of albums to delete. Only `id` is meaningful.

## Lastfm

Module for working with the Last fm service

### getLovedTracks

Returns an array of the favorite tracks of the user `user`, limited by the number of` limit`. Attention to the warning from [getRecentTracks] (/ func? Id = getrecenttracks-1). Includes date added, you can filter by date.

Arguments
- (string) `user` - login of the Last.fm user whose favorite tracks you want to search for.
- (number) `limit` - limit number of tracks.

Example 1 - Get 200 Favorite Tracks
`` `js
let tracks = Lastfm.getLovedTracks ('login', 200);
``,

### getSimilarArtists

Returns an array of artists that look like the input elements as reported by Lastfm.

Arguments
- (array) `items` - an array of tracks or artists. Only the artist's `name` is selected.
- (number) `match` - minimum value of similarity to the original artist in the range from` 0.0` to `1.0`. 
- (number) `limit` - the number of requested similar performers per one original.
- (bool) `isFlat` - if` false` the result contains executors in a separate array. If true, all executors are in the same array. The default is `true`.

Example 1 - Get artists similar to the tracked ones
`` `js
let artists = Source.getArtists ({followed_include: true,});
let similarArtists = Lastfm.getSimilarArtists (artists, 0.65, 20);
``,

### getSimilarTracks

Returns an array of tracks that look like the input tracks as reported by Lastfm.

Arguments
- (array) `tracks` - tracks for which you want to find similar ones.
- (number) `match` - minimum value of similarity to the original track in the range from` 0.0` to `1.0`. 
- (number) `limit` - the number of requested similar tracks for one original track.
- (bool) `isFlat` - if` false` the result contains tracks in a separate array. If `true` all tracks are in one array. The default is `true`.

Example 1 - Get tracks similar to a playlist
`` `js
let playlistTracks = Source.getPlaylistTracks ('name', 'id');
let similarTracks = Lastfm.getSimilarTracks (playlistTracks, 0.65, 30);
``,

### getCustomTop

Returns an array of elements by `type`, sorted by the number of listens during the specified period.

Arguments
- (string) `user` - login of the Lastfm user, whose top to collect
- (date / line / number) `from` - start date.
- (date / line / number) `to` - end date.
- (string) `type` - variation of the result:` track`, `artist` or` album`. The default is `track`.
- (number) `count` - number of elements. The default is 40.
- (number) `offset` - skip the first N elements. The default is 0.

> The function sends a lot of requests. One request to Lastfm for 200 tracks. One search request for one track on Spotify. Search for `count` tracks only.

Example 1 - Get the top 40 tracks for 2015
`` `js
let topTracks = Lastfm.getCustomTop ({
 user: 'login',
 from: '2015-01-01', // or new Date ('2015-01-01'),
 to: '2015-12-31', // or new Date ('2015-12-31'). getTime (),
});
``,

Example 2 - Get the top 10 performers for the first half of 2014
`` `js
let topArtists = Lastfm.getCustomTop ({
 user: 'login',
 type: 'artist',
 from: '2014-01-01',
 to: '2014-06-30',
 count: 10,
});
``,

### getTopAlbums

Returns an array with the top albums for a given period.

Arguments
- (object) `params` - parameters for selecting the top of the album. Same as [getTopTracks] (/ func? Id = gettoptracks-1).

Example 1 - Get the top 10 albums in six months
`` `js
let artists = Lastfm.getTopAlbums ({
 user: 'your username',
 period: '6month',
 limit: 10
});
``,

### getTopArtists

Returns an array with the top performers for a given period.

Arguments
- (object) `params` - parameters for selecting the top performers. Same as [getTopTracks] (/ func? Id = gettoptracks-1).

Example 1 - Get the top 10 performers in six months
`` `js
let artists = Lastfm.getTopArtists ({
 user: 'your username',
 period: '6month',
 limit: 10
});
``,

### getTopTracks

Returns an array with the top tracks for the specified period. Attention to the warning from [getRecentTracks] (/ func? Id = getrecenttracks-1).

Arguments
- (object) `params` - parameters for selecting the top of the tracks.

Valid values ​​for `params`
`` `js
{
 user: 'login', // username last.fm
period: 'overall', // period, valid: overall | 7day | 1month | 3month | 6month | 12month
 limit: 50 // limit number of tracks
}
``,

Example 1 - Get the top 40 tracks in six months
`` `js
let tracks = Lastfm.getTopTracks ({
 user: 'your username',
 period: '6month',
 limit: 40
});
``,

### getLibraryStation

Returns an array of tracks from radio last fm `Library`. Contains only previously scraped tracks. Attention to the warning from [getRecentTracks] (/ func? Id = getrecenttracks-1).

Arguments
- (string) `user` - username of the user whose radio is the source.
- (number) `countRequest` - number of requests to last fm. One request gives approximately 20 to 30 tracks.

Usage example
`` `js
let tracks = Lastfm.getLibraryStation ('login', 2);
``,

### getMixStation

Returns an array of tracks from the last fm `Mix` radio. Contains previously scraped tracks and last fm recommendations. Attention to the warning from [getRecentTracks] (/ func? Id = getrecenttracks-1).

Arguments
- (string) `user` - username of the user whose radio is the source.
- (number) `countRequest` - number of requests to last fm. One request gives approximately 20 to 30 tracks.

Usage example
`` `js
let tracks = Lastfm.getMixStation ('login', 2);
``,

### getNeighborsStation

Returns an array of tracks from radio last fm `Neighbors`. Contains tracks that are listened to by last fm users with musical tastes similar to you. Attention to the warning from [getRecentTracks] (/ func? Id = getrecenttracks-1).

Arguments
- (string) `user` - username of the user whose radio is the source.
- (number) `countRequest` - number of requests to last fm. One request gives approximately 20 to 30 tracks.

Usage example
`` `js
let tracks = Lastfm.getNeighborsStation ('login', 2);
``,

### getRecomStation

Returns an array of tracks from radio last fm `Recommendations`. Contains only last fm recommendations. Attention to the warning from [getRecentTracks] (/ func? Id = getrecenttracks-1).

Arguments
- (string) `user` - username of the user whose radio is the source.
- (number) `countRequest` - number of requests to last fm. One request gives approximately 20 to 30 tracks.

Usage example
`` `js
let tracks = Lastfm.getRecomStation ('login', 2);
``,

### getRecentTracks

Returns an array of recently listened tracks for user `user`, limited by the number of` limit`. 

> ❗️ The source of the tracks is lastfm. The equivalent of a track is found by a Spotify search for best match. If there is no match, the track is ignored.
> 
> One lastfm track equals one search request. Be careful with [limits] (/ desc? Id = Limits) on the number of requests per day and the execution time.

Arguments
- (string) `user` - login of the Last.fm user, whose listening history should be searched.
- (number) `count` - limit number of tracks.

Example 1 - Get 200 Recently Played Tracks
`` `js
let tracks = Lastfm.getRecentTracks ('login', 200);
``,

### removeRecentArtists
Removes the history of recently listened `limit` tracks of user` lastfmUser` from the array of `sourceArray` tracks. The match is determined only by the name of the artist. Requires [additional setup] (/ install? Id = setup-lastfm).

Arguments
- (array) `sourceArray` - an array of tracks in which you want to delete tracks.
- (string) `user` - login of the Last.fm user whose listening history should be excluded.
- (number) `count` - limit number of listening history tracks. The default is 600.

Example like [removeRecentTracks] (/ func? Id = removerecenttracks)

### removeRecentTracks

Removes the history of recently listened `limit` tracks of user` lastfmUser` from the array of `sourceArray` tracks. The match is determined by the name of the track and the artist. Requires [additional setup] (/ install? Id = setup-lastfm).

Arguments
- (array) `sourceArray` - an array of tracks in which you want to delete tracks.
- (string) `user` - login of the Last.fm user whose listening history should be excluded.
- (number) `count` - limit number of listening history tracks. The default is 600.

Example 1 - Create a playlist with favorite tracks that have not been listened to in the last 5 thousand Last.fm scrobbls of user `login`
`` `js
let savedTracks = Source.getSavedTracks ();
Lastfm.removeRecentTracks (savedTracks, 'login', 5000)
Playlist.saveAsNew ({
 name: 'Haven't listened for a long time',
 tracks: savedTracks,
});
``,

## Yandex

Module for working with Yandex.Music

### getAlbums

Returns an array of albums from the Yandex.Music subscriptions of the specified user. See note in [getTracks] (/ func? Id = gettracks-1).

Arguments
- (string) `owner` - username for Yandex.Music
- (number) `limit` - the number of selected albums. If not specified, that's it.
- (number) `offset` - offset from the first album. For example, `limit` = 50 and` offset` = 50 will return albums from 50th to 100th.

Example 1 - Get all albums from user subscriptions
`` `js
let albums = Yandex.getAlbums ('owner');
``,

### getArtists

Returns an array of artists from the Yandex.Music subscriptions of the specified user. Search for an analogue in the Spotify database by artist name. Attention to [restrictions] (/ desc? Id = Restrictions). One performer = one search request. The specified user must have a publicly available library. The setting is located [here] (https://music.yandex.ru/settings/other).

> ❗️ Searches based on the best first match. Therefore, "artifacts" may appear. For example, instead of the artist [Shura] (https://open.spotify.com/artist/1qpR5mURxk3d8f6mww6uKT) there is [Shura] (https://open.spotify.com/artist/03JHGoUoM1LQmuXqknBi5P).

Arguments
- (string) `owner` - username for Yandex.Music
- (number) `limit` - the number of selected artists. If not specified, that's it.
- (number) `offset` - offset from the first executor. For example, `limit` = 50 and` offset` = 50 will return artists from 50th to 100th.

Example 1 - Subscribe to the latest 50 artists from Yandex on Spotify. Can be triggered by trigger. Therefore, get one-way sync.
`` `js
let artists = Yandex.getArtists ('owner', 50);
Library.followArtists (artists);
``,

### getTracks

Returns an array of Yandex.Music playlist tracks. Search for an analogue in the Spotify database by artist name and track title. Attention to [restrictions] (/ desc? Id = Restrictions). One track = one search request. The specified user must have a publicly available library. The setting is located [here] (https://music.yandex.ru/settings/other). In addition, the playlist itself must be public (they have local privacy).

> ❗️ Searches based on the best first match. Therefore, "artifacts" may appear. For example, tracks that are full synonyms or an attempt to find a track that is not in the database.

Required Arguments
- (string) `owner` - username for Yandex.Music
- (string) `kinds` - playlist number
- (number) `limit` - the number of selected tracks. If not specified, that's it.
- (number) `offset` - offset from the first track. For example, `limit` = 50 and` offset` = 50 will return tracks from 50th to 100th.

The arguments are taken from the playlist link. For example, for the link `https: // music.yandex.ru / users / yamusic-daily / playlists / 46484894`: login is` yamusic-daily`, number is `46484894`.

Example 1 - Create a Playlist of the Day from Yandex.Music tracks
`` `js
 Playlist.saveWithReplace ({
 // id: 'your id', // after the first creation
 name: 'Playlist of the Day',
 tracks: Yandex.getTracks ('yamusic-daily', 'your playlist id of the day'),
 randomCover: 'update',
 });
``,

## Cache

Module for saving arrays to Google Drive. By default, without specifying the file extension, it is assumed to be `json`. If explicitly specified, the text format is supported - `file.txt`

> In the absence of the required functionality, you can implement your functions via [DriveApp] (https://developers.google.com/apps-script/reference/drive).

### append

Writes data to a file adding new data. If the file does not exist, creates it.

Arguments
- (string) `filename` - filename
- (array) `content` - data array to add
- (string) `place` - place of attachment. At `begin` to the beginning of the file. At `end` to the end of the file. The default is `end`.
- (number) `limit` - limit the number of array elements ** after ** joining new data. By default, select ** first ** 100 thousand (sliceFirst). It will require a `place` equal to 'begin' for a constant update.

Example 1 - Add new tracks to the beginning of the file. Limit the array to 5 thousand tracks.
`` `js
let tracks = Source.getPlaylistTracks ('playlist name', 'id');
Cache.append ('myfile.json', tracks, 'begin', 5000);
``,

Example 2 - Add tracks to the end of the file. The limit is 100 thousand. Default values.
`` `js
let tracks = Source.getPlaylistTracks ('playlist name', 'id');
Cache.append ('myfile.json', tracks);
``,

### clear

Overwrites the contents of the file with an empty array.

Arguments
- (string) `filename` - filename

Example 1 - Clear file
`` `js
Cache.clear ('filename.json');
``,

### copy

Creates a copy of the file. Returns the name of the created copy.

Arguments
- (string) `filename` - filename

Example 1 - Create a copy of a file and retrieve its data
`` `js
let filename = 'myfile.json';
filename = Cache.copy (filename);
let tracks = Cache.read (filename);
``,

### read

Returns data from a file. If the file does not exist for `json` an empty array will be returned, for the rest an empty string.

> When reading an empty file, an exception is thrown to prevent Google from overwriting the file in case of a bug ([more] (https://github.com/Chimildic/goofy/discussions/26)).

Arguments
- (string) `filename` - filename

Example 1 - Add tracks from a file to a playlist
`` `js
let tracks = Cache.read ('file.json');
Playlist.saveAsNew ({
 name: 'Tracks from file',
 tracks: tracks,
});
``,

### remove

Moves the file to the trash can. According to Google Drive rules, items in the trash can be deleted after 30 days.

Arguments
- (string) `filename` - filename

Example 1 - Place a file in the trash bin
`` `js
Cache.remove ('filename.json');
``,

### rename

Renames the file.

Arguments
- (string) `oldFilename` - current file name
- (string) `newFilename` - new file name

> ❗️ Do not use the names `SpotifyRecentTracks`, 'LastfmRecentTracks', 'BothRecentTracks'. They are used in the [listen-history] accumulation mechanism (/ desc? Id = listen-history).

Example 1 - Rename a file
`` `js
Cache.rename ('filename.json', 'newname.json');
``,

### write

Writes data to a file. If the file does not exist, creates it. If the file exists, it overwrites the content.

Arguments
- (string) `filename` - filename
- (array) `content` - data array to write

Example 1 - Write Favorite Tracks to File
`` `js
let tracks = Sourct.getSavedTracks ();
Cache.write ('liked.json', tracks);
``,

### compressArtists

Removes unnecessary artist data.

Arguments
- (array) `artists` - an array of artists.

Example 1 - Compress artist data and save to file
`` `js
let artists = Yandex.getArtists ('login');
Cache.compressArtists (artists);
Cache.write ('yandex-artists.json', artists);
``,

### compressTracks

Deletes unnecessary track data. It can significantly reduce the size of the file.

Arguments
- (array) `tracks` - an array of tracks.

Example 1 - Compress Tracks and Save to File
`` `js
let tracks = Source.getPlaylistTracks ('playlist name', 'id');
Cache.compressTracks (tracks);
Cache.write ('myfile.json', tracks);
``,
