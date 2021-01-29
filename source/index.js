import React from 'react'
import ReactDOM from 'react-dom'

import uploader from './uploader'

ReactDOM.render(
    <span onClick={() => 
       uploader.start() 
    }>Hello World</span>,
    document.getElementById('root')
);