// LOCALStorage
window.saveFunction = function(storageKey, debug = false) {
  if (debug) console.log("[SJFI] [DEBUG] saveFunction(" + storageKey + ") called");
  localStorage.setItem(storageKey, JSON.stringify(window.graphObjects));
};

window.loadGraphObjects = function(storageKey, debug = false) {
  if (debug) console.log("[SJFI] [DEBUG] loadGraphObjects(" + storageKey + ") called");
  const storedGraphObjects = localStorage.getItem(storageKey);
  if (storedGraphObjects) {
    window.graphObjects = JSON.parse(storedGraphObjects);
    updateTable();
  }
};

window.resetLocalStorage = function(storageKey, debug = false) {
  if (debug) console.log("[SJFI] [DEBUG] resetLocalStorage(" + storageKey + ") called");
  localStorage.removeItem(storageKey);
  window.graphObjects = [];
  updateTable();
};
