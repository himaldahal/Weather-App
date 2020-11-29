const cityurl ='https://ipinfo.io/json';
// change you api key here

let appId = 'aca790619affaacbaa6b8c7923450f7';
let appId2 = '71f6779186cc32448b4c412eea65b982';

$.ajax({
        type: "POST",
        url: "https://api.ip.sb/geoip",
        dataType: "json",
       success: function (data, status, xhr) {
            var country = data['city']
            console.log(data)
            $.ajax({
                type: "POST",
                url: "https://api.openweathermap.org/data/2.5/weather?q=" + country + "&appId2="+ appId + "&units=metric",
                dataType: "json",
                success: function (result, status, xhr) {
                    var table = $("<table class='table'><tr><th>Weather Description : </th></tr>");
                    table.append("<tr><td>City:</td><td>" + result["name"] + "</td></tr>");
                    table.append("<tr><td>Country:</td><td>" + result["sys"]["country"] + "</td></tr>");
                    table.append("<tr><td>Current Temperature:</td><td>" + result["main"]["temp"] + "°C</td></tr>");
                    table.append("<tr><td>Maximum Temperature : </td><td>" + result["main"]["temp_max"] + "</td></tr>");  
                    table.append("<tr><td>Wind Speed :</td><td>" + result["wind"]["speed"] + "</td></tr>");
                    table.append("<tr><td>Humidity:</td><td>" + result["main"]["humidity"] + "</td></tr>");
                    table.append("<tr><td>Weather:</td><td>" + result["weather"][0]["description"] + "</td></tr>");
                 
                    $("#displaydata").html(table);
                    console.log(result)
                },
                error: function (xhr, status, error) {
                 if  (xhr.status  == '404') { swal({ title: ":City Not Found", text: 'City Not Found', icon: "success", button: "Ok",});
             }else{ 
                swal({ title: "Error Occured", text: error, icon: "success", button: "Ok", });
                  } }
                     });
            
        },
        error: function (xhr, status, error) {
           console.log('Failed To retrive the visitor city');
        }
    });

$(document).ready(function (){ 
    $("#submit").click(function (e) { 
        var inp = $("#cityName").val();
          
            $.ajax({
                type: "POST",
                url: "https://api.openweathermap.org/data/2.5/weather?q=" + $("#cityName").val() + "&appid="+ appId + "&units=metric",
                dataType: "json",
                success: function (result, status, xhr) {
                    var table = $("<table class='table'><tr><th>Weather Description : </th></tr>");
                    table.append("<tr><td>City:</td><td>" + result["name"] + "</td></tr>");
                    table.append("<tr><td>Country:</td><td>" + result["sys"]["country"] + "</td></tr>");
                    table.append("<tr><td>Current Temperature:</td><td>" + result["main"]["temp"] + "°C</td></tr>");
                    table.append("<tr><td>Maximum Temperature : </td><td>" + result["main"]["temp_max"] + "</td></tr>");  
                    table.append("<tr><td>Wind Speed :</td><td>" + result["wind"]["speed"] + "</td></tr>");
                    table.append("<tr><td>Humidity:</td><td>" + result["main"]["humidity"] + "</td></tr>");
                    table.append("<tr><td>Weather:</td><td>" + result["weather"][0]["description"] + "</td></tr>");
                    $("#displaydata").html(table);
                    console.log(result)
                },
                error: function (xhr, status, error) {
                 if  (xhr.status  == '404') { swal({ title: "Error :City Not Found", text: 'City Not Found', icon: "warning", button: "Ok",});
             }else{ 
                swal({ title: "Error Occured", text: error, icon: "warning", button: "Ok", });
                  } }
                     });
                });
});
