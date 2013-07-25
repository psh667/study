var jQT = $.jQTouch({ 
    icon: 'kilo.png'
}); 

$(document).ready(function(){
    $('#settings form').submit(saveSettings);
});
function saveSettings() {
    jQT.goBack();
    return false;
}

