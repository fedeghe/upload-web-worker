import React, {useState} from 'react'
import Channeljs from '@fedeghe/channeljs'
import { uniqueID } from './utils'
import uploader from './uploader'


const url = 'http://localhost:3000/upload'

export default ({name}) => {
    const [uploads, setUploads] = useState([])
    return <div>
        <p>{name}</p>
        <input type="file" name="myfile" multiple onChange={e => {
            const files = [...e.target.files]
            const ids = files.map(file => uploader.start({
                method:'PUT',
                file,
                url: `${url}?fileName=${file.name}`,
                onStart: data => {
                    setUploads(old => {
                        return [...old, data]
                    })
                    console.log('start')
                    console.log(data)
                    console.log('========')
                },
                onProgress: data => {
                    console.log('progress')
                    console.log(data)
                    console.log('========')
                },
                onEnd: data => {
                    console.log('end')
                    console.log(data)
                    console.log('========')
                }
            }))
            console.log(ids)
        }}/>
        {uploads.length ? (
            <ul>
                {uploads.map(upload => (
                    <li key={`${uniqueID}`}>{JSON.stringify(upload, null, 2)}</li>
                ))}
            </ul>
        ) : null}
        
    </div>
}