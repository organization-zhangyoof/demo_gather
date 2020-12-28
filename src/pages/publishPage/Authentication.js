import React, { Component } from 'react';
import styles from './publishPage.less';
import card from './assets/card.png';
import finger from './assets/finger.png';
import ok from './assets/ok.png';

class Authentication extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        let { isShow } = this.state
        return (
            <div className={styles.authenticate_page}>
                <div className={styles.mainPosition}>
                    {/* <div className={styles.textPosition}>
                        <div><h1>越过山丘</h1></div>
                        <div><h1>BIM智慧建设平台（公路版）V1.0发布会</h1></div>
                        <div><h2>深圳高速工程顾问有限公司</h2></div>
                    </div> */}
                    <div className={styles.left} style={{ visibility: isShow ? "visible" : "hidden" }}>
                        <div className={styles.lineMove}>
                            <img src={card}></img>
                            <div className={styles.wrapper}></div>
                        </div>
                    </div>
                    <div className={styles.middle}
                        onMouseEnter={() => {
                                this.setState({ isShow: true })
                            }}
                        onMouseLeave={() => {
                                this.setState({ isShow: false })
                            }}
                    >
                        <img src={finger}></img>
                    </div>
                    <div className={styles.right} style={{ visibility: isShow ? "visible" : "hidden" }}>
                        <img src={ok}></img>
                    </div>
                </div>


            </div>
        );
    }
}

export default Authentication;