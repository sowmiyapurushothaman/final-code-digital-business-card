import React from 'react';
import { useState, useEffect } from 'react';
import '../App.css';
import QRCode from 'react-qr-code';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function GenerateQR() {
  const [key, setKey] = useState();
  const params = useParams();

  useEffect(() => {  
    setKey(params.id)
    //console.log("Message from Context"+value);
    console.log("qr code params"+params.id);
    
  }, []);
    
  return (
    <div>
        <div className='qr-container'>
          <div>
        <QRCode value={`http://localhost:3000/card/${params.id}`} />
        {/*use code below for github deploy*/}
        {/* <QRCode value={` https://meitprogrammer.github.io/dbc/card/${params.id}`} /> */}
        </div>
        <div className='form-one-button'>
            <button  className="submit-button"><Link to={`/card/${params.id}`} className='link update'>Back</Link></button>
            </div>
        </div>
    </div>
  )
}


export default GenerateQR;