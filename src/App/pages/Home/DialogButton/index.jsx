import { useRef } from "react"
import "./index.css"

export default function DialogButton({ text, children }) {
    const ref = useRef(null)

    return (
        <div id="add-buttons">
            <button onClick={() => ref.current.show()}>{text}</button>
            <dialog ref={ref}>
                {children}
                <button onClick={() => ref.current.close()} >Cancel</button>
            </dialog>

        </div >
    )
}