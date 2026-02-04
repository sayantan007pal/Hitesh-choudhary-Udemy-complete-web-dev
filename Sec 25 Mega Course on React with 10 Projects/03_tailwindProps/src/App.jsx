

import './App.css'
import Cards from './components/cards'

function App() {

  let newArr = [1,2,3,4,5,6]
  return (
<>
<h1 className='text-3xl bg-green-500 p-3 rounded-md'> Vite with tailwind</h1>
<Cards userName = 'SAYANTAN' myArr ={newArr}/>
<Cards post = 'THERE is THE LOVELY picture'/>
<Cards pic = 'https://imgs.search.brave.com/DsHz5tEhlUA53dOk2qS3f8_FGbxCsOnAG-3NUj2rjrg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/aGFzaG5vZGUuY29t/L3Jlcy9oYXNobm9k/ZS9pbWFnZS91cGxv/YWQvdjE3MzA5NTky/ODI1MjQvNWMyMDlj/YzItMjIyMi00NmNk/LWJiMWUtOWUzZDEw/YWJiNDA4LnBuZz93/PTE2MDAmaD04NDAm/Zml0PWNyb3AmY3Jv/cD1lbnRyb3B5JmF1/dG89Y29tcHJlc3Ms/Zm9ybWF0JmZvcm1h/dD13ZWJw' />
</>
  )
}

export default App
