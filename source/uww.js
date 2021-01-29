self.requests = {};
self.onmessage = event => {
    const {data, data: {id, url, file, action = false }} = event;
    const { requests } = self;
    if (!action) return;
    switch (action) {
        case 'startUpload': 
            requests[id] = upload({
                id,
                url,
                file,
                worker: self,
            });
            break;
        case 'abortUpload':
            if (id in requests) {
                requests[id].xhr.abort();
                requests[id].xhr = null;
                delete requests[id];
            }
            break;
        default:
            break;
    }
    postMessage(data);
}
const startpload = ({ id, url, file, worker }) => {
    var xhr = new XMLHttpRequest(),
        total = file.size,
        progress = e => {
            worker.postMessage({
                action: 'progress',
                id,
                fileName: file.name,
                progress: {
                    percent: (100 * e.loaded) / total,
                    loaded: e.loaded,
                    total,
                },
            })
        };
    if (xhr.upload) {
        xhr.upload.addEventListener('progress', progress);
    } else {
        xhr.addEventListener('progress', progress);
    }

    xhr.addEventListener('loadend', () => {
        if ( xhr.status === 200 && xhr.readyState === 4) {
            worker.postMessage({
                action: 'done',
                fileName: file.name,
                id,
            });
        }
    });

    xhr.addEventListener('error', () => {
        worker.postMessage({
            action: 'error',
            id,
            fileName: file.name,
            data: {
                status: xhr.status,
            },
        });
    });

    xhr.open('PUT', url, true);
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*')
    xhr.setRequestHeader('Access-Control-Allow-Headers', '*')
    xhr.setRequestHeader('Content-Type', 'multipart/form-data')
    xhr.send(file)
    return xhr 
}