import { useState, useEffect } from "react";
import { getAll } from "../../../../api"
import "./index.css"

export default function Table() {
    const [rows, setRows] = useState(null)

    useEffect(() => {
        getAll().then(setRows)
    }, [])

    if (!rows) return <p>Loading…</p>
    if (rows.length === 0) return <p>No words yet.</p>

    const columns = Object.keys(rows[0])

    return (
        <table className="word-table">
            <thead>
                <tr>
                    {columns.map(col => <th key={col}>{col}</th>)}
                </tr>
            </thead>
            <tbody>
                {rows?.map((row, i) => (
                    <tr key={row.id ?? i}>
                        {columns.map(col => <td key={col}>{String(row[col] ?? "")}</td>)}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
