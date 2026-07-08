import { useEffect, useRef, useState } from 'react'
import './index.css'
import FlashCard from './FlashCard'
import Buttons from './Buttons'
import AddButtons from './AddButtons'
import { getBy } from '../../../api'

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
        getNextWord()
        word.familarity = Familarity.FORGET
    }

    const onClickRemeber = () => {
        getNextWord()
        word.familarity = Familarity.REMEMBER
    }

    const onClickFamilar = () => {
        getNextWord()
        word.familarity = Familarity.FAMILAR
    }

    useEffect(() => {
        getBy([Familarity.FORGET, Familarity.REMEMBER]).then(loaded => {
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
                : <FlashCard spanish="No Words Need to Study" english="No Words Need to Study" sNote="" eNote="" />}

            <AddButtons />
        </>
    )
}
