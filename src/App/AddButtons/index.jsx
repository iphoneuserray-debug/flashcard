import { useRef, useState } from "react";
import DialogButton from "../DialogButton";
import { creatOne } from "../../api";

function Word(spanish, english, sNote, eNote, familarity) {
    this.spanish = spanish
    this.english = english
    this.sNote = sNote
    this.eNote = eNote
    this.familarity = familarity
}

export default function AddButtons({ text, children }) {

    return (<>
        <DialogButton text="Add New Word">
            <NewWordInputFeilds />
        </DialogButton>
        <DialogButton text="Add New Grammar">
            <NewGrammarInputFeilds />
        </DialogButton>
    </>
    )
}

const NewWordInputFeilds = () => {
    const [spanish, setSpanish] = useState("")
    const [english, setEnglish] = useState("")
    const [sNote, setSNote] = useState("")
    const [eNote, setENote] = useState("")

    const onClick = () => {
        const reps = creatOne({ spanish, english, sNote, eNote })
    }

    return (
        <>
            <label htmlFor="spanish">Spanish</label>
            <input
                type="text"
                id="spanish"
                name="spanish"
                required
                minLength="1"
                value={spanish}
                onInput={e => setSpanish(e.target.value)}
            />
            <label htmlFor="english">English</label>
            <input
                type="text"
                id="english"
                name="english"
                required
                minLength="1"
                value={english}
                onInput={e => setEnglish(e.target.value)}
            />
            <label htmlFor="sNote">Spanish Note</label>
            <input
                type="text"
                id="sNote"
                name="sNote"
                value={sNote}
                onInput={e => setSNote(e.target.value)}
            />
            <label htmlFor="eNote">English Note</label>
            <input
                type="text"
                id="eNote"
                name="eNote"
                value={eNote}
                onInput={e => setENote(e.target.value)}
            />
            <button type="submit" onClick={onClick}>Submit</button>
        </>
    )
}

const NewGrammarInputFeilds = () => {
    return (
        <>
            <label htmlFor="grammar">Grammar</label>
            <input
                type="text"
                id="grammar"
                name="grammar"
                required
                minLength="1"
            />
        </>
    )
}