import React, {useState} from 'react'
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {  } from '@fortawesome/free-regular-svg-icons';

import ModalAddVideo from './ModalAddVideo'

function Videos(){
    const [show, setShow] = useState(false)
    function addVideo(){

    }


    return (
        <div className="constainer-videos">
            <button onClick={()=>{setShow(true)}} className="btn btn-primary add"><FontAwesomeIcon icon={faPlus} /></button>
            <ModalAddVideo show={show} close={()=>setShow(false)}/>
        </div>
    )
}

export default Videos