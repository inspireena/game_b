import ReactPlayer from 'react-player'
import React from 'react'
function VideoPlayer(props) {
    let videoInfo =JSON.parse(localStorage.getItem('videoInfo'))
    // console.log('========video url=========', videoInfo.data.video_url);
    return(
    <div style={{position:'fixed', backgroundColor:'#000000cc', top : '0', left:'0', height:'100vh', width:'100vw'}}>
   <ReactPlayer 
   url={props.videoUrl}
   playing ={ true}
   loop ={ true}
   volume ={ true}
   muted ={ true}
   controls ={ true} 
   progressInterval = {1000}
   width='40rem'
   height='22.5rem'
   style={{position:'fixed', top : '20%', left:'20%'}}
   />
   <button 
    style={{position:'fixed', top : '20%', left:'66.5%'}}
   onClick={()=>props.setIsPlayer(false)}>X</button>
    </div>)
}
export default VideoPlayer