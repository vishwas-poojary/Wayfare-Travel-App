import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

// Royalty-free looping travel clip (Mixkit). Swap for your own hosted file if preferred.
const VIDEO_SRC = 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-beach-with-turquoise-water-31558-large.mp4'

export default function Hero() {
  const [videoFailed, setVideoFailed] = useState(false)

  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink-900 text-sand-50">
      {!videoFailed ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=1600"
          onError={() => setVideoFailed(true)}
          aria-hidden="true"
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
      ) : (
        // Fallback: static image if video fails to load (offline, blocked, slow network)
        <img
          src="https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/50 to-ink-900/20" />
      <div className="grain absolute inset-0" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-16 pt-40 sm:px-8 sm:pb-24">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-sm text-gold-400"
        >
          Eight places, one good reason each
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-3 max-w-2xl text-balance font-display text-5xl font-light leading-[1.05] sm:text-7xl"
        >
          Go somewhere worth the story.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 max-w-md text-balance text-base text-sand-100/80 sm:text-lg"
        >
          Real-time weather, the places actually worth visiting, and an assistant
          that plans the days for you.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <Link
            to="/explore"
            className="rounded-full bg-gold-500 px-6 py-3 text-sm font-medium text-ink-900 transition hover:bg-gold-400"
          >
            Explore destinations
          </Link>
          <a
            href="#why"
            className="rounded-full border border-sand-50/30 px-6 py-3 text-sm text-sand-50 transition hover:border-sand-50/60"
          >
            How it works
          </a>
        </motion.div>
      </div>

      <a
        href="#why"
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-sand-50/60 transition hover:text-sand-50"
        aria-label="Scroll to learn more"
      >
        <motion.svg
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M12 4v14m0 0l-6-6m6 6l6-6" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </a>
    </section>
  )
}
