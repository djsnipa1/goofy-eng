# Additional description

# Parameters

| Parameter | Type | Description |
|-|-|-|
| `CLIENT_ID` and `CLIENT_SECRET` | string | Keys for accessing Spotify Web API. Obtained during [first install](/install). |
| `LASTFM_API_KEY` | string | Key for working with Lastfm API. It turns out [optional](/install?id=Настройка-lastfm). |
| `ON_SPOTIFY_RECENT_TRACKS` | boolean | If `true` tracks the Spotify listening history. If false, it is disabled. |
| `ON_LASTFM_RECENT_TRACKS` | boolean | If `true` keeps track of the Lastfm listening history. If false, it is disabled. |
| `LASTFM_RANGE_RECENT_TRACKS` | number | The number of recent tracks viewed in Lastfm history for the past 15 minutes. |
| `LASTFM_LOGIN` | string | The login of the Lastfm user whose history is being collected. |
| `REQUESTS_IN_ROW` | number | The number of requests sent at the same time. By default 40. Affects the speed of data retrieval. For example, a request for playlist tracks. If you receive more errors number `503` or if there are algorithms with a very large number of requests, it is recommended to lower the value of this parameter. Promotion is not recommended. |

# ID

The tables below show how to get an identifier from a link or URI.

## Playlist {docsify-ignore}

