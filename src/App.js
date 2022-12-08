import { useCallback, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import detectEthereumProvider from '@metamask/detect-provider'
import { ethers } from "ethers";

const useDetectProvider = (wndEth) => {
  const [p, setp] = useState(null)

  useCallback(async () => {
    const provider = await detectEthereumProvider()
    setp(provider)
  }, [wndEth])

  return p
}

const useProvider = (wndEth) => {
  const [p, setp] = useState(null)

  useEffect(() => {
    if (window.ethereum !== undefined) {
    // console.log("wndethereum !== undefined");
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    setp(provider)
    }}, [wndEth])

  return p

}

function App() {

  // check window.ethereum repeatedly?
  const wndEth = window.ethereum;
  // useProvider

  // const detectedProvider = await detectEthereumProvider()
  const detectedProvider = useDetectProvider(window.ethereum);
  console.log('detectedProvider', detectedProvider)

  let provider;
  if (window.ethereum !== undefined) {
    // console.log("wndethereum !== undefined");
    provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  }

  const providerFromHook = useProvider(window.ethereum);
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>Do we have window.etherem? {!!wndEth ? 'yes': 'no'} </p>
        <p>Do we have window.etherem.isMetaMask? {!!wndEth.isMetaMask ? 'yes': 'no'} </p>
        <p>Detected Provider: {!!detectedProvider ? 'yes': 'no'}</p>
        <p>Provider via window: {!!provider ? 'yes': 'no'}</p>
        <p>Provider via hook & window: {!!providerFromHook ? 'yes': 'no'}</p>
        
      </header>
    </div>
  );
}

export default App;
