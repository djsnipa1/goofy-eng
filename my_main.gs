//This is an example `main.gs` file. Normally it would not include the `my_` suffix

//Mass triggers
function triggersDaily(){
  //update tasks to pull from cache file gnerated in TDL instead of live from spotify for faster processing
  TDL();
  Daily_list();
  No_Sad_BoixBunn_list();
}
function triggersWeekly(){
  discoverArchive();
  weebShiz();
  animeLists();
}

//Daily Tasks
function Daily_list() {
    //Compile sources for daily refresh/discover
    //Purpose is to combine daily mixes and filter songs that are liked
    let banTracks = []; //Placeholder for "banned" tracks
    let likedTracks = Cache.read('liked_Daily.json'); //Users liked songs
    //let discWeekly = Source.getTracks([{ name: 'Discover Weekly', id: '37i9dQZEVXcUwoZPnSeuF3' }]); //Users discovered weekly
    let recentTracks = RecentTracks.get(1000);
    Combiner.push(banTracks,likedTracks,recentTracks) // Combine liked and recent tracks into the banned tracks stream
    
    //Gets streams for all daily mixes
    let d1 = Source.getTracks([{name: 'Daily Mix 1', id:'37i9dQZF1E3al4dqJeOY0I'}]);
    let d2 = Source.getTracks([{name: 'Daily Mix 2', id:'37i9dQZF1E3a3smRfdUe6j'}]);
    let d3 = Source.getTracks([{name: 'Daily Mix 3', id:'37i9dQZF1E39409e0kfmwN'}]);
    let d4 = Source.getTracks([{name: 'Daily Mix 4', id:'37i9dQZF1E35Jeb1JS6zGj'}]);
    let d5 = Source.getTracks([{name: 'Daily Mix 5', id:'37i9dQZF1E34WIqOK1h0ey'}]);
    let d6 = Source.getTracks([{name: 'Daily Mix 6', id:'37i9dQZF1E3afpAFWUhJMH'}]);
    
    //Create stream for discover
    let dailyDiscover = Combiner.alternate('max',d1,d2,d3,d4,d5,d6);
    Filter.dedupTracks(dailyDiscover); //Remove duplicate tracks
    Filter.removeTracks(dailyDiscover, banTracks,false); //Invert true = only liked songs are kept

    //Create stream for refresh
    let dailyRefresh = Combiner.alternate('max',d1,d2,d3,d4,d5,d6);
    Filter.dedupTracks(dailyRefresh); //Remove duplicate tracks
    Filter.removeTracks(banTracks,recentTracks,false); // Remove recent trakks from stream
    Filter.removeTracks(dailyRefresh, banTracks,true); //Invert true = only liked songs are kept 

    //Replace daily discover playlist with new stream
    Playlist.saveWithReplace({
        id: '5RP7TnSCCP6ZtbOFeIaJsl', // after the first creation of the playlist
        name: 'Daily Discover',
        tracks: dailyDiscover,
        //description: Playlist.getDescription(dailyDiscover),
        //randomCover: 'update',
    });
    
    //Replaces daily refresh playlist with new stream
    Playlist.saveWithReplace({
        id: '2y32P4OhOn5U8O7CNEy8Hf', // after the first creation of the playlist
        name: 'Daily Refresh',
        tracks: dailyRefresh,
        description: 'Takes all 6 of my mixes and gives me songs that I already love.',
        //randomCover: 'update',
    });
}
function No_Sad_BoixBunn_list() {
  //First third
    //Get saved tracks
    let likedTracks = Cache.read('liked_Daily.json');

    //Concentrate streams   
    let sadStream = Source.getTracks([
        { name: 'No Sad Boi', id: '0OCbvML4w4K1XOHCVUMhc4' },
        { name: 'Depresso',   id: '2WUiJlp7CEeRlufjsfeIYl' }
    ]);

    //Filter out sad streams from saved tracks
    Filter.removeTracks(likedTracks,sadStream,false);  // true = reverse order
    //Selector.keepRandom(likedTracks,500);              //Take random 500 songs
    //Order.sort(likedTracks,'features.energy','desc');  //Sort stream by energy
    Selector.keepRandom(likedTracks,100);              //Take first 100 songs
  
  //Second third
    //Pick a random stream from one of the following:
    let randomStream = Source.getTracksRandom([
    { name: 'Serotonin',        		id: '37i9dQZF1DWYMroOc5KTTh' },
    { name: 'Skatepark Punks',  		id: '37i9dQZF1DX3MU5XUozve7' },
    { name: "Pop Punk's Not Dead",  id: '37i9dQZF1DX1ewVhAJ17m4' },
    { name: 'Last Hurrah Radio', 		id: '37i9dQZF1E8GUKImSCjK6s' },
    { name: 'Weeb Sh*t',            id: '5YnS3p4WH0RzqIpeBZwaOz' }
  ]);

    Selector.keepRandom(randomStream,50);              //Pick random 50 songs
  //Last Third
    //Concentrate two streams
    let sBoy = Combiner.mixin(randomStream,likedTracks,1,2,false);
    Filter.dedupTracks(sBoy);                //de-dup
    
    //Make Bunn-list
    //Get Lauren's Library and Laurens Library Radio
    let laurenStream = Source.getTracks ([{ name: "Lauren's Library", id: '2debeTIW8l7n11hPlx3AXZ' }]);
    Selector.keepRandom(laurenStream,150);  //Get random 150,
    //Order.sort(laurenStream,'features.energy','desc');  //Sort stream by energy
  
    let noSadBoi = Source.getTracks([{ name: "No Sad Boi", id: '0OCbvML4w4K1XOHCVUMhc4'}]); //Get No Sad Boi
  
    //Merge two streams
    let bList = Combiner.alternate('min',sBoy,laurenStream);
    Filter.dedupTracks(bList); //De-Dup

    //Order.sort(sBoy,'features.energy','desc'); //Sort by most energy

    //Replace No Sad Boi with new stream
    Playlist.saveWithReplace({
        id: '0OCbvML4w4K1XOHCVUMhc4', // after the first creation of the playlist
        name: 'No sad boi',
        description: 'A daily fresh shuffle for when this boi needs to cool down with a little decaff, no depresso allowed.',
        tracks: sBoy,
    });
    //Save to Bunn-list
    Playlist.saveWithReplace({
        id: '06x89Eay0LcLHBuW3mukkn', // after the first creation of the playlist
        name: 'Bunn-list',
        description: "Daily mix of my 'No sad boi' with Bunn's playlist.",
        tracks: bList,
    });
}
function TDL() {
  //Daily function to look for liked songs and add new likes to TDL folder. Once added, never add again.
  //Get streams
  let liked = Source.getSavedTracks(); //Get list of liked songs
  let liked_C = Cache.read('liked_Daily.json'); //Get cache of liked songs
  let pl = Source.getTracks([{name: 'TDL', id: '6oqqsAFVeWczbvRGzMYAOS' }]); //Current stream for playlist
  Filter.removeTracks(pl,liked,true); //Remove songs that were unliked from library
  Filter.removeTracks(liked, liked_C); //Remove songs to import that are cached
  Combiner.push(pl,liked); //Merge new songs with filtered playlist
  Filter.dedupTracks(pl);
  //Append filtered songs to TDL playlist
  Playlist.saveWithReplace({
        id: '6oqqsAFVeWczbvRGzMYAOS', // after the first creation of the playlist
        name: 'TDL',
        tracks: pl,
    });
  //Write currently liked songs to cache
  Cache.write('liked.json',Source.getSavedTracks());
  if (Selector.isDayOfWeek('Monday')) {
    //Create weekly archive of liked sings in case of mass error
    Cache.write('liked_Weekly.json',Source.getSavedTracks());
  }
}
//Weekly Tasks
function discoverArchive() {
  //Focus of this task is to archive discovered weekly into a single playlist

  let sWeekly = Source.getTracks([{name: 'Discover Weekly', id: '37i9dQZEVXcUwoZPnSeuF3'}]); //Get stream of current discoverd weekly
  Cache.append('aWeekly.json',sWeekly,'end');
  let sAWeekly = Source.getTracks([{name: 'Discover Weekly Archive', id: '45DIlmJUpm7JxcUGNdv30e'}]); //Get stream for current archive
  Combiner.push(sAWeekly,sWeekly); //Push current weekly to archive stream
  Filter.dedupTracks(sAWeekly); //Filter out track duplicates
  Selector.sliceLast(sAWeekly,1000) //Keeps the most recent 1000 tracks
  //Add tracks to new playlist
    Playlist.saveWithReplace({
        id: '45DIlmJUpm7JxcUGNdv30e', // after the first creation of the playlist
        name: 'Discover Weekly Archive',
        tracks: sAWeekly,
        //description: Playlist.getDescription(stream),
        randomCover: 'update',
    });
}
function weebShiz() {
	//Scan library for songs with genre = anime and add them to weeb shit playlist if not there

  let likedSongs = Source.getSavedTracks()
  //let likedSongs = Source.getTracks([{name: "OMEGA", id: '3xE7CgoQH30Lya2i9fUEHY'}]);
  let weebStream = Source.getTracks([{name: 'Weeb Sh*t', id: '5YnS3p4WH0RzqIpeBZwaOz'}]); // Stream for current weeb shit playlist
  //let allAmine = Source.getTracks([{ name: 'Anime - All Lists', id: '5QwpSEICKaFxAgcblmGIo4'}]);
  let allAmine = Cache.read('all_Anime.json');
  Filter.removeTracks(allAmine,likedSongs,true); //Search anime playlists for liked songs
  Filter.removeTracks(allAmine,weebStream); //Remove songs already in the libray
  Filter.rangeTracks(likedSongs,{
    artist: {
        genres: ['anime'],
    },
  });

  Filter.removeTracks(likedSongs,weebStream); //Remove items already in the playlist
  Combiner.push(allAmine,likedSongs); //Merge the two streams
  Filter.dedupTracks(allAmine); //Remove duplicates

  Playlist.saveWithAppend({
    id: '5YnS3p4WH0RzqIpeBZwaOz',
    name: 'Weeb Sh*t',
    tracks: allAmine
  });

}
function animeLists() {
  //Concentrate For years
    //2020
      let winter2020 = Source.getTracks([
        { id: '1HYjB7dDr7BRkjNe64Ly1R' }, //Furries the hentai! Oh wait this is a maid cafe
        { id: '6SM7QEuvNDgO7qOu7YKPx0' }, //Furries the anime the highschool
        { id: '0DQJSfoyimxRii3WRDlRRG'}, //Our favorite dead bois are back in class
        { id: '58pULcsrkfiWXedHEqzBVl'}, //I accidentally got abandoned at birth in a forest and was adopted by a golumn
		  { id: '3dd2b99SBLvxRZ3pVTrxPd' }, //Detective brain boy
        { id: '0uVPwxGcXgRxjg9E2gmQzO' }, //We're gonna make an anime the anime!
        { id: '6sLDma6IGqdnRhj8iPtiJp'}, //I have a man inside my mouth
        { id: '7B1DKkcY2OE1wJ9nYnU2jM'},	//No sheild class would be this broken
		  { id: '7j4HOpEdsME078RFMl7HgZ' }, //My new girlfriend is totally not a loli
        { id: '2KSXERXgmCLnJx1dpOcHKH' }, //I in love with a ghost at my school
        { id: '1RQLEWy5hmkYHSpkLepK6u'}, //Death of the highschoolers
        { id: '0AJTVDCZKt7vlnPzodQCe1'} //Basically monster porn
		  ])   
      let spring2020 = Source.getTracks([
        { id: '6q0xyPI6XjH7SwxwHU81wm'},  //Furries the anime
        { id: '0TIMoX2gDZzM8uq8HfroYW'},  //^
        { id: '0FvD9MPrYVV9IGEeyNbiZy'}, //Davinchi is a woman
        { id: '5CB9xRzImjwU3hzMPjEcRK'}, //I cant let my cute child find out I draw lewd manga
        { id: '1nBEFN7du56mYgfHj7GA11'},  //Another steriotypical school band
        { id: '66TUdFUvh7Dyw2wTfwzHl3'},  //My body is a prison, also a stuffed animal with fleshy insides
        { id: '66mcHyjwviNFecCGwbl7fo'} //Tower of the friendzone
		  ]);
      let summer2020 = Source.getTracks([
        { id: '3x9kmlc7NZ7E1QSHwUrpaj'}, //Japan man builds car from boat or something  
        { id: '6X4jrCnPI9zmVxczV7TVCf'}, //Foodgasm season end
        { id: '1DZc2jMkYG2taMT4CzR6gJ'}, //VR Traps thanos snap 
        { id: '6Hn6cDk7cc9EVofV3sZs21'}, //Life is pain, so I die again
        { id: '2JStebJZ3rzecQafQgoNpd'} //Flame zombois  
		  ]);
      let fall2020 = Source.getTracks([
        { id: '1XVWe7wZbVYPERABDLBjvq'},  //I am god! You are god! We are all god!!
        { id: '6P0jAcyZIwGGvUV2EqvSoq'}, //Incest is wincest the school
        { id: '5yrzxVo6jNRX1xFgCp3PJz'}, //Mai waifu saved my laifu
        { id: '6mU48u3VBaG9JJsGZfx7ME'}, //TOtally picking up girls in the dungeon  
        { id: '3e8oGD2TvtWhgHcWZ4GXu6'}, //Volyball the highschool
        { id: '08Bu3Ke2kNECn6RVz7oPPN'}  //Kakashi is better
		  ]);
      let stream2020 = []
      Combiner.push(stream2020,spring2020,winter2020,summer2020,fall2020) // combine playlists into one stream
      let pl2020 = Source.getTracks([{ id: '5tydFBWFwcgDiIXfLWA0tn'}]); // Get current playlist
      Filter.dedupTracks(stream2020); // remove duplicates
      Filter.removeTracks(stream2020,pl2020); //only add new songs to playlist
      Combiner.push(pl2020,stream2020)
      Order.sort(pl2020,'popularity','desc'); //Sort songs by popularity
      Playlist.saveWithReplace({
        id: '5tydFBWFwcgDiIXfLWA0tn',
        name: 'Watchlist 2020',
        tracks: pl2020,
        description: Playlist.getDescription(pl2020),
        randomcover: 'update'
      });
    //2021
      let winter2021 = Source.getTracks([
        { id: '6OZd0BxP5vP15QKJk1uCRe' }, //cells at work s2
        { id: '1A9ZFbnHQTwe5cPb5lkd5x' },  //redo of healer
        { id: '5rYYRfXGVLJ1u5Ghkh70Tb'},  //neverland s2
        { id: '1tp8UtFrBBlry2D3tdTJc7'},  //slmieboi s2
        { id: '0bRhsxCsMLLjCgHGo17jK1'} //shots s4p1
      ])   
      let spring2021 = Source.getTracks([
        { id: '0GYFYyqTGLhAz1juy23BqU'},  //I quit music because grandpa died, now I am an ass
        { id: '5dgjXrHXe0oElIqedgVXKs'}, //My best friend sent my back in time! Oh wait that was attempted murder...
        { id: '0npmwyakyrFd4mOLrxoYW7'},  //my bully is secrelty in love with me the sexual harrasment guide on what not to do
        { id: '0gvI3dqAFulpLCZwUcNM2Z'},  //I took in a girl of the streets, wont let her in my sheets
        { id: '1fZbjoU1Qrodm2CWqGUS8z'},  //Magical balls come to life
        { id: '6rabW1N7t1lh1yvw369Cts'},  //White * people are superior
        { id: '4R5YxGGCSWkxEsz93aU5rK'}   //Robot waifu tries to save humans
      ]);
      let summer2021 = []
      let fall2021 = []
      let stream2021 = []
      Combiner.push(stream2021,spring2021,winter2021,summer2021,fall2021) // combine playlists into one stream
      
      let pl2021 = Source.getTracks([{ id: '5crF3tYexGK47NOvz2bBIj'}]); // Get current playlist
      Filter.dedupTracks(stream2021); // remove duplicates
      Filter.removeTracks(stream2021,pl2021); //only add new songs to playlist
	    Combiner.push(pl2021,stream2021)
      Order.sort(pl2021,'popularity','desc'); //Sort songs by popularity
      Playlist.saveWithReplace({
        id: '5crF3tYexGK47NOvz2bBIj',
        name: 'Watchlist 2021',
        tracks: pl2021,
        description: Playlist.getDescription(pl2021),
        randomcover: 'update'
      });
  //Merge each year into another playlist
    let allLists = []
    Combiner.push(allLists,pl2021,pl2020)
    let plAll = []
    Filter.dedupTracks(allLists);
    Order.sort(allLists,'popularity','desc');
    Playlist.saveWithReplace({
      id: '5QwpSEICKaFxAgcblmGIo4',
        name: 'Anime - All Lists',
        tracks: allLists,
        //description:
        randomcover: 'update'
    });
    Cache.write('all_anime.json',allLists);
}

//One-time functions
function archiveDiscoverdWeekly() {
  //The purpose of this is to archive my spotify library in google drive on a weekly basis
  let tracks = Source.getTracks([{name: 'Discover Weekly Archive', id: '45DIlmJUpm7JxcUGNdv30e'}]); //Get stream for current archive
  Cache.write('aWeekly.json', tracks);
}
function archiveLikedSongs() {
  let tracks = Source.getSavedTracks();
  Cache.write('liked_Daily.json', tracks);
}
function sortValence() {
  let tracks = Source.getTracks([{ id: '2WUiJlp7CEeRlufjsfeIYl'}]);
  Order.sort(tracks,'features.valence','asc');
  Playlist.saveWithReplace( {
    id: '2WUiJlp7CEeRlufjsfeIYl',
    tracks: tracks
  });
}
