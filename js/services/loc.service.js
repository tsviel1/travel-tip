
export const locService = {
    getLocs,
    // _loadToStorage
}

// function _loadToStorage() {
//     let loc = storageServise.loadToStorage()
//     console.log(loc);
//     return loc

// }

// const locs = [
//     { name: 'Greatplace', lat: 32.047104, lng: 34.832384 }, 
//     { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
// ]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // console.log('what is locs???', locs);
            resolve(storageService.loadFromStorage());
            reject('no location')
        }, 2000)
    });
}


