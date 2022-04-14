import React from 'react'
import './ProfileClient.css'
import { Avatar, Input } from "antd";

const ProfileClient = (props) => {
    const {data} = props;

    return (
        <div className='ProfileClientWrapper'>
            <div className='ProfileClientHeader'>
                Mon Profil
            </div>
            <div className='ProfileClientAvatar'>
                <Avatar size={100} style={{ color: "#f56a00", backgroundColor: "#fde3cf"}}>s</Avatar>
            </div>
            <div className='ProfileClientEmail'>
                <div>Email :</div>
                <div>{data.find(att => att.Name === "email").Value}</div>
            </div>
            <div className='ProfileClientPassword'>
                <div>Modifier le mot de passe :</div>
                <div><Input style={{width: "80%"}} placeholder='Nouveau mot de passe'/></div>
            </div>
        </div>
    )
}

export default ProfileClient
