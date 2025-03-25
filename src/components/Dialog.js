import React, { useRef, useState } from 'react';
import Icon from './Icon';

function Dialog(props) {
    const [isDialogOpen, setIsDialogOpen] = useState(true);
    const dialog = useRef();

    const toggleDialog = () => {
        setIsDialogOpen(!isDialogOpen);
        if (isDialogOpen) {
            dialog.current.showModal();
        } else {
            dialog.current.close();
        }
    };

    return (
        <>
            <div onClick={toggleDialog}>
                {props.trigger}
            </div>
            <dialog ref={dialog} className='p-4 rounded-md shadow-lg w-full sm:max-w-md'>
                <div className="flex justify-between items-center">
                    <h1>{props.title ? props.title : "Dialog"}</h1>
                    <button className='text-gray-700' onClick={toggleDialog}>
                        <Icon name='x-circle' />
                    </button>
                </div>
                <hr className='my-3'></hr>
                {props.content}
            </dialog>
        </>
    )
}

export default Dialog;