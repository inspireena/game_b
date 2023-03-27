// import { useRef, useState } from "react";


function TimerModal(props) {
    if (props.timer === 0) {
        clearInterval(props.Ref.current)
        props.setTimer(2)
        props.setIsTimer(false)
        alert('TimeOut')
        props.setIsLiveStart(true)
    }
    const handleStopLiveTimer = () => {
        clearInterval(props.Ref.current)
        props.setTimer(7)
        props.setIsTimer(false)
    }

    return (
        <>
            {<div style={{
                backgroundColor: 'rgb(0 0 0 / 81%)',
                position: 'fixed',
                height: ' 100vh',
                width: '100vw',
                zIndex: 1000,
                display: 'flex',
                fontweight: 700,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <div style={{
                    fontSize: '64px',
                    lineHeight: '96px',
                    display: 'flex',
                    alignItems: 'center',
                    textAlign: 'center',
                    color: '#FFFFFF'
                }}>
                    {props.timer}
                </div>
                <button onClick={handleStopLiveTimer} className='stop-timer'>
                    Stop Live
                </button>

            </div>}

        </>
    )
}
export default TimerModal;