| id or playlistId | URI | Link |
|-|-|-|
| 5ErHcGR1VdYQmsrd6vVeSV | spotify : playlist : **5ErHcGR1VdYQmsrd6vVeSV** | [open.spotify.com/playlist/**5ErHcGR1VdYQmsrd6vVeSV**](open.spotify.com/playlist/5ErHcGR1VdYQmsrd6vVeSV) |
| 4vTwFTW4DytSY1N62itnwz | spotify : playlist : **4vTwFTW4DytSY1N62itnwz** | [open.spotify.com/playlist/**4vTwFTW4DytSY1N62itnwz**](open.spotify.com/playlist/4vTwFTW4DytSY1N62itnwz) |

## User {docsify-ignore}

For old accounts, it is equal to the login. For new accounts, a sequence of letters and numbers.

| userId | URI | Link |
|-|-|-|
| glennpmcdonald | spotify : user : **glennpmcdonald** | [open.spotify.com/user/**glennpmcdonald**](open.spotify.com/user/glennpmcdonald) |
| ldxdnznzgvvftcpw09kwqm151 | spotify : user : **ldxdnznzgvvftcpw09kwqm151** | [open.spotify.com/user/**ldxdnznzgvvftcpw09kwqm151**](open.spotify.com/user/ldxdnznzgvvftcpw09kwqm151) |

# Description of object parameters

The table describes the main keys of Spotify objects loosely translated. The original can be read [here] (https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-features/).

| Key | Range | Description |
|-|-|-|
| `popularity` | 0 - 100 |The popularity of the track, artist or album. More popular are those closer to 100.</br> <ul><li>Track. Calculated based on the total number of plays and how recent they are. A track with a lot of recent plays will be more popular than a track with a lot of old plays. The value may have a lag of several days, that is, it is not updated in real time. </li> <li>Artist and album. Calculated based on the popularity of the tracks.</li></ul> 
| `duration_ms` | 0 - 0+ | Track duration in milliseconds ([Calculator](https://www.google.ru/search?ie=UTF-8&q=%D0%BC%D0%B8%D0%BD%D1%83%D1%82%D1%8B%20%D0%B2%20%D0%BC%D0%B8%D0%BB%D0%BB%D0%B8%D1%81%D0%B5%D0%BA%D1%83%D0%BD%D0%B4%D1%8B%20%D0%BA%D0%B0%D0%BB%D1%8C%D0%BA%D1%83%D0%BB%D1%8F%D1%82%D0%BE%D1%80)). Useful for deleting tracks of short duration by setting the minimum value. Or vice versa, long duration.|
| `explicit` | boolean | The presence or absence of profanity. In the case of the [rangeTracks](/func?id=rangetracks) function, setting `false` will remove profanity tracks. A value of `true` or absence of this switch will leave all tracks.
| `added_at` | string | Date the track was added to the playlist in string format. An example of use in a template [loved and forgotten] (/template?id=Любимо-и-забыто).
| `genres` and `ban_genres` | array | Artist or album genres. Tests show that albums always have an empty list. In the case of the [rangeTracks](/func?id=rangetracks) function, only those tracks will be selected that have at least one genre from the given `genres` array and none from the` ban_genres` array.
| `release_date` | dates | The period in which the album of the track in question was released in date format ([format described here](/func?id=rangedateabs)). For example, between 2018 and 2020: `{ min: new Date('2018'), max: new Date('2020') }`

## Track features (features) {docsify-ignore}
| Key | Range | Description |
|-|-|-|
| `acousticness` | 0.0 - 1.0 | Confidence interval that estimates whether the track is acoustic. A value of 1.0 shows high confidence in this. ! [Distribution of acousticness values](/img/acousticness.png)
| `danceability` | 0.0 - 1.0 | Evaluates how well a track is suitable for a dance based on its tempo, rhythm stability, beats, and general performance patterns. Less danceable tracks close to 0.0 and more to 1.0! [Distribution of danceability values](/img/danceability.png)
| `energy` | 0.0 - 1.0 | Assessment of the intensity and activity of the track. Generally, energetic tracks sound fast, loud and noisy. For example, tracks from the death metal genre. The calculation is based on dynamic range, loudness, timbre, slew rate, and total entropy. Tracks close to 0.0 and more to 1.0 are less energetic! [Distribution of energy values](/img/energy.png)
| `instrumentalness` | 0.0 - 1.0 | Assessment of the presence of vocals. For example, a rap or spoken track clearly has vocals. The closer the value is to 1.0, the more likely the track does not contain vocals. A value above 0.5 is understood as an instrumental track, but the probability is higher when approaching one. ! [Distribution of instrumentalness values](/img/instrumentalness.png)
| `liveness` | 0.0 - 1.0 | Assessment of audience presence in a track recording or live track. Readings above 0.8 reflect the high likelihood of this happening. ! [Distribution of liveness values](/img/liveness.png)
| `loudness` | -60 to 0 | Overall loudness in decibels. The volume value is averaged over the entire track. Useful when comparing the relative loudness of tracks. Typically, the range is -60 to 0 dB. ! [Distribution of loudness values](/img/loudness.png)
| `speechiness` | 0.0 - 1.0 | Estimation of the number of spoken words in a track. A value close to 1.0 characterizes the track as a talk show, podcast, or audio book. Tracks above 0.66 are probably all words. 0.33 to 0.66 can contain both speech and music. Below 0.33 for music and tracks without speech. ! [Distribution of speechiness values](/img/speechiness.png)
| `valence` | 0.0 - 1.0 | Assessment of the positivity of the track. A higher value indicates a happier, more cheerful mood. A low value is typical for tracks with a sad, depressive mood. ! [Distribution of valence values](/img/valence.png)
| `tempo` | 30 - 210 | ОThe overall tempo of the track in beats per minute (BPM). ! [Distribution of tempo values](/img/tempo.png)
| `key` | 0+ | The shared key of the track. The values ​​are selected based on the [Pitch Class] (https://en.wikipedia.org/wiki/Pitch_class). That is, 0 = C, 1 = C♯ / D ♭, 2 = D, and so on. If the key is not set, the value is -1.
| `mode` | 0 or 1 | Track modality. Major = 1, Minor = 0.
| `time_signature` | 1+ | Overall Track Signature Score is a convention for determining the number of beats in each measure.

# Genres for recommendation selection

This list is only needed for [getRecomTracks](/func?id=getrecomtracks). In [rangeTracks](/func?id=rangetracks) you can use [such a list](http://everynoise.com/everynoise1d.cgi?scope=all).

```
a: acoustic, afrobeat, alt-rock, alternative, ambient, anime, 
b: black-metal, bluegrass, blues, bossanova, brazil, breakbeat, british, 
c: cantopop, chicago-house, children, chill, classical, club, comedy, country, 
d: dance, dancehall, death-metal, deep-house, detroit-techno, disco, disney, drum-and-bass, dub, dubstep, 
e: edm, electro, electronic, emo, 
f: folk, forro, french, funk, 
g: garage, german, gospel, goth, grindcore, groove, grunge, guitar, 
h: happy, hard-rock, hardcore, hardstyle, heavy-metal, hip-hop, holidays, honky-tonk, house, 
i: idm, indian, indie, indie-pop, industrial, iranian, 
j: j-dance, j-idol, j-pop, j-rock, jazz, 
k: k-pop, kids, 
l: latin, latino, 
m: malay, mandopop, metal, metal-misc, metalcore, minimal-techno, movies, mpb, 
n: new-age, new-release, 
o: opera, 
p: pagode, party, philippines-opm, piano, pop, pop-film, post-dubstep, power-pop, progressive-house, psych-rock, punk, punk-rock, 
r: r-n-b, rainy-day, reggae, reggaeton, road-trip, rock, rock-n-roll, rockabilly, romance, 
s: sad, salsa, samba, sertanejo, show-tunes, singer-songwriter, ska, sleep, songwriter, soul, soundtracks,
spanish, study, summer, swedish, synth-pop, 
t: tango, techno, trance, trip-hop, turkish, 
w: work-out, world-music
```

# Playlist categories

To get a list of available categories for a country, run the following code. Results in logs.
```js
let listCategory = Source.getListCategory({ limit: 50, country: 'RU' });
console.log(listCategory.map(c => c.id).join('\n'));
```

Below playlist category for `country = RU`
```
a: alternative, anime, at_home
b: blues
c: caribbean, chill, classical, country
d: decades, dinner
e: edm_dance
f: family, focus, funk
g: gaming
h: hiphop, holidays
i: indie_alt, instrumental
j: jazz
k: kpop
l: latin
m: metal, mood
p: party, pop, punk
r: rnb, rock, romance, roots, russian_rap
s: sessions, sleep, soul
t: toplists, travel
w: wellness, workout
```