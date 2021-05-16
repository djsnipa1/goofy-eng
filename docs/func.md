# ENG

## List of functions

### Source

Source for getting Spotify tracks

### getTracks

Returns an array of tracks from one or more playlists.

Arguments
- (array) `playlistArray` - one or more playlists. 

Single playlist format
- `id` - [playlist id](/guide?id=Плейлист).
- `userId` - [user identification number](/guide?id=Пользователь).
- `name` - Playlist name.

| id | name | userId | Action |
|:-:|:-:|:-:|:-|
| ✓ | ☓ | ☓ | Take a playlist with the specified id |
| ☓ | ✓ | ☓ | Search for a playlist by name only |
| ☓ | ✓ | ✓ | Search  for playlist by name from username |

> 💡 It is recommended to always include `id` and `name`. Doing so is faster and more accurate.

> ❗️ If `name` is specified without `id` and there are several playlists with the same name, the tracks from the first playlist list will be returned.
> 
> When no playlist is found, an empty array will be returned.

Example 1 - Get tracks from two playlists by `id`. The `name` value is optional. Indicated for convenience.
```js
let tracks = Source.getTracks([
  { name: 'Top hits', id: '37i9dQZF1DX12G1GAEuIuj' },
  { name: 'Cardio', id: '37i9dQZF1DWSJHnPb1f0X3' },
]);
```

Example 2 - Retrieve tracks from `The Best` playlist and tracks and `Soundtracks`.
```js
let tracks = Source.getTracks([
  { name: 'The Best' },
  { name: 'Soundtracks' },
]);
```

Example 3 - Get the tracks of a playlist named `mint` from a specific spotify user.
```js
let tracks = Source.getTracks([
  { name: 'mint', userId: 'spotify' },
]);
```

### getTracksRandom

Returns an array of tracks from one or more playlists. Playlists are randomly selected.

Arguments
- (array) `playlistArray` - one or more playlists. Same as [getTracks](/func?Id=gettracks).
- (number) `countPlaylist` - the number of randomly selected playlists. The default is one.

Example 1 - Get tracks of one randomly selected playlist out of three.
```js
let tracks = Source.getTracksRandom([
  { name: 'Top hits', id: '37i9dQZF1DX12G1GAEuIuj' },
  { name: 'Cardio', id: '37i9dQZF1DWSJHnPb1f0X3' },
  { name: 'Dark Side', id: '37i9dQZF1DX73pG7P0YcKJ' },
]);
```

Example 2 - Get tracks from two randomly selected playlists from three.
```js
let playlistArray = [
  { name: 'Top hits хиты', id: '37i9dQZF1DX12G1GAEuIuj' },
  { name: 'Cardio', id: '37i9dQZF1DWSJHnPb1f0X3' },
  { name: 'Dark Side', id: '37i9dQZF1DX73pG7P0YcKJ' },
];
let tracks = Source.getTracksRandom(playlistArray, 2);
```

### getPlaylistTracks

Returns an array of tracks from one playlist. Similar to [getTracks](/func?id=gettracks) but for a single playlist.

Arguments
- (string) `name` - playlist name.
- (string) `id` - [playlist id](/guide?id=Плейлист).
- (string) `user` - [user id](/guide?id=Пользователь). The default is yours.

Example 1 - Get tracks from one playlist
```js
let tracks = Source.getPlaylistTracks('Locked Tracks', 'abcdef');
```

### getTopArtists

Returns the top artists for the selected period. 
> Up to 98 artists can be returned.

Arguments
- (string) `timeRange` - period. The default is `medium`. Possible values ​​are given in [getTopTracks](/func?id=gettoptracks).

Example 1 - Get top tracks from the top 10 artists
```js
let artists = Source.getTopArtists('long');
Selector.keepFirst(artists, 10);
let tracks = Source.getArtistsTopTracks(artists);
```

### getTopTracks

Returns an array of top-listened tracks for the selected period. Up to 98 tracks.

Arguments
- (string) `timeRange` - period. The default is `medium`.

|timeRange|Period|
|-|-|
| short | About the last month |
| medium | About the last 6 months |
| long | About the last several years |

> ❗️ When using [rangeDateRel](/func?id=rangedaterel) or [rangeDateAbs](/func?id=rangedateabs), any tracks that do not contain information about the date of addition will be assigned the date 01.01.2000.

Example 1 - Get the tracks from the last month.
```js
let tracks = Source.getTopTracks('short');
```

Example 2 - Get the top tracks from the last several years
```js
let tracks = Source.getTopTracks('long');
```

### getSavedTracks

Returns an array of your favorite tracks (likes).

There are no arguments.

> 💡 If you have a large numebr of favorite tracks and need to perform several actions with them in the script, create a copy of the [sliceCopy](/func?Id=slicecopy) array to avoid creating new requests to Spotify.

Example 1 - Get an array of favorite tracks.
```js
let tracks = Source.getSavedTracks();
```

### getSavedAlbumTracks

Returns an array of tracks from all saved albums. Albums can be selected randomly.

Arguments:
- (number) `limit` - if used, the albums are randomly selected up to the specified value.

Example 1 - Get tracks from three random albums
```js
let tracks = Source.getSavedAlbumTracks(3);
```

Example 2 - Retrieve tracks from all saved albums
```js
let tracks = Source.getSavedAlbumTracks();
```

### getFollowedTracks

Returns an array of tracks of the tracked playlists and / or personal playlists of the specified user.

> 💡 If you need to perform multiple requests on the source, create a copy of the [sliceCopy](/func?Id=slicecopy) array instead of sending multple new requests to Spotify via getFollowedTracks.

Arguments
- (object) `params` - playlist selection arguments.

