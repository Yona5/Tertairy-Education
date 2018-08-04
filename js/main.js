var agri = "http://api.worldbank.org/v2/countries/GBR/indicators/UIS.FOSEP.56.F600?format=json&date=2009:2015";

var education ="http://api.worldbank.org/v2/countries/GBR/indicators/UIS.FOSEP.56.F140?format=json&date=2009:2015";

var engineering = 'http://api.worldbank.org/v2/countries/GBR/indicators/UIS.FOSEP.56.F500?format=json&date=2009:2015';

var health = 'http://api.worldbank.org/v2/countries/GBR/indicators/UIS.FOSEP.56.F700?format=json&date=2009:2015';

var humanities = 'http://api.worldbank.org/v2/countries/GBR/indicators/UIS.FOSEP.56.F200?format=json&date=2009:2015';

var unspecified = 'http://api.worldbank.org/v2/countries/GBR/indicators/UIS.FOSEP.56.FUK?format=json&date=2009:2015';

var science = 'http://api.worldbank.org/v2/countries/GBR/indicators/UIS.FOSEP.56.F400?format=json&date=2009:2016';

var services = 'http://api.worldbank.org/v2/countries/GBR/indicators/UIS.FOSEP.56.F800?format=json&date=2009:2015';

var socialScience ='http://api.worldbank.org/v2/countries/GBR/indicators/UIS.FOSEP.56.F300?format=json&date=2009:2016';


var generalUK = "https://api.worldbank.org/v2/countries/GBR/indicators/SE.TER.ENRL?format=json&date=2009:2015";

var generalNor = "https://api.worldbank.org/v2/countries/NOR/indicators/SE.TER.ENRL?format=json&date=2009:2015";

var generalMu = "https://api.worldbank.org/v2/countries/MUS/indicators/SE.TER.ENRL?format=json&date=2009:2015";

var links = [agri,education,engineering,health,humanities,unspecified,science,services,socialScience];

var country="";
function listUni(nation){
   
    $.get("https://raw.githubusercontent.com/Hipo/university-domains-list/master/world_universities_and_domains.json",function(data){
         var num = 0;
        var uniList = JSON.parse(data);
        for(var uni in uniList){
            if(uniList[uni].country == nation){
                $("#uniList").append('<p>'+'<a href = "'+uniList[uni].web_pages[0]+'" target = "_blank" class = "uniLink">'+uniList[uni].name + '</a>' + '</p>');
                num++;
            }
        } 
        if(num ==2){
            $("#uniList").css("height", "120px");
            $("#uniList").css("overflow", "none");
            $(".uniLink").css("width","200px"); 
        }
    }); 
}


function general(link){
   var dataSet = []; 
    $.ajax({
        type:'GET',
        dataType: 'json',
        crossDomain:true,
        url:link,
        success: function(data){
            var values = data[1];
            for(var i = 0; i< values.length; i++){
                dataSet[i] = values[i].value;
        }  
           showValue(dataSet.reverse()); 
        }
    }); 
}


function temp(link){
   
   var dataSet = []; 
    $.ajax({
        type:'GET',
        crossDomain:true,
        dataType:'json',
        url:link,
        success: function(data){
            console.log(data)
            var values = data[1];
            for(var i = 0; i< values.length; i++){
                dataSet[i] = values[i].value;
        }  
           showValue(dataSet.reverse()); 
        }
    });
    
}


function showValue(data){
        var  data = {
        labels: ["2009", "2010", "2011", "2012", "2013", "2014","2015"],
        datasets: [{
            label: 'Number of Students',
            data: data,
            backgroundColor: [
                'rgba(24,90,157,.3)'
            ],
            borderColor: [
                
                'rgba(2, 159, 64, 1)'
            ],
            borderWidth: 2
        }]
    }
    var options = {
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Students'
				    },
                    ticks: {
                        beginAtZero:true
                    }

                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Year'
				    },
                    ticks: {
                        beginAtZero:true
                    }

                }]
            }
        }

    var lineChart = $("#lineChart");
    var myLineChart = new Chart(lineChart, {
        type:"line",
        data:data,
        options:options
    });
}


function dataGetter(url){
    var dataArray = [];
    $.ajax({
        type:'GET',
        dataType: 'json',
//        processData: false,
        crossDomain:true,
//        jsonp:false,
//        catch:false,
        url:url,
        success: function(data){
             var values = data[1];
            for(var i = 0; i< values.length; i++){
                dataArray[i] = values[i].value;
            }
            barGraph(dataArray.reverse());
            $("#barChart").css("display","block");
        }
    });
}


function barGraph(datum){
    var data = {
        labels: ["2009", "2010", "2011", "2012", "2013", "2014","2015"],
        datasets: [{
            label: 'Percentage of students',
            data: datum,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(200, 149, 34, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(200, 149, 34, 1)'
            ],
            borderWidth: 1
        }]
    }
    var options = {
        scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Percentage of Students'
				    },
                    ticks: {
                        beginAtZero:true
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Year'
				    },
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
    }
    var barChart = $("#barChart");
    var myLineChart = new Chart(barChart, {
        type:"bar",
        data:data,
        options:options
    });
}


function getOptions(t){
    var t = t[t.selectedIndex].id;
    var coun = $(".country")[0].id;
    console.log(coun);
    if(coun == "uk"){
        country = "uk";
        console.log("in getOptions");
        isoCode();
    }
    else if(coun =="mu"){
        country = "mu";
        isoCode();
    }
    else if(coun == "norway"){
        country = "norway";
        isoCode();
    }
    if(t == "agri"){
        dataGetter(links[0]);
       }
    else if(t =="edu"){
            dataGetter(links[1]);
            }
    else if(t =="eng"){
            dataGetter(links[2]);
            }
    else if(t =="health"){
            dataGetter(links[3]);
            }
    else if(t =="hum"){
            dataGetter(links[4]);
            }
    else if(t =="unspecified"){
            dataGetter(links[5]);
            }
    else if(t =="sci"){
            dataGetter(links[6]);
            }
    else if(t =="ser"){
            dataGetter(links[7]);
            }
    else if(t =="social"){
            dataGetter(links[8]);
            }  
}


function codeReplacer(newCode){
    console.log("in codeReplacer");
    for(var i=0; i<links.length;i++){
       var link = links[i];
       var tempCode = link.slice(link.indexOf("indicator")-4,link.indexOf("indicator")-1);
       links[i] = link.replace(tempCode, newCode);
    }
}


function isoCode(){
    console.log("in isoCode");
    if(country == "uk"){
        codeReplacer("GBR");
    }
    else if(country == "mu"){
        codeReplacer("MUS");
    }
    else if(country == "norway"){
        codeReplacer("NOR");
    }
}


$(document).ready(function(){
    var cont = $(".country")[0];
    if(cont!=null){
        if(cont.id == "uk"){
            listUni("United Kingdom");
            general(generalUK);
        }
        else if(cont.id =="mu"){
            listUni("Mauritius");
            temp(generalMu);
        }
        else if(cont.id == "norway"){
            listUni("Norway");
            general(generalNor);
        }
    }
});
