import "./index.css"

export default function Buttons({ forget, remember, familar }) {
    return (
        <div id="buttons">
            <button onClick={forget}>
                Forget
            </button>
            <button onClick={remember}>
                Remember
            </button>
            <button onClick={familar}>
                Familar
            </button>
        </div>

    )
}