import './App.css'
import { InputBox } from './components'
import { useState } from 'react'
import useCurrencyInfo from './hooks/useCurrencyInfo' 


function App() {
  const [amount, setAmount] = useState(0)
  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState("INR")
  const { currencyOptions, convert, loading } = useCurrencyInfo(fromCurrency)
  
  const convertedAmount = convert(amount, toCurrency)
  
  const swap = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
    setAmount(Number(convertedAmount))
  }

  return (
    <>
      <div  
        className="w-full h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat gap-4"
        style={{
          backgroundImage: `url(https://images.pexels.com/photos/4968396/pexels-photo-4968396.jpeg)`,
          minHeight: '100vh'
        }}
      >
        <h1 className='text-white text-4xl font-bold mb-4'>Currency Converter</h1>
        <div className='flex flex-col gap-4 bg-white/20 backdrop-blur-sm p-6 rounded-lg'>
          <InputBox 
            label="From"
            amount={amount}
            onAmountChange={setAmount}
            onCurrencyChange={setFromCurrency}
            currencyOptions={currencyOptions}
            selectedCurrency={fromCurrency}
          />
          <button 
            onClick={swap}
            className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition'
          >
            Swap
          </button>
          <InputBox 
            label="To"
            amount={convertedAmount}
            onCurrencyChange={setToCurrency}
            currencyOptions={currencyOptions}
            selectedCurrency={toCurrency}
            amountDisabled={true}
          />
          {loading && <p className='text-white text-center'>Loading rates...</p>}
        </div>
      </div>
    </>
  )
}

export default App