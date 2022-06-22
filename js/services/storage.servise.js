
export const storageServise = {
    saveToStorage,
    loadToStorage
}


function saveToStorage(val, KEY = 'placeDB') {
    let places = loadToStorage()
    if (!places) places = {}
    places[val.name] = val
    const str = JSON.stringify(places)
    localStorage.setItem(KEY, str)
}

function loadToStorage(KEY = 'placeDB') {
    const str = localStorage.getItem(KEY)
    // return str
    return JSON.parse(str)
}



