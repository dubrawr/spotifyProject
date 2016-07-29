var showForm = function(){
	$('body').on('click', '.mains', function(event){
	event.preventDefault();
	$('form').fadeIn('slow');
	$('h1').hide();
	console.log("test");
	});
};

$(document).ready(function(){
	$('h1').fadeIn(2500);
	showForm();
});