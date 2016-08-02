var showForm = function() {
  $('body').on('click touchstart', '.mains', function(event) {
    
    $('form').fadeIn('slow');
    $('h1').hide();
  });
};

// need to create form on submit, pull spotify API and display top 5 songs

$(document).ready(function() {
  //look up more info on css animations (they perform better)
  $('h1').fadeIn(2500);
  showForm();

  //get artist, then get artist's id, then get tracks by artist ID
  $('form').on('submit', function(event) {
    event.preventDefault();
    //empties list
    $('ul').empty();
    //takes input to search for artist
    var artistName = $('#artistInput').val();
    var url = "https://api.spotify.com/v1/search";
    var params = {
      type: 'artist',
      q: artistName,
      key: "a27e704d5d39416fbf9170ad339a2cdd"
    };
    var results = $.getJSON(url, params);
    console.log(results);
   
    //grabs the artist id
    var searchTopTracks = results.then(function(data) {
    	//if no results, alert error
    	 if (data.artists.items.length === 0){alert("No artists found. Please enter a valid artist.");
    	 } else {
    	 	// continues if an artist can be found
      console.log(data.artists.items[0].id);
      var artistId = data.artists.items[0].id;
      //use the artist ID to search top tracks and add in artist input name to heading

      $('p').html(data.artists.items[0].name + "'s <br> Top 5 Tracks");
      return $.getJSON('https://api.spotify.com/v1/artists/' + artistId + '/top-tracks?country=US');}

    });
    searchTopTracks.then(function(data) {
      console.log(data.tracks[0].name);
      //create function to append tracks
      for (var index = 0; index < 5; index++) {
        // added in substring for long song titles to cut off after 27th character
        $('ul').append('<li><div class="sw" style="display:none" id=' + data.tracks[index].id + '>' + (data.tracks[index].name).substring(0, 27) + '</div></li>').find('.sw').fadeIn('slow');
      }
    });
    //resets form input

    $('#artistInput').val("");
  });
  var audioList = [];

var getAudio = function (){var trackId = $(this).attr("id");
      var track = $.getJSON('https://api.spotify.com/v1/tracks/' + trackId);
      var playTrack = track.then(function(playTrack) {
        var playAudio = new Audio(playTrack.preview_url);
        console.log(playTrack.preview_url);

        audioList = [];
        audioList.push(playAudio);

        playAudio.play();});};

  //get track id, and preview the song
  $('ul').on('click touchstart', '.sw', function() {
  	//checks if anything is in audioList array, if it is, pause it and clear the array to continue playing next song.
    if (audioList.length === 1) {
      audioList[0].pause();
     

      var trackId = $(this).attr("id");
      var track = $.getJSON('https://api.spotify.com/v1/tracks/' + trackId);
      var playTrack = track.then(function(playTrack) {
        var playAudio = new Audio(playTrack.preview_url);
        console.log(playTrack.preview_url);

        audioList = [];
        audioList.push(playAudio);

        playAudio.play();
      });
      //if nothing is in the array play normally
    } else {
      var trackId = $(this).attr("id");
      var track = $.getJSON('https://api.spotify.com/v1/tracks/' + trackId);
      var playTrack = track.then(function(playTrack) {
        var playAudio = new Audio(playTrack.preview_url);
        console.log(playTrack.preview_url);
// this adds current song into the audiolist so i can check if something is playing later.
        audioList = [];
        audioList.push(playAudio);

        playAudio.play();
      });
    }
    

  });

});






// can i push audio into an array. on click check if this item is in the array, if it is. pause and clear the array, else continue on.
//i can't figure out how to pause the current song. and play the new one.
//audioList = [];
//audioList.push(playAudio);
// this worked..now to somehow clean up the code Lol..



//if (audioList.length === 1){
//	playAudio.pause();
//	audioList = [];

//use data-spotify-id so i can do like data(spotify-id)