Simple JavaScript File IO
=========================

This quick library is for me to hack on/learn JavaScript, and enable code reuse.

To Use as Submodule
-------------------
```
git submodule add https://github.com/ActuallyFro/SJFI.git scripts/SJFI
```

To Commit Changes
-----------------
```
git add .gitmodules scripts/SJFI
git commit -m "Added new submodule"
```


Example SPA for LocalStorage
----------------------------
**Ensure to update/save the PROPER path for the lib-localstorage.js file!**

```html
<!DOCTYPE html>
<html>
  <head>
    <title>SJFI: EXAMPLE - Reload Form Content</title>

    <script type="text/javascript" src="../lib-localstorage.js"></script>

  </head>
  <body>
    <h1>Welcome to my SPA!</h1>
    <form>
      <label for="formExName">Name:</label>
        <input type="text" id="formExName" name="formExName" oninput="storeFormData()"><br><br>

        <label for="formExMessage">Message:</label><br>
        <textarea id="formExMessage" name="formExMessage" rows="4" cols="50" oninput="storeFormData()"></textarea><br><br>

        <input type="submit" value="Submit">
      </form>

      <hr>
      <button onclick="clearLocalStorage()">Clear Local Storage</button>
  </body>

  <script>
    //------------------------
    //0. DEFAULT VARS
    // const debug = true;

    window.SJFI_storageKey = 'Example_LocalStorage-DATA';    
    
    window.SJFI_data = { // Object === {} <can use .find()> ; Array === [] <maybe .find()?>; String === "" <use it as a .(name)>
        name: "",
        message: ""
    };
    //------------------------

    //----------------------------------------------------------------------
    //I. Store Form content into Local Storage (via SJFI lib) on Form Change
    //----------------------------------------------------------------------
    // I.a. Manual -- Via Submit
      function storeFormData() {
        window.SJFI_data.name = document.getElementById('formExName').value;
        window.SJFI_data.message = document.getElementById('formExMessage').value;

        storeJSONObjectsIntoKey(window.SJFI_storageKey, window.SJFI_data);
      }       

      //I.b. Automatic -- via keyboard input/change of fields
      document.getElementById('formExName').addEventListener('input', function() {storeFormData();}); //Cannot run from <HEAD!>
      document.getElementById('formExMessage').addEventListener('input', function() {storeFormData();});//SAME! --^

    //--------------------------------------
    //II. Load Form content on Page Referesh
    //--------------------------------------
    function loadFormData() {
      let formData = loadJSONObjectsFromKey(SJFI_storageKey);

      if (formData !== null) {
        // if (debug) {console.log('Data loaded from key: ', formData);}

        window.SJFI_data = formData;

        const loadedName = window.SJFI_data.name;
        const loadedMessage = window.SJFI_data.message;

        document.getElementById('formExName').value = loadedName;
        document.getElementById('formExMessage').value = loadedMessage;

      } 
      // else {
      //   // if (debug) {console.error("Data loaded from key is empty...skipping");}
      // }            
    }

    //------------------------
    //III. Clear Local Storage
    //------------------------
    function clearLocalStorage() {
      // From SJFI lib
      clearLocalStorageALLKeys();
      // if (debug) {
      //   console.log('Local Storage cleared.');
      // }
      location.reload();
    }

    //------------------------
    //IV. Default Loads
    //------------------------
    loadFormData();

  </script>
</html>
```

Example SPA for JSON File I/O
-----------------------------
**Ensure to update/save the PROPER path for the lib-JSON-ImpExp.js file!**

```html
<!DOCTYPE html>
<html>
  <head>
    <title>SJFI: EXAMPLE - HTML Table I/O with .json File</title>

    <script type="text/javascript" src="../lib-JSON-ImpExp.js"></script>

  </head>
  <body>
    <h1>Welcome to my SPA!</h1>

    <table border="1">
      <tr>
        <th>Key</th>
        <th>Value</th>
      </tr>
      <tr>
        <td>name</td>
        <td id="TableName"></td>
      </tr>
      <tr>
        <td>message</td>
        <td id="TableMessage"></td>
      </tr>
    </table>

    <hr>
    <button class="btn btn-primary" style="color: blue;" id="export-button" onclick="JSONExport()">Export Current Table</button>
    <button class="btn btn-primary" style="color: green;" id="import-button">Import New Table</button> <!-- Note it's done via listener vs. direct function call!  -->
    <input type="file" id="import-file" style="display:none">
  </body>

  <script>
    //------------------------
    //0. DEFAULT VARS
    window.SJFI_storageKey = 'Example_LocalStorage-DATA';    

    window.SJFI_data = { // Object === {} <can use .find()> ; Array === [] <maybe .find()?>; String === "" <use it as a .(name)>
      name: "A Default Name",
      message: "This data is the default message"
    };

    //General Updating Function
    //-~-~-~-~-~-~-~-~-~-~-~
    function reloadTableData() {
      document.getElementById('TableName').innerHTML = window.SJFI_data.name; //defaults to object-defined name
      document.getElementById('TableMessage').innerHTML = window.SJFI_data.message; //defaults to object-defined message
    }

    // ---------------------------
    // I. JSON Export
    // ---------------------------
    JSONExport = function() {
      SJFIJSONExport(window.SJFI_data,"Table-Data.json");
    }

    // ---------------------------
    // II. JSON Import
    // ---------------------------
    window.importJSONObjects = async function(event) {
      const importedData = await SJFIJSONImport(event.target.files[0]);

      if (importedData) {
        window.SJFI_data = importedData;
        reloadTableData();

        //CONSIDER -- loading data ALSO into the LocalStorage data!
        //Example: storeJSONObjectsIntoKey(window.SJFI_storageKey, window.SJFI_data);
      }
    }

    //------------------------
    //III. Default Loads
    //------------------------
    reloadTableData(); //On page load this runs (so the default data is shown)

    //Import Button Listener
    //-~-~-~-~-~-~-~-~-~-~-~
    const importFileInput = document.getElementById('import-file');
    importFileInput.addEventListener('change', window.importJSONObjects);

    const importButton = document.getElementById('import-button');
      importButton.addEventListener('click', () => {
      importFileInput.click();
    });

  </script>
</html>
```