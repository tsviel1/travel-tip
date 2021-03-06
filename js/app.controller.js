import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
import { storageService } from './services/storage.service.js'

window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;
window.renderTable = renderTable;
window.onGoPlace = onGoPlace;



function onInit() {
    mapService.initMap()
        .then(() => {
            console.log('Map is ready');
            addListener()
        })
        .catch(() => console.log('Error: cannot init map'));
    // console.log(storageService.loadFromStorage());
    onGetLocs()
}

function addListener() {
    var city = document.querySelector('.search')
    city.addEventListener('click', goToCity)
    var map = mapService.getMap()
    map.addListener('click', getLoc)
}

function getLoc(el) {
    console.log(el.latLng);
    let placeName = prompt('enter name')
    if (!placeName) return
    const place = creatMarker(placeName, el.latLng)
    storageService.saveToStorage(place)
    onAddMarker(place.loc)
}

function creatMarker(name, loc) {
    return {
        id: makeId(),
        name,
        loc,
        createdAt: Date.now()
    }
}

function goToCity() {
    var city = document.querySelector('input').value
    console.log(city);
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker(loc) {
    console.log('Adding a marker');
    mapService.addMarker(loc);
}

function onGetLocs() {
    locService.getLocs()
        .then(renderTable)
}

function renderTable(places) {
    console.log(places);
    var str = ''
    for (const key in places) {
        let id = places[key].id
        let loc = places[key].loc
        str += `<div class="place">${key}</div>
         <button id="${id}" class="delete" onclick="onRemovePlace()">Delete</button>
            <button id="${id}" class="go" onclick="onGoPlace(this)" data-loc="${loc}">Go</button>`
    }
    document.querySelector('.palces-conteiner').innerHTML = str
    renderMarkers(places)
}

function renderMarkers(places) {
    for (const key in places) {
        mapService.addMarker(places[key].loc)
    }
}

// function onRemovePlace() {
//     console.log(333);
// }

function onGoPlace(el) {
    console.log(el.id);
    //   let places=locService.getPlaces()
    let pos = document.querySelector(`#${el.id}`).dataset.loc
    mapService.panTo(pos)
}


function onGetUserPos() {
    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords);
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude} `
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}
function onPanTo() {
    console.log('Panning the Map');
    mapService.panTo(35.6895, 139.6917);
}



function makeId(length = 2) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}
