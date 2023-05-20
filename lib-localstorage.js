// LOCALStorage
window.saveFunction = function(storageKey, storageData, debug = false) {
  if (debug) console.log("[SJFI] [DEBUG] saveFunction(" + storageKey + ") called");
  localStorage.setItem(storageKey, JSON.stringify(storageData));
};

window.loadGraphObjects = function(storageKey, storageData, debug = false) {
  if (debug) console.log("[SJFI] [DEBUG] loadGraphObjects(" + storageKey + ") called");
  const storedGraphObjects = localStorage.getItem(storageKey);
  if (storedGraphObjects) {
    storageData = JSON.parse(storedGraphObjects);
  }
};

window.resetLocalStorage = function(storageKey, storageData, debug = false) {
  if (debug) console.log("[SJFI] [DEBUG] resetLocalStorage(" + storageKey + ") called");
  localStorage.removeItem(storageKey);
  storageData = [];
};