//if (window.innerWidth && window.innerWidth <= 480) { 
    $(document).ready(function(){
        $('#header ul').addClass('hide'); 
        $('#header').append('<div class="button slideup" onclick="toggleMenu()">Menu</div>');
    }); 
    function toggleMenu() {
        $('#header ul').toggleClass('hide'); 
	$('#header .leftButton').toggleClass('pressed');
    }
//}
