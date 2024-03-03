import React, { useState } from 'react'

interface Props {
  buttonText: string
  submit: (value: number) => Promise<void> // Function to call for minting
}

const OperationForm: React.FC<Props> = ({ submit, buttonText }) => {
  const [mintValue, setMintValue] = useState(0)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10) // Parse to a number
    if (!isNaN(value) && value >= 0) {
      // Handle invalid and negative values
      setMintValue(value)
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault() // Prevent default form submission behavior
    try {
      await submit(mintValue)
    } catch (error) {
      console.error('Error minting:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex w-full justify-between">
        <div className="flex items-center">
          <input
            type="number"
            min="0"
            step={0.001}
            className="mr-2 w-20 rounded-md border border-gray-300 px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={mintValue}
            onChange={handleChange}
          />
          <button type="submit" className="rounded-md bg-blue-500 py-1 px-2 font-bold text-white hover:bg-blue-700">
            {buttonText}
          </button>
        </div>
      </div>
    </form>
  )
}

export default OperationForm
