// LOCALStorage
window.storeJSONObjectsIntoKey = function(storageKey, storageData, debug = false) {
  if (debug) console.log("[SJFI] [DEBUG] storeJSONObjectsIntoKey(" + storageKey + ") called");
  localStorage.setItem(storageKey, JSON.stringify(storageData));
};

window.loadJSONObjectsFromKey = function(storageKey, storageData, debug = false) {
  if (debug) console.log("[SJFI] [DEBUG] loadJSONObjectsIntoKey(" + storageKey + ") called");
  const storedGraphObjects = localStorage.getItem(storageKey);
  if (storedGraphObjects) {
    storageData = JSON.parse(storedGraphObjects);
  }
};

window.resetLocalStorageByKey = function(storageKey, storageData, debug = false) {
  if (debug) console.log("[SJFI] [DEBUG] resetLocalStorageByKey(" + storageKey + ") called");
  localStorage.removeItem(storageKey);
  storageData = [];
};

window.clearLocalStorageALLKeys = function(debug = false) {
  if (debug) console.log("[SJFI] [DEBUG] clearLocalStorageALLKeys() called");
  localStorage.clear();
}
