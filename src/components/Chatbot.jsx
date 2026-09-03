import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { askDestinationQuestion, GeminiApiError } from '../services/geminiApi'

const SUGGESTIONS = [
  'How many days do I need here?',
  'When is the best time to visit?',
  'What should I not miss?',
]

export default function Chatbot({ destination }) {
  const [messages, setMessages] = useState([
    {
      role: 'model',
      text: `Ask me anything about ${destination.name} — how long to stay, when to go, what to see first.`,
    },
  ])
  const [input, setInput] = useState('')
  const [status, setStatus] = useState('idle') // idle | thinking | error
  const [error, setError] = useState(null)
  const scrollRef = useRef(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, status])

  async function send(text) {
    const question = text ?? input
    if (!question.trim() || status === 'thinking') return

    const history = messages.map((m) => ({ role: m.role, text: m.text }))
    setMessages((prev) => [...prev, { role: 'user', text: question }])
    setInput('')
    setStatus('thinking')
    setError(null)

    try {
      const answer = await askDestinationQuestion({ destination, question, history })
      setMessages((prev) => [...prev, { role: 'model', text: answer }])
      setStatus('idle')
    } catch (err) {
      const message = err instanceof GeminiApiError ? err.message : 'The assistant is unavailable right now.'
      setError(message)
      setStatus('error')
    }
  }

  return (
    <div className="flex h-full flex-col rounded-2xl border border-ink-900/10 bg-white/70 shadow-soft">
      <div className="border-b border-ink-900/10 px-5 py-4">
        <h3 className="font-display text-lg text-ink-900">Ask about {destination.name}</h3>
      </div>

      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-5 py-4" style={{ maxHeight: 360 }}>
        <AnimatePresence initial={false}>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                m.role === 'user'
                  ? 'ml-auto bg-ink-900 text-sand-50'
                  : 'bg-sand-100 text-ink-800'
              }`}
            >
              {m.text}
            </motion.div>
          ))}
        </AnimatePresence>

        {status === 'thinking' && (
          <div className="flex items-center gap-1.5 rounded-2xl bg-sand-100 px-4 py-3 text-ink-500 w-fit">
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-500 [animation-delay:-0.2s]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-500" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-500 [animation-delay:0.2s]" />
          </div>
        )}

        {status === 'error' && (
          <div role="alert" className="rounded-xl bg-rust-500/10 px-4 py-2.5 text-sm text-rust-500">
            {error}
          </div>
        )}
      </div>

      {messages.length <= 1 && (
        <div className="flex flex-wrap gap-2 border-t border-ink-900/10 px-5 py-3">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              className="rounded-full border border-ink-900/15 px-3 py-1.5 text-xs text-ink-700 transition hover:bg-ink-900 hover:text-sand-50"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault()
          send()
        }}
        className="flex items-center gap-2 border-t border-ink-900/10 p-3"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Ask about ${destination.name}…`}
          className="flex-1 rounded-full border border-ink-900/15 bg-white px-4 py-2 text-sm focus:border-gold-500 focus:outline-none"
          aria-label="Message the travel assistant"
        />
        <button
          type="submit"
          disabled={status === 'thinking' || !input.trim()}
          className="rounded-full bg-gold-500 px-4 py-2 text-sm font-medium text-ink-900 transition hover:bg-gold-400 disabled:opacity-40"
        >
          Send
        </button>
      </form>
    </div>
  )
}
