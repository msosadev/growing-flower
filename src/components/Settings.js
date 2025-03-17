import Button from "./Button";

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
                    <Button htmlFor="window-background-input" className="pointer-events-none" label="Set Image" />
                </div>

                <div style={{ backgroundImage: `url(${props.selectedImage})` }} className='bg-center bg-cover aspect-square min-h-8'></div>
            </div>
        </div>
    )
}

export default Settings;