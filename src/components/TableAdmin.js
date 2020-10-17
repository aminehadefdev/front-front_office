import React, {useState, useEffect} from 'react'
import Admin from './Admin'
import qs from 'qs'
import axios from 'axios'

function TableAdmin(){
    const [admins, setAdmins] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    useEffect(()=>{
        getAdmins()
    }, [])

    function getAdmins(){
        var config = {
            method: 'get',
            url: 'http://localhost:8000/admin/gets?token='+localStorage.getItem('tokenAdmin'),
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data : qs.stringify({'token': localStorage.getItem('tokenAdmin')})
        }
        axios(config)
            .then(function (response){
                setIsLoaded(true)
                setAdmins(response.data.data);
            })
            .catch(function (error) {
                console.log(error.response);
            });
    }
    return(
        <div className="container-table">
                {isLoaded === true?
                    <table className="table">
                        <thead>
                            <tr>
                                <th>firstname</th>
                                <th>lastname</th>
                                <th>email</th>
                                <th>niveau</th>
                                <th>actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {admins.map(admin=>(
                                <Admin key={admin.id} admin={admin} />
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


export default TableAdmin