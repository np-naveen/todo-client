import axios from "axios";

async function checkIsUserLoggedIn(){
    const token = localStorage.getItem('todo-token');
    if(token != null){
        axios({
            method:'post',
            url:`${process.env.REACT_APP_NUCLEUS_URL}verify-user`,
            headers:{ 
                'Content-Type': 'application/json',
                'authorization':`Bearer ${token}`}
        })
        .then((response)=>{
            if(response.data.success){
                window.location.href = '/'
            }
        })
        .catch((err)=>{
        })
    }
}

export default checkIsUserLoggedIn;

