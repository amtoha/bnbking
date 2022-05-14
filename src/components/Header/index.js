import styles from "./header.module.scss"
import {HamburgerSpring} from "react-animated-burgers"
import { useState } from "react"
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import about_the_project from "../../assets/BNB-KING-ABOUT-THE-PROJECT.pdf"
import whitepaper from "../../assets/BNB-KING-WHITEPAPER.pdf"
import audit from "../../assets/HazeSecurity_BNB_KING.pdf"
import { normal } from "../Notifications";

function Header({children}) {

    const [isBurgerActive, setIsBurgerActive] = useState(false)

    const toggleBurger = () => {
        setIsBurgerActive(!isBurgerActive)
        document.querySelector(`.${styles.nav_items}`).classList.toggle(styles.active)
        if (document.querySelector(`.${styles.nav_items}`).classList.contains(styles.active)) {
            disableBodyScroll(document)
        } else {
            enableBodyScroll(document)
        }
    }

    return (
        <header>
            <div className={styles.logo}>
                <svg width="51" height="74" viewBox="0 0 51 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M37.5073 21.2842C27.5391 17.5751 17.513 19.7387 13.7459 21.2842C13.4562 15.1991 9.9789 12.3011 9.68913 12.0114C9.10959 11.7216 8.53004 3.89773 8.81981 4.47727C12.2971 12.3011 15.7744 13.75 17.2232 13.75C23.7141 13.2865 23.405 8.92049 22.4391 6.79545L25.6266 1C26.7857 2.73864 29.0459 6.33182 28.8141 6.79545C26.7857 12.3011 31.4221 14.0398 33.4505 13.75C39.8255 12.3012 41.8539 4.47732 42.1437 5.05687C42.4334 5.63641 42.1437 11.4319 41.5641 12.0114C37.5073 15.7785 37.7971 21.5739 37.5073 21.2842Z" fill="url(#paint0_linear_49_123)" stroke="#CAA725" strokeWidth="0.579545"/>
                <path d="M16.3539 2.73877L14.6152 5.92627C16.6436 7.08536 14.6152 9.98309 14.905 10.2729C16.6436 11.1422 20.7005 9.98309 20.4107 9.69331C17.8607 7.83877 18.1891 6.02286 18.6721 5.34672L16.3539 2.73877Z" fill="url(#paint1_linear_49_123)" stroke="#CAA725" strokeWidth="0.579545" strokeMiterlimit="16"/>
                <path d="M34.3345 2.73877L36.0732 5.92627C34.0448 7.08536 36.0732 9.98309 35.7834 10.2729C34.0448 11.1422 29.988 9.98309 30.2777 9.69331C32.8277 7.83877 32.4993 6.02286 32.0164 5.34672L34.3345 2.73877Z" fill="url(#paint2_linear_49_123)" stroke="#CAA725" strokeWidth="0.579545" strokeMiterlimit="16"/>
                <circle cx="25.5" cy="47.6641" r="25.5" fill="#F0C53A"/>
                <path d="M1.04138 40.4512C2.8944 34.1677 7.09462 28.8383 12.7711 25.5682C18.4476 22.2981 25.1649 21.3381 31.5301 22.8873L30.7588 26.0567C25.2078 24.7057 19.3497 25.5429 14.3994 28.3947C9.44899 31.2465 5.78605 35.8941 4.17006 41.3738L1.04138 40.4512Z" fill="#F9D356"/>
                <path d="M50.5361 52.5059C49.2922 58.9378 45.6206 64.6442 40.2827 68.4419C34.9448 72.2396 28.35 73.8373 21.8659 72.9037L22.3307 69.6751C27.9855 70.4893 33.7366 69.096 38.3917 65.784C43.0469 62.4721 46.2488 57.4956 47.3335 51.8865L50.5361 52.5059Z" fill="#E0B622"/>
                <circle cx="25.5" cy="47.6641" r="25.2102" stroke="#E0C427" strokeWidth="0.579545"/>
                <circle cx="25.5" cy="47.664" r="19.125" stroke="#CFA51D" strokeWidth="1.15909"/>
                <circle cx="25.5" cy="47.6639" r="20.5739" stroke="#F4D956" strokeWidth="1.73864"/>
                <g filter="url(#filter0_d_49_123)">
                <path fillRule="evenodd" clipRule="evenodd" d="M25.5035 36.073L18.5454 43.031L21.0306 45.5162L25.4999 41.047L30.0167 45.5637L32.5019 43.0785L27.9851 38.5618L27.9887 38.5582L25.5035 36.073ZM14.025 47.4299L16.6887 44.7662L19.3524 47.4299L16.6887 50.0936L14.025 47.4299ZM22.8297 47.4299L25.4934 44.7662L28.1571 47.4299L25.4934 50.0936L22.8297 47.4299ZM34.2981 44.7662L31.6344 47.4299L34.2981 50.0936L36.9618 47.4299L34.2981 44.7662ZM18.5454 51.9386L25.5035 58.8966L27.9887 56.4114L27.9852 56.4079L32.5019 51.8912L30.0167 49.406L25.5 53.9227L21.0306 49.4534L18.5454 51.9386Z" fill="#292929"/>
                </g>
                <defs>
                <filter id="filter0_d_49_123" x="14.025" y="36.073" width="22.9368" height="24.5623" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="1.73864"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0.882353 0 0 0 0 0.686275 0 0 0 0 0.101961 0 0 0 1 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_49_123"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_49_123" result="shape"/>
                </filter>
                <linearGradient id="paint0_linear_49_123" x1="10.2687" y1="16.9375" x2="42.4335" y2="16.358" gradientUnits="userSpaceOnUse">
                <stop stopColor="#AA852C"/>
                <stop offset="0.497825" stopColor="#F1DC7F"/>
                <stop offset="1" stopColor="#A67D25"/>
                </linearGradient>
                <linearGradient id="paint1_linear_49_123" x1="14.3255" y1="7.95468" x2="24.7573" y2="7.66491" gradientUnits="userSpaceOnUse">
                <stop offset="0.108529" stopColor="#AD8629"/>
                <stop offset="0.256641" stopColor="#F1DC7F"/>
                <stop offset="0.46674" stopColor="#A78523"/>
                </linearGradient>
                <linearGradient id="paint2_linear_49_123" x1="36.363" y1="7.95468" x2="25.9311" y2="7.66491" gradientUnits="userSpaceOnUse">
                <stop offset="0.108529" stopColor="#AD8629"/>
                <stop offset="0.256641" stopColor="#F1DC7F"/>
                <stop offset="0.46674" stopColor="#A78523"/>
                </linearGradient>
                </defs>
            </svg>
            </div>
            {window.innerWidth < 1024 ?
                <>
                    <div className={styles.nav_items}>
                        <div className={`${styles.nav_item} ${styles.active}`}>EARN</div>
                        <div className={styles.nav_item}> <a target="_blank" href={about_the_project}>ABOUT THE PROJECT</a> </div>
                        <div className={styles.nav_item}> <a target="_blank" href={whitepaper}>WHITEPAPER</a> </div>
                        <div className={styles.nav_item}> <a target="_blank" href="https://bscscan.com/address/0xda624ba6c18c935213d4377995bb7d334c2fbf93">CONTRACT</a> </div>
                        <div className={styles.nav_item}> <a target="_blank" href={audit} >AUDIT</a></div>
                        {children[1]}
                    </div>
                    {children[0]}
                    <HamburgerSpring style={{padding: "0", zIndex: 101}} isActive={isBurgerActive} toggleButton={toggleBurger} barColor="white"/>
                </>
            :
                <nav>
                    <div className={styles.nav_items}>
                        <div className={`${styles.nav_item} ${styles.active}`}>EARN</div>
                        <div className={styles.nav_item}> <a target="_blank" href={about_the_project}>ABOUT THE PROJECT</a> </div>
                        <div className={styles.nav_item}> <a target="_blank" href={whitepaper}>WHITEPAPER</a> </div>
                        <div className={styles.nav_item}> <a target="_blank" href="https://bscscan.com/address/0xda624ba6c18c935213d4377995bb7d334c2fbf93">CONTRACT</a> </div>
                        <div className={styles.nav_item}> <a target="_blank" href={audit}>AUDIT</a></div>
                    </div>
                    {children[0]}
                </nav>
             }
            
        </header>
    )
}

export default Header