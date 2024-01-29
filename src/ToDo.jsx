import { useState,useEffect } from "react";
import {v4 as uuidv4} from 'uuid';
import "./ToDo.css";
// import toast from 'react-hot-toast';

const getLocalItems =() => {
    let list=localStorage.getItem('lists');
    console.log(list);

    if(list){
        return JSON.parse(localStorage.getItem('lists'));
    }
    else{
        return [];
    }
}

export default function ToDo(){

    let [todos,setTodos]=useState (getLocalItems());  
    let [newTodo,setNewTodo] = useState("");

    let updateTodoValue = (event) => {
        setNewTodo(event.target.value);
    };

    let deleteTodo = (id) => {
        setTodos((prevTodos)=> todos.filter((prevTodos=>prevTodos.id != id)));
    };

    let markAllDone = () => {
        setTodos((todos) => 
            todos.map((todo) => {
                return {
                    ...todo,
                    isDone:true
                };
            })
        );
    };



    let markAsDone = (id) => {
        setTodos((todos) => 
            todos.map((todo) => {
                if(todo.id==id){
                    return {
                        ...todo,
                        isDone:true
                    };
                }
                else{
                    return todo;
                }
            })
        );
    };

    let handleSubmit = (e) => {
        e.preventDefault();

        setTodos((prevTodos) => {
            const list=[...prevTodos,{task:newTodo,id:uuidv4(),isDone:false}]
            return list;
        });
        setNewTodo("");

    };

    useEffect(()=>{
        localStorage.setItem('lists',JSON.stringify(todos))
    },[todos]);

    let today=new Date();
    let date=today.getDate();
    let month=today.getMonth()+1;
    let year=today.getFullYear();
    let current_date = `${date}/${month}/${year}`;
    
    return(
        <>
            <h2>TASK TRACKER</h2>

            <br></br>

            <form onSubmit={handleSubmit}>  

                <input 
                class="form-control"
                placeholder="Enter your task" 
                value = {newTodo}
                onChange = {updateTodoValue}
                ></input>
                <br></br>

                <button class="btn btn-primary" >Add</button>
            </form>

            <br></br>
            <br></br>

            <h4>Tasks to do</h4>

            <br></br>

            <div>
                {todos.map((todo) => (
                    <div key={todo.id} className="card mb-3" draggable>
                        <div className="card-body">
                            <h5 className="card-title" style={todo.isDone ? {textDecorationLine:"line-through"} : {}}>
                                {todo.task}
                            </h5>
                            <h6>Status : {todo.isDone ? <span class="text-muted">Completed</span> : <span class="text-muted">Not completed</span>}</h6>
                            <button className="btn btn-outline-danger btn-sm" onClick={() => deleteTodo(todo.id)}>Delete</button>
                            &nbsp;&nbsp;&nbsp;
                            <button className="btn btn-outline-success btn-sm" onClick={()=>markAsDone(todo.id)}
                            >Done</button>
                            <br></br>
                            <small class="text-muted">Date added : {current_date}</small>
                        </div>
                    </div>
                ))}
            </div>

            <button onClick={markAllDone} className="btn btn-success">All Done</button>
        </>
    );
}