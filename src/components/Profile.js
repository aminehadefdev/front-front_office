import React,{useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

import TableUser from './TableUser'
import TableAdmin from './TableAdmin'

function Profile(){
    const [usersActive, setUsersActive] = useState(true)
    const [adminsActive, setAdminsActive] = useState(false)
    const [videosActive, setVideosActive] = useState(false)
    const [RGPD_active, setRGPD_active] = useState(false)
    const [CGU_active, setCGU_active] = useState(false)

    function U(){
        setUsersActive(true)
        setAdminsActive(false)
        setVideosActive(false)
        setRGPD_active(false)
        setCGU_active(false)
    }

    function A(){
        setUsersActive(false)
        setAdminsActive(true)
        setVideosActive(false)
        setRGPD_active(false)
        setCGU_active(false)
    }

    function V(){
        setUsersActive(false)
        setAdminsActive(false)
        setVideosActive(true)
        setRGPD_active(false)
        setCGU_active(false)
    }

    function R(){
        setUsersActive(false)
        setAdminsActive(false)
        setVideosActive(false)
        setRGPD_active(true)
        setCGU_active(false)
    }

    function C(){
        setUsersActive(false)
        setAdminsActive(false)
        setVideosActive(false)
        setRGPD_active(false)
        setCGU_active(true)
    }

    return(
        <div className="container-admin">
            <div className="constainr-btns">
                <button onClick={U} className={"btn btn-primary" + ( usersActive == true ? " active": "")}>Users</button>
                <button onClick={A} className={"btn btn-primary" + (adminsActive == true? " active":"")}>Admins</button>
                <button onClick={V} className={"btn btn-primary" + (videosActive == true? " active":"")}>Videos</button>
                <button onClick={R} className={"btn btn-primary" + (RGPD_active == true? " active":"")}>RGPD</button>
                <button onClick={C} className={"btn btn-primary" + (CGU_active == true? " active":"")}>CGU</button>
            </div>
            {usersActive == true ? <TableUser /> : null}
            {adminsActive == true ? <TableAdmin /> : null}
        </div>
    )
}

export default Profile