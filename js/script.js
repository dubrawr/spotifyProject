var showForm = function(){
	$('body').on('click', '.mains', function(event){
	event.preventDefault();
	$('form').fadeIn('slow');
	$('h1').hide();
	});
};

// need to create form on submit, pull spotify API and display top 5 songs


$(document).ready(function(){
	$('h1').fadeIn(2500);
	showForm();
});


//get artist, then get artist's id, then get tracks by artist ID

$('form').on('submit', function(){
	event.preventDefault();
	//empties list
	$('ul').empty();
	//takes input to search for artist
	var artistName = $('#artistInput').val();
	var url = "https://api.spotify.com/v1/search?";
	var params = {
		type: 'artist',
		q: artistName,
		key: "a27e704d5d39416fbf9170ad339a2cdd"};
	var results = $.getJSON(url, params);
	console.log(results);
	//takes the uri and isolates only the ID number
	var searchTopTracks = results.then( function (data) {
	        console.log(data.artists.items[0].uri);
	        var artistId = data.artists.items[0].uri;
	        var id = artistId.substr(15,37);
	        console.log(id);
	        //use the artist ID to search top tracks
	        var topTracks = $.getJSON('https://api.spotify.com/v1/artists/' + id + '/top-tracks?country=US');
	        console.log(topTracks);
	        	topTracks.then(function(data){
	        	console.log(data.tracks[0].name);
	        	//create function to append tracks
				for (var index=0; index < 5; index++){
				$('ul').append('<li><div class="sw" style="display:none">'+data.tracks[index].name+'</div></li>').find('.sw').fadeIn('slow');
				}
	        	});
	        });
	//resets form input
	$('#artistInput').val("");
});