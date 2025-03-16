function Settings(props) {
    return (
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
                    <label className="px-2 w-fit py-1 block bg-purple-500 text-white rounded-md text-sm hover:bg-purple-400 transition-colors cursor-pointer" htmlFor="window-background-input">Set Image</label>
                </div>

                <div style={{ backgroundImage: `url(${props.selectedImage})` }} className='bg-center bg-cover aspect-square min-h-8'></div>
            </div>
        </div>
    )
}

export default Settings;