var jQT = $.jQTouch({ 
    icon: 'kilo.png'
}); 

var db;
$(document).ready(function(){
    $('#settings form').submit(saveSettings);
    $('#createEntry form').submit(createEntry);
    $('#settings').bind('pageAnimationStart', loadSettings);//loadSettings();

    $('#dates li a').bind('click touchend', function(){
        var dayOffset = this.id;//0: today, 1: yesterday, 2: 2days ago
        var date = new Date();
        date.setDate(date.getDate() - dayOffset);
        sessionStorage.currentDate = date.getMonth() + 1 + '/' + 
                                     date.getDate() + '/' + 
                                     date.getFullYear();

	refreshEntries();
    });

    //Create DataBase
    var shortName = 'Kilo';
    var version = '1.0';
    var displayName = 'Kilo';
    var maxSize = 65536;
    db = openDatabase(shortName, version, displayName, maxSize);
    db.transaction(
        function(transaction) {
            transaction.executeSql(
                'CREATE TABLE IF NOT EXISTS entries ' +
                '  (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, ' +
                '   date DATE NOT NULL, food TEXT NOT NULL, ' +
                ' calories INTEGER NOT NULL );'
            );
        }
    );


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

    //database load
    $('#date ul li:gt(0)').remove();
    db.transaction(
        function(transaction) {
            transaction.executeSql(
                'SELECT * FROM entries WHERE date = ? ORDER BY food;', 
                [currentDate], 
                function (transaction, result) {
                    for (var i=0; i < result.rows.length; i++) {
                        var row = result.rows.item(i);
                        var newEntryRow = $('#entryTemplate').clone();
                        newEntryRow.removeAttr('id');
                        newEntryRow.removeAttr('style');
                        
                        newEntryRow.appendTo('#date ul');
                        newEntryRow.find('.label').text(row.food);
                        newEntryRow.find('.calories').text(row.calories);
                    }
                }, 
                errorHandler
            );
        }
    );

}

function createEntry() {
    var date = sessionStorage.currentDate;
    var calories = $('#calories').val();
    var food = $('#food').val();
    db.transaction(
        function(transaction) {
            transaction.executeSql(
                'INSERT INTO entries (date, calories, food) VALUES (?, ?, ?);', 
                [date, calories, food], 
                function(){
                    refreshEntries();
                    jQT.goBack();
                }, 
                errorHandler
            );
        }
    );
    return false;
}

function errorHandler(transaction, error) {
    alert('Oops. Error was '+error.message+' (Code '+error.code+')');
    return true; 
}

