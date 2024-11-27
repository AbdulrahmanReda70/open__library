import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";

function SaveNotification({ showToast }) {
    return (
        <ToastContainer className="toast-container" position="top-end">
            <Toast
                show={showToast}
                animation={true}
                delay={3000}
                autohide
                className="bg-dark text-white"
            >
                <Toast.Header className="bg-dark text-white">
                    <strong className="me-auto">Notification</strong>
                    <small>Just now</small>
                    <IoCheckmarkDoneCircleSharp size={"20px"} color='seagreen' style={{ marginTop: "2px", marginLeft: "4px" }} />
                </Toast.Header>
                <Toast.Body>Book edited successfully!</Toast.Body>
            </Toast>
        </ToastContainer>
    );
}

export default SaveNotification;
