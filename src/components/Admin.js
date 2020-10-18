import React, { useState } from 'react'
import qs from 'qs'
import axios from 'axios'

function Admin(props){
    const [level, setLevel] = useState(props.admin.niveau)
    const [sup, setSup] = useState(false)

    function upgrad(){
        var data = qs.stringify({
            'token': localStorage.getItem('tokenAdmin'),
            'id': props.admin.id
        });
        var config = {
        method: 'post',
        url: 'http://localhost:8000/admin/upgrad',
        headers: { 
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data : data
        };

        axios(config)
        .then(function (response) {
            var l = level + 1
            setLevel(l)
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    function downgrad(){
        var data = qs.stringify({
            'token': localStorage.getItem('tokenAdmin'),
            'id': props.admin.id
        });
        var config = {
        method: 'post',
        url: 'http://localhost:8000/admin/downgrade',
        headers: { 
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data : data
        };

        axios(config)
        .then(function (response) {
            var l = level - 1
            setLevel(l)
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    
    function supprimer(event){
        if(window.confirm("voulez vous vraiment suprimer cet admin? cet operation est ireversible!")){
            var id = props.admin.id
            console.log(id)
            var data = qs.stringify({
                'token': localStorage.getItem('tokenAdmin'),
                'id': id,
            });
            var config = {
                method: 'post',
                url: "http://localhost:8000/admin/delete",
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
                    <td>{props.admin.firstname}</td>
                    <td>{props.admin.lastname}</td>
                    <td>{props.admin.email}</td>
                    <td>{level}</td>
                    <td className="conatnair-actions">
                        <button onClick={upgrad} className="btn btn-success">upgrad</button>
                        <button onClick={downgrad} className="btn btn-warning">downgrad</button>
                        <button onClick={supprimer} value={props.admin.id} className="btn btn-danger">suprimer</button>
                    </td>
                </tr>
            : 
                null
            }
        </>
    )
}

export default Admin