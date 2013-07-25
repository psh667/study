var jQT = $.jQTouch({ 
    icon: 'kilo.png'
}); 

$(document).ready(function(){
    $('#settings form').submit(saveSettings);
    $('#settings').bind('pageAnimationStart', loadSettings);//loadSettings();

    $('#dates li a').bind('click touchend', function(){
        var dayOffset = this.id;//0: today, 1: yesterday, 2: 2days ago
        var date = new Date();
        date.setDate(date.getDate() - dayOffset);
        sessionStorage.currentDate = date.getMonth() + 1 + '/' + 
                                     date.getDate() + '/' + 
                                     date.getFullYear();
	alert( sessionStorage.currentDate );
	refreshEntries();
    });

});
function saveSettings() {
    localStorage.age = $('#age').val();
    localStorage.budget = $('#budget').val();
    localStorage.weight = $('#weight').val(); 
    jQT.goBack();
    return false;
}


function loadSettings() {
    if (!localStorage.age) {
        localStorage.age = ""; 
    }
    if (!localStorage.budget) { 
        localStorage.budget = "";
    }
    if (!localStorage.weight) {
        localStorage.weight = ""; 
    }
    $('#age').val(localStorage.age);
    $('#budget').val(localStorage.budget);
    $('#weight').val(localStorage.weight);
}

function refreshEntries() {
    var currentDate = sessionStorage.currentDate;
    $('#date h1').text( currentDate );
}

