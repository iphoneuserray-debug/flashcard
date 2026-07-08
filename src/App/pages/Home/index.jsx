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

const STORAGE_KEY = 'flashcard-session'

function saveSession(words, next) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ words, next }))
}

function loadSession() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY))
    } catch {
        return null
    }
}

function clearSession() {
    localStorage.removeItem(STORAGE_KEY)
}

export default function Home() {
    const [word, setWord] = useState(null)
    const [words, setWords] = useState(null)
    const [selected, setSelected] = useState([Familarity.FORGET, Familarity.REMEMBER])
    const [menuOpen, setMenuOpen] = useState(false)
    const index = useRef(0)
    const menuRef = useRef(null)

    function toggleSet(value) {
        setSelected(prev =>
            prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
        )
    }


    function getNextWord() {
        if (!words || index.current >= words.length) {
            setWord(null)
            clearSession() // group finished — next open fetches a fresh group
        } else {
            setWord(words[index.current])
            index.current++
            saveSession(words, index.current)
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

    function startNewGroup(familarities = selected) {
        if (!familarities.length) return
        setMenuOpen(false)
        getAll(familarities, 50).then(loaded => {
            setWords(loaded)
            if (loaded?.length) {
                setWord(loaded[0])
                index.current = 1
                saveSession(loaded, 1)
            } else {
                setWord(null)
                clearSession()
            }
        })
    }

    useEffect(() => {
        function onDocClick(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false)
        }
        document.addEventListener('mousedown', onDocClick)
        return () => document.removeEventListener('mousedown', onDocClick)
    }, [])

    useEffect(() => {
        const saved = loadSession()
        if (saved?.words?.length && saved.next >= 1 && saved.next <= saved.words.length) {
            // Resume an unfinished group.
            setWords(saved.words)
            index.current = saved.next
            setWord(saved.words[saved.next - 1])
        } else {
            // No unfinished group — show the picker and let the user start one.
            setWord(null)
        }
    }, [])

    return (
        <>
            {word ?
                <><FlashCard spanish={word.spanish} english={word.english} sNote={word.sNote ?? ""} eNote={word.eNote ?? ""} />
                    <Buttons forget={onClickForget} remember={onClickRemeber} familar={onClickFamilar} /></>
                : <><FlashCard spanish="No Words Need to Study" english="No Words Need to Study" sNote="" eNote="" />
                    <div className="set-picker" ref={menuRef}>
                        <button className="set-picker-toggle" onClick={() => setMenuOpen(o => !o)}>
                            Study a new group ▾
                        </button>
                        {menuOpen && (
                            <div className="set-picker-menu">
                                {Object.values(Familarity).map(f => (
                                    <label key={f} className="set-picker-option">
                                        <input
                                            type="checkbox"
                                            checked={selected.includes(f)}
                                            onChange={() => toggleSet(f)}
                                        />
                                        {f} set
                                    </label>
                                ))}
                                <button
                                    className="set-picker-start"
                                    disabled={selected.length === 0}
                                    onClick={() => startNewGroup()}
                                >
                                    Start
                                </button>
                            </div>
                        )}
                    </div></>}

            <AddButtons />
        </>
    )
}
