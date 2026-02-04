import { useState } from 'react'
import './App.css'

function App() {
  const [color, setColor] = useState('white')

  function changeBgColor(color) {
    setColor(color)
  }

  return (
    <>
    <div className='w-full h-screen duration-200' style={{ backgroundColor: color }}>
      <div className='fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2'>
        <div className='flex flex-wrap justify-center bg-amber-50 gap-3 shadow-lg px-3 py-2 rounded-3xl'>
          <button 
            className='px-4 py-1 rounded-2xl text-black shadow-lg'
            // style={{ backgroundColor: 'blue' }}
            onClick={() => changeBgColor('blue')}
          >
            Blue
          </button>
          <button 
            className='px-4 py-1 rounded-2xl text-black shadow-lg'
            // style={{ backgroundColor: 'green' }}
            onClick={() => changeBgColor('green')}
          >
            Green
          </button>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
