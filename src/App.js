import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import OktaAuth from "@okta/okta-auth-js";
import { config, login } from './config';

function App() {

  const [accessToken, setAccessToken] = useState('');
  const [idToken, setIDToken] = useState('');

  const authenticate = async () => {
    console.log('logging in');

    const authClient = new OktaAuth(config);
    const transaction = await authClient.signIn(login);
    const { sessionToken } = transaction;
    const { tokens } = await authClient.token.getWithoutPrompt({ sessionToken });
    setAccessToken(tokens.accessToken.value);
    setIDToken(tokens.idToken.value);
    console.log(`Access token: ${tokens.accessToken.value}`);
    console.log(`ID token: ${tokens.idToken.value}`);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={authenticate} >authenticate</button>
        <p>
          Access Token:
        </p>
        <p>
          {accessToken}
        </p>
        <p>
          ID Token:
        </p>
        <p>
          {idToken}
        </p>
      </header>
    </div>
  );
}

export default App;
