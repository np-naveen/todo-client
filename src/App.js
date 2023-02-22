import axios from "axios";
import { useEffect, useState } from "react";
import AddTodo from "./component/addTodo";
import Header from "./component/header";


function App() {
  const [msg,setMsg] = useState('')
  const [item,setItem] = useState([])
  const username = localStorage.getItem('todo-username')

  async function getTodoItem(){
    const data = {
      username:username
    }
    axios({
      method:'post',
      url:`${process.env.REACT_APP_NUCLEUS_URL}all-todo`,
      headers: { 
        'Content-Type': 'application/json',
        'authorization' : `Bearer ${localStorage.getItem('todo-token')}`
      },
      data:data
    })
    .then((response)=>{
        if(response.data.success){setItem(response.data.data)}
    })
    .catch((err)=>{
    })
  }

  async function handleCheck(id,status){
    axios({
      method:'put',
      url:`${process.env.REACT_APP_NUCLEUS_URL}update-todo/${id}`,
      headers:{ 
        'Content-Type': 'application/json',
        'authorization':`Bearer ${localStorage.getItem('todo-token')}`},
      data:{
        username:username,
        newvalues:{
          status:!status
        }
      }
    })
    .then((response)=>{
      console.log(response)
        if(response.data.success){
          setTimeout(()=>{
            getTodoItem()
          },50)
        }
    })
    .catch((err)=>{
    })

  }
  
  useEffect(()=>{
    const token = localStorage.getItem('todo-token');
    if(token == null){
      window.location.href = '/login'
    }else{
      getTodoItem();
    }
  },[])

  useEffect(()=>{
    setTimeout(()=>{
      setMsg('')
    },1000)
  },[msg])

  async function handleAddTodo(){
    const inputValue = document.getElementById('input-todo').value;
    if(inputValue){
      const data = {
        username: username,
        title:inputValue
      }
      axios({
        method:'post',
        url:`${process.env.REACT_APP_NUCLEUS_URL}add-todo`,
        headers:{ 
          'Content-Type': 'application/json',
          'authorization':`Bearer ${localStorage.getItem('todo-token')}`},
          data:data
      })
      .then((response)=>{
        if(response.data.success){
          setMsg('New item added')
          document.getElementById('input-todo').value = ''
          setTimeout(()=>{
            getTodoItem()
          },50)
        }
      })
      .catch(()=>{

      })
    }
  }

  async function handleDelete(id,index){
    axios({
      method:'delete',
      url:`${process.env.REACT_APP_NUCLEUS_URL}delete-todo/${id}`,
      headers:{
        'Content-Type': 'application/json',
        'authorization':`Bearer ${localStorage.getItem('todo-token')}`
      },
      data:{
        username:username
      }
    })
    .then((response)=>{
      if(response.data.success){
        setTimeout(()=>{
          getTodoItem()
        },50)
      }
    })
  }

  return (
    <>
      <Header />
      <AddTodo handleAddTodo={handleAddTodo}/>
      {msg && <div className="d-flex justify-content-center">
        <span className="text-success">{msg}</span>
      </div>}
      <div className="container d-flex justify-content-center">
        <div className="">
        {item.map((data,index)=>(
          <div className="todo-container m-2" key={index}>
            <div className={data.status ? 'text-strike' : ''}>
            <input class="form-check-input ms-2 me-2" 
              type="checkbox" 
              checked={data.status}
              onClick={(()=>{handleCheck(data.list_id,data.status)})}/>
              {data.title}
            </div>
            <div>
              <button className="btn btn-danger" onClick={()=>{handleDelete(data.list_id,index)}}>
                Delete
              </button>
            </div>
          </div>
        ))}
        </div>
      </div>
    </>
  );
}

export default App;
