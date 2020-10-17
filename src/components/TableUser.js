import React, {useState, useEffect} from 'react'
import User from './User'
import qs from 'qs'
import axios from 'axios'

function TableUser(){
    const [users, setUsers] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    useEffect(()=>{
        getUsers()
    }, [])

    function getUsers(){
        var config = {
            method: 'get',
            url: 'http://localhost:8000/admin/get/users?token='+localStorage.getItem('tokenAdmin'),
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data : qs.stringify({'token': localStorage.getItem('tokenAdmin')})
        }
        axios(config)
            .then(function (response){
                setIsLoaded(true)
                setUsers(response.data.data);
            })
            .catch(function (error) {
                console.log(error.response);
            });
    }
    return(
        <div className="container-table">
                {isLoaded == true?
                    <table className="table">
                        <thead>
                            <tr>
                                <th>firstname</th>
                                <th>lastname</th>
                                <th>email</th>
                                <th>job</th>
                                <th>role</th>
                                <th>isAccepted</th>
                                <th>admin</th>
                                <th>actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user=>(
                                <User key={user.id} user={user} />
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


export default TableUser