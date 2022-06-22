
export const storageService = {
    saveToStorage,
    loadFromStorage
}


function saveToStorage(val, KEY = 'placeDB') {
    let places = loadFromStorage()
    if (!places) places = {}
    places[val.name] = val
    const str = JSON.stringify(places)
    localStorage.setItem(KEY, str)
}

function loadFromStorage(KEY = 'placeDB') {
    const str = localStorage.getItem(KEY)
    // console.log(str);
    return JSON.parse(str)
}



