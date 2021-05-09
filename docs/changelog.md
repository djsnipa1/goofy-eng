# List of changes

The current version of the library is reflected in the constant `VERSION` in the file` Library`

For details on how the functions work, see the [reference](/func)

To add your own functions or override existing ones, use the [instructions](https://github.com/Chimildic/goofy/discussions/18).

[Go to updated code](https://script.google.com/d/1DnC4H7yjqPV2unMZ_nmB-1bDSJT9wQUJ7Wq-ijF4Nc7Fl3qnbT0FkPSr/edit?usp=sharing).

## Version 1.4.7
- Experiment. In case of an unknown error on the part of Google while writing via `Cache.write`, the write is retry after a pause.

## Version 1.4.6
- New function [getPlayingTrack](/func?id=getplayingtrack). Requires [update permissions](/install?id=Обновить-права-доступа).
- When creating a playlist, you can specify a static cover through a direct link to it.

## Version 1.4.5
- Now [mineTracks](/func?id=minetracks) can search for keywords in album titles and in the tracks themselves.
- In `mineTracks`, the` playlistCount` argument is ** renamed ** to `itemCount`.
- New function for Filter: [replaceWithSimilar](/func?id=replacewithsimilar).
- New function for Lastfm: [getSimilarArtists](/func?id=getsimilarartists).

## Version 1.4.4
- New filter [removeUnavailable](/func?id=removeunavailable).
- `Cache` can read / write files with the extension` .txt` when explicitly specified in the file name.
- `getCustomTop` supports the` Date` type, [more] (https://github.com/Chimildic/goofy/discussions/46#discussioncomment-351974).
- Correction of a logical error in `match` when selecting.

## Version 1.4.3
- Now [getCustomTop](/func?id=getcustomtop) can compose a top by albums.
- When sorted by release date, tracks retain their original order within their album, if they were originally in that order
- Bug fixes

## Version 1.4.2
- Now [craftTracks](/func?id=crafttracks) can accept static `seed_ *` other than `key`.
- New function for Lastfm: [getCustomTop](/func?id=getcustomtop).
- New function for Selector: [pickYear](/func?id=pickyear).
- New function for Order: [separateYears](/func?id=separateyears).
- Improvement for search. If the same element appears multiple times in the array (that is, it has the same search keyword), only one search query will be consumed.
- The `Source` playlist-related functions add an` origin` object to each track containing the `name` and` id` of the source playlist.
- An attempt was made to continue executing the code after receiving the exception `Exception: Address not available`, [more] (https://github.com/Chimildic/goofy/discussions/27).

## Version 1.4.1
- Speed ​​up the execution time of the `craftTracks` function.
- Found an undocumented Spotify API feature. The [getRecomTracks](/func?id=getrecomtracks) function supports the popularity key. Therefore, it is ** removed ** from [craftTracks](/func?id=crafttracks). Move it to the `query` parameter if used.
- Added the ability to sort by the release date of the album to which the track belongs to `Order.sort`.
- `displayAuthResult`,` updateRecentTracks`, `logProperties` are hidden from the list of functions that can be set to trigger.

## Version 1.4.0
- ** Removed ** function `Source.getRecentTracks`. Use `RecentTracks.get` or` Cache.read` for the desired history file.
- New functions for Source: [mineTracks](/func?id=minetracks), [craftTracks](/func?id=crafttracks).
- New function for RecentTracks: [appendTracks](/func?id=appendtracks).
- The structure of the `SpotifyRecentTracks` file has been updated to a regular array of tracks (like the rest of the history files). The update will happen automatically the first time the trigger is run. Until then, `Cache.read` will return the old structure.
- Added functions to save and delete library albums to Library.

## Version 1.3.4
- New functions for Source: [getCategoryTracks](/func?id=getcategorytracks), [getListCategory](/func?id=getlistcategory).
- The parameter [REQUESTS_IN_ROW](/guide?id=Параметры) has appeared.
- When reading an empty file via Cache.read, an exception is thrown to prevent the file from being overwritten in case of a bug on the part of Google ([more] (https://github.com/Chimildic/goofy/discussions/26)).
- New function [Playlist.saveWithUpdate](/func?id=savewithupdate).
- The match * functions can take an array of artists. In the case of an array of tracks, comparison by track name and album name (without artist). In the case of an array of artists, only its name.
- Added templates from the forum to the documentation (Back to this day, performer of the day)

## Version 1.3.3
- Optimization of queries to Last.fm in the accumulation mechanism. Search only for tracks that are new to your listening history.
- New functions for Lastfm: [getSimilarTracks](/func?id=getsimilartracks), [getTopArtists](/func?id=gettopartists-1), [getTopAlbums](/func?id=gettopalbums).
- New functions for Source: [getRelatedArtists](/func?id=getrelatedartists), [getAlbumsTracks](/func?id=getalbumstracks).
- New function for Yandex: [getAlbums](/func?id=getalbums).
- Now [dedupArtists](/func?id=dedupartists) can remove duplicates from the artist array.
- Now [removeArtists](/func?id=removeartists) can remove by array of artists.
- Correction of the group of methods match *
- When searching and comparing, special characters (,! @ #, Etc.) are removed from the string.
- More informative messages in the logs for the history of listening and when searching.

## Version 1.3.2
- Updated the mechanism for sending requests. Many source functions began to run faster due to the asynchronous sending of N-number of requests at once.
- Addition of the mixin function. Now you can assign a ratio to more than two arrays. More details in [mixinMulti](/func?id=mixinmulti).
- New features: [getTopArtits](/func?id=gettopartists), [getArtistsTopTracks](/func?id=getartiststoptracks).

## Version 1.3.1
- New functions for the Cache module: [rename](/func?id=rename), [remove](/func?id=remove), [clear](/func?id=clear), [compressArtists](/func?id=compressArtists).
- Functions became public: [getArtists](/func?id=getartists), [getArtistsAlbums](/func?id=getartistsalbums), [getAlbumTracks](/func?id=getalbumtracks).
- The getTracksArtists ** function has been renamed ** to getArtistsTracks.
- Calling getSavedTracks again in the same script sends new requests to Spotify, instead of returning the previously received one. Use [sliceCopy](/func?id=slicecopy) to create a copy.
- The number of sent requests is now obtained via `CustomUrlFetchApp.getCountRequest`.
- Bugfix: spotify get with 404 interrupted the script; lastfm with 500+ errors aborted the script.
- Bugfix: separateArtists did not separate artists.
- Many small fixes.

## Version 1.3.0
- Updated: instructions and video for installation.
- Added `invert` (inverse) argument to` removeTracks` and `removeArtists` functions.
- Suppression of errors from lastfm, so as not to interrupt the execution of the script.
- Added anonymous tracking of the distribution of library versions via Google Forms. The version values ​​and script ID are sent. To have an idea of ​​how many unique users there are.

## Version 1.2.0
- Added `parameters` for tracking history. You need to do [migration] (https://w3bsit3-dns.com/forum/index.php?act=findpost&pid=102495416&anchor=migrate_params).
- The listening history limit has been increased from 10 to 20 thousand.
- Listening date is added to Lastfm history tracks. You can use `rangeDateRel`.
- The mechanism of accumulation of Lastfm listens, if you set `parameters`. So that instead of `Lastfm.getRecentTracks` with a small number of tracks due to limits, you can get a lot and quickly.
- Get history with one function `RecentTracks.get`, regardless of` parameters`, including summary from two sources. In the summary, duplicates are removed, there is a sorting from fresh to old auditions.