Description of keys
- (string) `type` - The type of playlists to be selected. The default is `followed`.
- (string) `userId` - A specific [user id](#id). If not specified, the `userId` of the authorized user is set (ie - yours).
- (number) `limit` - If used, playlists are randomly selected.
- (array) `exclude` - List of playlists to exclude. Only `id` is needed. The value of `name` is optional, it is only needed to understand which playlist it is. You can get by with a comment.

| type | Selection |
| - | - |
| owned | Personal playlists only |
| followed | Tracked playlists only |
| all | All playlists |

The complete `params` object
```js
{
    type: 'followed',
    userId: 'abc',
    limit: 2,
    exclude: [
        { name: 'playlist 1', id: 'abc1' },
        { id: 'abc2' }, // playlist 2
    ],
}
```

Example 1 - Get tracks only from my tracked playlists.
```js
// Default values, no arguments specified
let tracks = Source.getFollowedTracks();

// The same with an explicit indication of the 'type' of playlists
let tracks = Source.getFollowedTracks({
    type: 'followed',
});
```

Example 2 - Randomly select two personal playlists from the user `example`, excluding several playlists by their id. 
```js
let tracks = Source.getFollowedTracks({
    type: 'owned',
    userId: 'example',
    limit: 2, 
    exclude: [
        { id: 'abc1' }, // playlist 1
        { id: 'abc2' }, // playlist 2
    ],
});
```

> ❗️ Due to restrictions in the Apps Script execution quota, avoid users with too many playlists. For example, `glennpmcdonald` has almost 5 thousand playlists. It will not be possible to get this volume of tracks in the allotted time. More details in [description of restrictions](/desc?Id=Restrictions).


### getRecomTracks
Returns an array of recommended tracks according to the specified parameters. Up to 100 tracks.

> Spotify note: for new or little-known artists, tracks - there may not be enough accumulated data to generate recommendations. 

Arguments
- (object) `queryObj` - parameters for selecting recommendations.

Valid parameters
- limit - the number of tracks. Maximum 100.
- seed_* - up to **5 values** in any combinations:
- seed_artists - [artist IDs](/guide?id=ID), separated by commas.
- seed_tracks - [track IDs](/guide?id=ID), separated by commas.
- seed_genres - genres separated by commas. For allowed values ​​look [here](/guide?Id=Genres-to-select-recommendations).
- max_* - limit value of one of the [features of the track](/guide?id=Features-track-features).
- min_* - the minimum value of one of the [features of the track](/guide?id=Track-features).
- target_* - the target value for one of the [features of the track](/guide?id=Track-features). The closest ones are selected.

> In addition, the `populatiry` key is available in` features`. For example, `target_popularity`. The Spotify API documentation doesn't say this.

> Specifying a specific genre in `seed_genres` will not necessarily return tracks of that genre.

Example of an object with parameters
```js
let queryObj = {
      seed_artists: '',
      seed_genres: '',
      seed_tracks: '',
      max_*: 0,
      min_*: 0,
      target_*: 0,
};
```

Example 1 - Get recommendations for the `indie` and `alternative` with the measure of 'happieness' (valence) set to a positive level:
```js
let tracks = Source.getRecomTracks({
      seed_genres: 'indie,alternative',
      min_valence: 0.65,
});
```

Example 2 - Get `rock` and `electronic` recommendations based on 3 random favorite artists (up to 5 values).
```js
let savedTracks = Source.getSavedTracks();
Selector.keepRandom(savedTracks, 3);

let artistIds = savedTracks.map(track => track.artists[0].id);

let tracks = Source.getRecomTracks({
      seed_artists: artistIds.join(','),
      seed_genres: 'rock,electronic'
});
```

### getRelatedArtists

> Need to test to better understand translation

Returns an array of similar artists from Spotify.

Arguments
- (array) `artists` - a list of artists for who you are getting simmilar ones too. Only `id` is meaningful.
- (bool) `isFlat` - if `false` the result contains executors in a separate array. If true, all executors are in the same array. The default is `true`.

Example 1 - `isFlat = true`
```js
let relatedArtists = Source.getRelatedArtists(artists);
relatedArtists[0]; // 1 artist
relatedArtists[10]; // 11 artists
```

Example 2 - `isFlat = false`
```js
let relatedArtists = Source.getRelatedArtists(artists, false);
relatedArtists[0][0]; // first performer, similar to first from source
relatedArtists[1][0]; // the first performer, similar to the second from the source
```

### getCategoryTracks

Returns an array of tracks from playlists in the specified category. Sort playlists by popularity. [Category list](/guide?Id=Playlistcategories).

Arguments
- (string) `category_id` - category name.
- (object) `params` - additional parameters.

Description of `params`
- (number) `limit` - limit the number of selectable playlists. Maximum 50, default 20.
- (number) `offset` - skip the specified number of tracks. The default is 0.
- (string) `country` - the name of the country in which to watch the playlists of the category. For example, `RU` or `AU`.

Example 1 - Get the tracks of the second ten playlists of the "focus" category from Australia.
```js
let tracks = Source.getCategoryTracks('focus', { limit: 10, offset: 10, country: 'AU' });
```

Example 2 - Get the tracks of 20 playlists in the party category.
```js
let tracks = Source.getCategoryTracks('party');
```

### getListCategory

Returns an array of valid categories for [getCategoryTracks](/func?id=getcategorytracks).

Arguments
- (object) `params` - parameters for selecting categories.

Description of `params`
- (number) `limit` - limit the number of selected categories. Maximum 50, default 20.
- (number) `offset` - skip the specified number of categories. The default is 0. Used to get categories after 50+.
- (string) `country` - the name of the country in which to view the categories. For example, `RU` or` AU`. If not, globally available. But availability error is possible. To avoid getting errors, specify the same `country` for the list of categories and the request for playlists.

Example 1 - Get tracks of 10 playlists from a random category
```js
let listCategory = Source.getListCategory({ limit: 50, country: 'RU' });
let category = Selector.sliceRandom(listCategory, 1);
let tracks = Source.getCategoryTracks(category[0].id, { limit: 10, country: 'RU' });
```

### getArtists

Returns an array of artists according to the given `paramsArtist`.

Arguments
- (object) `paramsArtist` - list of criteria for selecting artists. The object matches the description from [getArtistsTracks](/func?Id=getartiststracks) in the artist part.

Example 1 - Get an array of tracked artists
```js
let artists = Source.getArtists({
    followed_include: true,
});
```

### getArtistsAlbums

Returns an array with all the albums of the specified artists.

Arguments
- (array) `artists` - array of artists
- (object) `paramsAlbum` - list of album selection criteria. The object matches the description from [getArtistsTracks](/func?Id=getartiststracks) in the album part.

Example 1 - Get an array of singles from one artist
```js
let artist = Source.getArtists({
    followed_include: false,
    include: [ 
        { id: 'abc', name: 'Avril' }, 
    ],
});
let albums = Source.getArtistsAlbums(artist, {
    groups: 'single',
});
```

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
```js
{
    artist: {
        followed_include: true,
        popularity: { min: 0, max: 100 },
        followers: { min: 0, max: 100000 },
        artist_limit: 10,
        genres: ['indie'],
        ban_genres: ['rap', 'pop'],
        include: [
            { id: '', name: '' }, 
            { id: '', name: '' },
        ],
        exclude:  [
            { id: '', name: '' }, 
            { id: '', name: '' },
        ],
    },
    album: {
        groups: 'album,single',
        release_date: { sinceDays: 6, beforeDays: 0 },
        // release_date: { startDate: new Date('2020.11.30'), endDate: new Date('2020.12.30') },
        album_limit: 10,
        track_limit: 1,
    }
}
```

Example 1 - Get tracks from singles of tracked artists released in the last week including today. Exclude multiple performers.
```js
let tracks = Source.getArtistsTracks({
    artist: {
        followed_include: true,
        exclude:  [
            { id: 'abc1', name: '' }, 
            { id: 'abc2', name: '' },
        ],
    },
    album: {
        groups: 'single',
        release_date: { sinceDays: 7, beforeDays: 0 },
    },
});
```

Example 2 - Get tracks from albums and singles per week of ten tracked artists, selected at random. Artists with no more than 10 thousand subscribers. Only one track from the album.
```js
let tracks = Source.getArtistsTracks({
    artist: {
        followed_include: true,
        artist_limit: 10,
        followers: { min: 0, max: 10000 },
    },
    album: {
        groups: 'album,single',
        track_limit: 1,
        release_date: { sinceDays: 7, beforeDays: 0 },
    },
});
```

Example 3 - Get tracks from albums and singles of specified artists
```js
let tracks = Source.getArtistsTracks({
    artist: {
        followed_include: false,
        include:  [
            { id: 'abc1', name: '' }, 
            { id: 'abc2', name: '' },
        ],
    },
    album: {
        groups: 'album,single',
    },
});
```

### getArtistsTopTracks

Returns the top tracks of the artist as an array. Up to 10 tracks per artist.

Arguments
- (array) `artists` - an array of artists. Only `id` is meaningful.
- (bool) `isFlat` - if` false`, the result contains tracks in a separate array for each artist. If `true` all tracks are in one array. The default is `true`.

Example 1 - `isFlat = true`
```js
let tracks = Source.getArtistsTopTracks(artists);
tracks[0]; // first track of the first artist
tracks[10]; // the first track of the second artist, if the first has 10 tracks
```

Example 2 - `isFlat = false`
```js
let tracks = Source.getArtistsTopTracks(artists, false);
tracks[0][0]; // first track of the first artist
tracks[1][0]; // first track of the second artist
```

### getAlbumTracks

Returns an array of tracks from the specified album.

Arguments
- (object) `album` - object of one album
- (number) `limit` - if specified, selects tracks randomly up to the specified number.

Example 1 - Get the tracks of the first album of an array
```js
let albums = Source.getArtistsAlbums(artists, {
    groups: 'album',
});
let albumTracks = Source.getAlbumTracks(albums[0]);
```

Example 2 - Get Tracks from All Albums
```js
let albums = Source.getArtistsAlbums(artists, {
    groups: 'album',
});
let tracks = [];
albums.forEach((album) => Combiner.push(tracks, Source.getAlbumTracks(album)));
```

### getAlbumsTracks

Returns an array of tracks from all albums.

Arguments
- (array) `albums` - list of albums

Example 1 - Get Tracks from Top 10 Lastfm Albums
```js
let albums = Lastfm.getTopAlbums({ user: 'login', limit: 10 });
let tracks = Source.getAlbumsTracks(albums);
```

### mineTracks

Returns an array of tracks found when searching for playlists, albums, or tracks by keywords. Duplicates are removed from the result.

Arguments
- (object) `params` - search parameters.

Description of `params`
- (string) `type` - search type. Allowed: `playlist`,` album`, `track`. The default is `playlist`. With `track`, you can use [advanced search](https://support.spotify.com/by-ru/article/search/).
- (array) `keyword` - list of keywords to search for elements.
- (number) `requestCount` - number of requests per one keyword. From one request 50 elements, if any. Maximum 40 requests. The default is one.
- (number) `itemCount` - the number of selected items from all found per one keyword. The default is three.
- (bool) `inRow` - if not specified or` false`, elements are selected randomly. If `true` takes the first` N` items (by value of `itemCount`).
- (number) `popularity` - the minimum value of the popularity of the track. The default is zero.
- (object) `followers` - range of the number of playlist followers (boundaries inclusive). Filter before selecting `itemCount`. Use only with a small amount of `requestCount` with` type = playlist`.

> The balance of values ​​in `params` must be observed. Several large values ​​can take a long time to execute and make many queries. Find out in practice the acceptable combinations.

> You can display the number of requests made. Add a line to the end of the function:
> `console.log('Number of requests', CustomUrlFetchApp.getCountRequest());`

Example 1 - Selecting 5 random playlists for each keyword with track popularity over 70. With a limited number of playlist subscribers.
```js
let tracks = Source.mineTracks({
    keyword: ['synth', 'synthpop', 'rock'],
    followers: { min: 2, max: 1000 },
    itemCount: 5,
    requestCount: 3,
    popularity: 70,
});
```

Example 2 - Selecting the top 10 playlists by keyword with any track popularity
```js
let tracks = Source.mineTracks({
    keyword: ['indie'],
    itemCount: 10,
    inRow: true,
});
```

Example 3 - Selecting tracks from random albums
```js
let tracks = Source.mineTracks({
    type: 'album',
    keyword: ['winter', 'night'],
});
```

Example 4 - Selecting indie tracks for 2020
```js
let tracks = Source.mineTracks({
    type: 'track',
    keyword: ['genre:indie + year:2020'],
});
```

### craftTracks

Returns an array of tracks from [getRecomTracks](/func?id=getrecomtracks) for each 5 of the original track items. Duplicates of the original tracks are ignored, the recommended ones are deleted. The five-item limit is dictated by the Spotify API for the recommendation feature.

> You can partially influence the formed fives of elements. Before calling the function, applying one of the `Order` sorts.

Arguments
- (array) `tracks` - tracks for which to receive recommendations. If `key` is equal to` seed_artists`, an array of artists is allowed.
- (object) `params` - additional parameters.

Parameter Description
- (string) `key` - defines by which key of the recommendation. Valid: `seed_tracks` and` seed_artists`. The default is `seed_tracks`.
- (object) `query` - optional parameter, all keys [getRecomTracks](/func?id=getrecomtracks) are available, except for the one specified in` key`.

> In `query`, you can specify two of:` seed_tracks`, `seed_artists`,` seed_genres`. The third is selected based on `key`. Thus, you can set a static track / artist / genre (up to 4 values ​​for all). The remaining free space will be substituted based on `key`.

> Specifying a specific genre in `seed_genres` will not necessarily return tracks of that genre. This is the starting point for recommendations.

Example 1 - Get recommendations for all your favorite tracks by their artist
```js
let tracks = Source.getSavedTracks();
let recomTracks = Source.craftTracks(tracks, {
    key: 'seed_artists',
    query: {
        limit: 20, // по умолчанию и максимум 100
        min_energy: 0.4,
        min_popularity: 60,
        // target_popularity: 60,
    }
});
```

Example 2 - Recommendations indicating a static genre and track. The remaining 3 places are occupied by `seed_artists`.
```js
let recomTracks = Source.craftTracks(tracks, {
    key: 'seed_artists',
    query: {
        seed_genres: 'indie',
        seed_tracks: '6FZDfxM3a3UCqtzo5pxSLZ'
    }
});
```

Example 3 - Only an array of tracks can be specified. Then there will be recommendations for the `seed_tracks` key.
```js
let tracks = Source.getSavedTracks();
let recomTracks = Source.craftTracks(tracks);
```

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
```js
let tracks = Source.getSavedTracks();
RecentTracks.appendTracks('SpotifyRecentTracks', tracks);
```

# RU

### compress

Сжимает треки в существующих накопительных файлах истории прослушиваний в зависимости от [параметров](/guide?id=Параметры). Предварительно создает копию файла.

Аргументов нет. Возвращаемого значения нет.

> Используется для совместимости с прошлыми версиями библиотеки. Достаточно одного выполнения, чтобы сжать файлы истории прослушиваний. Новые треки истории сжимаются автоматически.

Пример 1 - Сжать существующие файлы с историей прослушиваний. Файлы выбираются исходя из [активных параметров](/guide?id=Параметры).
```
RecentTracks.compress();
```

### get

Возвращает массив треков истории прослушиваний в зависимости от [параметров](/guide?id=Параметры). Сортировка по дате прослушивания от свежих к более старым. 

Аргументы
- (число) `limit` - если указано, ограничить количество возвращаемых треков. Если нет, все доступные. 

| Включенный параметр | Возвращаемый массив |
|-|-|
| `ON_SPOTIFY_RECENT_TRACKS` | История прослушиваний только Spotify |
| `ON_LASTFM_RECENT_TRACKS` | История прослушиваний только Lastfm.   |
| `ON_SPOTIFY_RECENT_TRACKS` и `ON_LASTFM_RECENT_TRACKS` | Объединение обоих источников с удалением дубликатов треков. |

Пример 1 - Получить массив треков истории прослушиваний. Источник треков зависит от параметров. 
```
let tracks = RecentTracks.get();
```

Пример 2 - Получить 100 треков истории прослушиваний.
```
let tracks = RecentTracks.get(100);
```

### getPlayingTrack

Возвращает активный трек (играющий или на паузе). Если данных нет, пустой объект.

Аргументов нет.

Пример
```js
let track = RecentTracks.getPlayingTrack();
```

## Combiner

Объединение треков разных источников 

### alternate

Возвращает новый массив, в котором чередуются элементы массивов источников.

Аргументы
- (строка) bound - допустимое значение `max` или `min`.
  - Если элементы в одном из массивов закончились, добавляет оставшиеся элементы другого массива в конец (`max`). При нескольких оставшихся массивах, продолжает чередовать их элементы.
  - Если хотя бы в одном массиве закончились элементы, немедленно возвращает результат (`min`). Оставшиеся элементы отбрасываются.
- (перечень массивов) `...arrays` - перечень массивов, чьи элементы необходимо чередовать.

Пример 1 - Чередовать элементы трех массивов.
```js
let firstArray = [1, 3, 5];
let secondeArray = [2, 4, 6, 8, 10];
let thirdArray = [100, 200, 300];
let resultArray = Combiner.alternate('max', firstArray, secondeArray, thirdArray);
// результат 1, 2, 100, 3, 4, 200, 5, 6, 300, 8, 10
```

Пример 2 - Чередовать топ прослушиваний за месяц и любимые треки.
```js
let topTracks = Source.getTopTracks('short'); // допустим, 50 треков
let savedTracks = Source.getSavedTracks(20); //допустим, 20 треков
let resultArray = Combiner.alternate('min', topTracks, savedTracks);
// результат содержит 40 треков
```

### mixin

Возвращает новый массив, в котором чередуются элементы двух массивов в заданной пропорции. Внутри вызывается [mixinMulti](/func?id=mixinmulti) с двумя массивами.

Аргументы
- (массив) `xArray` - первый массив источник.
- (массив) `yArray` - второй массив источник.
- (число) `xRow` - количество подряд идущих элементов первого массива.
- (число) `yRow`- количество подряд идущих элементов второго массива.
- (булево) `toLimitOn` - элементы чередуются до тех пор, пока пропорцию можно сохранить. Если `true` лишние элементы не включаются в результат. Если `false` добавляются в конец результата.

Пример 1 - Чередовать треки плейлистов-источников и любимые треки в соотношении 5 к 1. Удалить лишние.
```js
let tracks = Source.getTracks(playlistArray);
let savedTracks = Source.getSavedTracks();
let resultArray = Combiner.mixin(tracks, savedTracks, 5, 1, true);
```

### mixinMulti

Возвращает новый массив, в котором чередуются элементы массивов-источников в заданном соотношении. Количеством источников неограниченно.

Аргумент
- (объект) `params` - параметры, задающие источник и соотношение.

Параметры
- (массив) `source` - перечень массивов-источников
- (массив) `inRow` - перечень с количеством элементов для каждого массива
- (бул) `toLimitOn` - элементы чередуются до тех пор, пока соотношение можно сохранить. Если `true` лишние элементы не включаются в результат. Если `false` добавляются в конец результата, продолжая сохранять пропорцию, если это возможно. По умолчанию `false`.

> Важно: количество элементов в `source` должно соответствовать количеству элементов `inRow`. То есть каждому массиву назначается число подряд идущих элементов.

> При `toLimitOn = true`, первая итерация проверяет количество элементов. Если элементов меньше, чем задано соотношением, вернется пустой массив.

Пример 1 - Чередовать элементы в соотношении 1:1:1. Сохранить все элементы.
```js
let x = [1, 2, 3, 4, 5];
let y = [10, 20, 30, 40];
let z = [100, 200, 300];
let result = Combiner.mixinMulti({
    source: [x, y, z],
    inRow: [1, 1, 1],
});
// 1, 10, 100, 2, 20, 200, 3, 30, 300, 4, 40, 5
```

Пример 2 - Чередовать элементы в соотношении 2:4:2 до тех пор, пока можно сохранить последовательность
```js
let x = [1, 2, 3, 4, 5];
let y = [10, 20, 30, 40];
let z = [100, 200, 300];
let result = Combiner.mixinMulti({
    toLimitOn: true,
    source: [x, y, z],
    inRow: [2, 4, 2],
});
// 1, 2, 10, 20, 30, 40, 100, 200
```

Пример 3 - Чередовать рекомендации, любимые треки и историю прослушиваний в соотношении 4:1:1 до тех пор, пока можно сохранить последовательность
```js
let recom = Source.getRecomTracks(...);
let saved = Source.getSavedTracks();
let recent = RecentTracks.get();
let tracks = Combiner.mixinMulti({
    toLimitOn: true,
    source: [recom, saved, recent],
    inRow: [4, 1, 1],
});
```

### push

Добавить в конец первого массива все элементы второго массива и так далее.

Аргументы
- (массив) `sourceArray` - первый массив, к которому добавляются элементы остальных.
- (перечень массивов) `...additionalArray` - перечень остальных массивов.

Пример 1 - Добавить элементы второго массива в конец первого массива.
```js
let firstArray = Source.getTracks(playlistArray); // допустим, 20 треков
let secondeArray = Source.getSavedTracks(); // допустим, 40 треков
Combiner.push(firstArray, secondeArray);
// теперь в firstArray 60 треков
```

Пример 2 - Добавить к первому массиву элементы двух других.
```js
let firstArray = Source.getTracks(playlistArray); // допустим, 25 треков
let secondeArray = Source.getSavedTracks(); // допустим, 100 треков
let thirdArray = Source.getPlaylistTracks(); // допустим, 20 треков
Combiner.push(firstArray, secondeArray, thirdArray);
// теперь в firstArray 145 треков
```

## Filter

Отсеивание треков по разным признакам

### dedupTracks

Удаляет дубликаты треков по `id` и `name`.

Аргументы
- (массив) `tracks` - массив треков, в котором требуется удалить дубликаты.

Пример 1 - Удалить дубликаты.
```js
let tracks = Source.getTracks(playlistArray);
Filter.dedupTracks(tracks);
```

### dedupArtists

Удаляет дубликаты основных исполнителей по `id`. Остается только один элемент от одного исполнителя.

Аргументы
- (массив) `items` - массив треков или исполнителей, в котором требуется удалить дубликаты основных исполнителей.

Пример 1 - Удалить дубликаты основных исполнителей в треках.
```js
let tracks = Source.getTracks(playlistArray);
Filter.dedupArtists(tracks);
```

Пример 2 - Удалить дубликаты исполнителей из массива.
```js
let relatedArtists = Source.getRelatedArtists(artists);
Filter.dedupArtists(relatedArtists);
```

### match

Оставляет треки, которые удовлетворяют условию `strRegex` только по названию трека и альбома. В случае массива исполнителей, по их имени.

Аргументы
- (массив) `items` - массив треков или исполнителей.
- (строка) `strRegex` - строка регулярного выражения.
- (булево) `invert` - если `true` инверсия результата. По умолчанию `false`. 

Пример 1 - Удалить треки, содержащие в своем названии слова `cover` или `live`.
```js
let tracks = Source.getTracks(playlistArray);
Filter.match(tracks, 'cover|live', true);
```

### matchExcept

Оставляет только треки, которые **не** удовлетворяют условию `strRegex` по названию трека и альбома.

Аргументы
- (массив) `items` - массив треков или исполнителей.
- (строка) `strRegex` - строка регулярного выражения.

Аналогично [match](/func?id=match) с аргументом `invert = true`

### matchExceptMix

Удаляет треки, содержащие `mix` и `club`.

Аргументы
- (массив) `tracks` - массив треков.

Аналогично [matchExcept](/func?id=matchexcept) с аргументом `strRegex = 'mix|club'`

### matchExceptRu

Удаляет треки, содержащие кириллицу.

Аргументы
- (массив) `tracks` - массив треков.

Аналогично [matchExcept](/func?id=matchexcept) с аргументом `strRegex = '[а-яА-ЯёЁ]+'`

### matchLatinOnly

Оставляет треки, которые содержат названия только на латинице. То есть удаляет иероглифы, кириллицу и прочее. 

Аргументы
- (массив) `tracks` - массив треков.

Аналогично [match](/func?id=match) с аргументом `strRegex = '^[a-zA-Z0-9 ]+$'`

### matchOriginalOnly

Удаляет неоригинальные версии треков.

Аргументы
- (массив) `tracks` - массив треков.

Аналогично [matchExcept](/func?id=matchexcept) с аргументом `strRegex = 'mix|club|radio|piano|acoustic|edit|live|version|cover|karaoke'`

### rangeTracks

Оставляет только треки, которые удовлетворяют условиям `args`. Треки непрошедшие проверку удаляются из оригинального массива `tracks`. 

Аргументы
- (массив) `tracks` - проверяемые треки. 
- (объект) `args` - условия проверки на принадлежность диапазону `min` - `max` (границы включительно), равенству или присутствию жанра.

Категории проверки параметров
- `meta` - трек
- `features` - особенности трека
- `artist` - основной исполнитель трека
- `album` - альбом трека

> ❗️ Функция запрашивает дополнительные данные для `features`, `artist`, `album`. Чтобы сократить число запросов, используйте ее после максимального сокращения массива треков другими способами (например, [rangeDateRel](/func?id=rangedaterel), [match](/func?id=match) и другие). Полученные данные кэшируются для **текущего** выполнения. Повторный вызов функции или сортировка [sort](/func?id=sort) с теми же категориями не отправляют новых запросов.

Ниже пример объекта `args` со всеми допустимыми условиями проверки. Описание параметров читать [здесь](/guide?id=Описание-параметров-объектов).
```js
let args = {
    meta: {
        popularity: { min: 0, max: 100 },
        duration_ms: { min: 0, max: 10000 },
        explicit: false,
    },
    artist: {
        popularity: { min: 0, max: 100 },
        followers: { min: 0, max: 100000 },
        genres: ['indie'],
        ban_genres: ['rap', 'pop'],
    },
    features: {
        acousticness: { min: 0.0, max: 1.0 },
        danceability: { min: 0.0, max: 1.0 },
        energy: { min: 0.0, max: 1.0 },
        instrumentalness: { min: 0.0, max: 1.0 },
        liveness: { min: 0.0, max: 1.0 },
        loudness: { min: -60, max: 0 },
        speechiness: { min: 0.0, max: 1.0 },
        valence: { min: 0.0, max: 1.0 },
        tempo: { min: 30, max: 210 },
        key: 0,
        mode: 0,
        time_signature: 1,

        // дублирует args.meta.duration_ms, достаточно одного (выбор зависит от категории)
        duration_ms: { min: 0, max: 10000 },
    },
    album: {
        popularity: { min: 30, max: 70 },
        genres: [], // Тесты показывают, что у альбомов список жанров всегда пуст
        release_date: { sinceDays: 6, beforeDays: 0 },
        // или release_date: { startDate: new Date('2020.11.30'), endDate: new Date('2020.12.30') },
    },
};
```

Пример 1 - Исключить треки жанра рэп.
```js
let tracks = Source.getTracks(playlistArray);
Filter.rangeTracks(tracks, {
    artist: {
      ban_genres: ['rap'],
    }
});
```

Пример 2 - Оставить только треки в жанре инди и альтернативы.
```js
let tracks = Source.getTracks(playlistArray);
Filter.rangeTracks(tracks, {
    artist: {
        genres: ['indie', 'alternative'],
    },
});
```

Пример 3 - Оставить только малопопулярные треки от малоизвестных исполнителей.
```js
let tracks = Source.getTracks(playlistArray);
Filter.rangeTracks(tracks, {
    meta: {
      popularity: { min: 0, max: 49 },
    },
    artist: {
      followers: { min: 0, max: 9999 },
    },
});
```

### rangeDateAbs

Оставить только треки, добавленные (`added_at`) или прослушанные (`played_at`) за указанный абсолютный период.

> Для фильтра по дате релиза используйте [rangeTracks](/func?id=rangetracks).

> ❗️ Предупреждение описано в [rangeDateRel](/func?id=rangedaterel).

Аргументы
- (массив) `tracks` - массив треков.
- (дата) `startDate` - стартовая граница.
- (дата) `endDate` - предельная граница.

Формат даты `YYYY-MM-DDTHH:mm:ss.sss` где
- `YYYY-MM-DD` - год, месяц, день
- `T` - разделитель для указания времени. Указать, если добавляется время.
- `HH:mm:ss.sss` - часы, минуты, секунды, миллисекунды

Пример 1 - Треки, добавленные между 1 и 3 сентября.
```js
let tracks = Source.getTracks(playlistArray);
let startDate = new Date('2020-09-01');
let endDate = new Date('2020-09-03');
Filter.rangeDateAbs(tracks, startDate, endDate);
```

Пример 2 - Треки, добавленные с 1 августа 15:00 по 20 августа 10:00.
```js
let tracks = Source.getTracks(playlistArray);
let startDate = new Date('2020-08-01T15:00');
let endDate = new Date('2020-08-20T10:00');
Filter.rangeDateAbs(tracks, startDate, endDate);
```

Пример 3 - Треки, добавленные с 1 сентября по текущую дату и время.
```js
let tracks = Source.getTracks(playlistArray);
let startDate = new Date('2020-09-01');
let endDate = new Date();
Filter.rangeDateAbs(tracks, startDate, endDate);
```

### rangeDateRel

Оставить только треки, добавленные (`added_at`) или прослушанные (`played_at`) за указанный период относительно сегодня. 

> Для фильтра по дате релиза используйте [rangeTracks](/func?id=rangetracks).

> ❗️ Если трек не содержит даты, устанавливается 01.01.2000. Такое возможно, например, если трек добавлен в Spotify очень давно, источником является [getTopTracks](/func?id=gettoptracks), это плейлисты "Мой микс дня #N" или ряд других источников.

Аргументы
- (массив) `tracks` - массив треков.
- (число) `sinceDays` - стартовая граница. По умолчанию сегодня 00:00.
- (число) `beforeDays` - предельная граница. По умолчанию сегодня 23:59.

Ниже пример для `sinceDays` = 7 и `beforeDays` = 2. То есть получить треки, добавленные в плейлист с 3 сентября 00:00 по 8 сентября 23:59 относительно сегодня, 10 сентября. 

![Пример использования sinceDays и beforeDays](/img/DaysRel.png)

Пример 1 - Треки, добавленные за последние 5 дней и сегодня.
```js
let tracks = Source.getTracks(playlistArray);
Filter.rangeDateRel(tracks, 5);
// аналогично Filter.rangeDateRel(tracks, 5, 0);
```

Пример 2 - Треки за последние 7 дней исключая сегодня.
```js
let tracks = Source.getTracks(playlistArray);
Filter.rangeDateRel(tracks, 7, 1);
```

Пример 3 - Треки за один день, который был 14 дней назад.
```js
let tracks = Source.getTracks(playlistArray);
Filter.rangeDateRel(tracks, 14, 14);
```

Пример 4 - Треки только за сегодня.
```js
let tracks = Source.getTracks(playlistArray);
Filter.rangeDateRel(tracks);
// аналогично Filter.rangeDateRel(tracks, 0, 0);
```

### replaceWithSimilar

Заменяет треки на похожие. На одну замену один случайный трек из результатов [getRecomTracks](/func?id=getrecomtracks).

Аргументы
- (массив) `originTracks` - где заменять
- (массив) `replacementTracks` - что заменять

Пример 1 - Заменить недавно игравшие треки плейлиста на близкие аналоги
```js
let tracks = Source.getPlaylistTracks('', 'id');
Filter.replaceWithSimilar(tracks, RecentTracks.get(2000));
```

Пример 2 - Заменить любимые треки из плейлиста на близкие аналоги
```js
let tracks = Source.getPlaylistTracks('', 'id');
Filter.replaceWithSimilar(tracks, Source.getSavedTracks());
```

### removeArtists

Удаляет из `sourceArray` исполнителей, которые есть в `removedArray`. Совпадение определяется по `id` основного исполнителя трека.

Аргументы
- (массив) `sourceArray` - массив треков или исполнителей, в котором нужно удалить.
- (массив) `removedArray` - массив треков или исполнителей, которые требуется удалить.
- (бул) `invert` - инверсия результата. Если `true`, удалять все, кроме того, что в `removedArray`. По умолчанию `false`.

Пример 1 - Получить треки плейлистов и исключить исполнителей любимых треков.
```js
let sourceArray = Source.getTracks(playlistArray);
let removedArray = Source.getSavedTracks();
Filter.removeArtists(sourceArray, removedArray);
```

### removeTracks

Удаляет из `sourceArray` треки, которые есть в `removedArray`. Совпадение определяется по `id` трека или по названию трека вместе с исполнителем.

Аргументы
- (массив) `sourceArray` - массив треков, в котором нужно удалить треки.
- (массив) `removedArray` - массив треков, которые требуется удалить.
- (бул) `invert` - инверсия результата. Если `true`, удалять все треки, кроме тех, что в `removedArray`. По умолчанию `false`.

Пример 1 - Получить треки плейлистов и исключить любимые треки.
```js
let sourceArray = Source.getTracks(playlistArray);
let removedArray = Source.getSavedTracks();
Filter.removeTracks(sourceArray, removedArray);
```

### removeUnavailable

Удаляет треки, которые нельзя послушать. Изменяет содержание оригинального массива. Не заменяет оригинал на аналог ([релинк](https://developer.spotify.com/documentation/general/guides/track-relinking-guide/), т.е. нет переадресации на другой похожий трек).

> Совершает дополнительные запросы (1 на 50 треков). В случае, если трек находится в неопределенном состоянии.
> Допустимо применять фильтр для треков из `Cache`, прошедших сжатие [compressTracks](/func?id=compresstracks). Если сжатия не было, состояние определяется по значению в кэшированном треке.

Аргументы
- (массив) `tracks` - треки, которые нужно фильтровать.
- (строка) `market` - страна, в которой проверяется доступность треков. По умолчанию `RU`.

Пример 1 - Удалить недоступные в России треки плейлиста
```js
let tracks = Source.getPlaylistTracks('', 'id');
Filter.removeUnavailable(tracks);
```

### getDateRel

Возвращает дату со смещением в днях относительно сегодня. 

Аргументы
- (число) `days` - количество дней для смещения.
- (строка) `bound` - обнуление часов. При `startDay` 00:00, при `endDay` 23:59. Если не указать, время согласно моменту обращения.

Пример в шаблоне [любимо и забыто](/template?id=Любимо-и-забыто).

### getLastOutRange

Получить новый массив с треками, которые не прошли последнюю проверку функции [rangeTracks](/func?id=rangetracks).

Нет аргументов.

Пример 1 - Получить треки непрошедшие проверку.
```js
let tracks = Source.getTracks(playlistArray);
Filter.rangeTracks(tracks, args);
let outRangeTracks = Filter.getLastOutRange();
```

## Selector

Отбор количества треков по позиции

### keepFirst / sliceFirst

Изменяет / возвращает массив, состоящий из первых `count` элементов массива `array`.

> Разница функций `keep*` и `slice*`:
> 
> - `keep*` изменяет содержимое оригинального массива, 
> - `slice*` возвращает новый массив, не изменяя оригинала.

Аргументы
- (массив) `array` - массив, из которого берутся элементы.
- (число) `count` - количество элементов.

Пример 1 - Получить первые 100 треков.
```js
let tracks = Source.getTracks(playlistArray);
tracks = Selector.sliceFirst(tracks, 100);
```

### keepLast / sliceLast

Изменяет / возвращает массив, состоящий из последних `count` элементов массива `array`.

Аргументы
- (массив) `array` - массив, из которого берутся элементы.
- (число) `count` - количество элементов.

Пример 1 - Получить последние 100 треков.
```js
let tracks = Source.getTracks(playlistArray);
tracks = Selector.sliceLast(tracks, 100);
```

### keepAllExceptFirst / sliceAllExceptFirst

Изменяет / возвращает массив, состоящий из всех элементов массива `array` кроме `skipCount` первых.

Аргументы
- (массив) `array` - массив, из которого берутся элементы.
- (число) `skipCount` - количество пропускаемых элементов.

Пример 1 - Получить все треки кроме первых 10.
```js
let tracks = Source.getTracks(playlistArray);
tracks = Selector.sliceAllExceptFirst(tracks, 10);
```

### keepAllExceptLast / sliceAllExceptLast

Изменяет / возвращает массив, состоящий из всех элементов массива `array` кроме `skipCount` последних.

Аргументы
- (массив) `array` - массив, из которого берутся элементы.
- (число) `skipCount` - количество пропускаемых элементов.

Пример 1 - Получить все треки кроме последних 10.
```js
let tracks = Source.getTracks(playlistArray);
tracks = Selector.sliceAllExceptLast(tracks, 10);
```

### keepRandom / sliceRandom

Изменяет / возвращает массив, состоящий из случайно отобранных элементов исходного массива.

Аргументы
- (массив) `array` - массив, из которого берутся элементы.
- (число) `count` - количество случайно выбираемых элементов.

Пример 1 - Получить 20 случайных треков.
```js
let tracks = Source.getTracks(playlistArray);
tracks = Selector.sliceRandom(tracks, 20);
```

### keepNoLongerThan / sliceNoLongerThan

Изменяет / возвращает массив треков с общей длительностью не более, чем `minutes` минут.

Аргументы
- (массив) `tracks` - исходный массив треков.
- (число) `minutes` - количество минут.

Пример 1 - Получить треки с общей продолжительностью не более, чем 60 минут.
```js
let tracks = Source.getTracks(playlistArray);
tracks = Selector.sliceNoLongerThan(tracks, 60);
```

### pickYear

Возвращает массив треков, релиз которых был в указанном году. Если таких треков нет, выбирается ближайший год.

Аргументы
- (массив) `tracks` - треки, среди которых выбирать.
- (строка) `year` - год релиза.
- (число) `offset` - допустимое смещение для ближайшего года. По умолчанию 5.

Пример 1 - Выбрать любимые треки, вышедшие в 2020 году
```js
let tracks = Selector.pickYear(savedTracks, '2020');
```

### sliceCopy

Возвращает новый массив, который является копией исходного массива.

> 💡 Используйте создание копии, если в одном скрипте нужно выполнить разные действия над источником. Позволит ускорить время выполнения и не отправлять тех же запросов дважды.

Аргументы
- (массив) `array` - исходный массив, копию которого нужно создать.

Пример 1 - Создать копию массива.
```js
let tracks = Source.getTracks(playlistArray);
let tracksCopy = Selector.sliceCopy(tracks);
```

### isWeekend

Возвращает булево значение: `true` если сегодня суббота или пятница и `false` если нет.

Аргументов нет.

Пример использования
```js
if (Selector.isWeekend()){
    // сегодня выходной
} else {
   // будни
}
```

### isDayOfWeekRu

Возвращает булево значение: `true` если сегодня день недели `strDay` и `false` если нет. Значение дня недели кириллицей.

Аргументы
- (строка) `strDay` - день недели. Допустимые значения: `понедельник`, `вторник`, `среда`, `четверг`, `пятница`, `суббота`, `воскресенье`.

Пример использования
```js
if (Selector.isDayOfWeekRu('понедельник')){
    // сегодня понедельник
} else if (Selector.isDayOfWeekRu('среда')) {
    // сегодня среда
} else {
    // другой день недели
}
```

### isDayOfWeek

Возвращает булево значение: `true` если сегодня день недели `strDay` и `false` если нет.

Аргументы
- (строка) `strDay` - день недели.
- (строка) `locale` - локаль дня недели. По умолчанию `en-US`, для которой допустимы значения: `sunday`, `monday`, `tuesday`, `wednesday`, `thursday`, `friday`, `saturday`.

Пример использования
```js
if (Selector.isDayOfWeek('friday')){
    // сегодня пятница
} else {
    // другой день недели
}
```

## Order

Сортировка треков

### reverse

Обратная сортировка. Первый элемент станет последним и наоборот.

Аргументы
- (массив) `array` - массив, чьи элементы необходимо отсортировать в обратном направлении.

Пример 1 - Обратная сортировка
```js
let array = [1, 2, 3, 4, 5, 6];

Order.reverse(array);
// результат 6, 5, 4, 3, 2, 1

Order.reverse(array);
// результат 1, 2, 3, 4, 5, 6
```

Пример 2 - Обратная сортировка треков плейлиста
```js
let tracks = Source.getTracks(playlistArray);
Order.reverse(tracks);
```

### separateArtists

Сортировка, при которой соблюдается минимальный отступ между одним и тем же исполнителем. Треки, которые не удалось разместить будут исключены.

Аргументы
- (массив) `tracks` - массив треков, который нужно отсортировать.
- (число) `space` - значение минимального отступа.
- (булево) `isRandom` - влияет на сортировку. Если `true` выполняется случайная сортировка оригинального массива, что повлияет на порядок при разделении исполнителей. Если `false` без случайной сортировки. Тогда результат при одинаковых входных треках будет тоже одинаковыми. По умолчанию `false`.

Пример 1 - Условный пример разделения
```js
let array = ['cat', 'cat', 'dog', 'lion']
Order.separateArtists(array, 1, false);
// результат cat, dog, cat, lion

array = ['cat', 'cat', 'dog', 'lion']
Order.separateArtists(array, 1, false);
// повторный вызов, результат тот же: cat, dog, cat, lion

array = ['cat', 'cat', 'dog', 'lion']
Order.separateArtists(array, 1, true);
// повторный вызов и случайная сортировка: cat, lion, dog, cat
```

Пример 2 - Разделить одного и того же исполнителя минимум двумя другими.
```js
let tracks = Source.getTracks(playlistArray);
Order.separateArtists(tracks, 2);
```

### separateYears

Возвращает объект, в котором по ключу с годом будет массив с треками, вышедших в этот год. Треки массива не сортируются.

Аргументы
- (массив) `tracks` - массив треков, которые нужно разделить по годам.

Пример 1 - Получить треки вышедшие только в 2020 году
```js
let tracks2020 = Order.separateYears(tracks)['2020'];
```

Пример 2 - Возможна ошибка, при которой среди треков нет указанного года. Выберите одно из:
- Используйте [pickYear](/func?id=pickyear)
- Подмените пустым массивом
- Проверьте условием
  
```js
// Подменить на пустой массив, если нет треков указанного года
let tracks2020 = Order.separateYears(tracks)['2020'] || [];

// Проверка через условие
let tracksByYear = Order.separateYears(tracks);
if (typeof tracksByYear['2020'] != 'undefined'){
    // треки есть
} else {
    // треков нет
}
```

### shuffle

Перемешивает элементы массива случайным образом.

Аргументы
- (массив) `array` - массив, чьи элементы необходимо перемешать.

Пример 1 - Случайное перемешивание
```js
let array = [1, 2, 3, 4, 5, 6];

Order.shuffle(array);
// результат 3, 5, 4, 6, 2, 1

Order.shuffle(array);
// результат 6, 1, 2, 3, 5, 4

Order.shuffle(array);
// результат 6, 5, 2, 3, 1, 4
```

Пример 2 - Перемешать треки
```js
let tracks = Source.getTracks(playlistArray);
Order.shuffle(tracks);
```

### sort

Сортирует оригинальный массив по заданному ключу.

> ❗️ Функция делает дополнительные запросы. Чтобы сократить число запросов, используйте ее после максимального сокращения массива треков другими способами. Подробнее в [rangeTracks](/func?id=rangetracks).

Аргументы
- (массив) `tracks` - массив треков, который нужно отсортировать.
- (строка) `pathKey` - ключ сортировки.
- (строка) `direction` - направление сортировки: `asc` по возрастанию, `desc` по убыванию. По умолчанию `asc`.

Допустимые ключи в формате `категория.ключ`. Описание ключей [здесь](/guide?id=Описание-параметров-объектов).

| Категория | Ключ |
|-|-|
| meta | name, popularity, duration_ms, explicit, added_at, played_at |
| features | acousticness, danceability, energy, instrumentalness, liveness, loudness, speechiness, valence, tempo, key, mode, time_signature, duration_ms |
| artist | popularity, followers, name |
| album | popularity, name, release_date |

> Если смешивается несколько источников треков, не у всех есть указанный ключ. Например, `played_at` есть только у истории прослушиваний.

Пример 1 - Сортировка по убывающей популярности исполнителей
```js
Order.sort(tracks, 'artist.popularity', 'desc');
```

Пример 2 - Сортировка по возрастающей энергичности
```js
Order.sort(tracks, 'features.energy', 'asc');
```

## Playlist

Создание или обновление плейлиста

### saveAsNew

Создает плейлист. Каждый раз новый.

Аргументы
- (объект) `data` - данные для создания плейлиста.

Формат данных для создания плейлиста
- (строка) `name` - название плейлиста, обязательно.
- (массив) `tracks` - массив треков, обязательно.
- (строка) `description` - описание плейлиста. До 300 символов.
- (булево) `public` - если `false` плейлист будет приватным. По умолчанию `true`.
- (строка) `sourceCover` - прямая ссылка на обложку (до 256 кб). Если указано, `randomCover` игнорируется. 
- (строка) `randomCover` - добавить случайную обложку при значении `once`. Без использования, стандартная мозайка от Spotify.

Пример 1 - Создать публичный плейлист с любимыми треками без описания со случайной обложкой
```js
let tracks = Source.getSavedTracks();
Playlist.saveAsNew({
  name: 'Копия любимых треков',
  tracks: tracks,
  randomCover: 'once',
  // sourceCover: tracks[0].album.images[0].url,
});
```

Пример 2 - Создать приватный плейлист с недавней историей прослушиваний и описанием без обложки.
```js
let tracks = RecentTracks.get(200);
Playlist.saveAsNew({
  name: 'История прослушиваний',
  description: '200 недавно прослушанных треков'
  public: false,
  tracks: tracks,
});
```

### saveWithAppend

Добавляет треки к уже имеющимся в плейлисте. Обновляет остальные данные (название, описание). Если плейлиста еще нет, создает новый.

Аргументы
- (объект) `data` - данные о плейлисте. Формат данных о плейлисте согласно описанию [saveWithReplace](/func?id=savewithreplace).
- (булево) `toEnd` - если `true`, добавляет треки в конец списка. Если `false`, в начало. По умолчанию `false`.

Пример 1 - Добавить треки в начало плейлиста.
```js
let tracks = Source.getTracks(playlistArray);
Playlist.saveWithAppend({
    id: 'fewf4t34tfwf4',
    name: 'Микс дня',
    tracks: tracks
});
```

Пример 2 - Добавить треки в конец плейлиста, обновить название и описание.
```js
let tracks = Source.getTracks(playlistArray);
Playlist.saveWithAppend({
    id: 'fewf4t34tfwf4',
    name: 'Новое название',
    description: 'Новое описание',
    tracks: tracks,
    toEnd: true,
});
```

> ❗️ Если обновить название плейлиста без указания `id` будет создан новый плейлист. Потому что поиск не найден плейлист с новым названием.

### saveWithReplace

Заменяет треки плейлиста. Обновляет остальные данные (название, описание). Если плейлиста еще нет, создает новый.

Аргументы
- (объект) `data` - данные о плейлисте.

Формат данных о плейлисте
- (строка) `id` - [идентификационный номер плейлиста](#идентификатор).
- (строка) `name` - название плейлиста, обязательно.
- (массив) `tracks` - массив треков, обязательно.
- (строка) `description` - описание плейлиста. До 300 символов.
- (булево) `public` - если `false` плейлист будет приватным. По умолчанию `true`.
- (строка) `sourceCover` - прямая ссылка на обложку (до 256 кб). Если указано, `randomCover` игнорируется. 
- (строка) `randomCover` - если `once` добавит случайную обложку. При `update` каждый раз обновляет обложку. Без использования, стандартная мозайка от Spotify.
> 💡 Рекомендуется всегда указывать `id`. Если `id` не указано, поиск по названию. Если такого плейлиста нет, создается новый.

Пример 1 - Обновить содержимое плейлиста и обложку
```js
let tracks = Source.getTracks(playlistArray);
Playlist.saveWithReplace({
    id: 'fewf4t34tfwf4',
    name: 'Микс дня',
    description: 'Описание плейлиста',
    tracks: tracks,
    randomCover: 'update',
    // sourceCover: tracks[0].album.images[0].url,
});
```

Пример 2 - Обновить содержимое плейлиста из примера 1. Поиск по названию.
```js
let tracks = RecentTracks.get();
Playlist.saveWithReplace({
    name: 'История',
    description: 'Новое описание плейлиста',
    tracks: tracks,
    randomCover: 'update',
});
```

### saveWithUpdate

Обновляет треки плейлиста: добавляет новые; удаляет те, которых нет в массиве; сохраняет оригинальную дату добавления треков. Теряется сортировка заданная в массиве. Игнорируются дубликаты по `id`.

Аргументы
- (объект) `data` - данные о плейлисте, соответствует [saveWithReplace](/func?id=savewithreplace).

Дополнительный режим для `data`
- (булево) `toEnd` - если `true`, добавляет треки в конец списка. Если `false`, в начало. По умолчанию `false`.

### getDescription

Возвращает строку вида: `Исполнитель 1, Исполнитель 2... и не только`.

Аргументы
- (массив) `tracks` - треки, из которых случайно выбираются исполнители.
- (число) `limit` - количество случайно выбираемых исполнителей. По умолчанию 5.

Пример 1 - Создать плейлист с описанием
```js
let tracks = Source.getTracks(playlistArray);
Playlist.saveWithReplace({
    id: 'abcd',
    name: 'Большой микс дня',
    tracks: tracks,
    description: Playlist.getDescription(tracks),
});
```

## Library

Действия над любимыми треками и подписками на исполнителей

### followArtists

Подписаться на исполнителей

Аргументы
- (массив) `artists` - перечень исполнителей. Значимо только `id`.

Пример в [Yandex.getArtists](/func?id=getartists)

### unfollowArtists

Отписаться от исполнителей

Аргументы
- (массив) `artists` - перечень исполнителей. Значимо только `id`.

Пример аналогичен [Yandex.getArtists](/func?id=getartists). Только использовать `unfollowArtists`.

### saveFavoriteTracks

Добавить треки в любимые (поставить лайк)

Аргументы
- (массив) `tracks` - перечень треков. Значимо только `id`.

Пример 1 - Добавить последние 50 лайков из Яндекс в Spotify
```js
let yandexTracks = Yandex.getTracks('owner', '3', 50);
let savedTracks = Source.getSavedTracks();
Filter.removeTracks(yandexTracks, savedTracks);
Library.saveFavoriteTracks(yandexTracks);
```

### deleteFavoriteTracks

Удалить треки из любимых (снять лайки)

Аргументы
- (массив) `tracks` - перечень треков. Значимо только `id`.

Пример 1 - Очистить все лайки Spotify
```js
let savedTracks = Source.getSavedTracks();
Library.deleteFavoriteTracks(savedTracks);
```

### saveAlbums

Добавить альбомы в библиотеку.

Аргументы
- (массив) `albums` - перечень альбомов для добавления. Значимо только `id`.

### deleteAlbums

Удалить альбомы из библиотеки.

Аргументы
- (массив) `albums` - перечень альбомов для удаления. Значимо только `id`.

## Lastfm

Модуль по работе с сервисом Last fm

### getLovedTracks

Возвращает массив любимых треков пользователя `user`, ограниченного количеством `limit`. Внимание на предупреждение из [getRecentTracks](/func?id=getrecenttracks-1). Включает дату добавления, можно использовать фильтр по дате.

Аргументы
- (строка) `user` - логин пользователя Last.fm, чьи любимые треки нужно искать.
- (число) `limit` - предельное количество треков.

Пример 1 - Получить 200 любимых треков
```js
let tracks = Lastfm.getLovedTracks('login', 200);
```

### getSimilarArtists

Возвращает массив исполнителей, которые похожи на входные элементы согласно данным Lastfm.

Аргументы
- (массив) `items` - массив треков или исполнителей. Выбирается только `name` исполнителя.
- (число) `match` - минимальное значение похожести на оригинального исполнителя в границе от `0.0` до `1.0`. 
- (число) `limit` - количество запрашиваемых похожих исполнителей на одного оригинального.
- (бул) `isFlat` - если `false` результат содержит исполнителей в отдельном массиве. Если `true` все исполнители в одном массиве. По умолчанию `true`.

Пример 1 - Получить исполнителей похожих на отслеживаемых
```js
let artists = Source.getArtists({ followed_include: true, });
let similarArtists = Lastfm.getSimilarArtists(artists, 0.65, 20);
```

### getSimilarTracks

Возвращает массив треков, которые похожи на входные треки согласно данным Lastfm.

Аргументы
- (массив) `tracks` - треки, для которых нужно найти похожие.
- (число) `match` - минимальное значение похожести на оригинальный трек в границе от `0.0` до `1.0`. 
- (число) `limit` - количество запрашиваемых похожих треков на один оригинальный трек.
- (бул) `isFlat` - если `false` результат содержит треки в отдельном массиве. Если `true` все треки в одном массиве. По умолчанию `true`.

Пример 1 - Получить треки, похожие на плейлист
```js
let playlistTracks = Source.getPlaylistTracks('name', 'id');
let similarTracks = Lastfm.getSimilarTracks(playlistTracks, 0.65, 30);
```

### getCustomTop

Возвращает массив элементов по `type`, отсортированных по количеству прослушиваний за указанный период.

Аргументы
- (строка) `user` - логин пользователя Lastfm, чей топ собирать
- (дата/строка/число) `from` - дата старта.
- (дата/строка/число) `to` - дата окончания.
- (строка) `type` - вариация результата: `track`, `artist` или `album`. По умолчанию `track`.
- (число) `count` - количество элементов. По умолчанию 40.
- (число) `offset` - пропуск первых N элементов. По умолчанию 0.

> Функция отправляет много запросов. Один запрос к Lastfm для 200 треков. Один запрос на поиск одного трека в Spotify. Поиск только `count` треков.

Пример 1 - Получить топ 40 треков за 2015 год
```js
let topTracks = Lastfm.getCustomTop({
    user: 'login',
    from: '2015-01-01', // или new Date('2015-01-01'),
    to: '2015-12-31', // или new Date('2015-12-31').getTime(),
});
```

Пример 2 - Получить топ 10 исполнителей за первое полугодие 2014 года
```js
let topArtists = Lastfm.getCustomTop({
    user: 'login',
    type: 'artist',
    from: '2014-01-01',
    to: '2014-06-30',
    count: 10,
});
```

### getTopAlbums

Возвращает массив с топом альбомов по заданному периоду.

Аргументы
- (объект) `params` - параметры для выбора топа альбома. Аналогично параметрам [getTopTracks](/func?id=gettoptracks-1).

Пример 1 - Получить топ-10 альбомов за полгода
```js
let artists = Lastfm.getTopAlbums({
  user: 'ваш логин',
  period: '6month',
  limit: 10
});
```

### getTopArtists

Возвращает массив с топом исполнителей по заданному периоду.

Аргументы
- (объект) `params` - параметры для выбора топа исполнителей. Аналогично параметрам [getTopTracks](/func?id=gettoptracks-1).

Пример 1 - Получить топ-10 исполнителей за полгода
```js
let artists = Lastfm.getTopArtists({
  user: 'ваш логин',
  period: '6month',
  limit: 10
});
```

### getTopTracks

Возвращает массив с топом треков по заданному периоду. Внимание на предупреждение из [getRecentTracks](/func?id=getrecenttracks-1).

Аргументы
- (объект) `params` - параметры для выбора топа треков.

Допустимые значения `params`
```js
{
  user: 'login', // логин пользователя last.fm
  period: 'overall', // период, допустимо: overall | 7day | 1month | 3month | 6month | 12month
  limit: 50 // предельное количество треков
}
```

Пример 1 - Получить топ-40 треков за полгода
```js
let tracks = Lastfm.getTopTracks({
  user: 'ваш логин',
  period: '6month',
  limit: 40
});
```

### getLibraryStation

Возвращает массив треков из радио last fm `Библиотека`. Содержит только заскроббленные ранее треки. Внимание на предупреждение из [getRecentTracks](/func?id=getrecenttracks-1).

Аргументы
- (строка) `user` - логин пользователя, чье радио является источником.
- (число) `countRequest` - количество запросов к last fm. Один запрос дает примерно от 20 до 30 треков.

Пример использования
```js
let tracks = Lastfm.getLibraryStation('login', 2);
```

### getMixStation

Возвращает массив треков из радио last fm `Микс`. Содержит ранее заскроббленные треки и рекомендации last fm. Внимание на предупреждение из [getRecentTracks](/func?id=getrecenttracks-1).

Аргументы
- (строка) `user` - логин пользователя, чье радио является источником.
- (число) `countRequest` - количество запросов к last fm. Один запрос дает примерно от 20 до 30 треков.

Пример использования
```js
let tracks = Lastfm.getMixStation('login', 2);
```

### getNeighboursStation

Возвращает массив треков из радио last fm `Соседи`. Содержит треки, которые слушают пользователи last fm со схожими вам музыкальными вкусами. Внимание на предупреждение из [getRecentTracks](/func?id=getrecenttracks-1).

Аргументы
- (строка) `user` - логин пользователя, чье радио является источником.
- (число) `countRequest` - количество запросов к last fm. Один запрос дает примерно от 20 до 30 треков.

Пример использования
```js
let tracks = Lastfm.getNeighboursStation('login', 2);
```

### getRecomStation

Возвращает массив треков из радио last fm `Рекомендации`. Содержит только рекомендации last fm. Внимание на предупреждение из [getRecentTracks](/func?id=getrecenttracks-1).

Аргументы
- (строка) `user` - логин пользователя, чье радио является источником.
- (число) `countRequest` - количество запросов к last fm. Один запрос дает примерно от 20 до 30 треков.

Пример использования
```js
let tracks = Lastfm.getRecomStation('login', 2);
```

### getRecentTracks

Возвращает массив недавно прослушанных треков пользователя `user`, ограниченного количеством `limit`. 

> ❗️ Источником треков является lastfm. Эквивалент трека находится поиском Spotify по наилучшему совпадению. Если совпадения нет, трек игнорируется. 
> 
> Один трек lastfm равен одному запросу поиска. Будьте внимательны с [ограничениями](/desc?id=Ограничения) по количеству запросов в день и времени выполнения.

Аргументы
- (строка) `user` - логин пользователя Last.fm, чью историю прослушиваний нужно искать.
- (число) `count` - предельное количество треков.

Пример 1 - Получить 200 недавно прослушанных треков
```js
let tracks = Lastfm.getRecentTracks('login', 200);
```

### removeRecentArtists
Удаляет из массива треков `sourceArray` историю недавно прослушанных `limit` треков пользователя `lastfmUser`. Совпадение определяется только по имени исполнителя. Требуется [дополнительная настройка](/install?id=Настройка-lastfm).

Аргументы
- (массив) `sourceArray` - массив треков, в котором нужно удалить треки.
- (строка) `user` - логин пользователя Last.fm, чью историю прослушиваний нужно исключить.
- (число) `count` - предельное количество треков истории прослушиваний. По умолчанию 600.

Пример как у [removeRecentTracks](/func?id=removerecenttracks)

### removeRecentTracks

Удаляет из массива треков `sourceArray` историю недавно прослушанных `limit` треков пользователя `lastfmUser`. Совпадение определяется по названию трека и исполнителя. Требуется [дополнительная настройка](/install?id=Настройка-lastfm).

Аргументы
- (массив) `sourceArray` - массив треков, в котором нужно удалить треки.
- (строка) `user` - логин пользователя Last.fm, чью историю прослушиваний нужно исключить.
- (число) `count` - предельное количество треков истории прослушиваний. По умолчанию 600.

Пример 1 - Создать плейлист с любимыми треками, которые не были прослушаны за последние 5 тысяч скробблов Last.fm пользователя `login`
```js
let savedTracks = Source.getSavedTracks();
Lastfm.removeRecentTracks(savedTracks, 'login', 5000)
Playlist.saveAsNew({
  name: 'Давно не слушал',
  tracks: savedTracks,
});
```

## Yandex

Модуль по работе с Яндекс.Музыкой

### getAlbums

Возвращает массив альбомов из подписок Яндекс.Музыки указанного пользователя. Примечание смотреть в [getTracks](/func?id=gettracks-1).

Аргументы
- (строка) `owner` - логин пользователя Яндекс.Музыки
- (число) `limit` - количество выбираемых альбомов. Если не указано, все.
- (число) `offset` - смещение от первого альбома. Например, `limit` = 50 и `offset` = 50 вернут альбомы от 50-го до 100-го.

Пример 1 - Получить все альбомы из подписок пользователя
```js
let albums = Yandex.getAlbums('owner');
```

### getArtists

Возвращает массив исполнителей из подписок Яндекс.Музыки указанного пользователя. Поиск аналога в базе Spotify по имени исполнителя. Внимание на [ограничения](/desc?id=Ограничения). Один исполнитель = один запрос поиска. Указанный пользователь должен иметь публично доступную библиотеку. Настройка находится [здесь](https://music.yandex.ru/settings/other).

> ❗️ Поиск осуществляется по наилучшему первому совпадению. Поэтому могут появляться "артефакты". Например, вместо исполнителя [Shura](https://open.spotify.com/artist/1qpR5mURxk3d8f6mww6uKT) найдется [Шура](https://open.spotify.com/artist/03JHGoUoM1LQmuXqknBi5P).

Аргументы
- (строка) `owner` - логин пользователя Яндекс.Музыки
- (число) `limit` - количество выбираемых исполнителей. Если не указано, все.
- (число) `offset` - смещение от первого исполнителя. Например, `limit` = 50 и `offset` = 50 вернут исполнителей от 50-го до 100-го.

Пример 1 - Подписаться на 50 последних исполнителей с Яндекса в Spotify. Можно запускать через триггер. Таким образом получить одностороннюю синхронизацию.
```js
let artists = Yandex.getArtists('owner', 50);
Library.followArtists(artists);
```

### getTracks

Возвращает массив треков плейлиста Яндекс.Музыки. Поиск аналога в базе Spotify по имени исполнителя и названию трека. Внимание на [ограничения](/desc?id=Ограничения). Один трек = один запрос поиска. Указанный пользователь должен иметь публично доступную библиотеку. Настройка находится [здесь](https://music.yandex.ru/settings/other). Кроме того, сам плейлист должен быть публичным (у них есть локальная приватность).

> ❗️ Поиск осуществляется по наилучшему первому совпадению. Поэтому могут появляться "артефакты". Например, треки, которые являются полными синонимами или попытка найти трек, которого нет в базе.

Обязательные аргументы
- (строка) `owner` - логин пользователя Яндекс.Музыки
- (строка) `kinds` - номер плейлиста
- (число) `limit` - количество выбираемых треков. Если не указано, все.
- (число) `offset` - смещение от первого трека. Например, `limit` = 50 и `offset` = 50 вернут треки от 50-го до 100-го.

Аргументы берутся из ссылки на плейлист. Например, для ссылки `https://music.yandex.ru/users/yamusic-daily/playlists/46484894`: логин это `yamusic-daily`, номер это `46484894`.

Пример 1 - Создать Плейлист дня из треков Яндекс.Музыки
```js
 Playlist.saveWithReplace({
     // id: 'ваше id', // после первого создания
     name: 'Плейлист дня',
     tracks: Yandex.getTracks('yamusic-daily', 'ваше id плейлиста дня'),
     randomCover: 'update',
 });
```

## Cache

Модуль для сохранения массивов на Google Диск. По умолчанию, без указания расширения файла, подразумевается `json`. При явном указании поддерживается текстовый формат - `file.txt`

> В случае отсутствия требуемой функциональности, можете реализовать свои функции через [DriveApp](https://developers.google.com/apps-script/reference/drive).

### append

Записывает данные в файл, добавляя новые данные. Если файла не существует, создает его. 

Аргументы
- (строка) `filename` - имя файла
- (массив) `content` - массив данных для добавления
- (строка) `place` - место присоединения. При `begin` в начало файла. При `end` в конец файла. По умолчанию `end`.
- (число) `limit` - ограничить число элементов массива **после** присоединения новых данных. По умолчанию, выбор **первых** 100 тысяч (sliceFirst). Для постоянного обновления потребуется `place` равный 'begin'.

Пример 1 - Добавить новые треки в начало файла. Ограничить массив 5 тысячами треков.
```js
let tracks = Source.getPlaylistTracks('playlist name', 'id');
Cache.append('myfile.json', tracks, 'begin', 5000);
```

Пример 2 - Добавить треки в конец файла. Лимит 100 тысяч. Значения по умолчанию.
```js
let tracks = Source.getPlaylistTracks('playlist name', 'id');
Cache.append('myfile.json', tracks);
```

### clear

Перезаписывает содержимое файла пустым массивом.

Аргументы
- (строка) `filename` - имя файла

Пример 1 - Очистить файл
```js
Cache.clear('filename.json');
```

### copy

Создает копию файла. Возвращает имя созданной копии.

Аргументы
- (строка) `filename` - имя файла

Пример 1 - Создать копию файла и получить его данные
```js
let filename = 'myfile.json';
filename = Cache.copy(filename);
let tracks = Cache.read(filename);
```

### read

Возвращает данные из файла. Если файла не существует для `json` вернется пустой массив, для остальных пустая строка.

> При чтении пустого файла выбрасывается исключение, чтобы предотвратить перезапись файла при баге со стороны Google ([подробнее](https://github.com/Chimildic/goofy/discussions/26)).

Аргументы
- (строка) `filename` - имя файла

Пример 1 - Добавить треки из файла в плейлист
```js
let tracks = Cache.read('file.json');
Playlist.saveAsNew({
    name: 'Треки из файла',
    tracks: tracks,
});
```

### remove

Переносит файл в корзину. По правилам Google Диска, объекты в корзине удаляются через 30 дней.

Аргументы
- (строка) `filename` - имя файла

Пример 1 - Поместить файл в корзину
```js
Cache.remove('filename.json');
```

### rename

Переименовывает файл.

Аргументы
- (строка) `oldFilename` - текущее имя файла
- (строка) `newFilename` - новое имя файла

> ❗️ Не используйте имена `SpotifyRecentTracks`, 'LastfmRecentTracks', 'BothRecentTracks'. Они используются в механизме накопления [истории прослушиваний](/desc?id=История-прослушиваний).

Пример 1 - Переименовать файл
```js
Cache.rename('filename.json', 'newname.json');
```

### write

Записывает данные в файл. Если файла не существует, создает его. Если файл есть, перезаписывает содержимое.

Аргументы
- (строка) `filename` - имя файла
- (массив) `content` - массив данных для записи

Пример 1 - Записать любимые треки в файл
```js
let tracks = Sourct.getSavedTracks();
Cache.write('liked.json', tracks);
```

### compressArtists

Удаляет излишние данные о исполнителе.

Аргументы
- (массив) `artists` - массив исполнителей.

Пример 1 - Сжать данные о исполнителях и сохранить в файл
```js
let artists = Yandex.getArtists('login');
Cache.compressArtists(artists);
Cache.write('yandex-artists.json', artists);
```

### compressTracks

Удаляет излишние данные о треках. Позволяет существенно сократить объем файла.

Аргументы
- (массив) `tracks` - массив треков.

Пример 1 - Сжать треки и сохранить в файл
```js
let tracks = Source.getPlaylistTracks('playlist name', 'id');
Cache.compressTracks(tracks);
Cache.write('myfile.json', tracks);
```
