# upload-web-worker

Using a web worker to upload a file **could not be easier**: 

Install dependency

```
yarn add upload-web-worker
```
use it

``` jsx
import uww from 'upload-web-worker'

export default () => <input
    type="file"
    multiple
    onChange={e => {
        [...e.target.files].map(
            file => uww.start({
                // method: 'PUT' // default
                /**
                 * PUT is the default, and actually
                 * the right verb
                 * 
                 * at the moment is THE ONLY one supported,
                 * thus you can skip that;
                 * 
                 * DO NOT expect the upload to work
                 * when setting a different verb 
                 */
                file,
                url: 'YOUR_UPLOAD_URL',
                headers: {
                    'Access-Control-Allow-Origin' : '*',
                    'Access-Control-Allow-Headers' :'*',
                    'Content-Type': 'multipart/form-data'
                },
                onStart: data => { /* ... */},
                onProgress: data => { /* ... + progress data */},
                onAbort: data => { /* ... */},
                onEnd: data => { /* ... */},
            })
        )
    }}
>
```
**No request headers are sent by default, thus you will have to provide them**  

## Listeners 
All the `onXXX` listeners receive a `data` object which has always at least the following fields:
``` json
{
    "id": "UWW_1",
    "action": "start",
    "fileName": "2019_100_00000_F24ESEG_mpdf.pdf"
}
```
where
- id: a unique id associated with this upload
- action: the action
- fileName: the upload file name, clearly

with the exception of `onProgress` which additionally receives **inside** `data` also a `progress` field as follows:

``` json
"progress": {
    "percent": 4.84,
    "loaded": 9601024,
    "total": 198546361 
}
```
where
- percent: the progress percentage with two decimals
- loaded: amount of Bytes already loaded
- total: total amount of Bytes of the uploading file
## Aborting

_upload-web-worker_ offert **two** methods, one is `start` as we saw above, it returns an _id_ for this upload (the same value that is passed to the listeners).  

Using the `id` returned by `start` we can invoke `abort` passing this `id`:

``` js
uww.abort("UWW_1") // and this will trigger the onAbort if set
```

---


## Minimal working example *

In case you cloned this repo you can start a minimal example, which also shows a possible simple way to show the uploading status for all the uploading files. In this example I'm using React.

Start a minimal local server which exposes a PUT enpoint on  `http://localhost:3000/upload`  
 ```
 cd source/srv
 yarn
 node index.js
 ```
and let it run, then in another terminal tab, in the repo root
```
yarn & yarn start
```

now upload one or more files and check the `source/srv/uploads` folder content. **

---
##### * requires a clone from github
##### ** aborted streams are anyway partially written, but this is completely another story
