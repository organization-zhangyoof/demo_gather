import React,{Component} from'react'
import styles from './style/index.less'

class YTX extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        
    }

    render(){
        return (
            <div className={styles.layer}>
                <iframe
                    style={{border: 'none'}}
                    src='/ytx/index.html'
                    width={900}
                    height={600}
                    allow="geolocation;microphone;camera;midi;encrypted-media"
                    onLoad={() => {
                        console.log('loaded iframe')
                    }}
                    title='123'
                />
            </div>
         );
    }
}

export default YTX;
