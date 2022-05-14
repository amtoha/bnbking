import Header from "./components/Header"
import Footer from "./components/Footer";
import Main from "./components/Main";
import Reward from "./components/Reward";
import Info from "./components/Info";
import Referral from "./components/Referral"
import Context from "./context"
import Metamask from "./components/auth/MetaMaskButton";
import Calculator from "./components/Calculator";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { errorMsg, success } from "./components/Notifications";

function App() {
  const [balance, setBalance] = useState(0.0)
  const [wallet, setWallet] = useState("")
  const [onResizeWidth, setOnResizeWidth] = useState(window.innerWidth)
  const [investValue, setInvestValue] = useState("")
  const [reward, setReward] = useState(0.0)
  const [crowns, setCrowns] = useState(0.0)
  const [tvl, setTvl] = useState(0.0)
  const [contract, setContract] = useState("")
  const [contract2, setContract2] = useState("")
  const [refLink, setRefLink] = useState("")
  const [dailyIncome, setDailyIncome] = useState(balance * 12 / 100)
  const [weeklyIncome, setWeeklyIncome] = useState(balance * ((1 + 0.12) ** 7))
  const [annualIncome, setAnnualIncome] = useState(balance * 4320)
  const [signer, setSigner] = useState("")
  const contractAddress = '0xDA624bA6c18C935213d4377995bB7d334c2fBF93'
  const contractAddress2 = '0x671E8B9a688ee1AFd98053Cfdc2c854c3F604652'

  const getTVL = (provider) => {
  } 

  const getRef = () => {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString);
    const ref = urlParams.get('ref')
    if (ref != null) window.localStorage.setItem("ref", ref)
  }

  const getContractInfo = async (address, contract) => {
    await contract.bnbKingRewards(address)
    .then((reward) => {
      reward = ethers.utils.formatEther(reward)
      if (reward.length > 6 && reward !== 0) {
        setReward(reward.slice(0, 5))
      } else {
        setReward(reward)
      }
    })
    .catch((e) => {
        console.log(e)
    })

    await contract.getMyCrowns(address)
    .then((crowns) => {
      crowns = crowns.toNumber()
      if (crowns.length > 6 && parseFloat(crowns !== 0)) {
        setCrowns(crowns.slice(0, 5))
      } else {
        setCrowns(crowns)
      }
    })
    .catch((e) => {
        console.log(e)
        errorMsg("Can't get your crowns, reload or try later")
    })
  }

  const buyCrowns = async (amount, address, ref) => {
    try {
      const daiWithSigner = contract2.connect(signer)
      const referral = ref != null ? ref : address
      await daiWithSigner
      .buyCrowns(referral, {value: ethers.utils.parseUnits(amount.toString(), 18)})
      .then(success("Transaction successfully sent"))
      .catch((e) => {console.log(e); errorMsg("Failed to buy crowns")})
    } catch (e) {
      console.log(e)
      errorMsg("Failed to buy crowns")
    }
  }

  const reinvestCrowns = (ref) => {
    try {
      const referral = ref != null ? ref : wallet
      const daiWithSigner = contract2.connect(signer)
      daiWithSigner.hatchCrowns(referral)
      .then(() => {
        success("Transaction successfully sent")
        setReward(0.0)
      })
      .catch((e) => {console.log(e); errorMsg("Failed to buy crowns")})
    } catch (e) {
        console.log(e)
        errorMsg("Failed to buy crowns")
    }
  }

  const claimCrowns = () => {
    try {
      const daiWithSigner = contract2.connect(signer)
      daiWithSigner.sellCrowns()
      .then(() => {
        success("Transaction successfully sent")
        setReward(0.0)
      })
      .catch((e) => {console.log(e); errorMsg("Failed to buy crowns")})
    } catch (e) {
        console.log(e)
        errorMsg("Failed to buy crowns")
    }
  }

  const countIncomes = (value, type) => {
    if (type !== "first") {
      setInvestValue(value)
    }
    if (value) {
      setDailyIncome(value * 12 / 100)
      setWeeklyIncome(value * ((1 + 0.12) ** 7))
      setAnnualIncome(value * 4320)
    } else {
      setDailyIncome(balance * 8 / 100)
      setWeeklyIncome(balance * ((1 + 0.12) ** 7))
      setAnnualIncome(balance * 4320)
    }
  }

  const onResizeHendler = () => {
    setOnResizeWidth(window.innerWidth)
  }

  useEffect(() => {
    window.onresize = onResizeHendler
    getRef()
  }, [])

  return (
    <div className="grid-wrapper">
      <Context.Provider value={{balance, wallet}}>
        <wc-toast></wc-toast>
        <Header>
          <Metamask
            setRefLink={setRefLink}
            setSigner={setSigner}
            setContract={setContract}
            setContract2={setContract2}
            setBalance={setBalance}
            setWallet={setWallet}
            getContractInfo={getContractInfo}
            countIncomes={countIncomes}
            contractAddress={contractAddress}
            contractAddress2={contractAddress2}
            getTVL={getTVL}
          />
          <Footer/>
        </Header>
        <Main 
          countIncomes={countIncomes}
          dailyIncome={dailyIncome}
          weeklyIncome={weeklyIncome}
          annualIncome={annualIncome}
          buyCrowns={buyCrowns}
          crowns={crowns}
          investValue={investValue}
        />
        {onResizeWidth <= 630 ?
            <>
              <Reward claimCrowns={claimCrowns} reinvestCrowns={reinvestCrowns} reward={reward}/>
              <Info tvl={tvl}/>
            </>
          :
            <div className="stats_wrapper">
              <Reward claimCrowns={claimCrowns} reinvestCrowns={reinvestCrowns} reward={reward}/>
              <Info tvl={tvl}/>
            </div>
        }
        <Referral refLink={refLink}/>
        <Footer/>
        <Calculator
          buyCrowns={buyCrowns}
          investValue={investValue}
          setInvestValue={setInvestValue}
        />
      </Context.Provider>
    </div>
  )
}

export default App