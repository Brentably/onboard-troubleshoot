import './App.css';
import { useConnectWallet } from '@web3-onboard/react';
import { useEffect, useReducer } from 'react';
import {ethers} from 'ethers'
import getConnection from './helpers/getConnection';


function reducer(state: any, action: {type: string, payload: any}) {
  switch (action.type) {
    case 'set':
      console.log('reducer updating state:', action.payload)
      return {...state, ...action.payload};
    default:
      throw new Error();
  }
}


function App() {
  const [state, dispatch] = useReducer(reducer, undefined)
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()
  function test() {
    console.log('test test test')
  }

  useEffect(() => {
    const stupid = async () => {
        // If the wallet has a provider than the wallet is connected
      if (wallet) {
        let newConnection = await getConnection(wallet.provider)
        console.log(newConnection)
        dispatch({type: 'set', payload: {connection: newConnection}})
      }}
    stupid()
    }, [wallet])

    
  return (
    <div className="App">
      <button
        disabled={connecting}
        onClick={() => (wallet ? disconnect(wallet) : connect())}
      >
        {connecting ? 'connecting' : wallet ? 'disconnect' : 'connect'}
      </button>
    </div>
  );
  
}

export default App;
