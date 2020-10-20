import React,{useState} from 'react'
import axios from 'axios'
import qs from 'qs'

function Video(props){
    const [sup, setSup] = useState(false)

    function suprimer(){
        if(window.confirm('etes vous sure de vouloir supprimer cet video? cet acte est ireversible!')){
            var data = qs.stringify({
            'id': props.video.id
            });
            var config = {
                method: 'post',
                url: 'http://localhost:8000/admin/video/delete',
                headers: { 
                    'token': localStorage.getItem('tokenAdmin'), 
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data : data
            };

            axios(config)
            .then(function (response) {
                setSup(true)
            })
            .catch(function (error) {
                console.log(error.response);
            });
        }
    }

    return(
        <>
        {
        sup === false ?
            <tr>
                <td>
                    <img className="miniatur" src={"http://localhost:8000/static/"+props.video.image} />
                </td>
                <td>{props.video.title}</td>
                <td>
                    <a target="_blank" href={props.video.path}>video</a>
                </td>
                <td>{props.video.role}</td>
                <td>{props.video.description}</td>
                <td className="conatnair-actions">
                    <button className="btn btn-danger" onClick={suprimer}>suprimer</button>
                </td>
            </tr>
        : 
            null
        }
    </>
    )
}

export default Video