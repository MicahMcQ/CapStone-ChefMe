import React from 'react';

const MaintenanceBanner = () => {
  return (
    <div
      style={{
        backgroundColor: 'rgba(255, 0, 0, 0.8)',
        color: 'white',
        textAlign: 'center',
        padding: '10px',
        position: 'fixed',
        bottom: '0',
        width: '100%',
        zIndex: '9999',
      }}
    >
      <p>
        Please excuse our dust. This app is currently under maintenance. We apologize for any inconvenience.
      </p>
    </div>
  );
};

export default MaintenanceBanner;
