import React from 'react'
import ReactDOM from 'react-dom'
import Channeljs from '@fedeghe/channeljs'

import Comp from './Comp'
import uploader from './uploader'

ReactDOM.render(
    <>
        <span onClick={() => {
            console.log(uploader) 
            Channeljs.get('java').pub('message', "another name")
        }}>Hello World</span>
        <Comp name="Federico"/>
    </>,
    document.getElementById('root')
);