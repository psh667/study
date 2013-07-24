var hist = []; 
var startUrl = 'index.html'; 
$(document).ready(function(){
    loadPage(startUrl);
});
function loadPage(url) {
    $('body').append('<div id="progress">Loading...</div>');
    alert("hold");
    scrollTo(0,0); 
    if (url == startUrl) {
        var element = ' #header ul'; 
    } else {
        var element = ' #content';
    }
    $('#container').load(url + element, function(){
        var title = $('h2').html() || 'Hello!'; 
        $('h1').html(title); 
        $('h2').remove(); 
        $('#container a').click(function(e){
            var url = e.target.href; 
            if (url.match(window.location.hostname)) {
                e.preventDefault(); 
                loadPage(url);
            }
        });
    $('#progress').remove();
    });
}
