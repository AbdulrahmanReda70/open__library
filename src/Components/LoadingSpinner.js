import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="spinner-container">
      <style>
        {`
          .spinner-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
          }

          .spinner {
            width: 65px;
            height: 65px;
            border-radius: 50%;
            position: relative;
            animation: spin 1s linear infinite;
          }

          .spinner::before {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: 50%;
            background: conic-gradient(
              from 0deg,
              transparent 0%,
              transparent 60%,
              #0ea5e9 60%,
              #a855f7 100%
            );
            -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 4px), #fff 0);
            mask: radial-gradient(farthest-side, transparent calc(100% - 4px), #fff 0);
          }

          .loading-text {
            margin-top: 16px;
            font-family: Arial, sans-serif;
            font-size: 1.125rem;
            letter-spacing: 0.05em;
          
          }

          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
      <div className="spinner" />
      <p style={{ "color": "black" }} className="loading-text">Loading, please wait...</p>
    </div>
  );
};

export default LoadingSpinner;