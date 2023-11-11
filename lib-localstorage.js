// LOCALStorage
window.storeJSONObjectsIntoKey = function(storageKey, storageData, debug = false) {
  if (debug) console.log("[SJFI] [DEBUG] storeJSONObjectsIntoKey(" + storageKey + ") called");
  localStorage.setItem(storageKey, JSON.stringify(storageData));
};

window.loadJSONObjectsFromKey = function(storageKey, debug = false) {
  if (debug) console.log("[SJFI] [DEBUG] loadJSONObjectsIntoKey(" + storageKey + ") called");
  const storedGraphObjects = localStorage.getItem(storageKey);
  if (storedGraphObjects) {
    try {
      let parsedData = JSON.parse(storedGraphObjects);
      if (parsedData !== null && typeof parsedData === 'object' && !Array.isArray(parsedData)) {
        return parsedData;
      } else {
        console.error("[SJFI] [ERROR] Data loaded from key is not an object.");
        return null;
      }
    } catch (error) {
      console.error("[SJFI] [ERROR] Failed to parse data from key:", error);
      return null;
    }
  }

  return null;
};

window.resetLocalStorageByKey = function(storageKey, debug = false) {
  if (debug) console.log("[SJFI] [DEBUG] resetLocalStorageByKey(" + storageKey + ") called");
  localStorage.removeItem(storageKey);
  return {};
};

window.clearLocalStorageALLKeys = function(debug = false) {
  if (debug) console.log("[SJFI] [DEBUG] clearLocalStorageALLKeys() called");
  localStorage.clear();
}
