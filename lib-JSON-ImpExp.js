
window.SJFIJSONExport = function(fileToWrite, debug = false) {
  if (debug) {
    console.log("X.X.2 Export graph objects to JSON file");
  }

  const data = JSON.stringify(fileToWrite, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'graph-objects.json';
  a.click();
  URL.revokeObjectURL(url);
}

window.SJFIJSONImport = function(fileToRead, debug = false) {
  if (debug) {
    console.log("X.X.3 Import graph objects to JSON file");
  }

  if (fileToRead) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        const contents = e.target.result;
        try {
          const importedGraphObjects = JSON.parse(contents);
          resolve(importedGraphObjects);
        } catch (error) {
          reject('Invalid JSON file');
        }
      };
      reader.readAsText(fileToRead);
    });
  }
}