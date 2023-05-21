// LOCALStorage
window.storeJSONObjectsIntoKey = function(storageKey, storageData, debug = false) {
  if (debug) console.log("[SJFI] [DEBUG] storeJSONObjectsIntoKey(" + storageKey + ") called");
  localStorage.setItem(storageKey, JSON.stringify(storageData));
};

window.loadJSONObjectsFromKey = function(storageKey, debug = false) {
  if (debug) console.log("[SJFI] [DEBUG] loadJSONObjectsIntoKey(" + storageKey + ") called");
  const storedGraphObjects = localStorage.getItem(storageKey);
  if (storedGraphObjects) {
    return JSON.parse(storedGraphObjects);
  }
  return null;
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
