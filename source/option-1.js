
var worker = new Worker('fileupload.js');
worker.onmessage = function (e) {
    alert(e.data);
}
worker.onerror = werror;
function werror(e) {
    console.log('ERROR: Line ', e.lineno, ' in ', e.filename, ': ', e.message);
}
function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    var files = evt.dataTransfer.files || evt.target.files;
    // FileList object.

    worker.postMessage({
        'files': files
    });
    //Sending File list to worker
    // files is a FileList of File objects. List some properties.
    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
        output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ', f.size, ' bytes, last modified: ', f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a', '</li>');
    }
    document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
}

function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy';
    // Explicitly show this is a copy.
}

// Setup the dnd listeners.
var dropZone = document.getElementById('drop_zone');
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', handleFileSelect, false);
document.getElementById('files').addEventListener('change', handleFileSelect, false);

//////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

// Worker (fileupload.js) :

var file = [],
    p = true;
    
function upload(blobOrFile) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/server', false);
    xhr.onload = function (e) {
    };
    xhr.send(blobOrFile);
}

function process() {
    for (var j = 0; j < file.length; j++) {
        var blob = file[j];

        const BYTES_PER_CHUNK = 1024 * 1024;
        // 1MB chunk sizes.
        const SIZE = blob.size;

        var start = 0;
        var end = BYTES_PER_CHUNK;

        while (start < SIZE) {

            if ('mozSlice' in blob) {
                var chunk = blob.mozSlice(start, end);
            } else {
                var chunk = blob.webkitSlice(start, end);
            }

            upload(chunk);

            start = end;
            end = start + BYTES_PER_CHUNK;
        }
        p = (j = file.length - 1) ? true : false;
        self.postMessage(blob.name + " Uploaded Succesfully");
    }
}


self.onmessage = function (e) {

    for (var j = 0; j < e.data.length; j++)
        files.push(e.data[j]);

    if (p) {
        process()
    }

}
