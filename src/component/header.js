import { useEffect, useState } from "react";

function Header() {
    const [userName,setUserName] = useState('')

    useEffect(()=>{
        const username = localStorage.getItem('todo-username');
        setUserName(username)
    })

    async function handleLogout(event){
        event.preventDefault();
        localStorage.removeItem('todo-token')
        localStorage.removeItem('todo-username')
        setUserName(null)
        window.location.href = '/login'
    }

    return (
     <div className="header">
        <div className="container">
            <div className="d-flex justify-content-center align-item-center">
                <h1>Todo</h1>
            </div>
            {userName? 
                <div className="d-flex justify-content-between">
                    <div>{userName}</div>
                    <button className="logout-btn" onClick={handleLogout}>Logout </button>
                </div>:<></>
            }
        </div>
     </div>
    );
  }
  
  export default Header;