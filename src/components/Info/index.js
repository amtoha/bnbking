import styles from "./info.module.scss"


function Info({tvl}) {

    return (
        <div className={`section ${styles.info}`}>
            <h2 className="section_header">FINANCIAL INFO</h2>
            <div className="stats_field">
                <div className="stats_header">Contract TVL</div>
                <div className="stats_value">{tvl.toString().split(".")[1] != undefined ? tvl.toString().split(".")[0] + "." + tvl.toString().split(".")[1].slice(0, 2) : tvl} BNB</div>
            </div>
            <div className="stats_field">
                <div className="stats_header">ARP</div>
                <div className="stats_value">4320 %</div>
            </div>
            <div className="stats_field">
                <div className="stats_header">Developer fee</div>
                <div className="stats_value">5 %</div>
            </div>
        </div>
    )
}

export default Info