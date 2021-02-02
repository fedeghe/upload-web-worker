self.requests = {};
self.onmessage = event => {
    const {
        data: {
            id, url, file, method = 'PUT', headers = {},
            action = false
        }
    } = event;
    const { requests } = self;
    if (!action) return;
    switch (action) {
        case 'start-upload': 
            post = true;
            requests[id] = upload({
                id,
                url,
                file,
                headers,
                method, 
                worker: self,
            });
            break;
        case 'abort-upload':
            post = true;
            if (id in requests) {
                requests[id].xhr.abort();
                requests[id].xhr = null;
                delete requests[id];
            }
            break;
        default:
            break;
    }
}
const upload = ({ id, url, file, worker, method, headers }) => {
    const xhr = new XMLHttpRequest(),
        total = file.size,
        progress = e => {
            worker.postMessage({
                action: 'progress',
                id,
                fileName: file.name,
                progress: {
                    percent: parseFloat(((100 * e.loaded) / total).toFixed(2), 10),
                    loaded: e.loaded,
                    total,
                },
            });
        };
    if (xhr.upload) {
        xhr.upload.addEventListener('progress', progress);
    } else {
        xhr.addEventListener('progress', progress);
    }
    xhr.addEventListener('loadend', () => {
        if ( xhr.status === 200 && xhr.readyState === 4) {
            worker.postMessage({
                action: 'end',
                fileName: file.name,
                id,
            });
        }
    });

    xhr.addEventListener('error',
        () => worker.postMessage({
            action: 'error',
            id,
            fileName: file.name,
            data: {
                status: xhr.status,
            },
        })
    );
    xhr.addEventListener('abort',
        () => worker.postMessage({
            action: 'abort',
            id
        })
    );

    xhr.open(method, url, true);
    Object.keys(headers).forEach(h => xhr.setRequestHeader(h, headers[h]));
    xhr.send(file);
    worker.postMessage({
        id,
        action: 'start',
        fileName: file.name,
    });
    
    return { xhr };
}