var pat = 1;
var graf = 1;
var year = 2020;
var db;
var ref;
const firebaseConfig = {
    apiKey: "AIzaSyD3s7OmnuPbyPBDi9CxEBzqLLItGBPrij8",
    authDomain: "projetointegrado-71528.firebaseapp.com",
    databaseURL: "https://projetointegrado-71528.firebaseio.com",
    projectId: "projetointegrado-71528",
    storageBucket: "projetointegrado-71528.appspot.com",
    messagingSenderId: "766880522684",
    appId: "1:766880522684:web:dd05603ac846464e048bb9",
    measurementId: "G-5S4WZFHCTW"
};
var firebaseConfig2 = {
    apiKey: "AIzaSyB6mdHIfmYhBv2zWOQifFkVVjv1zinwZ6A",
    authDomain: "clicker-e3699.firebaseapp.com",
    databaseURL: "https://clicker-e3699.firebaseio.com",
    projectId: "clicker-e3699",
    storageBucket: "clicker-e3699.appspot.com",
    messagingSenderId: "329920012519",
    appId: "1:329920012519:web:6b0abee932cebb0d86c242"
};
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

function changeGraf() {
    console.log("inside");
    if (graf === 1) {
        console.log("inside1");
        google.charts.load('current', {'packages': ['corechart']});
        google.charts.setOnLoadCallback(drawChart);
    }
}

function drawChart() {
    var options = {
        title: 'Total Comments in Year:'+year,
        curveType: 'function',
        legend: {position: 'bottom'}
    };

    db = firebase.firestore();
    ref  = db.collection("Twitter");
    var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'Month'); // Implicit domain label col.
    data.addColumn('number', 'Comments'); // Implicit series 1 data col.
console.log(data);

    for (let i = 1; i < 13; i++) {
        let start;
        let end;
        if (i < 10){
             start = new Date(year+'-0'+i+'-01');
             end = new Date(year+'-0'+i+'-01');
        }else{
             start = new Date(year+'-'+i+'-01');
             end = new Date(year+'-'+i+'-01');
        }
        end = new Date(end.setMonth(end.getMonth()+1));
        console.log("Pat: "+pat);
        ref.where("patrimony_Id", "==", pat).where("date", ">=", start).where("date", "<", end).get()
            .then(function(querySnapshot) {
                console.log(querySnapshot.size);
                data.addRows([[i,querySnapshot.size]]);
                chart.draw(data, options);
            });

    }


}

$(document).ready(function () {
    console.log("start");
    firebase.initializeApp(firebaseConfig2);
    for (let i = new Date().getFullYear(); i > 2010; i--) {
        $('#yearpicker').append($('<option />').val(i).html(i));
    }

     pat  = parseInt(getUrlParameter('pat'));
     graf = parseInt(getUrlParameter('graf'));
     year = parseInt( getUrlParameter('year'));
    console.log(pat);
    console.log(pat == null);
    console.log(isNaN(pat));
    if (pat == null) || isNaN(pat)){
        console.log("patnull");
         pat = 1;
         graf = 1;
         year = 2020;
         window.location.href = "index.html?pat=" + pat + "&graf="+graf+"&year="+year;
    }
    $("#pat").val(pat);
    $("#graph").val(graf);
    $("#yearpicker").val(year);
    console.log("Imhere");
    changeGraf();
    $("#pat").change(function () {
        pat = this.value;
        graf = 1;
        window.location.href = "index.html?pat=" + pat + "&graf="+graf+"&year="+year;
    });
    $("#graph").change(function () {
        graf = this.value;
        window.location.href = "index.html?pat=" + pat + "&graf="+graf+"&year="+year;
    });
    $("#yearpicker").change(function () {
        year = this.value;
        window.location.href = "index.html?pat=" + pat + "&graf="+graf+"&year="+year;
    });

});
