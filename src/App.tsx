import Landing from './components/form';
import Modal from './ui/modal';
import { ModalProvider } from './ui/modal/context';
import { ProfileProvider } from './context/profileContext';

import ImageUploader from './ui/modal/image-uploader';

export default function App() {

  return (
    <ModalProvider>
      <ProfileProvider>
        <Landing />
        <Modal>
          <ImageUploader />
        </Modal>
      </ProfileProvider>
    </ModalProvider>
  )
}