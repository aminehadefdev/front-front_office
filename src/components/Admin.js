import React from 'react'
// import qs from 'qs'
// import axios from 'axios'

function Admin(props){
    //const [isAccepted, setIsAccepted] = useState(props.user.isAccepted)

    return (
        <>
            <tr>
                <td>{props.admin.firstname}</td>
                <td>{props.admin.lastname}</td>
                <td>{props.admin.email}</td>
                <td>{props.admin.niveau}</td>
                <td className="conatnair-actions">
                    <button value={props.admin.id} className="btn btn-danger">suprimer</button>
                </td>
            </tr>
        </>
    )
}

export default Admin