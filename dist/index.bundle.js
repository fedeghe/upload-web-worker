module.exports=(()=>{"use strict";var r={920:(e,n,r)=>{r.r(n),r.d(n,{default:()=>t});function i(e){return e.charAt(0).toUpperCase()+e.slice(1)}var u=new function(){var e=0,n=this;this.prefix="UWW_",this.toString=function(){return e+=1,n.prefix+e}};function s(n,e){var r,t=Object.keys(n);return Object.getOwnPropertySymbols&&(r=Object.getOwnPropertySymbols(n),e&&(r=r.filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})),t.push.apply(t,r)),t}function l(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?s(Object(o),!0).forEach(function(e){var n,r;n=t,e=o[r=e],r in n?Object.defineProperty(n,r,{value:e,enumerable:!0,configurable:!0,writable:!0}):n[r]=e}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):s(Object(o)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))})}return t}function d(e,n){if(null==e)return{};var r,t=function(e,n){if(null==e)return{};var r,t,o={},s=Object.keys(e);for(t=0;t<s.length;t++)r=s[t],0<=n.indexOf(r)||(o[r]=e[r]);return o}(e,n);if(Object.getOwnPropertySymbols)for(var o=Object.getOwnPropertySymbols(e),s=0;s<o.length;s++)r=o[s],0<=n.indexOf(r)||Object.prototype.propertyIsEnumerable.call(e,r)&&(t[r]=e[r]);return t}var r="self.requests = {};\nself.onmessage = event => {\n    const {\n        data: {\n            id, url, file, method, headers,\n            action = false\n        }\n    } = event;\n    const { requests } = self;\n    if (!action) return;\n    switch (action) {\n        case 'start-upload': \n            post = true;\n            requests[id] = upload({\n                id,\n                url,\n                file,\n                headers,\n                method, \n                worker: self,\n            });\n            break;\n        case 'abort-upload':\n            post = true;\n            if (id in requests) {\n                requests[id].xhr.abort();\n                requests[id].xhr = null;\n                delete requests[id];\n            }\n            break;\n        default:\n            break;\n    }\n};\nconst upload = ({ id, url, file, worker, method, headers = {} }) => {\n    const xhr = new XMLHttpRequest(),\n        total = file.size,\n        progress = e => {\n            worker.postMessage({\n                action: 'progress',\n                id,\n                fileName: file.name,\n                progress: {\n                    percent: ((100 * e.loaded) / total).toFixed(2),\n                    loaded: e.loaded,\n                    total,\n                }\n            });\n        };\n    if (xhr.upload) {\n        xhr.upload.addEventListener('progress', progress);\n    } else {\n        xhr.addEventListener('progress', progress);\n    }\n    xhr.addEventListener('loadend', () => {\n        if ( xhr.status === 200 && xhr.readyState === 4) {\n            worker.postMessage({\n                action: 'end',\n                fileName: file.name,\n                id,\n            });\n        }\n    });\n\n    xhr.addEventListener('error', () => {\n        worker.postMessage({\n            action: 'error',\n            id,\n            fileName: file.name,\n            data: {\n                status: xhr.status,\n            }\n        });\n    });\n    xhr.addEventListener('abort', () => {\n        worker.postMessage({\n            action: 'abort',\n            id\n        });\n    });\n    \n\n    xhr.open(method, url, true);\n\n    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');\n    xhr.setRequestHeader('Access-Control-Allow-Headers', '*');\n    xhr.setRequestHeader('Content-Type', 'multipart/form-data');\n    Object.keys(headers).forEach(h => xhr.setRequestHeader(h, headers[h]));\n    \n    \n    xhr.send(file);\n    worker.postMessage({\n        action: 'start',\n        id,\n        fileName: file.name,\n    });\n    \n    return { xhr };\n}".replace(/\n|\s{2}/gm," "),n=new Blob([r],{type:"text/javascript"}),r=window.webkitURL||window.URL,c=new Worker(r.createObjectURL(n)),p=["start","progress","end","error","abort"],f={worker:c,queue:{},start:function(e){var n=e.file,r=e.url,t=e.headers,o=e.method,s=d(e,["file","url","headers","method"]),a="".concat(u),e=l({id:a,url:r,file:{name:n.name,type:n.type,size:n.size,loaded:0,percent:0}},p.reduce(function(e,n){n="on".concat(i(n));return e[n]=s[n]||null,e},{}));return f.queue[a]=e,c.postMessage({action:"start-upload",id:a,url:r,file:n,method:o,headers:t}),a},abort:function(e){c.postMessage({action:"abort-upload",id:e})}};f.worker.onmessage=function(e){var n=e.data,r=e.data,t=r.id,o=r.action,e="on".concat(i(o)),r=f.queue[t];r&&p.includes(o)&&r[e]&&r[e](n),"onAbort"===e&&t in f.queue&&setTimeout(function(){delete f.queue[t]},500)};const t=f}},t={};function o(e){if(t[e])return t[e].exports;var n=t[e]={exports:{}};return r[e](n,n.exports,o),n.exports}return o.d=(e,n)=>{for(var r in n)o.o(n,r)&&!o.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})},o.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o(920)})();