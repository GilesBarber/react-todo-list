import React, {useState, useRef, useEffect} from 'react';
import TodoList from './TodoList';
//import uuidv4 from 'uuid/v4'
//import  { v4 as uuidv4 } from 'uuid/v4'

const LOCAL_STORAGE_KEY = 'todoApp.todos'
// const { uuid } = require('uuidv4');

let todoID = 0;

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() =>{
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() =>{
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  },[todos])

  function toggleTodo(id){
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id ===id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e){
    const name = todoNameRef.current.value
    todoID += 1;
    console.log(todoID);
    if(name === '') return
    setTodos(prevTodos =>{
      return [...prevTodos, {id: todoID, name: name, complate: false}]
    })
    todoNameRef.current.value = null
  }

  function handleClearTodos(){
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  //{id:1, name: 'Todo 1', complete: true}
  return (
    <>
    <TodoList todos={todos} toggleTodo={toggleTodo}/>
    <input ref={todoNameRef} type="text" />
    <button onClick={handleAddTodo}>Add Todo</button>
    <button onClick={handleClearTodos}>Clear completed</button>
    <div>{todos.filter(todo => !todo.complete).length} left to do</div>
</>
  )
}

export default App;
