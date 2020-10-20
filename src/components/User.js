import React, {useState} from 'react'
import qs from 'qs'
import axios from 'axios'

function User(props){

    const [isAccepted, setIsAccepted] = useState(props.user.isAccepted)
    const [sup, setSup] = useState(false)

    function accepter(event){
        if(isAccepted === true){
            return 0
        }
        var id = event.currentTarget.value
        var data = qs.stringify({
            'token': localStorage.getItem('tokenAdmin'),
            'id': id,
        });
        var config = {
            method: 'post',
            url: 'http://localhost:8000/admin/accept/user',
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data : data
        };
           
        axios(config)
            .then(function (response) {
                setIsAccepted(1)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function refuser(event){
        if(isAccepted === false){
            return 0
        }
        var id = event.currentTarget.value
        var data = qs.stringify({
            'token': localStorage.getItem('tokenAdmin'),
            'id': id,
        });
        var config = {
            method: 'post',
            url: 'http://localhost:8000/admin/refuse/user',
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data : data
        };
           
        axios(config)
            .then(function (response) {
                setIsAccepted(2)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function supprimer(event){
        if(window.confirm("voulez vous vraiment suprimer cet utilisateur? cet operation est ireversible!")){
            var id = event.currentTarget.value
            var data = qs.stringify({
                'token': localStorage.getItem('tokenAdmin'),
                'id': id,
            });
            var config = {
                method: 'post',
                url: "http://localhost:8000/admin/user/delete",
                headers: { 
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data : data
            };
               
            axios(config)
                .then(function (response) {
                        setSup(true)
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

    }

    return (
        <>
        {
            sup === false ?
                <tr>
                    <td>{props.user.firstname}</td>
                    <td>{props.user.lastname}</td>
                    <td>{props.user.email}</td>
                    <td>{props.user.job}</td>
                    <td>{props.user.role === 1? "mentore":"mentorée"}</td>
                    <td>{isAccepted === 1? 'true': isAccepted === 0? "?": "false"}</td>
                    <td>amineBidon@gmail.com</td>
                    <td className="conatnair-actions">
                        <button onClick={accepter} value={props.user.id} className="btn btn-success">Acepter</button>
                        <button onClick={refuser} value={props.user.id} className="btn btn-warning">refuser</button>
                        <button onClick={supprimer} value={props.user.id} className="btn btn-danger">suprimer</button>
                    </td>
                </tr>
            :
                null
        }
        </>
    )
}

export default User