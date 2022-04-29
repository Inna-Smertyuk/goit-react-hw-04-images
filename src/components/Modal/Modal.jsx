import { useEffect } from "react";
import s from "./Modal.module.css";

function Modal({ modalImg, closeModal }) {
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  const handleKeyDown = (event) => {
    if (event.key !== "Escape") {
      return;
    }
    closeModal();
  };

  return (
    <div onClick={closeModal} className={s.Overlay}>
      <div className={s.Modal}>
        <img src={modalImg} alt="" />
      </div>
    </div>
  );
}

export default Modal;
