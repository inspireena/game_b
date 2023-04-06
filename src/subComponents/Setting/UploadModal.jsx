
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { Helmet } from "react-helmet";
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';
import Form from 'react-bootstrap/Form';
const FormData = require("form-data");

function UploadModal(props) {
    let { token } = JSON.parse(localStorage.getItem('loggedin'))
    const [show, setShow] = useState(false);
    const { t } = useTranslation()
    console.log('--------group ID --------------group ID------------group ID upload.jsx', props.groupId)
    let videoInfoUpdate = new FormData();
    videoInfoUpdate.append("title", props.videoName);
    videoInfoUpdate.append("video", props.videoFile);
    videoInfoUpdate.append("type", props.videoUploadScreen);
    videoInfoUpdate.append('group_id', props.groupId)
    videoInfoUpdate.append('description', props.videoDescription)
    const headers = {
        'Authorization': token
    }

    const handleSubmit = () => {
        
        console.log('props check====', props.setVideoUploadStatus, '====', props.videoUploadStatus )
        props.setIsUpload(false)
        axios.post('http://localhost:7000/strApi/upload-steamer-video', videoInfoUpdate, { headers: headers })
            .then((response) => {
                console.log('============POST API SUCCESS===============', response.data.status);

                response && response.data && response.data.status && props.setVideoUploadStatus(response.data.status);
                response.data && response.data.data.status && response.data.data && response.data.data.status && props.setGroupId(response.data.data.group_id);
                response && response.data && response.data.status && props.setVideoName(null) && props.setVideoFile(null);
                response && response.data && response.data.status && props.setVideoDescription(null);
                
            })
            .catch((err) => console.log(err))

    }
    // console.log('==========upload two========', props.groupId)
    const handleClose = () => props.setIsUpload(false);
    console.log('============POST API SUCCESS set state===============', props.videoUploadStatus);
    return (

        <div>
            <Modal
                show={props.isUpload}
                onHide={handleClose}
                aria-labelledby="contained-modal-title-vcenter"
                centered>

                <Modal.Body>
                    <div
                        style={{
                            color: '#9747FF',
                            fontWeight: '600',
                            fontsize: '12px',
                        }}
                    >
                        {props.videoUploadScreen === 'betting' && 'Betting Time'}
                        {props.videoUploadScreen === 'rotation' && 'Roulette rotation time'}
                        {props.videoUploadScreen === 'decision' && 'Result decision time'}
                        <br />
                        {/* {`Group ID = ${props.groupId}`} */}
                    </div>
                    <div class="form">
                        <div style={{ display: 'flex' }}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <div
                                    style={{
                                        margin: ' 0rem 0rem -0.3rem 0.3rem',
                                        fontSize: '0.8rem'
                                    }}>
                                    {t("Video Name")}
                                </div>
                                <input
                                    type="text"
                                    placeholder="Enter Video Name"
                                    value={props.videoName}
                                    onChange={(e) => props.setVideoName(e.target.value)}
                                    style={{
                                        padding: ' 0.3rem 0.5rem',
                                        border: 'solid 0.1rem gray',
                                        borderRadius: '4px',
                                        margin: '0.3rem'
                                    }}
                                />

                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <div
                                    style={{
                                        margin: ' 0rem 0rem -0.3rem 0.3rem',
                                        fontSize: '0.8rem'
                                    }}>
                                    {t("Video Description")}
                                </div>
                                <input
                                    type="text"
                                    placeholder="Description"
                                    value={props.videoDescription}
                                    onChange={(e) => props.setVideoDescription(e.target.value)}
                                    style={{
                                        padding: ' 0.3rem 0.5rem',
                                        border: 'solid 0.1rem gray',
                                        borderRadius: '4px',
                                        margin: '0.3rem'
                                    }}
                                />

                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', margin: '0.5rem 0 0 0.3rem' }}>
                            <div
                                style={{
                                    margin: ' 0rem 0rem 0rem 0.3rem',
                                    fontSize: '0.8rem'
                                }}>
                                {t("Video File")}
                            </div>
                            <input
                                type='file'
                                name='file'
                                accept="video/*"
                                onChange={(e) => props.setVideoFile(e.target.files[0])}>
                            </input>
                        </div>


                    </div>

                    <div
                        style={{
                            marginTop: '1rem',
                            display: 'flex',
                            justifyContent: 'end'
                        }}>
                        <Button
                            variant="secondary"
                            onClick={() => props.setIsUpload(false)}
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
                            // className="modal-btn"
                            variant="primary"
                            onClick={handleSubmit}
                            style={{
                                padding: ' 8px 50px',
                                background: 'linear-gradient(180deg, #FF27C3 0%, #9747FF 100%)',
                                borderRadius: '8px',
                                border: 'none',
                                color: '#fff',
                                fontWeight: '600',
                                fontsize: '12px',
                            }}
                        >
                            {t("Upload")}
                        </Button>

                    </div>
                </Modal.Body>


            </Modal>


        </div>

    )
}
export default UploadModal;