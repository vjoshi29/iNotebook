import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
function Login(props){
  const [credentials , setCredentials] = useState({email:"" , password:""})
  let navigate = useNavigate();
  const handleSubmit = async (e) =>{
       e.preventDefault();
       const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({email:credentials.email , password:credentials.password})
  });
      const json = await response.json()
      console.log(json);
      if (json.success){
         localStorage.setItem('token' , json.authtoken);
         props.showAlert("Logged in Successfully" , "success")
         navigate("/")
      }
      else{
        props.showAlert("Invalid Credentials" , "danger")
      }
}
const onChange =(e)=>{
  setCredentials({...credentials , [e.target.name]: e.target.value})
}

  return (
    <div className='container mt-2  pb-3 px-3 py-1' style={{border:"0.2vw solid black" , boxShadow:"7px 7px grey",width:"50vw"}}>
      <h3 className='my-3'>Login to Continue</h3>
      <form onSubmit={handleSubmit} >
        <div className="mb-3 w-75">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" value={credentials.email} id="email" name="email" aria-describedby="emailHelp" onChange={onChange}/>
          
        </div>
        <div className="mb-3 w-75">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" value={credentials.password} name="password" onChange={onChange}/>
        </div>
        <button type="submit" className="btn btn-primary" >Submit</button>
      </form>
    </div>
  )
}

export default Login
