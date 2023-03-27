function UploadModal(props) {
    const handleSubmit = ()=>{
        props.setIsUpload(false)
    }
    return (
        
            <div>
                <div className="modal-box">
                    <div className="modal-content">
                        <h6>Report</h6>
                        <div class="form">
                            {/* <input type="checkbox"  />
                            <label for="">Nuisance</label><br />
                            <input type="checkbox" />
                            <label for="">Suspicion of gambling addiction</label> */}
                             <input type="text" placeholder="Enter Video Name" />
                            {/* <label for="">Nuisance</label><br /> */}
                            <input type="file" />
                            {/* <label for="">Suspicion of gambling addiction</label> */}
                        </div>
                    </div>
                    <div className="modal-btn">
                       <button onClick={handleSubmit}>Send</button>
                    </div>
                </div>
            </div>
        
    )
}
export default UploadModal;