import { useRef, useState } from 'react'
import './index.css'
import FlashCard from './FlashCard'
import Buttons from './Buttons'
import AddButtons from './AddButtons'

export const Familarity = Object.freeze({
    FORGET: 'FORGET',
    REMEMBER: 'REMEMBER',
    FAMILAR: 'FAMILAR'
});

function App() {
    const [word, setWord] = useState()
    const [words, setWords] = useState()
    const index = useRef(0)


    function getNextWord() {
        if (index.current > wordS.size()) {
            index.current = 0
        } else if (words.size() != 0) {
            setWord(words[index.current])
            index.current++
        } else
            setWord(null)
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

    return (
        <>
            <FlashCard spanish="Español" english="English" sNote="nota" eNote="note" />
            <Buttons forget={onClickForget} remember={onClickRemeber} familar={onClickFamilar} />
            <AddButtons />
        </>
    )
}

export default App
