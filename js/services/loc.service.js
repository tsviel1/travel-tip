import { storageService } from './storage.service.js'

export const locService = {
    getLocs,
    getPlaces
}

var gPlaces

// function _loadToStorage() {
//     let loc = storageServise.loadToStorage()
//     console.log(loc);
//     return loc

// }

// const locs = [
//     { name: 'Greatplace', lat: 32.047104, lng: 34.832384 }, 
//     { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
// ]


function getPlaces() {
    return gPlaces

}

function getLocs() {
    let places = storageService.loadFromStorage()
    gPlaces = places
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // console.log('what is locs???', locs);
            resolve(places)
            reject('no location')
        }, 2000)
    });
}


