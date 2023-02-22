import axios from "axios";
import { useEffect, useState } from "react";
import checkIsUserLoggedIn from "../service";
import Header from "../component/header";


function Login() {

    const[err,setErr] = useState('');

    useEffect(()=>{
        checkIsUserLoggedIn();
    },[])

    const  handleLoginForm = async (event) =>{
        event.preventDefault()
        setErr('')
        const username = event.target[0].value.trim()
        const password = event.target[1].value.trim()
        const data = {
            username:username,
            password:password
        }
        axios({
            method:'post',
            url:`${process.env.REACT_APP_NUCLEUS_URL}login`,
            headers: { 'Content-Type': 'application/json'},
            data:data
        })
        .then((response)=>{
            if(response.data.success){
                localStorage.setItem('todo-token',response.data.token)
                localStorage.setItem('todo-username',username)
                window.location.href = '/'
            }
        }).catch((err)=>{
            setErr(err.response.data.message)
        })
    }
    return (
      <>
      <Header/>
      <div className="container mt-5">
        <div className="d-flex justify-content-center">
            <h3>Login to your account</h3>
        </div>
        <div className="d-flex justify-content-center align-items-center">
        <div className="col-sm-8">
            <form className="mt-5" onSubmit={handleLoginForm}>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input type="email" className="form-control" aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <div>
                Create account here <a href="/signup">Signup</a>
            </div>
        </div>
        </div>
      </div>
      </>
    );
  }
  
  export default Login;