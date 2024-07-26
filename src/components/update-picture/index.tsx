import { useModal } from "../../ui/modal/context";
import Button from "../../ui/button";


export default function UpdatePicture() {

    const { openModal } = useModal();
    return (
        <>
            <Button extraClass="self-end" onClick={openModal}>Update picture</Button>
        </>
    )
}