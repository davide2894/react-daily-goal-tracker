function Modal(props) {
  function onCloseClick() {
    props.onClose();
  }

  return (
    <div className="goalForm editGoalForm modal modalOverlay">
      <button
        className="editGoalForm__close modalOverlay__closeButton"
        onClick={onCloseClick}>
        <span className="modalOverlay__closeIcon"></span>
      </button>
      <div className="modalOverlay__main">
        <div className="modalOverlay__content form">
          <h2 className="modalOverlay__h2">
            {props.mode === "add" ? "Add Goal" : "Edit Goal"}
          </h2>
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
