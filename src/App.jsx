import { useState } from 'react'
import TodoInput from './Components/TodoInput'
import TodoList from './Components/TodoList'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='main-container'>
        <div className="center-container">
          <TodoInput />
        </div>
      </div>
    </>
  )
}

export default App
