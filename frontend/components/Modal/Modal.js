import React from 'react'

const Modal = (props) => {
    return (
        <div>
            <div
                className="modal fade"
                id={props.id}
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1
                                className="modal-title fs-5"
                                id="exampleModalLabel"
                            ></h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-body" style={{ color: '#148', fontWeight: 'bold' }}>Do you want to Delete ?</div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="submitbtn"
                                data-bs-dismiss="modal"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                data-bs-dismiss="modal"
                                className="deletebtn"
                                onClick={props.onClick}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal

