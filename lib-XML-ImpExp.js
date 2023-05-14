window.SJFIXMLExportText = function(blob, filename, debug = false) {
    if (debug) {
        console.log("[SJFI] [XML Export] saving '" + filename+ "' with provided data");
    }

    if (window.navigator.msSaveOrOpenBlob) // IE10+ -- thanks CoPilot ... -_-
        window.navigator.msSaveOrOpenBlob(blob, filename);

    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(blob);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}
