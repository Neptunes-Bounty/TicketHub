import React, { useState, useEffect } from 'react';
import { Toast as BootstrapToast } from 'react-bootstrap';

export default function Toast({ show, message, type = 'success', onClose }) {
  const [position, setPosition] = useState({ top: 20, right: 20 });

  useEffect(() => {
    // Adjust position based on existing toasts
    const existingToasts = document.querySelectorAll('.custom-toast');
    const offset = existingToasts.length * 80;
    setPosition({ top: 20 + offset, right: 20 });
  }, [show]);

  const getBgClass = () => {
    switch (type) {
      case 'success':
        return 'bg-success';
      case 'error':
        return 'bg-danger';
      case 'warning':
        return 'bg-warning';
      default:
        return 'bg-info';
    }
  };

  return (
    <BootstrapToast
      show={show}
      onClose={onClose}
      delay={3000}
      autohide
      className={`custom-toast ${getBgClass()} text-white`}
      style={{
        position: 'fixed',
        top: position.top,
        right: position.right,
        zIndex: 1000,
        minWidth: '200px'
      }}
    >
      <BootstrapToast.Body>
        <div className="d-flex align-items-center">
          {type === 'success' && <i className="bi bi-check-circle me-2"></i>}
          {type === 'error' && <i className="bi bi-x-circle me-2"></i>}
          {type === 'warning' && <i className="bi bi-exclamation-triangle me-2"></i>}
          {type === 'info' && <i className="bi bi-info-circle me-2"></i>}
          {message}
        </div>
      </BootstrapToast.Body>
    </BootstrapToast>
  );
}