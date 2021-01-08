import React from "react";

const Modal = ({isActive, children, closeMenu, classes}) => (
    <div className={`modal aa-modal ${classes ? classes : ''} ${isActive ? 'is-active' : ''}`}>
        <div className="modal-background" onClick={closeMenu}></div>
        <div className="modal-card">
            {children}
        </div>
    </div>  
);

export default Modal;