import { useEffect, useRef, useState } from 'react'
import './index.css'
import FlashCard from './FlashCard'
import Buttons from './Buttons'
import AddButtons from './AddButtons'
import { getAll, update } from '../../../api'

export const Familarity = Object.freeze({
    FORGET: 'FORGET',
    REMEMBER: 'REMEMBER',
    FAMILAR: 'FAMILAR'
});

export default function Home() {
    const [word, setWord] = useState(null)
    const [words, setWords] = useState(null)
    const index = useRef(0)


    function getNextWord() {
        if (!words || words.length === 0) {
            setWord(null)
        } else if (index.current >= words.length) {
            setWord(null)
        } else {
            setWord(words[index.current])
            index.current++
        }
    }

    const onClickForget = () => {
        update(word.spanish, { familarity: Familarity.FORGET })
        getNextWord()
    }

    const onClickRemeber = () => {
        update(word.spanish, { familarity: Familarity.REMEMBER })
        getNextWord()
    }

    const onClickFamilar = () => {
        update(word.spanish, { familarity: Familarity.FAMILAR })
        getNextWord()
    }

    const onClick = () => {
        getAll([Familarity.FORGET, Familarity.REMEMBER], 50).then(loaded => {
            setWords(loaded)
            if (loaded?.length) {
                setWord(loaded[0])
                index.current = 1
            }
        })
    }

    useEffect(() => {
        getAll([Familarity.FORGET, Familarity.REMEMBER], 50).then(loaded => {
            setWords(loaded)
            if (loaded?.length) {
                setWord(loaded[0])
                index.current = 1
            }
        })
    }, [])

    return (
        <>
            {word ?
                <><FlashCard spanish={word.spanish} english={word.english} sNote={word.sNote ?? ""} eNote={word.eNote ?? ""} />
                    <Buttons forget={onClickForget} remember={onClickRemeber} familar={onClickFamilar} /></>
                : <><FlashCard spanish="No Words Need to Study" english="No Words Need to Study" sNote="" eNote="" />
                    <button onClick={onClick}></button></>}

            <AddButtons />
        </>
    )
}
