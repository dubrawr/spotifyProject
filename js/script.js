var showForm = function(){
	$('body').on('click touchstart', '.mains', function(event){
	event.preventDefault();
	$('form').fadeIn('slow');
	$('h1').hide();
	});
};

// need to create form on submit, pull spotify API and display top 5 songs


$(document).ready(function(){
	//look up more info on css animations (they perform better)
	$('h1').fadeIn(2500);
	showForm();

//get artist, then get artist's id, then get tracks by artist ID
$('form').on('submit', function(event){
	event.preventDefault();
	//empties list
	$('ul').empty();
	//takes input to search for artist
	var artistName = $('#artistInput').val();
	var url = "https://api.spotify.com/v1/search";
	var params = {
		type: 'artist',
		q: artistName,
		key: "a27e704d5d39416fbf9170ad339a2cdd"};
	var results = $.getJSON(url, params);
	console.log(results);
	//takes the uri and isolates only the ID number
	var searchTopTracks = results.then( function (data) {
	        console.log(data.artists.items[0].id);
	        var artistId = data.artists.items[0].id;
	        //use the artist ID to search top tracks and add in artist input name to heading

	        $('p').html(data.artists.items[0].name +"'s <br> Top 5 Tracks");
	        return $.getJSON('https://api.spotify.com/v1/artists/' + artistId + '/top-tracks?country=US');
	   	    
	   	    });
	searchTopTracks.then(function(data){
	        	console.log(data.tracks[0].name);
	        	//create function to append tracks
				for (var index=0; index < 5; index++){
					// added in substring for long song titles to cut off after 27th character
				$('ul').append('<li><div class="sw" style="display:none" id='+ data.tracks[index].id+'>'+(data.tracks[index].name).substring(0,27)+'</div></li>').find('.sw').fadeIn('slow');
				}
	        	});
	//resets form input

	$('#artistInput').val("");
});
//get track id, and preview the song
$('ul').on('click', '.sw', function(){
	var trackId = $(this).attr("id");
	var track = $.getJSON('https://api.spotify.com/v1/tracks/'+trackId);
	var playTrack = track.then(function(playTrack){
	var playAudio = new Audio(playTrack.preview_url);
	console.log(playTrack.preview_url);
	playAudio.play();
	//i can't figure out how to pause the current song.
});

});


});
