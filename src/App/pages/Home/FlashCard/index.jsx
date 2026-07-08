import './index.css'
import { useState } from 'react'

export default function FlashCard({ spanish, english, sNote, eNote }) {
    let [isSpan, setIsSpan] = useState(true);
    const onClick = () => {
        let bool = isSpan
        setIsSpan(!bool)
    }
    return (
        <article id="card" onClick={onClick}>
            <div>
                <p>{isSpan ? spanish : english}</p>
            </div>
            <footer>
                {isSpan ? sNote : eNote}
            </footer>
        </article>
    )
}