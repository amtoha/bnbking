import "./calculator.scss"
import {HamburgerSpring} from "react-animated-burgers"
import { useContext } from "react"
import Context from "../../context"
import { errorMsg } from "../Notifications"

function Calculator({investValue, setInvestValue, buyCrowns}) {

    const {balance, wallet} = useContext(Context)
    const currentPercent = investValue * 100 / balance
    const quarter = balance * 25 / 100
    const half = balance * 50 / 100
    const three_quarters = balance * 75 / 100


    const validateBuy = () => {
        if (!investValue) {
            errorMsg("Input correct sum")
        }
        else if (parseInt(investValue) > balance) {
            errorMsg("You don't have enough BNB")
        } else  {
            setInvestValue("")
            const referral = window.localStorage.getItem("ref")
            buyCrowns(investValue, wallet, referral)
        }
    }

    const countPercents = () => {
        switch (true) {
            case (currentPercent < 25):
                return [["25", quarter, quarter * 8 / 100], ["50", half, half * 8 / 100], ["75", three_quarters, three_quarters * 8 / 100], ["All", balance, balance * 8 / 100]]
            case (currentPercent > 75):
                return [["All", balance, balance * 8 / 100]]
            case (currentPercent == 75):
                return [["75", three_quarters, three_quarters * 8 / 100], ["All", balance, balance * 8 / 100]]
            case (currentPercent == 50):
                return [["50", half, half * 8 / 100], ["75", three_quarters, three_quarters * 8 / 100], ["All", balance, balance * 8 / 100]]
            case (currentPercent > 50):
                return [["75", three_quarters, three_quarters * 8 / 100], ["All", balance, balance * 8 / 100]]
            case (currentPercent == 25):
                return [["25", quarter, quarter * 8 / 100], ["50", half, half * 8 / 100], ["75", three_quarters, three_quarters * 8 / 100], ["All", balance, balance * 8 / 100]]
            case (currentPercent > 25):
                return [["50", half, half * 8 / 100], ["75", three_quarters, three_quarters * 8 / 100], ["All", balance, balance * 8 / 100]]
            default:
                return []
        }
    }

    const closeModalByBtn = () => {
        document.querySelector("#modal-container").classList.add("out")
    }

    const closeModal = (event) => {
        if (event.target == document.querySelector(".modal-background")) {
            document.querySelector("#modal-container").classList.add("out")
        }
    }

    return (
        <>
            <div id="modal-container">
                <div onClick={(event) => closeModal(event)} className="modal-background">
                    <div className="modal">
                        <HamburgerSpring style={{padding: "0", position: "absolute", top: "30px", right: "30px"}} isActive={true} toggleButton={(event) => closeModalByBtn(event)} barColor="white"/>
                        <h2 className="modal_header">SURE ABOUT INVESTMENT AMOUNT?</h2>
                        <div className="stats_field field_modal">
                            <div className="stats_header stats_modal">% of balance</div>
                            <div className="stats_header stats_modal">Daily income</div>
                        </div>
                        {countPercents().map((elem, i) => {
                            return (
                                <div key={i} className="stats_field modal_stats_field">
                                    <div className="stats_header">{elem[0].toString().length > 5 ? elem[0].toString().slice(0, 5) + "..." : elem[0]} %  ({elem[1].toString().length > 5 ? elem[1].toString().slice(0, 5) + "..." : elem[1]} BNB)</div>
                                    <div className="stats_value">{elem[2].toString().length > 8 ? elem[2].toString().slice(0, 8) + "..." : elem[2]}</div>
                                </div>
                            )
                        })}
                        <div className="sub_heading modal_subheading">Your investment</div>
                        <div className="input_wrapper">
                            <div className="currency">BNB</div>
                            <input className="invest_bnb" type="number" onChange={(event) => {setInvestValue(event.target.value)}} value={investValue}/>
                        </div>
                        <div className="btns_percent_wrapper">
                            <div onClick={() => {setInvestValue(quarter)}} className="btn_transparent btn_modal"><span>25%</span></div>
                            <div onClick={() => {setInvestValue(half)}}  className="btn_transparent btn_modal"><span>50%</span></div>
                            <div onClick={() => {setInvestValue(three_quarters)}}  className="btn_transparent btn_modal"><span>75%</span></div>
                            <div onClick={() => {setInvestValue(balance)}}  className="btn_transparent btn_modal"><span>All</span></div>
                        </div>
                        <button onClick={() => {validateBuy(); closeModalByBtn()}} className="btn_gold get_crowns" type="submit">
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
                            <span>Get crowns</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Calculator