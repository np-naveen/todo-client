import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../component/header";
import checkIsUserLoggedIn from "../service";

function Signup() {

    const [err,setErr] = useState('')
    const [msg,setMsg] = useState('')

    useEffect(()=>{
        checkIsUserLoggedIn()
    },[])

    const handleSignupForm = async(event)=>{
        event.preventDefault()
        setErr('')
        let name = event.target[0].value.trim()
        let email = event.target[1].value.trim()
        let password = event.target[2].value.trim()
        if(name == '' || email == '' || password == ''){
            return setErr('Please fill all the required fields')
        }
        const formData = {
            name:name,
            email:email,
            password:password
        }
        console.log(process.env.REACT_APP_NUCLEUS_URL)
        axios({
            method: 'post',
            url:`${process.env.REACT_APP_NUCLEUS_URL}create-user`,
            headers: { 'Content-Type': 'application/json'},
            data: formData})
            .then((respoonse)=>{
                setMsg('Account created successfully')
                setTimeout(()=>{
                    window.location.href = '/login'
                },800)
            })
            .catch((err)=>{
                
                setErr(err.response.data.message)
            })
    }

    return (
        <>
        <Header />
        <div className="container mt-5">
            <div className="d-flex justify-content-center">
                <h3>Create an new account</h3>
            </div>
        <div className="d-flex justify-content-center align-items-center">
        <div className="col-sm-8">
            <form className="mt-5" onSubmit={handleSignupForm}>
                <div className="mb-3">
                    <label className="form-label">Name *</label>
                    <input type="text" className="form-control" aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Email address *</label>
                    <input type="email" className="form-control" aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password *</label>
                    <input type="password" className="form-control" />
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
            {err && <span className="text-danger">{err}</span>}
            {msg && <span className="text-success">{msg}</span>}
            <div>
                Already have an account <a href="/login">Login</a>
            </div>
        </div>
        </div>
      </div>
        </>
    );
  }
  
  export default Signup;