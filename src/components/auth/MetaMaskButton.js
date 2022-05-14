import React, { useEffect, useContext } from 'react'
import styles from "./auth.module.scss"
import Context from "../../context"
import {success, normal, errorMsg} from '../Notifications'
import { ethers } from 'ethers'

function Metamask({setWallet, setBalance, getContractInfo, setContract, provider, setRefLink, countIncomes, setSigner, contractAddress, getTVL}) {

  const {wallet} = useContext(Context)
  const isMobile = ()=>{
    return 'ontouchstart' in window || 'onmsgesturechange' in window
  }

  const ERC20_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"address","name":"adr","type":"address"}],"name":"bnbKingRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"ref","type":"address"}],"name":"buyCrowns","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"eth","type":"uint256"},{"internalType":"uint256","name":"contractBalance","type":"uint256"}],"name":"calculateCrownBuy","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"eth","type":"uint256"}],"name":"calculateCrownBuySimple","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"Crowns","type":"uint256"}],"name":"calculateCrownsell","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"adr","type":"address"}],"name":"getCrownsSinceLastHatch","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"adr","type":"address"}],"name":"getMyCrowns","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"adr","type":"address"}],"name":"getMyMiners","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"ref","type":"address"}],"name":"hatchCrowns","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"seedMarket","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"sellCrowns","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]

  const setNetwork = async () => {
    window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [{
        chainId: '0x38',
        chainName: 'Binance Smart Chain',
        nativeCurrency: {
            name: 'Binance Coin',
            symbol: 'BNB',
            decimals: 18
        },
        rpcUrls: ['https://bsc-dataseed.binance.org/'],
        blockExplorerUrls: ['https://bscscan.com']
      }]
      })
      .then( async () => {
        let netVersion = await window.ethereum.request({ method: 'eth_chainId' })
        if (netVersion != 56) {
          errorMsg("Change your network")
        } else {
          success("Network successfully changed")
        }
      })
      .catch((error) => {
        console.log(error)
      }) 
  }

  const getAccountBalance = (account) => {
    window.ethereum.request({method: 'eth_getBalance', params: [account, 'latest']})
    .then(balance => {
      setBalance(parseFloat(ethers.utils.formatEther(balance)))
      countIncomes(parseFloat(ethers.utils.formatEther(balance)), "first")
    })
    .catch(error => {
        errorMsg("Can't get your account balance")
        console.log(error.message);
    });
  };

  const connectWallet = async (type) => {
    if (window.ethereum) { //check if Metamask is installed
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      getTVL(provider)
          try {
              if (type == "check") {
                var address = await window.ethereum.request({ method: 'eth_accounts' });
              } else {
                var address = await window.ethereum.request({ method: 'eth_requestAccounts' });
              }
              if (!address.length) {
                return {
                  connectedStatus: false,
                  status: 42
                } 
              }
              const obj = {
                      connectedStatus: true,
                      status: "",
                      address: address[0]
                  }
                  return obj;
               
          } catch (error) {
            console.log(error)
              return {
                  connectedStatus: false,
                  status: error.code
              }
          }
          
    } else if (isMobile) {
          return {
              connectedStatus: false,
              status: 405
          }
    } else {
      return {
        connectedStatus: false,
        status: 404
    }
    } 
  };

  const connect = async (type) => {
    try {
      // access the account
      const {status, address, connectedStatus} = await connectWallet(type)
      if (connectedStatus) {
        setWallet(address)
        setRefLink(`https://bnb-king.finance/?ref=${address}`)
        getAccountBalance(address)
        if (type == "first") {
          success("Сonnection Succeeded")
        }
        // check network
        let netVersion = await window.ethereum.request({ method: 'eth_chainId' })
        if (netVersion != 56) {
          setNetwork()
          errorMsg("Change your network")
        } else {
          const provider = new ethers.providers.Web3Provider(window.ethereum)
          const signer = provider.getSigner()
          setSigner(signer)
          const contract = new ethers.Contract(contractAddress, ERC20_ABI, provider.getSigner())
          setContract(contract)
        }
      } else {
        setWallet("")
        setRefLink("")
        switch (status) {
          case -32002:
            normal("Request for connection already send, check your metamask")
            break
          case 4001:
            errorMsg("Connection rejected")
            break
          case 405:
            normal("Open with Metamask mobile app 🦊")
            break
          case 404:
            normal("🦊 You must install Metamask into your browser: https://metamask.io/download.html")
            break
          case 42:
            normal("Connect your Metamask 🦊")
            break
          default:
            errorMsg("Failed to connect")
        }
      }
    } catch (error) {
        console.log(error)
        errorMsg("Failed to connect")
    }
  }


  useEffect(()=>{
    connect("check")
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', function (accounts) {
        if (!accounts.length) {
          setWallet("")
          setRefLink("")
          setBalance(0.0)
          normal("Connect your Metamask 🦊")
        } else {
          connect()
        }
      })
      window.ethereum.on('chainChanged', function (networkId) {
        connect()
      })
    }
  },[])

  if(isMobile() && !window.ethereum) {
    const dappUrl = 'bnb-king.finance'
    const metamaskAppDeepLink = "https://metamask.app.link/dapp/" + dappUrl
    return (
      <>
        {wallet ?
           <button className={styles.connect_btn} disabled >
              {wallet.substring(0, 5)}...{wallet.substring(wallet.length - 5)}
            </button>
          :
          <a style={{padding: "0", zIndex: 101}} href={metamaskAppDeepLink}>
            <button className={styles.connect_btn}>Connect wallet</button>
          </a>
        }
      </>
    )
  }

  return (
    <>
      {
        wallet ?
          <button className={styles.connect_btn} disabled >
            {wallet.substring(0, 5)}...{wallet.substring(wallet.length - 5)}
          </button>
        : <button className={styles.connect_btn} onClick={() => connect("first")}>Connect wallet</button>
      }
    </>
  )
}

export default Metamask