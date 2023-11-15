import { Link } from 'react-router-dom';
import React from 'react';
import { useEffect, useState } from "react";
import { auth, db } from "../fb-config";
import { useParams, useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, deleteDoc } from "firebase/firestore";
import { getAuth, deleteUser, signOut } from "firebase/auth";



function Dashboard() {
  const [name, setName] = useState();
  const [email, setEmail] = useState('');
  const [key, setKey] = useState();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {  
    setKey(params.id)
    //console.log("Message from Context"+value);
    console.log("Use effect executed show.js key"+params.id);
    getCard();
  }, []);

  const getCard = async () => {
    console.log("Get board executed"+params.id);
        try {
            let userEmail = params.id;
            const q = query(collection(db, "cards"), where("email", "==", userEmail));
            const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                //console.log(doc.id, " => ", doc.data());
                setName(doc.data().name);
                setEmail(doc.data().email);
                
              });
            
        } catch (err) {
        }};

 const deleteCard = async () => {
    try {
    let deleteEmail = params.id;
    const q = query(collection(db, "cards"), where("email", "==", deleteEmail));
            const querySnapshot = await getDocs(q);
                querySnapshot.forEach(async(doc) => {
                    await deleteDoc(doc.ref);
                })
                console.log("Document(s) deleted successfully");
                deleteUserAccount();
                navigate(`/`);
            }catch(error) {
                console.error("Error deleting document(s):", error);
            }
        };

 const deleteUserAccount = async () => {
    try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
            await deleteUser(user);
            console.log("User account deleted successfully!");
        } else {
            console.log("No user is currently signed in.");
        }
    } catch(error){
        console.error("Error deleting user account:", error);
    }
 };

 
 const handleLogout = async () => {
  try {
    await signOut(auth);
    navigate("/");
    console.log("signed out successful")
  } catch (error) {
    console.log(error.message);
  }
};
    
  return (
    <div className='dashboard-container'>
        <div>
        <h1 className='welcome-dashboard'>
            Welcome, {name}!            
        </h1> 
        </div>
        <div>
        <div className='form-one-button'>
               <Link to={`/card/${email}`}><button  className="dashboard-button view">View My BizCard</button></Link>
               <Link to={`/edit/${email}`}><button  className="dashboard-button contact">Edit My BizCard</button></Link>
               </div>      
        
             <div className='form-one-button'>
               <button onClick={deleteCard} className="dashboard-button scanqr">Delete</button>
               <button onClick={handleLogout} className="dashboard-button"><Link to='/' className="link backToMain">Logout</Link></button>
             </div>
        </div>
    </div>
  )
}

export default Dashboard