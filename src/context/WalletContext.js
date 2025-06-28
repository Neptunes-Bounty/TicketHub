import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import axios from 'axios';

const WalletContext = createContext();
const INITIAL_BALANCE = 50000;

export function WalletProvider({ children }) {
  const [balance, setBalance] = useState(INITIAL_BALANCE);

  const initializeWallet = useCallback(async () => {
    try {
      // Try to initialize wallet with default balance
      await axios.post('https://book-my-show-back-end.onrender.com/wallet/initialize', {
        balance: INITIAL_BALANCE
      });
      setBalance(INITIAL_BALANCE);
    } catch (error) {
      console.error('Error initializing wallet:', error);
    }
  }, []);

  const fetchBalance = useCallback(async () => {
    try {
      const response = await axios.get('https://book-my-show-back-end.onrender.com/wallet');
      if (response.data.balance === null || response.data.balance === undefined) {
        await initializeWallet();
      } else {
        setBalance(response.data.balance);
      }
      return response.data.balance || INITIAL_BALANCE;
    } catch (error) {
      console.error('Error fetching wallet balance:', error);
      await initializeWallet();
      return INITIAL_BALANCE;
    }
  }, [initializeWallet]);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  const updateBalance = useCallback(async (newBalance) => {
    try {
      await axios.post('https://book-my-show-back-end.onrender.com/wallet/update', {
        balance: newBalance
      });
      setBalance(newBalance);
    } catch (error) {
      console.error('Error updating wallet balance:', error);
    }
  }, []);

  return (
    <WalletContext.Provider value={{ 
      balance, 
      fetchBalance, 
      updateBalance,
      initializeWallet 
    }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}