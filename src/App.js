import React, {useState, useRef, useEffect} from 'react'
import TodoList from './TodoList'
import { v4 as uuidv4 } from 'uuid'


const LOCAL_STORAGE_KEY = 'todoAp.todos'


function App() {
  // useState returns 2 elements: current_state and func setState. Inside useState our default value.
  const [todos, setTodos] = useState([]) // it will rerender each time on change, pass lambda to avoid it.
  // Usage: setTodos( PREVIOUT_STATE => { return NEW_VALUE }) OR setTodos(NEW_VALUE)

  const todoNameRef = useRef()  // used in: <input ref={todoNameRef} type="text" />
  

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value;

    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, {id: uuidv4(), name: name, complete: false}]
    })
    todoNameRef.current.value = null
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    // js can return only 1 html element, so use <> ... </> to pass many
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo}/>
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo}>Add Todo</button>    
      <button onClick={handleClearTodos}>Clear Complete</button>    
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </>
  );
}

export default App;
