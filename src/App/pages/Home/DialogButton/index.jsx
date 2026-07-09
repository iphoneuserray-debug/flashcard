import "./index.css"

export default function DialogButton({ text, dialogRef, children }) {


    return (
        <div id="add-buttons">
            <button onClick={() => dialogRef.current.show()}>{text}</button>
            <dialog ref={dialogRef}>
                {children}
                <button onClick={() => dialogRef.current.close()} >Cancel</button>
            </dialog>

        </div >
    )
}