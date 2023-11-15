import { Link, useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import logo from '../images/logo_fsa.png'
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from '../fb-config';
import Authentication from '../authentication/Authentication';

function Edit(){
  const [name, setName] = useState();
  const [job, setJob] = useState('');
  const [company,setCompany] = useState('');
  const [mobile, setMobile] = useState('');
  const [website, setWebsite] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [email, setEmail] = useState('');
  

  const [key, setKey] = useState();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
      
    setKey(params.id)
    //console.log("Message from Context"+value);
    console.log("Use effect exectuted show.js key"+params.id);
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
                setJob(doc.data().job);
                setCompany(doc.data().company);
                setMobile(doc.data().mobile);
                setWebsite(doc.data().website);
                setLinkedin(doc.data().linkedin);
                setEmail(doc.data().email);
                
            });
            
        } catch (err) {
        }};

    const handleSubmit=(e)=> {
          e.preventDefault();
          updateCard();
  
        }
    


    const updateCard = async() => {  
        
        try {
          let updateEmail = params.id; 
          const newData = {
            name,
            job,
            company,
            mobile,
            website,
            linkedin,
            email
                 
          }
          const q = query(collection(db, "cards"), where("email", "==", updateEmail));
            const querySnapshot = await getDocs(q);
                querySnapshot.forEach(async(document) => {
                    const documentRef = doc(db, "cards", document.id);
                    await updateDoc(documentRef, newData);
                });
                console.log("Document(s) updated successfully");
                navigate(`/card/${newData.email}`);
            }catch(error) {
                console.error("Error deleting document(s):", error);
            }
        };
           

    return (
      
        <div class="main-container">
          
          <div>
            <div>
                <img className="fsa-logo" alt="fsa_logo" src={logo} />
                <h2 className="main-heading main-content">
                    Update Business Card
                </h2>
            </div>
            <div class="panel-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group"> 
                    <label htmlFor='name'>Name</label>  
                    <input type="text" name="name" className="input-name" placeholder="Name*" value={name} 
                    onChange={(event) => {setName(event.target.value);
                    }}/>
                </div>
                <div className="form-group">
                    <label htmlFor="job">Job Title</label>
                    <input type="text" name="job" className="input-job" placeholder="Job Title*" value={job} 
                    onChange={(event) => {setJob(event.target.value);
                    }} />
                </div>
                <div className="form-group">
                    <label htmlFor="company">Company</label>
                    <input type="text" name="company" className="input-company" placeholder="Company*" value={company}
                    onChange={(event) => {setCompany(event.target.value);
                    }} />
                </div>
                <div className="form-group">
                    <label htmlFor="mobile">Mobile number</label>
                    <input type="text" name="mobile" className="input-mobile" placeholder="Mobile Number*" value={mobile}
                    onChange={(event) => {setMobile(event.target.value);
                    }}/>
                </div>
                <div className="form-group">
                    <label htmlFor="website">Website</label>
                    <input type="text" name="website" className="input-website" placeholder="Website" value={website}
                    onChange={(event) => {setWebsite(event.target.value);
                    }}/>
                </div>
                <div className="form-group">
                    <label htmlFor="linkedin">LinkedIn</label>
                    <input type="text" name="linkedin" className="input-linkedin" placeholder="LinkedIn" value={linkedin}
                    onChange={(event) => {setLinkedin(event.target.value);
                    }}/>
                </div>
                <div className="form-one-button"><button className="submit-button">Save</button></div>
              </form>
              <div className='form-one-button'>
                <Link to={`/card/${email}`}><button className='submit-button'>Cancel</button></Link>
                </div>
            </div>
          </div>
        </div>
      );
}

export default Edit;