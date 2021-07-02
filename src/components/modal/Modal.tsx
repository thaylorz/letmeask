import ReactModal from 'react-modal';
import { useModal } from '../../hooks/useModal';
import errorImage from '../../assets/images/error.png';
import './modal.scss';
import { Button } from '../button/Button';

export function Modal() {
    const { modalState: { message, isOpen }, closeModal } = useModal();

    function onCloseModal() {
        closeModal();
    }

    return (
        <ReactModal
            overlayClassName='overlay-modal'
            className='modal-warper'
            isOpen={isOpen}
            ariaHideApp={false}
            shouldFocusAfterRender
        >
            <div className='modal-content'>
                <img src={errorImage} alt="Ilustração de um erro" />
                <p>{message}</p>
                <Button
                    text="OK"
                    styleButton={{ backgroundColor: "#f62d00" }}
                    onClick={onCloseModal}
                />
            </div>
        </ReactModal>
    )
}