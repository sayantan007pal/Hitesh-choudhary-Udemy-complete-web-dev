import React, { useId } from 'react'

function InputBox({
      label,
      amount,
      onAmountChange,
      onCurrencyChange,
      currencyOptions = [],
      selectedCurrency = "usd",
      amountDisabled = false,
      currencyDisabled = false,
      className = "",
}) {
  const amountId = useId()
  const currencyId = useId()
  
  return (
    <div className={`bg-white p-4 rounded-lg ${className}`}>
        <div className='flex gap-4'>
          <div className='flex-1'>
            <label htmlFor={amountId} className='text-black/70 text-sm mb-1 block'>{label}</label>
            <input 
              type="number" 
              id={amountId}
              className='border border-gray-300 p-2 rounded w-full bg-transparent outline-none focus:border-blue-500' 
              placeholder='Amount'
              value={amount} 
              onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))} 
              disabled={amountDisabled} 
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor={currencyId} className='text-black/70 text-sm mb-1'>Currency</label>
            <select 
              className='border border-gray-300 p-2 rounded bg-white cursor-pointer outline-none focus:border-blue-500'
              name="currency" 
              id={currencyId}
              value={selectedCurrency}
              onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
              disabled={currencyDisabled}
            >
              {currencyOptions.map((currency) => (
                <option key={currency} value={currency}>{currency.toUpperCase()}</option>
              ))}
            </select>
          </div>
        </div>
    </div>
  )
}

export default InputBox