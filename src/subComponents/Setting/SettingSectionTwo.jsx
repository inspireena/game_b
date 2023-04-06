import axios from "axios"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import UploadModal from "./UploadModal"
import VideoPlayer from "./VideoPlayer"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { propTypes } from "react-bootstrap/esm/Image"



function SettingSectionTwo(props) {
    const { t } = useTranslation()
    const [deleteModal, setDeleteModal] = useState(false)

    console.log('--------video delete status',props.deleteStatus)
    let { token } = JSON.parse(localStorage.getItem('loggedin'))

    useEffect(() => {


        axios.get('http://localhost:7000/strApi/streamer-video-data', {
            headers: {
                'Authorization': token
            }
        })
            .then((response) => {
                if (!response.data.data.video_status) {
                    props.setGroupId(response.data.data.newGroup_id)
                }
                response && response.data && response.data.data && response.data.data.inCompVideoStatus && !response.data.data.inCompVideoStatus.length && props.setGroupId(response.data.data.newGroup_id);

                response && response.data && response.data.data && response.data.data.inCompVideoStatus && response.data.data.inCompVideoStatus.length > 0 && response.data.data.inCompVideoStatus[0] && response.data.data.inCompVideoStatus[0].group_id &&
                    props.setGroupId(response.data.data.inCompVideoStatus[0].group_id);


                response && response.data && response.data.length > 0 && props.setVideoList(response.data);

                response && response.data && response.data.data && response.data.data.inCompVideoStatus && props.setInCompVideoList(response.data.data.inCompVideoStatus);


                response && response.data && response.data.data && response.data.data.completeVideo && response.data.data.completeVideo.length > 0 && props.setVideoList(response.data.data.completeVideo);


            })
    }, [props.videoUploadStatus, props.deleteStatus])
    // console.log('video status ----------', props.videoUploadStatus);
    // console.log('------video list sec 2--------', props.videoList)
    const handleBetting = () => {
        props.setVideoUploadScreen('betting')
        props.setIsUpload(true)

    }
    const handleRotation = () => {
        props.setVideoUploadScreen('rotation')
        props.setIsUpload(true)

    }
    const handleDecision = () => {
        props.setVideoUploadScreen('decision')
        props.setIsUpload(true)

    }
    const handleUrlPlay = (url) => {
        props.setVideoUrl(url)
        props.setIsPlayer(true)
    }


    const handleSendGroupId = (grpId) => {
        alert(grpId)
        axios.get('http://localhost:7001/streamer/select-streamering-group-video', {
            params: {
                group_id: grpId,
               
            },
            headers: {
                'Authorization': token
            }
        })
            .then((response) => {
                console.log(response)
               
            })
            .catch((err) => console.log(err))

    }

    function handleDelete(id, grp) {
        props.setGrp(grp)
        props.setId(id)
      
        setDeleteModal(true)

    }
    const handleSubmitDelete = () => {
        axios.get('http://localhost:7001/streamer/delete-streamer-video', {
            params: {
                group_id: props.grp,
                video_id: props.id
            },
            headers: {
                'Authorization': token
            }
        })
            .then((response) => {
                console.log(response)
                response && response.data && response.data.status && props.setDeleteStatus(response.data.status)
            })
            .catch((err) => console.log(err))

        setDeleteModal(false)
    }
    if (props.isUpload) {
        props.setVideoUploadStatus(null)
    }
   
    if (props.deleteModal) {
       console.log('delete status after modal', props.deleteStatus);
        props.setDeleteStatus(null)
    }
    console.log('============POST API SUCCESS set state in sec 2===============', props.videoUploadStatus);
    console.log('------------in comp video list------------', props.inCompVideoList);
    console.log('screenType sec 2===================', props.videoUploadScreen)
    const handleClose = () => setDeleteModal(false);

    return (
        <>


            <div className="col-lg-8">
                <div className="content-card">
                    <div className="card-title">
                        <h5>{t("Frame Range Selection")}</h5>
                    </div>
                    <div className="live-frame">
                        <img src={process.env.PUBLIC_URL + "/assets/img/live frame.png"} className="img-fluid" />
                    </div>
                </div>
                <div className="content-card">
                    <div className="card-title">
                        <h5>{t("Recorded video upload while live is stopped")}</h5>
                    </div>

                    <div>
                        <div style={{ display: 'flex' }} >
                            <div style={{ marginRight: '0.5rem', width: '2rem', flex: '1' }}></div>
                            <div className="upload-vdo" style={{ flex: '25' }}>
                                <div className="text">
                                    <div className="heading">
                                        <h5>{t("A. Betting Time")}</h5>


                                    </div>
                                </div>
                                <div className="text">
                                    <div className="heading">
                                        <h5>{t("B. Roulette rotation time")}</h5>

                                    </div>
                                </div>
                                <div className="text">
                                    <div className="heading">
                                        <h5>{t("C. Result decision time")}</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {props.inCompVideoList && props.inCompVideoList.length > 0 && props.inCompVideoList.map((value, index) => {
                            return (
                                <>
                                    <hr />

                                    <div style={{ display: 'flex' }} >
                                        <div style={{ marginRight: '0.5rem', width: '2rem', flex: '1' }}>
                                            {/* {value.status ? <input
                                                type="radio"
                                                name="upload"
                                                id=""
                                                onClick={() => handleSendGroupId(value.group_id)}
                                         
                                            /> : null} */}
                                        </div>
                                        <div className="upload-vdo" style={{ flex: '25' }}>
                                            <div className="text">

                                                <div className="heading">

                                                    {value.videoinfo.findIndex(c => c.type === 'betting') !== -1 ?
                                                        <div
                                                            className="d-flex"
                                                        >
                                                            <div className="link">
                                                                <p>
                                                                    <i
                                                                        class="fa-solid fa-paperclip"
                                                                        style={{
                                                                            cursor: 'pointer',
                                                                            marginRight: '0.3rem'
                                                                        }}
                                                                        onClick={() => handleUrlPlay(value.videoinfo[value.videoinfo.findIndex(c => c.type === 'betting')].video_url)}></i>
                                                                    {value.videoinfo[value.videoinfo.findIndex(c => c.type === 'betting')].title}
                                                                </p>
                                                                <span>
                                                                    {value.videoinfo[value.videoinfo.findIndex(c => c.type === 'betting')].video_info.size}
                                                                    {value.videoinfo[value.videoinfo.findIndex(c => c.type === 'betting')].video_info.storageFormat}
                                                                </span>
                                                            </div>
                                                            <div
                                                                onClick={() => {

                                                                    handleDelete(value.videoinfo[value.videoinfo.findIndex(c => c.type === 'betting')]._id, value.group_id)
                                                                }}
                                                                style={{ color: 'red', cursor: 'pointer' }}>
                                                                X
                                                            </div>
                                                        </div>
                                                        :
                                                        <a href="#" className="upload-btn">
                                                            <button onClick={handleBetting}>{t("Upload")}</button>
                                                        </a>}
                                                </div>


                                            </div>
                                            <div className="text" >
                                                <div className="heading">
                                                    {value.videoinfo.findIndex(c => c.type === 'rotation') !== -1 ?
                                                        <div className="d-flex">
                                                            <div className="link">
                                                                <p>
                                                                    <i
                                                                        class="fa-solid fa-paperclip"
                                                                        style={{
                                                                            cursor: 'pointer',
                                                                            marginRight: '0.3rem'
                                                                        }}
                                                                        onClick={() => handleUrlPlay(value.videoinfo[value.videoinfo.findIndex(c => c.type === 'rotation')].video_url)}></i>
                                                                    {value.videoinfo[value.videoinfo.findIndex(c => c.type === 'rotation')].title}
                                                                </p>
                                                                <span>
                                                                    {value.videoinfo[value.videoinfo.findIndex(c => c.type === 'rotation')].video_info.size}
                                                                    {value.videoinfo[value.videoinfo.findIndex(c => c.type === 'rotation')].video_info.storageFormat}
                                                                </span>
                                                            </div>
                                                            <div
                                                                onClick={() => {

                                                                    handleDelete(value.videoinfo[value.videoinfo.findIndex(c => c.type === 'rotation')]._id, value.group_id)
                                                                }}
                                                                style={{ color: 'red', cursor: 'pointer' }}>
                                                                X
                                                            </div>
                                                        </div>
                                                        :
                                                        <a href="#" className="upload-btn">
                                                            <button onClick={handleRotation}>{t("Upload")}</button>
                                                        </a>}
                                                </div>
                                            </div>
                                            <div className="text" >
                                                <div className="heading">
                                                    {value.videoinfo.findIndex(c => c.type === 'decision') !== -1 ?
                                                        <div style={{ display: 'flex' }}>

                                                            <div className="link">

                                                                <p>
                                                                    <i
                                                                        class="fa-solid fa-paperclip"
                                                                        style={{
                                                                            cursor: 'pointer',
                                                                            marginRight: '0.3rem'
                                                                        }}
                                                                        onClick={() => handleUrlPlay(value.videoinfo[value.videoinfo.findIndex(c => c.type === 'decision')].video_url)}></i>
                                                                    {value.videoinfo[value.videoinfo.findIndex(c => c.type === 'decision')].title}

                                                                </p>
                                                                <span>
                                                                    {value.videoinfo[value.videoinfo.findIndex(c => c.type === 'decision')].video_info.size}
                                                                    {value.videoinfo[value.videoinfo.findIndex(c => c.type === 'decision')].video_info.storageFormat}
                                                                </span>
                                                            </div>
                                                            <div
                                                                onClick={() => {

                                                                    handleDelete(value.videoinfo[value.videoinfo.findIndex(c => c.type === 'decision')]._id, value.group_id)
                                                                }}
                                                                style={{ color: 'red', cursor: 'pointer' }}>
                                                                X
                                                            </div>
                                                        </div>
                                                        :
                                                        <a href="#" className="upload-btn">
                                                            <button onClick={handleDecision}>{t("Upload")}</button>
                                                        </a>}
                                                </div>
                                            </div>
                                        </div>
                                    </div >

                                </>
                            )
                        })}
                        {props.inCompVideoList && !props.inCompVideoList.length &&

                            <div style={{ display: 'flex' }} >
                                <div style={{ marginRight: '0.5rem', width: '2rem', flex: '1' }}>
                                </div>
                                <div className="upload-vdo" style={{ flex: '25' }}>
                                    <div className="text">
                                        <div className="heading">
                                            <a href="#" className="upload-btn">
                                                <button onClick={handleBetting}>{t("Upload")}</button>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="text" >
                                        <div className="heading">

                                            <a href="#" className="upload-btn">
                                                <button onClick={handleRotation}>{t("Upload")}</button>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="text" >
                                        <div className="heading">

                                            <a href="#" className="upload-btn">
                                                <button onClick={handleDecision}>{t("Upload")}</button>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                        {props.videoList && props.videoList.map((value, index) => {
                            return (
                                <>
                                    <hr />

                                    <div style={{ display: 'flex' }} >
                                        <div style={{ marginRight: '0.5rem', width: '2rem', flex: '1' }}>
                                            {value.status ? <input
                                                type="radio"
                                                name="upload"
                                                id=""
                                                onClick={() => handleSendGroupId(value.group_id)}
                                            // onSelect={()=>handleGroup(value.group_id)} 
                                            /> : null}
                                        </div>
                                        <div className="upload-vdo" style={{ flex: '25' }}>
                                            <div className="text">
                                                <div className="heading">

                                                    {value.videoinfo.findIndex(c => c.type === 'betting') !== -1 ?
                                                        <div className="link">
                                                            <p>
                                                                <i
                                                                    class="fa-solid fa-paperclip"
                                                                    style={{
                                                                        cursor: 'pointer',
                                                                        marginRight: '0.3rem'
                                                                    }}
                                                                    onClick={() => handleUrlPlay(value.videoinfo[value.videoinfo.findIndex(c => c.type === 'betting')].video_url)}></i>
                                                                {value.videoinfo[value.videoinfo.findIndex(c => c.type === 'betting')].title}
                                                            </p>
                                                            <span>
                                                                {value.videoinfo[value.videoinfo.findIndex(c => c.type === 'betting')].video_info.size}
                                                                {value.videoinfo[value.videoinfo.findIndex(c => c.type === 'betting')].video_info.storageFormat}
                                                            </span>
                                                        </div>
                                                        :
                                                        <a href="#" className="upload-btn">
                                                            <button onClick={handleBetting}>{t("Upload")}</button>
                                                        </a>}
                                                </div>
                                            </div>
                                            <div className="text" >
                                                <div className="heading">
                                                    {value.videoinfo.findIndex(c => c.type === 'rotation') !== -1 ?
                                                        <div className="link">
                                                            <p>
                                                                <i
                                                                    class="fa-solid fa-paperclip"
                                                                    style={{
                                                                        cursor: 'pointer',
                                                                        marginRight: '0.3rem'
                                                                    }}
                                                                    onClick={() => handleUrlPlay(value.videoinfo[value.videoinfo.findIndex(c => c.type === 'rotation')].video_url)}></i>
                                                                {value.videoinfo[value.videoinfo.findIndex(c => c.type === 'rotation')].title}
                                                            </p>
                                                            <span>
                                                                {value.videoinfo[value.videoinfo.findIndex(c => c.type === 'rotation')].video_info.size}
                                                                {value.videoinfo[value.videoinfo.findIndex(c => c.type === 'rotation')].video_info.storageFormat}
                                                            </span>
                                                        </div>
                                                        :
                                                        <a href="#" className="upload-btn">
                                                            <button onClick={handleBetting}>{t("Upload")}</button>
                                                        </a>}
                                                </div>
                                            </div>
                                            <div className="text" >
                                                <div className="heading">
                                                    {value.videoinfo.findIndex(c => c.type === 'decision') !== -1 ?
                                                        <div className="link">
                                                            <p>
                                                                <i
                                                                    class="fa-solid fa-paperclip"
                                                                    style={{
                                                                        cursor: 'pointer',
                                                                        marginRight: '0.3rem'
                                                                    }}
                                                                    onClick={() => handleUrlPlay(value.videoinfo[value.videoinfo.findIndex(c => c.type === 'decision')].video_url)}></i>
                                                                {value.videoinfo[value.videoinfo.findIndex(c => c.type === 'decision')].title}
                                                            </p>
                                                            <span>
                                                                {value.videoinfo[value.videoinfo.findIndex(c => c.type === 'decision')].video_info.size}
                                                                {value.videoinfo[value.videoinfo.findIndex(c => c.type === 'decision')].video_info.storageFormat}
                                                            </span>
                                                        </div>
                                                        :
                                                        <a href="#" className="upload-btn">
                                                            <button onClick={handleBetting}>{t("Upload")}</button>
                                                        </a>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </>
                            )
                        })}



                    </div>
                </div>
                {props.isUpload && <div className="d-flex justify-content-center px-2 bg-fade">
                    <UploadModal
                        isUpload={props.isUpload} setIsUpload={props.setIsUpload}
                        videoUploadScreen={props.videoUploadScreen} setVideoUploadScreen={props.setVideoUploadScreen}
                        groupId={props.groupId} setGroupId={props.setGroupId}
                        videoName={props.videoName} setVideoName={props.setVideoName}
                        videoFile={props.videoFile} setVideoFile={props.setVideoFile}
                        videoDescription={props.videoDescription} setVideoDescription={props.setVideoDescription}
                        videoUploadStatus={props.videoUploadStatus} setVideoUploadStatus={props.setVideoUploadStatus}

                    />
                </div>}
                {props.isPlayer &&
                    <VideoPlayer
                        isPlayer={props.isPlayer} setIsPlayer={props.setIsPlayer}
                        videoUrl={props.videoUrl} setVideoUrl={props.setVideoUrl}
                    />}
            </div >
            <Modal
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={deleteModal}
                onHide={handleClose}
                animation={false}>
                <div className="p-5 d-flex flex-column align-items-center">
                    {/* group id = {props.grp} <br />
                    video id ={props.id} <br /> */}
                    {/* <i class="fa-light fa-circle-xmark" style={{color: "#ff4d4f"}}></i> */}
                    <h3>
                    {t("Are you sure?")}
                    </h3>
                   <h6 className="text-black-50">
                   {t("Do you really want to delete this video?")}
                   {t(" This process cannot be undone.")}
                   </h6>
                  
                </div>
                <div className='d-flex justify-content-end my-2'>

                    <Button
                        variant="secondary"
                        onClick={handleClose}
                        style={{
                            marginRight: '0.5rem',
                            // background: 'linear-gradient(180deg, #FF27C3 0%, #9747FF 100%)',
                            borderRadius: '8px',
                            padding: '2px 25px',
                            border: 'none',
                            color: '#ffffff',
                            fontWeight: '600',
                            fontsize: '12px',
                        }}
                    >
                       {t("Close")}

                    </Button>
                    <Button
                        variant="primary"
                        style={{
                            marginRight: '0.5rem',
                            padding: ' 8px 50px',
                            // background: 'linear-gradient(180deg, #FF27C3 0%, #9747FF 100%)',
                            backgroundColor: '#ff4d4f',
                            borderRadius: '8px',
                            border: 'none',
                            color: '#fff',
                            fontWeight: '600',
                            fontsize: '12px',
                        }}
                        onClick={handleSubmitDelete}>
                        {t("Delete Video")}
                    </Button>
                </div>
            </Modal>
        </>
    )
}
export default SettingSectionTwo;