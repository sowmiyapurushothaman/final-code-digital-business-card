import React from 'react';
import './App.css';
import Create from './components/Create';
import { Link } from 'react-router-dom';
import Authentication from './authentication/Authentication';


function App() {
  return(
    <>
    <div className='main-container'>
    <ul class="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
            </ul>
            <div>
              <h1 className='welcome'> Welcome to FSA BizCard!</h1>
              <h4 className='slogan'>"Go Digital, Connect in Style!</h4>
            </div>
    <div className='form-one-button'>
        <button className='submit-button'><Link to='/Create' className='link create' element={<Create />}>Create New Card</Link></button>
      </div>
       <div className='form-one-button'>
        <button className='submit-button'><Link to='/authentication' className='link update' element={<Authentication />}>Login to View Card</Link></button>
      </div>
 </div>
    
</>
  );
}

export default App;
