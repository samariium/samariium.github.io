import { useEffect, useMemo, useState } from 'react'
import './CommandPalette.css'

export default function CommandPalette({ open, onClose, commands }) {
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (!open) {
      setQuery('')
    }
  }, [open])

  const filtered = useMemo(() => {
    const lowerQuery = query.trim().toLowerCase()
    if (!lowerQuery) {
      return commands
    }

    return commands.filter((command) => {
      const haystack = `${command.label} ${command.hint}`.toLowerCase()
      return haystack.includes(lowerQuery)
    })
  }, [commands, query])

  if (!open) {
    return null
  }

  return (
    <div className="palette-overlay" onClick={onClose}>
      <div className="palette-shell" onClick={(event) => event.stopPropagation()}>
        <div className="palette-head">
          <span className="dot red"></span>
          <span className="dot yellow"></span>
          <span className="dot green"></span>
          <span className="palette-title">command-palette.sh</span>
        </div>

        <div className="palette-body">
          <label htmlFor="palette-input" className="palette-label">$ run</label>
          <input
            id="palette-input"
            className="palette-input"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="type command..."
            autoFocus
          />

          <div className="palette-list">
            {filtered.map((command) => (
              <button
                key={command.id}
                type="button"
                className="palette-item"
                onClick={() => {
                  command.action()
                  onClose()
                }}
              >
                <span className="palette-item-label">{command.label}</span>
                <span className="palette-item-hint">{command.hint}</span>
              </button>
            ))}

            {!filtered.length && <p className="palette-empty">No command found.</p>}
          </div>
        </div>
      </div>
    </div>
  )
}