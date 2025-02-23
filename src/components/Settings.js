import React, { useRef, useState } from 'react';

function Settings(props) {
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
            <div className="fixed top-4 right-5 z-10">
                <button onClick={toggleDialog} className='p-2 bg-white rounded-full shadow-lg'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-settings"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                </button>
            </div>
            <dialog ref={dialog} className='p-4 rounded-md shadow-lg w-full sm:max-w-md'>
                <div className="flex justify-between items-center">
                    <h1>Settings:</h1>
                    <button className='text-gray-700' onClick={toggleDialog}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>
                    </button>
                </div>
                <hr className='my-3'></hr>
                <div>
                    <h2>Window background:</h2>
                    <div className="flex items-center">
                        <div className='flex-1'>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={props.handleImageChange}
                                className="hidden"
                                id="window-background-input"
                            />
                            <label className="px-2 w-fit py-1 block bg-purple-500 text-white rounded-md text-sm hover:bg-purple-400 transition-colors cursor-pointer" for="window-background-input">Set Image</label>
                        </div>

                        <div style={{ backgroundImage: `url(${props.selectedImage})` }} className='bg-center bg-cover aspect-square min-h-8'></div>
                    </div>
                </div>
            </dialog>
        </>
    )
}

export default Settings;