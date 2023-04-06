// import { useRef, useState } from "react";

import { useTranslation } from "react-i18next"
import Webcam from "react-webcam"



function TimerModal(props) {
    const { t } = useTranslation()
    if (props.timer === 0) {
        clearInterval(props.Ref.current)
        props.setTimer(5)
        props.setIsTimer(false)
        // alert('TimeOut')
        props.setIsLiveStart(true)
        props.setIsLive(true)
    }
    const handleStopLiveTimer = () => {
        clearInterval(props.Ref.current)
        props.setTimer(7)
        props.setIsTimer(false)
    }
    const videoConstraints = {
        width: 360,
        height: 720,
        facingMode: "user"
    };
    return (

        <div style={{
            backgroundColor: '#000000c7', position: 'fixed', zIndex: 1000, top: '-4px',
            width: '100%',
        }}>
            <div className="nav_bar" style={{ visibility: 'hidden' }}>
                <a href="#" className="navbar-logo">
                    Baricata
                </a>
                <div className="nav-item">

                </div>
            </div>
            <div className="full_page">
                <div className="top-section" style={{ visibility: 'hidden' }} >
                    <div className="das-title">
                        <h1>Live preparation</h1>
                    </div>
                    <div className="button">
                        <form action="" method="get">
                            <button type="submit">Start Live</button>
                        </form>
                    </div>
                </div>
                <div className="container-fluid px-lg-5" >
                    <div className="row">
                        <div className="col-lg-4"  >
                        </div>
                        <div className="col-lg-4">
                            <div className="content-card Video_section">
                                <div className="card-title" style={{padding: '15px 5px 25px 5px'}}>
                                    <h5>Live</h5>
                                    <Webcam
                                            // height={720}
                                            // width={320}
                                            videoConstraints={videoConstraints}
                                        />
                                </div>
                                {/* <video src="assets/live_video/live_video.mp4" style="height: 812px; width: 375px;"></video> */}
                                {/* <img src="assets/img/bg_img.jpg" alt="" className="bg_img" /> */}
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="content-card chat_section" style={{ backgroundColor: '#ffffff00' }} >
                                <div style={{
                                    fontSize: '64px',

                                    display: 'flex',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    color: '#FFFFFF'
                                }}>

                                   {t( `${props.timer}`)}
                                </div>
                                <button onClick={handleStopLiveTimer} className='stop-timer'>
                                   {t(" Stop Live")}
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>




    )
}
export default TimerModal;