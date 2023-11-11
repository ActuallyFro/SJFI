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