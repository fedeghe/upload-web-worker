import React, {useState} from 'react'
import Channeljs from '@fedeghe/channeljs'
import uploader from './uploader'

export default ({upload}) => {
    const [percent, setPercent] = useState(upload.percent || 0)
    Channeljs.get('files').sub(upload.id, data => {
        if (data.type === 'progress') {
            setPercent(data.progress.percent)
        }
    })
    return ( <>
        <progress max="100" value={percent}/><span>{percent}% </span>
        <span onClick={() => uploader.abort(upload.id)}>X</span>
    </>)
}