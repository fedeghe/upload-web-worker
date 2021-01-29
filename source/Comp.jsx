import React, {useState} from 'react'
import Channeljs from '@fedeghe/channeljs'

export default ({name}) => {
    const [n, setN] = useState(name)
    Channeljs.get('java').sub('message', data => {
        setN(data)
    })
    return <p>{n}</p>
}