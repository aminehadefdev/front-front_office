import React, {useState, useEffect} from 'react'
import Video from './Video'
import qs from 'qs'
import axios from 'axios'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {  } from '@fortawesome/free-regular-svg-icons';

import ModalAddVideo from './ModalAddVideo'

function Videos(){
    const [videos, setVideos] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    const [show, setShow] = useState(false)

    useEffect(()=>{
        getVideos()
    }, [])

    function getVideos(){
        var config = {
            method: 'get',
            url: 'http://localhost:8000/videos',
        };

        axios(config)
        .then(function (response) {
            setIsLoaded(true)
            setVideos(response.data.videos)
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    return (
        <div className="constainer-videos">
            <button onClick={()=>{setShow(true)}} className="btn btn-primary add">
                <FontAwesomeIcon icon={faPlus} />
            </button>

            <ModalAddVideo arVideo={videos} setVideos={setVideos} show={show} close={()=>setShow(false)}/>

            {isLoaded === true?
                <table className="table">
                    <thead>
                        <tr>
                            <th>image</th>
                            <th>title</th>
                            <th>path</th>
                            <th>role</th>
                            <th>description</th>
                            <th>actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {videos.map(video=>(
                            <Video key={video.id} video={video} />
                        ))}
                    </tbody>
                </table>        
                :
                <div className="spinner-border text-dark mySpinner" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            }

        </div>
    )
}

export default Videos