// noinspection JSUnusedGlobalSymbols

import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import ReactDOM from "react-dom";

import styles from "@/styles/Model.module.css";

interface ModelProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const Modal = ({ show, onClose, children, title }: ModelProps) => {
  const [isBrowser, setIsBrowser] = useState<boolean>(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleClose = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = show ? (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <a href="#" onClick={(e) => handleClose(e)}>
            <FaTimes />
          </a>
        </div>

        {title && <div>{title}</div>}
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root") as HTMLElement,
    );
  } else {
    return null;
  }
};

export default Modal;
