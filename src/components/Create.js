import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import logo from '../images/logo_fsa.png'
import { auth, colRef } from '../fb-config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc } from 'firebase/firestore';
import { storage } from '../fb-config';
import { v4 as uuidv4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import "firebase/compat/storage";

function Create(){
    const [name, setName] = useState('');
    const [job, setJob] = useState('');
    const [company,setCompany] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [website, setWebsite] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const [profilePhoto, setProfilePhoto] = useState();
    const [password, setPassword] = useState('');
    
    const navigate = useNavigate();
       
    const createCard=(e)=> {
        e.preventDefault();
        // Validation for empty fields
        if (name === '' || job === '' || company === '' || mobile === '' || website === '' || linkedin === '' || email === '' || password === '') {
        // Show an error message to the user
        alert('Please fill in all required fields');
        return;
        }

          // Validation for email format
        const emailRegex = /^\S+@\S+\.\S+$/;
          if (!emailRegex.test(email)) {
          // Show an error message to the user
          alert('Please enter a valid email address');
        return;
        }

         // Validation for password length
        if (password.length < 8) {
        // Show an error message to the user
        alert('Password must be at least 8 characters long');
        return;
        }

         // Validation for mobile number format
        const phoneRegex = /^[0-9]{10}$/; // Matches a 10-digit number
        if (!phoneRegex.test(mobile)) {
          // Show an error message to the user
        alert('Please enter a valid 10-digit mobile number');
        return;
        }

        console.log('Name : '+ name +' Email: ' +email +' password' +password);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
       // Signed up 
            const user = userCredential.user;
       // ...
                })
                .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                });
        
        saveCard();
        emailCard();
        
      }
    
      const emailCard = (e) => {
        const templateId = 'template_60hwxu2';
        const serviceID = "service_7i2jnm4";
        sendFeedback(serviceID, templateId, { from_name: name, email: email})
      };

      const sendFeedback = (serviceID, templateId, variables) => {
        window.emailjs.send(
            serviceID, templateId,
            variables
        ).then(res => {
            console.log('Email successfully sent!')
        })
            .catch(err => console.error('There has been an Error.', err))
    }
    
    

    const saveCard = async() => {       
        console.log('Save Name : '+name + ' Email: ' +email);
        const newData = profilePhoto ? {
          name,
          job,
          company,
          mobile,
          website,
          linkedin,
          email,
          password,
          profilePhoto
          //companyLogo,
               
        } :
        {
          name,
          job,
          company,
          mobile,
          website,
          linkedin,
          email,
          password      
        }
        ;
        try{         
          await addDoc(colRef, newData);         
          console.log("Data added " + name + email);
          alert ('Your BizCard link has been emailed to you!')
          navigate(`/dashboard/${newData.email}`)
        }catch(err){         
          console.log(err.message)
        }
     };  

    const handleUploadPhoto = async(event) => {
      const profilePhoto = event.target.files[0];
      if (!profilePhoto) return;
      console.log(profilePhoto);
      let uuid = uuidv4();
      const storageRef = ref(storage);
      const imageRef = ref(storageRef, `profilePhoto/${uuid}/${profilePhoto.name}`);
      try {
        const snapshot = await uploadBytes(imageRef, profilePhoto);
        const url = await getDownloadURL(snapshot.ref);
        console.log(url);
        setProfilePhoto(url);
      } catch (error) {
        console.error("Error uploading photo:", error);
      }
      } 
    
    
     
    return (
        <div className="main-container">
          <div>
            <div>
                <img className="fsa-logo" alt="fsa_logo" src={logo} />
                <h2 className="main-heading main-content">
                    Create a New Business Card
                </h2>
            </div>
            <div className="panel-body">
              <form onSubmit={createCard}>
                <div className="form-group">   
                    <input type="text" name="name" className="input-name" placeholder="Name*" value={name} 
                    onChange={(event) => {setName(event.target.value);
                    }}/>
                </div>
                <div className="form-group">
                    <label htmlFor="job"></label>
                    <input type="text" name="job" className="input-job" placeholder="Job Title*" value={job} 
                    onChange={(event) => {setJob(event.target.value);
                    }} />
                </div>
                <div className="form-group">
                    <label htmlFor="company"></label>
                    <input type="text" name="company" className="input-company" placeholder="Company*" value={company}
                    onChange={(event) => {setCompany(event.target.value);
                    }} />
                </div>
                <div className="form-group">
                    <label htmlFor="mobile"></label>
                    <input type="text" name="mobile" className="input-mobile" placeholder="Mobile Number*" value={mobile}
                    onChange={(event) => {setMobile(event.target.value);
                    }}/>
                </div>
                <div className="form-group">
                    <label htmlFor="website"></label>
                    <input type="text" name="website" className="input-website" placeholder="Website*" value={website}
                    onChange={(event) => {setWebsite(event.target.value);
                    }}/>
                </div>
                <div className="form-group">
                    <label htmlFor="linkedin"></label>
                    <input type="text" name="linkedin" className="input-linkedin" placeholder="LinkedIn*" value={linkedin}
                    onChange={(event) => {setLinkedin(event.target.value);
                    }}/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">  
                    <input type="text" name="email" className="input-name" placeholder="Email*" value={email} 
                    onChange={(event) => {setEmail(event.target.value);
                    }}/>
                    </label> 
                </div>
                <div className="form-group">
                    <label htmlFor="password">   
                    <input type="password" name="password" className="input-name" placeholder="Password*" value={password} 
                    onChange={(event) => {setPassword(event.target.value);
                    }}/>
                    </label>
                </div>
                <div className="form-group">
                    <label htmlFor="profilePhoto">
                    <label htmlFor="profilePhoto">Profile Photo: </label>
                    <input type="file" onChange={(event) => {handleUploadPhoto(event)}} />
                    </label>
                </div>
                <div className="form-one-button"><button className="submit-button">Submit</button></div>
              </form>
              <div className="form-one-button">
                <button className="submit-button"><Link to='/' className="link backToMain">Back to Main Page</Link></button>
            </div>
            </div>
          </div>
        </div>
      );
}

export default Create;