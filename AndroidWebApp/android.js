    $(document).ready(function(){
        $('#header').append('<div class="leftButton" onclick="toggleMenu()">Menu</div>');
    }); 
    function toggleMenu() {
        $('#header .leftButton').toggleClass('pressed');
    }
