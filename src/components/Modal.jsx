const Modal = ({ isOpen, imageUrl, onClose }) => {
	return (
		<>
			{isOpen && (
				<div className='modal-overlay' onClick={onClose}>
					<div className='modal-content'>
						<img src={imageUrl} alt='Large' />
					</div>
				</div>
			)}
		</>
	);
};

export default Modal;
