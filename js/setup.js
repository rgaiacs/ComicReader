(function() {
    document.querySelector('#btn-help').addEventListener('click', function() {
        document.querySelector('#main').setAttribute('style', 'display:none;');
        document.querySelector('#help').removeAttribute('style');
        document.querySelector('#file-browser').setAttribute('style', 'display:none;');
    });
    document.querySelector('#btn-file-browser-open').addEventListener('click', function() {
        list_files();
        document.querySelector('#main').setAttribute('style', 'display:none;');
        document.querySelector('#help').setAttribute('style', 'display:none;');
        document.querySelector('#file-browser').removeAttribute('style');
    });
    document.querySelector('#btn-help-close').addEventListener('click', function() {
        document.querySelector('#main').removeAttribute('style');
        document.querySelector('#help').setAttribute('style', 'display:none;');
        document.querySelector('#file-browser').setAttribute('style', 'display:none;');
    });
    document.querySelector('#btn-file-browser-close').addEventListener('click', function() {
        document.querySelector('#main').removeAttribute('style');
        document.querySelector('#help').setAttribute('style', 'display:none;');
        document.querySelector('#file-browser').setAttribute('style', 'display:none;');
    });
})();
