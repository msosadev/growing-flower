import React, { useRef, useState } from 'react';

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
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x-circle"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>
                    </button>
                </div>
                <hr className='my-3'></hr>
                {props.content}
            </dialog>
        </>
    )
}

export default Dialog;