import Worker from 'worker-loader!./uww'
import { uniqueID, ucFirst } from './utils'

const worker = new Worker(),
    events = ['start', 'progress', 'end', 'error'],
    uploader = {
        worker,
        queue: {},
        start: ({file, url, headers, method, ...rest }) => {
            const id = `${uniqueID}`,
                entry = {
                    id,
                    url,
                    file: {
                        name: file.name,
                        type: file.type,
                        size: file.size,
                        loaded: 0,
                        percent: 0,
                    },
                    ...(events.reduce((acc, e) => {
                        const n = `on${ucFirst(e)}`;
                        acc[n] = rest[n] || null;
                        return acc;
                    } , {}))
                };
            uploader.queue[id] = entry;
            worker.postMessage({
                action: 'start-upload',
                id, url, file, method, headers
            });
            return id;
        },
        abort: id => {
            if (id in uploader.queue) delete uploader.queue[id];
            worker.postMessage({
                action: 'abort-upload',
                id
            });
        },
    };

uploader.worker.onmessage = e => {
    const {
            data,
            data: {id, action}
        } = e,
        eventer = `on${ucFirst(action)}`,
        upload = uploader.queue[id];
    upload
    && events.includes(action)
    && upload[eventer]
    && upload[eventer](data);
}

export default uploader