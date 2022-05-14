import {normal, errorMsg} from '../Notifications'
import styles from "./main.module.scss"
import Context from "../../context"
import { useContext } from "react"
import Countdown from "../Countdown"


function Main({investValue, crowns, buyCrowns, countIncomes, dailyIncome, weeklyIncome, annualIncome}) {

    const {wallet, balance} = useContext(Context)

    const openModal = () => {
        if (!wallet) {
            normal("Connect your Metamask 🦊")
        } else if (!investValue) {
            errorMsg("Input correct sum")
        }
        else if (parseInt(investValue) > balance) {
            errorMsg("You don't have enough BNB")
        } else if (investValue * 100 / balance >= 75) {
            const referral = window.localStorage.getItem("ref")
            buyCrowns(investValue, wallet, referral)
        } else {
            document.querySelector("#modal-container").removeAttribute("class")
            document.querySelector("#modal-container").classList.add("two")
        }
    }

    return (
        <main>
            <div className={styles.content}>
                <h1 className={styles.main_heading}>GET CROWNS AND EARN</h1>
                <div className={styles.invest}>
                    <h2 className="sub_heading">Your investment</h2>
                    <div className={styles.form_wrapper}>
                        <div className="input_wrapper">
                            <div className="currency">BNB</div>
                            <input className="invest_bnb" type="number" onChange={(event) => {countIncomes(event.target.value)}} value={investValue}/>
                        </div>
                        <button onClick={() => {countIncomes(balance)}} className="btn_transparent"><span><nobr>All balance</nobr></span></button>
                    </div>
                    <div className="stats_field">
                        <div className="stats_header">Daily income</div>
                        <div className="stats_value">{dailyIncome.toString().split(".")[1] != undefined ? dailyIncome.toString().split(".")[0] + "." + dailyIncome.toString().split(".")[1].slice(0, 2) : dailyIncome} BNB</div>
                    </div>
                    <div className="stats_field">
                        <div className="stats_header">ARP</div>
                        <div className="stats_value">4320 %</div>
                    </div>
                    <div className="stats_field">
                        <div className="stats_header">Weekly income</div>
                        <div className="stats_value">{weeklyIncome.toString().split(".")[1] != undefined ? weeklyIncome.toString().split(".")[0] + "." + weeklyIncome.toString().split(".")[1].slice(0, 2) : weeklyIncome} BNB</div>
                    </div>
                    <div className={styles.annual_stat}>
                        <div className={styles.annual_header}><nobr>Annual income</nobr></div>
                        <div className={styles.annual_value}>{annualIncome.toString().split(".")[0]} BNB</div>
                    </div>
                    <button className="btn_gold get_crowns" type="submit">
                    <Countdown 
		                timeTillDate="05 14 2022, 6:00 am" 
	                />
                    </button>
                </div>
                <div className={styles.stats}>
                    <div className={styles.stats_item}>
                        <div className="stats_header">Wallet (BNB)</div>
                        <div className={styles.stats_stat}>{balance.toString().split(".")[1] != undefined ? balance.toString().split(".")[0] + "." + balance.toString().split(".")[1].slice(0, 2) : balance}</div>
                    </div>
                    <div className={styles.stats_item}>
                        <div className="stats_header">Your crowns</div>
                        <div className={styles.stats_stat}>
                            <span>{crowns.toString().length > 6 ? "~" + crowns.toString().slice(0, 5) : crowns}</span>
                            <svg width="38" height="37" viewBox="0 0 38 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_44_10167)">
                            <path d="M32.1486 29.994C21.0077 25.8486 9.80205 28.2668 5.59182 29.994C5.26796 23.193 1.3816 19.9542 1.05773 19.6303C0.410007 19.3064 -0.23772 10.5621 0.0861433 11.2098C3.97251 19.9542 7.85887 21.5735 9.47819 21.5735C16.7327 21.0554 16.3873 16.1758 15.3077 13.8008L18.8702 7.32349C20.1657 9.26667 22.6918 13.2826 22.4327 13.8008C20.1657 19.9542 25.3475 21.8973 27.6145 21.5735C34.7395 19.9542 37.0066 11.2099 37.3305 11.8576C37.6543 12.5054 37.3305 18.9826 36.6827 19.6304C32.1486 23.8406 32.4725 30.3179 32.1486 29.994Z" fill="url(#paint0_linear_44_10167)" stroke="#20262D" strokeWidth="0.647727"/>
                            <path d="M8.50666 9.26685L6.56348 12.8293C8.83052 14.1248 6.56348 17.3634 6.88734 17.6873C8.83052 18.6589 13.3646 17.3634 13.0407 17.0396C10.1907 14.9668 10.5578 12.9373 11.0976 12.1816L8.50666 9.26685Z" fill="url(#paint1_linear_44_10167)" stroke="#20262D" strokeWidth="0.647727" strokeMiterlimit="16"/>
                            <path d="M28.6026 9.26685L30.5458 12.8293C28.2787 14.1248 30.5458 17.3634 30.2219 17.6873C28.2787 18.6589 23.7446 17.3634 24.0685 17.0396C26.9185 14.9668 26.5515 12.9373 26.0117 12.1816L28.6026 9.26685Z" fill="url(#paint2_linear_44_10167)" stroke="#20262D" strokeWidth="0.647727" strokeMiterlimit="16"/>
                            </g>
                            <defs>
                            <linearGradient id="paint0_linear_44_10167" x1="1.70546" y1="25.136" x2="37.6543" y2="24.4883" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#AA852C"/>
                            <stop offset="0.497825" stopColor="#F1DC7F"/>
                            <stop offset="1" stopColor="#A67D25"/>
                            </linearGradient>
                            <linearGradient id="paint1_linear_44_10167" x1="6.23961" y1="15.0964" x2="17.8987" y2="14.7725" gradientUnits="userSpaceOnUse">
                            <stop offset="0.108529" stopColor="#AD8629"/>
                            <stop offset="0.256641" stopColor="#F1DC7F"/>
                            <stop offset="0.46674" stopColor="#A78523"/>
                            </linearGradient>
                            <linearGradient id="paint2_linear_44_10167" x1="30.8696" y1="15.0964" x2="19.2105" y2="14.7725" gradientUnits="userSpaceOnUse">
                            <stop offset="0.108529" stopColor="#AD8629"/>
                            <stop offset="0.256641" stopColor="#F1DC7F"/>
                            <stop offset="0.46674" stopColor="#A78523"/>
                            </linearGradient>
                            <clipPath id="clip0_44_10167">
                            <rect width="38" height="35.7647" fill="white" transform="translate(0 0.617676)"/>
                            </clipPath>
                            </defs>
                            </svg>
                        </div>
                    </div>
                    <div className={styles.stats_item}>
                        <div className="stats_header">BNB per day</div>
                        <div className={styles.stats_stat}><nobr>~{dailyIncome.toString().split(".")[1] != undefined ? dailyIncome.toString().split(".")[0] + "." + dailyIncome.toString().split(".")[1].slice(0, 2) : dailyIncome}</nobr></div>
                    </div>
                    <div className={styles.stats_item}>
                        <div className="stats_header">Daily return</div>
                        <div className={styles.stats_stat}>12%</div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Main