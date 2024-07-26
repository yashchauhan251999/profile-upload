import { useModal } from './context';

interface ModalProps {
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children }) => {
    const { isModalOpen, closeModal } = useModal();
    return (
        <div
            className={`fixed inset-0 z-50 overflow-auto bg-black bg-opacity-80 flex justify-center items-center transition-all duration-300 ${isModalOpen ? 'opacity-100 block' : 'opacity-0 hidden'
                }`}
            onClick={closeModal}
        >
            <div
                className={`bg-white rounded-lg md:w-2/4 w-[90%]  transform transition-transform duration-300 ${isModalOpen ? 'scale-100' : 'scale-95'
                    }`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-4">{children}</div>
            </div>
        </div>
    );
};

export default Modal;
