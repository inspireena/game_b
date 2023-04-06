
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SettingSectionOne from './SettingSectionOne';
import SettingSectionTwo from './SettingSectionTwo';



function Setting(props) {
    let streamerDetails = JSON.parse(localStorage.getItem('streamer_details'));
    const [isEdit, setIsEdit] = useState(false)
    const [profileImg, setProfileImg] = useState(streamerDetails.image)
    const [show, setShow] = useState(false);
    const [isUpload, setIsUpload] = useState()
    const { t } = useTranslation();
    const [base64URL, setBase64URL] = useState(streamerDetails.image)
    const [streamerInfo, setStreamerInfo] = useState(streamerDetails)
    const [videoUploadScreen, setVideoUploadScreen] = useState('');
    const [file, setFile] = useState(null)
    const [isPlayer, setIsPlayer] = useState(false)
    const [tableColor, setTableColor] = useState()
    const [groupId, setGroupId] = useState()
    const [nickName, setNickName] = useState(streamerDetails.displayname)
    const [comment, setComment] = useState(streamerDetails.description)
    const [videoName, setVideoName] = useState('')
    const [videoFile, setVideoFile] = useState('')
    const [videoDescription, setVideoDescription] = useState('')
    const [videoList, setVideoList] = useState()
    const [videoUploadStatus, setVideoUploadStatus] = useState()
    const [videoUrl, setVideoUrl] = useState()
    const [grp, setGrp] = useState()
    const [id, setId] = useState()
    const [deleteStatus, setDeleteStatus] = useState()
    const [inCompVideoList, setInCompVideoList] = useState()
    console.log('--------video upload status setting--------', videoUploadStatus)
    console.log('--------group ID --------------group ID------------group ID setting.jsx', groupId)



    return (
        <>
            <meta charSet="UTF-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Setting_section</title>
            <style
                dangerouslySetInnerHTML={{
                    __html:
                        "\n        .upload-vdo {\n            display: flex;\n            justify-content: space-between;\n            gap: 60px;\n            overflow: auto;\n        }\n\n        .upload-vdo .text .heading {\n            display: flex;\n            align-items: center;\n            gap: 3px;\n        }\n\n        .upload-vdo .text .heading h5 {\n            font-size: 12px;\n        }\n\n        .upload-vdo button {\n            background: linear-gradient(180deg, #FF27C3 0%, #9747FF 100%);\n            border-radius: 8px;\n            padding: 2px 25px;\n            border: none;\n            color: #fff;\n            font-weight: 600;\n            font-size: 12px;\n        }\n\n        .text .link {\n            padding: 5px 0;\n        }\n\n        .text .link p {\n            margin-bottom: 0;\n            font-size: 13px;\n        }\n\n        .text .link span {\n            padding-left: 24px;\n            font-size: 13px;\n        }\n\n        .text .link i {\n            background: linear-gradient(180deg, #FF27C3 0%, #9747FF 100%);\n            -webkit-background-clip: text;\n            -webkit-text-fill-color: transparent;\n            background-clip: text;\n        }\n\n        .content-card {\n            margin-bottom: 10px;\n        }\n    "
                }}
            />
            <div className="full_page" style={{ position: 'relative' }}>
                <div className="top-section">
                    <div className="das-title">
                        <h1>{t("Setting")}</h1>
                    </div>
                </div>
                <div className="container-fluid px-lg-5">
                    <div className="row">

                        <SettingSectionOne
                            isEdit={isEdit} setIsEdit={setIsEdit}
                            show={show} setShow={setShow}
                            base64URL={base64URL} setBase64URL={setBase64URL}
                            setProfileImg={setProfileImg} profileImg={profileImg}
                            file={file} setFile={setFile}
                            nickName={nickName} setNickName={setNickName}
                            comment={comment} setComment={setComment}
                            streamerInfo={streamerInfo} setStreamerInfo={setStreamerInfo}
                            tableColor={tableColor} setTableColor={setTableColor}
                        />
                        <SettingSectionTwo
                            isUpload={isUpload} setIsUpload={setIsUpload}
                            videoUploadScreen={videoUploadScreen} setVideoUploadScreen={setVideoUploadScreen}
                            isPlayer={isPlayer} setIsPlayer={setIsPlayer}
                            groupId={groupId} setGroupId={setGroupId}
                            videoFile={videoFile} setVideoFile={setVideoFile}
                            videoName={videoName} setVideoName={setVideoName}
                            videoDescription={videoDescription} setVideoDescription={setVideoDescription}
                            videoList={videoList} setVideoList={setVideoList}
                            videoUploadStatus={videoUploadStatus} setVideoUploadStatus={setVideoUploadStatus}
                            videoUrl={videoUrl} setVideoUrl={setVideoUrl}
                            inCompVideoList={inCompVideoList} setInCompVideoList={setInCompVideoList}
                            grp={grp} setGrp={setGrp}
                            id={id} setId={setId}
                            deleteStatus={deleteStatus} setDeleteStatus={setDeleteStatus}
                        />
                    </div>
                </div>
            </div>
        </>

    )
}
export default Setting