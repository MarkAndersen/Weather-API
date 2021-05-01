var myKey = '9fb25e682537903c979f563799d58c09';
var myLat = '';
var myLon = '';
var myCity = '';
var cardDate = '';
var cardIcon = '';
var cardTemp = '';
var cardRh = '';
var cardIdent = '';
var iconLogo = '';

function fetchApi() {
  fetch(
    'https://api.openweathermap.org/data/2.5/onecall?lat=' +
      myLat +
      '&lon=' +
      myLon +
      '&exclude=minutely,hourly,alerts&units=imperial&appid=' +
      myKey
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var cardData = data
      var cityNameDate = document.createElement('h1');
      var jumboTemp = document.createElement('h2');
      var jumboRH = document.createElement('h2');
      var jumboWind = document.createElement('h2');
      var jumboUvi = document.createElement('h2');
      cityNameDate.textContent = myCity + ' ' + moment().format('MMM Do YYYY');
      jumboTemp.textContent = 'Current Temp: ' + data.current.temp + ' F';
      jumboRH.textContent = 'Humidity: ' + data.current.humidity + ' %';
      jumboWind.textContent = 'Wind Speed: ' + data.current.wind_speed + ' mph';
      jumboUvi.textContent = 'UV Index: ' + data.current.uvi;
      $('.conditions').append(cityNameDate);
      $('.conditions').append(jumboTemp);
      $('.conditions').append(jumboRH);
      $('.conditions').append(jumboWind);
      $('.conditions').append(jumboUvi);
      console.log(cardData);

      $('.card-body').each(function() {
        cardIdent = $(this).attr('data-card');
        cardDate = document.createElement('h4');
        cardIcon = document.createElement('img');
        cardTemp = document.createElement('h4');
        cardRh = document.createElement('h4');
        cardDate.textContent = moment().add(cardIdent, 'days').calendar('MMM Do YYYY');
        console.log(cardData.daily[cardIdent].weather[0].icon)
        iconLogo = cardData.daily[cardIdent].weather[0].icon;
        $('img').attr('src', 'http://openweathermap.org/img/wn/' + iconLogo + '@2x.png');
        cardTemp.textContent = cardData.daily[cardIdent].temp.max + ' F';
        cardRh.textContent = cardData.daily[cardIdent].humidity + ' %';
        $(this).append(cardDate);
        $(this).append(cardIcon);
        $(this).append(cardTemp);
        $(this).append(cardRh);
     })
      
    })
}

function newYork() {
  myLat = '40.71';
  myLon = '-74.01';
  myCity = 'New York City, NY';
  fetchApi();
}
function losAngeles() {
  myLat = '34.05';
  myLon = '-118.24';
  myCity = 'Los Angeles, CA';
  fetchApi();
}
function chicago() {
  myLat = '41.87';
  myLon = '-87.62';
  myCity = 'Chicago, IL';
  fetchApi();
}
function houston() {
  myLat = '29.76';
  myLon = '-95.36';
  myCity = 'Houston, TX';
  fetchApi();
}
function phoenix() {
  myLat = '33.44';
  myLon = '-112.07';
  myCity = 'Phoenix, AZ';
  fetchApi();
}
function philadelphia() {
  myLat = '39.95';
  myLon = '-75.16';
  myCity = 'Philadelphia, PA';
  fetchApi();
}
function sanAntonio() {
  myLat = '29.42';
  myLon = '-98.49';
  myCity = 'San Antonio, TX';
  fetchApi();
}
function sanDiego() {
  myLat = '32.71';
  myLon = '-117.16';
  myCity = 'San Diego, CA';
  fetchApi();
}
function zipCode() {
  var myZip = $('.zip').val();
  fetch(
    'http://api.openweathermap.org/geo/1.0/zip?zip=' +
      myZip +
      ',US&appid=' +
      myKey
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      myLat = data.lat;
      myLon = data.lon;
      myCity = data.name;
      fetchApi();
    });
}
function clearForm() {
  $('.conditions').empty();
  $('.card-body').empty();
}

$('.btn').on('click', clearForm);
$('.zip-btn').on('click', zipCode);
$('.ny').on('click', newYork);
$('.la').on('click', losAngeles);
$('.ch').on('click', chicago);
$('.ho').on('click', houston);
$('.px').on('click', phoenix);
$('.ph').on('click', philadelphia);
$('.sa').on('click', sanAntonio);
$('.sd').on('click', sanDiego);

//TODO:
//Local Storage
