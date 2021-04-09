import React , {useState,useEffect} from 'react';
import Form from './components/Form';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  const [inputText,setInputText] = useState("");
  const [todos,setTodos]=useState([]);
  const [status,setStatus]=useState("all");
  const [filterTodos,setfilterTodos]=useState([]);
  
  useEffect(()=>{
    getLocalTodos();
  },[]);
  
  
  
  useEffect(()=>{
   filterHandler();
   saveLocalTodos();
  },[todos,status])

  
const filterHandler=()=>{
  switch(status){
    case "completed":
      setfilterTodos(todos.filter(todo=>todo.completed===true));
      break;
    case "uncompleted":
      setfilterTodos(todos.filter(todo=>todo.completed===false));
      break;
    default :
      setfilterTodos(todos);
      break;


  }
}

//save to local
const saveLocalTodos=()=>{
  localStorage.setItem("todos",JSON.stringify(todos));
};

const getLocalTodos=()=>{
  if(localStorage.getItem("todos")===null){
    localStorage.setItem("todos",JSON.stringify([]));  
  }else{
    let todoLocal=JSON.parse(localStorage.getItem("todos"));
    setTodos(todoLocal);
  }
  
}


  return (
    <div className="App">
      <h1 >
       <header>
         Ranavijay's ToDo list 
       </header>
      </h1>
      <Form inputText={inputText} todos={todos} setTodos={setTodos} setInputText={setInputText } setStatus={setStatus} />
      <TodoList filterTodos={filterTodos} todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default App;
