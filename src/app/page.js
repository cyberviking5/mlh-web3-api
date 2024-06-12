"use client"
import axios from 'axios';
import { useState } from 'react';

function Home() {
  const [address, setAddress] = useState('0x027b78903335b05242D100543241d09852C049b8');
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = 'AIPI5MTZ77I2FXC5T7RBKKHWIWMEHWZ1NN';

  const fetchBalance = async () => {
    try {
      const response = await axios.get(
        `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${API_KEY}`
      );
      const balanceInWei = response.data.result;
      // Convert balance from Wei to Ether
      const balanceInEther = parseFloat(balanceInWei) / 1e18;
      setBalance(balanceInEther);
      setError(null);
    } catch (error) {
      setError('Error fetching balance. Please check the Ethereum address and try again.');
      setBalance(null);
    }
  };

  return (
    <div className="max-w-screen-md mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Ethereum Address Balance Checker</h1>
      <div className="flex flex-col items-center">
        <input
          className="w-full max-w-xs px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          type="text"
          placeholder="Enter Ethereum Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button
          className="px-4 py-2 mb-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
          onClick={fetchBalance}
        >
          Check Balance
        </button>
        {balance !== null && (
          <p className="text-xl font-semibold text-center mb-4">
            Balance: {balance} ETH
          </p>
        )}
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
}

export default Home;
