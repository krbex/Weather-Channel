var searchFromEl = document.querySelector('#city-search');
var searchHistory = document.querySelector('#search-history');
var listItems = document.querySelectorAll('li')
var pName = document.querySelector('#pName')
var pDate = document.querySelector('#pDate')
var pWicon = document.querySelector('#pWicon')
var pTemp = document.querySelector('#pTemp')
var pWind = document.querySelector('#pWind')
var pHumidity = document.querySelector('#pHumidity')
var pPressure = document.querySelector('#pPressure')
var cityForecast = document.querySelector('#city-forecast')
var searchId;

function handleSearchInputSubmit(event) {
    event.preventDefault();

    var searchInput = document.querySelector('#search-input').value.trim();
    console.log(searchInput)

    if(searchInput == listItems) {
        return;
    }

    if(!searchInput) {
        return;
    }
    var searchResult = $("<li><button>" + searchInput + "</button></li>");
    searchResult.id = searchInput
    newElement;

    searchResult.appendTo(document.querySelector('#search-history'));
    var queryurl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchInput}&appid=558dfb8a67e20701b137dc52b56bdfc5&units=imperial`;
    fetch(queryurl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {       
            pName.textContent = data.city.name;
            currentDate = data.list[0].dt_txt;
            currentDate = moment(data.list[0].dt*1000).format('dddd M/D');
            pDate.textContent = currentDate;
            pTemp.textContent = 'Temp: ' + data.list[0].main.temp;
            pWind.textContent = 'Wind: ' + data.list[0].wind.speed + ' MPH';
            pHumidity.textContent = 'Humidity: ' + data.list[0].main.humidity + '%';
            pPressure.textContent = 'Pressure: ' + data.list[0].main.pressure;
            var openIcon = data.list[0].weather[0].icon
            var iconUrl = `https://openweathermap.org/img/wn/${openIcon}@2x.png`
            pWicon.setAttribute('src', iconUrl)
            for (var i = 0; i < 5; i++) {
                $('.day')[i].textContent = moment(data.list[i*8].dt*1000).format('dddd M/D');
                $('img')[i].src = 'https://openweathermap.org/img/wn/' + data.list[i*8].weather[0].icon + '@2x.png';
                $('.temp')[i].textContent = data.list[i*8].main.temp;
                $('.wind')[i].textContent = data.list[i*8].wind.speed + ' MPH';
                $('.humidity')[i].textContent = data.list[i*8].main.humidity + '%';
                $('.pressure')[i].textContent = data.list[i*8].main.pressure;
            }
            console.log(data)
        
        });
        
    document.querySelector('body').addEventListener('click', function(event) {
        if (event.target.tagName.toLowerCase() === 'li') {
          console.log(event.target.id)
        }
      });

}

function displayData() {

}

function handleClickSubmit(event) {
    event.preventDefault();

    console.log(event);
}

function newElement() {
    listItems.forEach(listItems => {
        listItems.addEventListener('click', handleClickSubmit)
    })}
searchFromEl.addEventListener('submit', handleSearchInputSubmit);