// import React from 'react';

// const Success = () => {
//   const token = new URLSearchParams(window.location.search).get('token');

//   // Save the token to local storage
//   if (token) {
//     localStorage.setItem('token', token);
//   }

//   return (
//     <div style={styles.container}>
//       <h1>Login Successful!</h1>
//       <p>Your token has been saved in local storage.</p>
//     </div>
//   );
// };

// // Basic styles for the component
// const styles = {
//   container: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: '100vh',
//     backgroundColor: '#f0f0f0',
//   },
// };

// export default Success;


// src/GoogleSuccess.js
import React, { useEffect } from 'react';

const GoogleSuccess = () => {
  
  

  return (
    <div>
      <h1>Logging you in...</h1>
    </div>
  );
};

export default GoogleSuccess;
