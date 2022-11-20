import React from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../../firebase";
import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate, Link } from "react-router-dom";


function Register() {

    const [err,setErr] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];
 
        try{
            const res = await createUserWithEmailAndPassword(auth, email, password)

            const storageRef = ref(storage, displayName);
  
            const uploadTask = uploadBytesResumable(storageRef, file);

            // Register three observers
            uploadTask.on(
            (error) => {
                // Handle unsuccessful uploads
                setErr(true)
            }, 
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) => {
                await updateProfile(res.user,{
                    displayName,
                    photoURL:downloadURL, 
                });
                
                await setDoc(doc(db, "users", res.user.uid),{
                    uid: res.user.uid, 
                    displayName,
                    email,
                    photoURL: downloadURL
                })

                await setDoc(doc(db, "userChats", res.user.uid),{});
                navigate("/");

            });
            }
            );

        }

        catch(err){
            setErr(true)
        }    
    }


    return (
        <div className="panel">
            <div className="form-container">
                <div className="heading">
            {err && <span>Something went wrong!</span>}
                    <h1>Register</h1>
                    <h6 style={{color:"black"}}>Already have account <span> <Link to = "/login">Login</Link></span></h6>
                </div>

                <div className="mid">
                    <form className="form" onSubmit={handleSubmit}>
                        <input className="input" type="text" placeholder="Enter your Name" />
                        <input className="email" type="text" placeholder="Email" />
                        <input className="input" type="password" placeholder="Password" />
                        <input style={{display:"none"}} type="file" id="file"/>
                        <label className="label" htmlFor="file">
                            <i className="icon fa-solid fa-image"></i>
                            <span>Add an image</span>
                        </label>
                        <button className="submitBtn btn btn-primary" type="submit">Register</button>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default Register;