import React, { useContext } from 'react';
import {signOut} from "firebase/auth";
import {auth} from "../../firebase";
import { AuthContext } from '../../context/AuthContext';

function Navbar() {

    const  {currentUser} = useContext(AuthContext)
    
    return (
        <div className="nav">
            <div className="user">
                {/* <img className="profile-photo" src="https://images.pexels.com/photos/13378457/pexels-photo-13378457.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" /> */}
                <img className="profile-photo" src={currentUser.photoURL} alt="" />
                {/* <span className="profile-name">Arshad</span> */}
                <span className="profile-name">{currentUser.displayName}</span>
                <i onClick={()=>signOut(auth)} title="Logout" className="logout fa-solid fa-power-off"></i>
            </div>  
        </div>
    );
}

export default Navbar;