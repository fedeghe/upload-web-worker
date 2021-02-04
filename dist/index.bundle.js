module.exports=(()=>{"use strict";var t={732:(e,n,t)=>{t.r(n),t.d(n,{default:()=>s});function i(e){return e.charAt(0).toUpperCase()+e.slice(1)}var d=new function(){var e=0,n=this;this.prefix="UWW_",this.toString=function(){return e+=1,n.prefix+e}};self.FormData=o;var r=XMLHttpRequest.prototype.send;function o(){if(!(this instanceof o))return new o;this.boundary="------RWWorkerFormDataBoundary"+Math.random().toString(36);var r=this.data=[];this.__append=function(e){var n,t=0;if("string"==typeof e)for(n=e.length;t<n;t++)r.push(255&e.charCodeAt(t));else if(e&&e.byteLength)for((n=(e=!("byteOffset"in e)?new Uint8Array(e):e).byteLength);t<n;t++)r.push(255&e[t])}}XMLHttpRequest.prototype.send=function(e){return e instanceof o&&(e.__endedMultipart||e.__append("--"+e.boundary+"--\r\n"),e.__endedMultipart=!0,this.setRequestHeader("Content-Type","multipart/form-data; boundary="+e.boundary),e=new Uint8Array(e.data).buffer),r.call(this,e)},o.prototype.append=function(e,n,t){this.__endedMultipart&&(this.data.length-=this.boundary.length+6,this.__endedMultipart=!1);var r=Object.prototype.toString.call(n),o="--"+this.boundary+'\r\nContent-Disposition: form-data; name="'+e+'"';if(/^\[object (?:Blob|File)(?:Constructor)?\]$/.test(r))return this.append(e,new Uint8Array((new FileReaderSync).readAsArrayBuffer(n)),t||n.name);/^\[object (?:Uint8Array|ArrayBuffer)(?:Constructor)?\]$/.test(r)?(o+='; filename="'+(t||"blob").replace(/"/g,"%22")+'"\r\n',o+="Content-Type: application/octet-stream\r\n\r\n",this.__append(o),this.__append(n),o="\r\n"):o+="\r\n\r\n"+n+"\r\n",this.__append(o)};function a(n,e){var t,r=Object.keys(n);return Object.getOwnPropertySymbols&&(t=Object.getOwnPropertySymbols(n),e&&(t=t.filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})),r.push.apply(r,t)),r}function u(r){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?a(Object(o),!0).forEach(function(e){var n,t;n=r,e=o[t=e],t in n?Object.defineProperty(n,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):n[t]=e}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(o)):a(Object(o)).forEach(function(e){Object.defineProperty(r,e,Object.getOwnPropertyDescriptor(o,e))})}return r}function l(e,n){if(null==e)return{};var t,r=function(e,n){if(null==e)return{};var t,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)t=a[r],0<=n.indexOf(t)||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols)for(var o=Object.getOwnPropertySymbols(e),a=0;a<o.length;a++)t=o[a],0<=n.indexOf(t)||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t]);return r}var t="self.requests = {};\nself.onmessage = event => {\n    const {\n        data: {\n            id, url, file, method, headers,\n            action = false\n        }\n    } = event;\n    const { requests } = self;\n    if (!action) return;\n    switch (action) {\n        case 'start-upload': \n            post = true;\n            requests[id] = upload({\n                id,\n                url,\n                file,\n                headers,\n                method, \n                worker: self,\n            });\n            break;\n        case 'abort-upload':\n            post = true;\n            if (id in requests) {\n                requests[id].xhr.abort();\n                requests[id].xhr = null;\n                delete requests[id];\n            }\n            break;\n        default:\n            break;\n    }\n};\nconst upload = ({ id, url, file, worker, method, headers = {} }) => {\n    const xhr = new XMLHttpRequest(),\n        total = file.size,\n        progress = e => {\n            worker.postMessage({\n                action: 'progress',\n                id,\n                fileName: file.name,\n                progress: {\n                    percent: ((100 * e.loaded) / total).toFixed(2),\n                    loaded: e.loaded,\n                    total,\n                }\n            });\n        };\n    if (xhr.upload) {\n        xhr.upload.addEventListener('progress', progress);\n    } else {\n        xhr.addEventListener('progress', progress);\n    }\n    xhr.addEventListener('loadend', () => {\n        if ( xhr.status === 200 && xhr.readyState === 4) {\n            worker.postMessage({\n                action: 'end',\n                fileName: file.name,\n                id,\n            });\n        }\n    });\n\n    xhr.addEventListener('error', () => {\n        worker.postMessage({\n            action: 'error',\n            id,\n            fileName: file.name,\n            data: {\n                status: xhr.status,\n            }\n        });\n    });\n    xhr.addEventListener('abort', () => {\n        worker.postMessage({\n            action: 'abort',\n            id\n        });\n    });\n    \n\n    xhr.open(method, url, true);\n\n    Object.keys(headers).forEach(h => xhr.setRequestHeader(h, headers[h]));\n    \n    if (method === 'PUT') {\n        xhr.send(file);\n    }\n    if (method === 'POST') {\n        debugger;\n        var formD = new FormData();\n        debugger;\n        formD.append(file.name, file);\n        debugger;\n        xhr.send(formD);\n        debugger;\n    }\n    \n    \n    worker.postMessage({\n        action: 'start',\n        id,\n        fileName: file.name,\n    });\n    \n    return { xhr };\n}".replace(/\n|\s{2,}/gm," "),n=new Blob([t],{type:"text/javascript"}),t=window.webkitURL||window.URL,p=new Worker(t.createObjectURL(n)),c=["start","progress","end","error","abort"],f={worker:p,queue:{},start:function(e){var n=e.file,t=e.url,r=e.headers,o=e.method,a=l(e,["file","url","headers","method"]),s="".concat(d),e=u({id:s,url:t,file:{name:n.name,type:n.type,size:n.size,loaded:0,percent:0}},c.reduce(function(e,n){n="on".concat(i(n));return e[n]=a[n]||null,e},{}));return f.queue[s]=e,p.postMessage({action:"start-upload",id:s,url:t,file:n,method:o,headers:r}),s},abort:function(e){p.postMessage({action:"abort-upload",id:e})}};f.worker.onmessage=function(e){var n=e.data,t=e.data,r=t.id,o=t.action,e="on".concat(i(o)),t=f.queue[r];t&&c.includes(o)&&t[e]&&t[e](n),"onAbort"===e&&r in f.queue&&setTimeout(function(){delete f.queue[r]},500)};const s=f}},r={};function o(e){if(r[e])return r[e].exports;var n=r[e]={exports:{}};return t[e](n,n.exports,o),n.exports}return o.d=(e,n)=>{for(var t in n)o.o(n,t)&&!o.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:n[t]})},o.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o(732)})();