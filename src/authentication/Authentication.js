import React from 'react'
import Signin from './Signin'
import Dashboard from '../components/Dashboard'

function Authentication() {
  return (
    <div>
        <Signin>
          <Dashboard />
        </Signin>
        
    </div>
  )
}

export default Authentication