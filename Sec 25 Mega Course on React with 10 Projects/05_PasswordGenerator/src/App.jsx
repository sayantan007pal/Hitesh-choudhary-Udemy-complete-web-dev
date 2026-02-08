import { useState, useCallback, useEffect, useRef } from 'react'

import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numbersAllowed, setNumbersAllowed] = useState(false)
  const [symbolsAllowed, setSymbolsAllowed] = useState(false)
  const [ password, setPassword] = useState('')

  const passwordRef = useRef(null)

    
  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password)
    if (passwordRef.current) {
      passwordRef.current.select()
      document.execCommand('copy')
    }
  }

  const generatePassword = useCallback(() => {
    let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (numbersAllowed) chars += '0123456789'
    if (symbolsAllowed) chars += '!@#$%^&*()_+~`|}{[]:;?><,./-='
    let password = ''
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length)
      password += chars[randomIndex]
    }
    setPassword(password)
  }, [length, numbersAllowed, symbolsAllowed])



  useEffect(() => {
    generatePassword()
  }, [length, numbersAllowed, symbolsAllowed])



  return (
<>
<div className='w-full max-w-md bg-gray-100 p-6 rounded-lg shadow-md
rounded-lg shadow-md px-6 py-4 my-8 bg-gray-100 text-orange-500'>
  <h1 className='text-2xl font-bold mb-4 my-4'>Password Generator</h1>
  <div className='flex shadow-md rounded-lg overflow-hidden mb-4'>
    <input type="text"
    value={password} 
    readOnly
    placeholder='Your generated password will appear here' 
    className='flex-1 px-4 py-2 text-gray-700 focus:outline-none' 
    ref={passwordRef}
    />
    <button 
    onClick={() => {copyPasswordToClipboard()}}
    className='bg-orange-500 text-white px-4 py-2 rounded-lg ml-2'>
      Copy
    </button>
  </div>
  <div className='mb-4'>
    <div className='flex items-center mb-2'>
      <input 
        type="range" 
        name="length" 
        min={4}
        max={20}
        value ={length}
        className='cursor-pointer w-full'
        onChange={(e) => setLength(e.target.value)}
        id="length" />
        <label htmlFor="length" className='ml-2 text-gray-700'>Length:{length}</label>
    </div>
    <div className='flex items-center mb-2'>
      <input 
      type="checkbox" 
      defaultChecked={numbersAllowed}
      onChange={() => {
        setNumbersAllowed((prev) => !prev)}}
       name="numbers" 
       id="numbers" />
       <label htmlFor="numbers" className='ml-2 text-gray-700'>Include Numbers</label>
    </div>
    <div className='flex items-center mb-2'>
      <input 
      type="checkbox" 
      defaultChecked={symbolsAllowed}
      onChange={() => {
        setSymbolsAllowed((prev) => !prev)}}
       name="symbols" 
       id="symbols" />
       <label htmlFor="symbols" className='ml-2 text-gray-700'>Include Symbols</label>
    </div>

  </div>
</div>

</>
  )
}

export default App
