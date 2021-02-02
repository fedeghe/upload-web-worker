import React, {useState, useEffect} from 'react'
import Channeljs from '@fedeghe/channeljs'
import uploader from './uploader'
// import './style.css'

export default ({upload = {}}) => {
    const [percent, setPercent] = useState(upload.percent || 0)
    let mounted = false;
    useEffect(() => {
        mounted = true
        Channeljs.get('files').sub(upload.id, data => 
            mounted
            && data.type === 'progress'
            && setPercent(data.progress.percent)
        )
        return () => {
            mounted = false
            Channeljs.get('files').unsub(upload.id)
        }
    }, []);

    if (upload.aborted) {
        return <div>{upload.fileName} ❌ aborted</div>
    }

    return percent < 100
        ? <div className="uploading">
                uploading {upload.fileName}
                <progress max="100" value={percent}/>
                <span> {percent}% </span>
                <span class="abort" onClick={() => uploader.abort(upload.id)}>abort now</span>
            </div>
        : <div className="done"> {upload.fileName} ✅ </div>
            
}