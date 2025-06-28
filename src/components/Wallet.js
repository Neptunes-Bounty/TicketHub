import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, InputGroup, Form } from 'react-bootstrap';
import axios from 'axios';
import './wallet.css';
import Toast from './Toast';
import { useWallet } from '../context/WalletContext';

export default function Wallet() {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState('all');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  
  const { balance, fetchBalance } = useWallet();

  useEffect(() => {
    fetchTransactions();
  }, []);

  const showNotification = (message, type) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('https://book-my-show-back-end.onrender.com/transactions');
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      showNotification('Error loading transactions', 'error');
    }
  };

  const handleAddMoney = async (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      showNotification('Please enter a valid amount', 'warning');
      return;
    }

    setIsLoading(true);
    try {
      await axios.post('https://book-my-show-back-end.onrender.com/wallet/add', {
        amount: parseFloat(amount),
        description: 'Added money to wallet'
      });

      await fetchBalance();
      await fetchTransactions();
      setAmount('');
      showNotification('Money added successfully!', 'success');
    } catch (error) {
      console.error('Error adding money:', error);
      showNotification('Failed to add money', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    if (filter === 'credits') return transaction.type === 'credit';
    if (filter === 'debits') return transaction.type === 'debit';
    return true;
  });

  return (
    <div className="wallet-container">
      <Toast
        show={showToast}
        message={toastMessage}
        type={toastType}
        onClose={() => setShowToast(false)}
      />

      <div className="balance-card">
        <Row className="align-items-center">
          <Col>
            <i className="bi bi-wallet2 wallet-icon"></i>
            <span>Current Balance</span>
            <div className="balance-amount">₹{balance?.toLocaleString('en-IN')}</div>
          </Col>
          <Col xs="auto">
            <Form onSubmit={handleAddMoney} className="add-money-form">
              <InputGroup>
                <InputGroup.Text>₹</InputGroup.Text>
                <Form.Control
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  min="1"
                />
                <Button 
                  variant="success" 
                  type="submit" 
                  disabled={isLoading}
                >
                  {isLoading ? 'Adding...' : 'Add Money'}
                </Button>
              </InputGroup>
            </Form>
          </Col>
        </Row>
      </div>

      <div className="filter-buttons">
        <button 
          className={`filter-button ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button 
          className={`filter-button ${filter === 'credits' ? 'active' : ''}`}
          onClick={() => setFilter('credits')}
        >
          Credits
        </button>
        <button 
          className={`filter-button ${filter === 'debits' ? 'active' : ''}`}
          onClick={() => setFilter('debits')}
        >
          Debits
        </button>
      </div>

      <div className="transaction-list">
        <h5 className="mb-4">Transaction History</h5>
        {filteredTransactions.length === 0 ? (
          <div className="no-transactions">
            <i className="bi bi-inbox mb-3 d-block" style={{ fontSize: '2rem' }}></i>
            <p>No transactions found</p>
          </div>
        ) : (
          filteredTransactions.map((transaction, index) => (
            <div key={index} className="transaction-item">
              <div className="d-flex align-items-center">
                <div className={`transaction-icon ${transaction.type}`}>
                  <i className={`bi ${transaction.type === 'credit' ? 'bi-plus-lg' : 'bi-dash-lg'}`}></i>
                </div>
                <div className="transaction-details">
                  <p className="transaction-title">{transaction.description}</p>
                  <p className="transaction-date">
                    {new Date(transaction.date).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
              <span className={`transaction-amount ${transaction.type}`}>
                {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount.toLocaleString('en-IN')}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}