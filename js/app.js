/* Open cbz file from list. */
function open_cbz() {
    // Loader
    var loader = document.getElementById('loader');
    loader.setAttribute('display', 'block');

    var sdcard = navigator.getDeviceStorage('sdcard');

    var request = sdcard.get(this.innerHTML);

    request.onsuccess = function() {
        var file = request.result;

        // Remove old comic
        var comic = document.getElementById('comic');
        comic.removeChild(comic.lastChild);

        // Setup new comic
        var comic_pages = document.createElement('div');
        comic.appendChild(comic_pages);

        zip.createReader(new zip.BlobReader(file), function(reader) {
            // get all entries from the zip
            reader.getEntries(function(entries) {
                if (entries.length) {
                    entries.forEach(function(entrie) {
                        var dataURI = entrie.filename.split('.').pop();
                        entrie.getData(new zip.Data64URIWriter('image/' + dataURI),
                            function(text) {
                                image = document.createElement('img');
                                image.setAttribute('src', text);
                                comic_pages.appendChild(image);
                            }, function(current, total) {
                                // onprogress callback
                            });
                    });

                    reader.close(function() {});
                    loader.setAttribute('display', 'none');
                }
            });
        }, function(error) {
            // onerror callback
        });

        document.querySelector("#btn-file-browser-close").click();
    };

    request.onerror = function() {
        console.warn("Unable to open file. " + this.error);
    };
}

/* List files at SD Card. */
function list_files() {
    var list_div = document.getElementById("file-browser-div");

    // Clean old list
    list_div.removeChild(list_div.lastChild);

    // Add new list
    var list = document.createElement('ul');
    list_div.appendChild(list);

    var sdcard = navigator.getDeviceStorage("sdcard");

    var cursor = sdcard.enumerate();

    cursor.onsuccess = function() {
        if (this.result) {
            var filename = this.result.name;

            if (filename.endsWith('.cbz')) {
                var new_file = document.createElement('li');
                new_file.innerHTML = filename;
                new_file.addEventListener('click', open_cbz);
                list.appendChild(new_file);
            }

            this.
            continue ();
        }
    };

    cursor.onerror = function() {
        alert(this.error);
    };
}
