
import LiveSection from "./LiveSection";
import ChatSection from "./ChatSection";
import InfoSection from "./InfoSection";
import React from "react";
import Webcam from "react-webcam";
import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { getApi } from "../../utils/ApiInstanse"
import TimerModal from "./TimerModal"
import AgoraRTC from "agora-rtc-sdk-ng";
import axios from 'axios';
// require('dotenv').config({path:".env.local"});
// const dotenv=require("dotenv").config({path:".env.local"});

function StreamerIndex(props) {
    const [isTimer, setIsTimer] = useState(false)
    const [timer, setTimer] = useState('6')
    const [livePlayerInfo, setLivePlayerInfo] = useState()
    // const [bigWin, setBigWin] = useState()
    const [roomInfoPoints, setRoomInfoPoints] = useState()
    const [isLiveStart, setIsLiveStart] = useState(false)
    const [text, setText] = useState("");
    const [messageData, setMessageData] = useState([]);
    const Ref = useRef()
    const divRef = useRef(null);
    const { t } = useTranslation();
    const [isBlockModal, setIsBlockModal] = useState(false)
    const [isLive, setIsLive] = useState(false)
    const [isNuisance, setIsNuisance] = useState(false)
    const [isAddicted, setIsAddicted] = useState(false)
    const [nuisance, setNuisance] = useState('')
    const [addicted, setAddicted] = useState('')
    const[playerId,setPlayerId] = useState(null)
    const[playerName, setPlayerName] = useState()
    let bigWin = [{ name: 'a', points: '3000' }, { name: 'b', points: '2000' },]


 const streamerDetails = JSON.parse(localStorage.getItem('streamer_details'))
    useEffect(() => {
        getApi('/game-streamer-info')
            .then((response) => {
                if (response && response.data && response.data.data && response.data.data.LivePlayerData) {
                    setLivePlayerInfo(response.data.data.LivePlayerData)
                }
                if (response && response.data && response.data.data && response.data.data.roomInfoData && response.data.data.roomInfoData.length >= 0) {
                    setRoomInfoPoints(response.data.data.roomInfoData)
                }
                if (response && response.data && response.data.data && response.data.data.roomInfo && response.data.data.roomInfo.length >= 0 && response.data.data.roomInfo[0] && response.data.data.roomInfo[0].points && response.data.data.roomInfo[0].points.length >= 0) {
                }

            })
            .catch((err) => { console.log(err) })
    }, [])

    const handleLive = () => {
        // setIsLive(true);
        setIsTimer(true)
        if (Ref.current) {
            clearInterval(Ref.current)
        }
        const id = setInterval(() => { setTimer(pre => pre - 1) }, 1000)
        Ref.current = id;
    }
    const handleStopLive = () => {
        setIsLiveStart(false)
        setIsLive(false)
    }

    // -----------------------------------------------------------------------
    let options = {
        token: '',
        appId: '49ad4f30ade841489b15734c1365ca09',
        role: '',
        channel: '',
        uid: 0
    }

    let channelParameters = {
        localVideoTrack: null,
        localAudioTrack: null,
        // remoteAudioTrack: null,
        // remoteVideoTrack: null,
        // remoteUserId: null
    }

    const localContainer = document.createElement('div');
    // const remoteContainer = document.createElement('div');

    localContainer.id = options.uid;
    // Set the textContent property of the local video container to the local user id.
    localContainer.textContent = "Local user " + options.uid;

    localContainer.style.width = "360px";
    localContainer.style.height = "720px";
    localContainer.style.padding = "15px 5px 25px 5px";
    // Set the remote video container size.
    // remoteContainer.style.width = "360px";
    // remoteContainer.style.height = "480px";
    // remoteContainer.style.padding = "15px 5px 25px 5px";

    const agoraEngine = AgoraRTC.createClient({ mode: 'live', codec: 'vp8' });

    // agoraEngine.on('user-published', async(user, mediaType) => {
    //     await agoraEngine.subscribe(user, mediaType);
    //     if (mediaType === 'video')
    //     {
    //         channelParameters.remoteVideoTrack = user.videoTrack;
    //     channelParameters.remoteAudioTrack = user.audioTrack;
    //     // Save the remote user id for reuse.
    //     channelParameters.remoteUserId = user.uid.toString();
    //     // Specify the ID of the DIV container. You can use the uid of the remote user.
    //     remoteContainer.id = user.uid.toString();
    //     channelParameters.remoteUserId = user.uid.toString();
    //     remoteContainer.textContent = "Remote user " + user.uid.toString();
    //     document.getElementById('live-video').append(remoteContainer);

    //     if(options.role !== 'host')
    //     {
    //         // Play the remote video track.
    //         channelParameters.remoteVideoTrack.play(remoteContainer);
    //     }

    //     }
    //     if (mediaType === 'audio')
    //     {
    //         channelParameters.remoteAudioTrack = user.audioTrack;
    //         channelParameters.remoteAudioTrack.play();
    //     }

    //     agoraEngine.on("user-unpublished", user => {
    //         console.log(user.uid+ "has left the channel");
    //     });
    // });

    async function handleJoinClick() {
        handleHostClick();

        if (options.role === '') {
            window.alert("Select a user role first!");
            return;
        }

        const currentTime = Math.floor(Date.now() / 1000);
        options.channel = streamerDetails.streamer_id + currentTime;

        await axios.post('http://localhost:7001/authentication/token', {channelName: options.channel})
            .then((response) => {
                options.token = response.data.generatedToken
                console.log(response);
            })
            .catch(err => console.log(err));
          


        // Join a channel.
        await agoraEngine.join(options.appId, options.channel, options.token, options.uid);
        // Create a local audio track from the audio sampled by a microphone.
        channelParameters.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
        // Create a local video track from the video captured by a camera.
        channelParameters.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
        // Append the local video container to the page body.
        document.getElementById('live-video').append(localContainer);

        // Publish the local audio and video track if the user joins as a host.
        if (options.role === 'host') {
            // Publish the local audio and video tracks in the channel.
            await agoraEngine.publish([channelParameters.localAudioTrack, channelParameters.localVideoTrack]);
            // Play the local video track.
            channelParameters.localVideoTrack.play(localContainer);
            // console.log("publish success!");
        }
    }

    if (isLive) {
        handleJoinClick();
        // setIsTrue(true);
    }
    // if (!props.isLive && isTrue) {
    //     handleLeaveClick();
    // }


    // React.useEffect(() => {
    //     handleJoinClick();
    // }, [props.isLive]);


    async function handleLeaveClick() {

        // console.log(channelParameters.localAudioTrack);
        // console.log(channelParameters.localVideoTrack);
        if (channelParameters.localAudioTrack !== null && channelParameters.localVoiceTrack !== null) {
            channelParameters.localAudioTrack.close();
            channelParameters.localVideoTrack.close();
        }
        // Remove the containers you created for the local video and remote video.
        // removeVideoDiv(remoteContainer.id);
        removeVideoDiv(localContainer.id);
        // Leave the channel
        await agoraEngine.leave();
        // console.log("You left the channel");
        // Refresh the page for reuse
        // window.location.reload();
        setIsLiveStart(false)
        setIsLive(false)
    }

    async function handleHostClick() {
        // Save the selected role in a variable for reuse.
        options.role = 'host';
        // Call the method to set the role as Host.
        await agoraEngine.setClientRole(options.role);
        if (channelParameters.localVideoTrack !== null) {
            // Publish the local audio and video track in the channel.
            await agoraEngine.publish([channelParameters.localAudioTrack, channelParameters.localVideoTrack]);
            // Stop playing the remote video.
            //  channelParameters.remoteVideoTrack.stop();
            // Start playing the local video.
            channelParameters.localVideoTrack.play(localContainer);
        }
    }

    // async function handleAudienceClick(){
    //     if (document.getElementById('audience').checked)
    //     {
    //         // Save the selected role in a variable for reuse.
    //         options.role = 'audience';
    //         if(channelParameters.localAudioTrack !== null && channelParameters.localVideoTrack !== null)
    //         {
    //             if(channelParameters.remoteVideoTrack!==null)
    //             {
    //                 // Replace the current video track with remote video track
    //                 await channelParameters.localVideoTrack.replaceTrack(channelParameters.remoteVideoTrack, true);
    //             }
    //         }
    //         // Call the method to set the role as Audience.
    //         await agoraEngine.setClientRole(options.role);
    //     }
    // }

    function removeVideoDiv(id) {
        // console.log("Removing " + id + "Div");
        let Div = document.getElementById(id);
        if (Div) {
            Div.remove();
        }
    }
    const videoConstraints = {
        width: 360,
        height: 720,
        facingMode: "user"
    };


    return (
        <>
            <meta charSet="UTF-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />

            <title>{t("Live preparation")}</title>

            {isTimer && <TimerModal
                setIsLiveStart={setIsLiveStart}
                isTimer={isTimer} setIsTimer={setIsTimer}
                timer={timer} setTimer={setTimer}
                Ref={Ref}
                isLive={isLive} setIsLive={setIsLive}
            />
            }

            <div className="full_page" style={{ position: 'relative' }}>
                <div className="top-section">
                    <div className="das-title">
                        <h1>{t("Live preparation")}</h1>
                    </div>
                    {!isLiveStart &&
                        <div className="button" >
                            <button onClick={handleLive}>{t("Start Live")}</button>
                        </div>}
                    {isLiveStart &&
                        <div className="button stop-btn " style={{ marginRight: '11rem' }} >
                            <button onClick={handleLeaveClick}>{t("Live Stop")}</button>
                            <div className="stream">
                                <img src="assets/img/dot.png" alt="" />
                                <h5>{t("Streaming Now")}</h5>
                            </div>
                        </div>
                    }
                </div>
                <div className="container-fluid px-lg-5">
                    <div className="row">
                        <InfoSection
                            livePlayerInfo={livePlayerInfo} setLivePlayerInfo={setLivePlayerInfo}
                            bigWin={bigWin}
                            roomInfoPoints={roomInfoPoints} setRoomInfoPoints={setRoomInfoPoints}
                        />
                        {/* <LiveSection
                            isLive={isLive} setIsLive={setIsLive}
                        /> */}
                       <div className="col-lg-4"
                       style={{visibility : isTimer ? 'hidden' : 'visible'}}
                        >
                            <div className="content-card Vide_section">
                                <div className="card-title">
                                    <h5>{t("Live")}</h5>
                                    {/* <video src="assets/live_video/live_video.mp4" style="height: 812px; width: 375px;"></video> */}
                                    {/* <img src="../assets/img/bg_img.jpg" alt="" className="img-fluid" /> */}
                                    {isLive && <div id='live-video'></div>}
                                    {!isLive && <div>
                                        <Webcam
                                            // height={720}
                                            // width={320}
                                            videoConstraints={videoConstraints}
                                        />
                                    </div>
                                    }
                                    <a className="button-popup" href="#popup1">
                                        <i className="fa-solid fa-gift" />
                                    </a>
                                    <div id="popup1" className="overlay">
                                        <div className="popup">
                                            <a className="close" href="#">
                                                ×
                                            </a>
                                            <div className="content-box">
                                                <div className="box">
                                                    <img
                                                        src="../assets/img/popup_img.png"
                                                        alt=""
                                                        className="profile-img"
                                                    />
                                                    <h4>{t("Special Bet")}</h4>
                                                    <div className="pop-img">
                                                        <ul>
                                                            <li>
                                                                <img
                                                                    src="../assets/img/240_F_105573812_cvD4P5jo6tMPhZULX324qUYFbNpXlisD-removebg-preview 1.png"
                                                                    alt=""
                                                                />
                                                                <p>赤にベット</p>
                                                                <p>
                                                                    <img src="../assets/img/Frame.png" alt="" />
                                                                    100€
                                                                </p>
                                                            </li>
                                                            <li style={{ marginTop: "0.7rem !important" }}>
                                                                <img
                                                                    src="../assets/img/AdobeStock_541812547_Preview 1.png"
                                                                    alt=""
                                                                />
                                                                <p>赤にベット</p>
                                                                <p>
                                                                    <img
                                                                        src="../assets/img/Frame.png"
                                                                        alt=""
                                                                        className="img-fluid"
                                                                    />
                                                                    100€
                                                                </p>
                                                            </li>
                                                        </ul>
                                                        <h6>
                                                            <b>{t("AMY’s Birthday Number")}</b>
                                                        </h6>
                                                        <ul>
                                                            <li>
                                                                <h4 className="red">3</h4>
                                                                <p>赤にベット</p>
                                                                <p>
                                                                    <img src="../assets/img/Frame.png" alt="" />
                                                                    100€
                                                                </p>
                                                            </li>
                                                            <li>
                                                                <h4 className="black">23</h4>
                                                                <p>赤にベット</p>
                                                                <p>
                                                                    <img src="../assets/img/Frame.png" alt="" />
                                                                    100€
                                                                </p>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5">
                                {/* <input type='radio' id='host' onClick={handleHostClick} /> */}
                                {/* <input type='radio' id='audience' onClick={handleAudienceClick} /> */}
                                {/* <button type='button' onClick={handleJoinClick}>Join</button> */}
                                {/* <button type='button' onClick={handleLeaveClick}>Leave</button> */}
                            </div>

                        </div>
                        <ChatSection
                            divRef={divRef}
                            messageData={messageData} setMessageData={setMessageData}
                            text={text} setText={setText}
                            isBlockModal={isBlockModal} setIsBlockModal={setIsBlockModal} 
                            isNuisance ={isNuisance} setIsNuisance ={setIsNuisance}
                            isAddicted ={isAddicted} setIsAddicted ={setIsAddicted}
                            nuisance={nuisance}  setNuisance ={setNuisance}
                            addicted={addicted}  setAddicted ={setAddicted}
                            playerId={playerId} setPlayerId ={setPlayerId}
                            playerName = {playerName} setPlayerName ={setPlayerName}
                            
                            />
                    </div>
                </div>
            </div>
        </>

    )
}
export default StreamerIndex