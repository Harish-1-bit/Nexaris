import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Send } from 'lucide-react'
import Magnetic from './Magnetic'
import TextReveal from './TextReveal'

const services = [
  'Branding', 'Web Design', 'Web Development', 'Mobile App',
  'Video Production', 'Digital Marketing', 'Other',
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [form, setForm] = useState({ name: '', email: '', company: '', service: '', message: '' })
  const [focused, setFocused] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const field = (name: string) => ({
    onFocus: () => setFocused(name),
    onBlur: () => setFocused(null),
    style: {
      background: focused === name ? 'rgba(255,94,0,0.04)' : 'rgba(255,255,255,0.03)',
      border: `1px solid ${focused === name ? 'rgba(255,94,0,0.35)' : 'rgba(255,255,255,0.09)'}`,
      color: '#e8eaf0',
      outline: 'none',
      transition: 'all 0.25s',
    } as React.CSSProperties,
  })

  return (
    <section id="contact" className="relative py-28 overflow-hidden" style={{ background: '#000000' }}>
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />

      {/* subtle glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at bottom right,rgba(255,30,30,0.05) 0%,transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-8 md:px-14">
        {/* header */}
        <div ref={ref} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-xs font-medium tracking-[0.2em] uppercase mb-5"
              style={{ color: '#FF5E00' }}
            >
              Contact
            </motion.p>
            <TextReveal
              lines={["Let's build something", "remarkable together."]}
              gradientWords={["remarkable"]}
              className="font-display font-bold text-white"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
              delay={0.1}
            />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-sm leading-relaxed max-w-xs md:text-right"
            style={{ color: 'rgba(160,168,192,0.7)' }}
          >
            Every great project starts with a conversation. Tell us about your vision and
            let's explore what's possible.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* left info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2 flex flex-col gap-8"
          >
            <div>
              <h3 className="font-display font-semibold text-lg mb-3" style={{ color: '#e8eaf0' }}>
                Start the conversation
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(160,168,192,0.7)' }}>
                We typically respond within 24 hours. For urgent projects, reach out directly.
              </p>
            </div>

            {[
              { label: 'Email', value: 'hello@nexaris.io', href: 'mailto:hello@nexaris.io' },
              { label: 'Phone', value: '+1 (555) 000-0000', href: 'tel:+15550000000' },
              { label: 'Location', value: 'San Francisco, CA', href: '#' },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-xs tracking-widest uppercase mb-1" style={{ color: 'rgba(160,168,192,0.45)' }}>
                  {item.label}
                </p>
                <a href={item.href}
                  className="text-sm font-medium transition-colors duration-200"
                  style={{ color: 'rgba(232,234,240,0.85)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#FF5E00')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(232,234,240,0.85)')}>
                  {item.value}
                </a>
              </div>
            ))}

            {/* process */}
            <div className="pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
              <p className="text-xs font-medium tracking-widest uppercase mb-4" style={{ color: 'rgba(160,168,192,0.45)' }}>
                Our Process
              </p>
              {['Discovery Call', 'Strategy & Proposal', 'Design & Build', 'Launch & Grow'].map((step, i) => (
                <div key={step} className="flex items-center gap-3 mb-3 last:mb-0">
                  <span className="text-xs font-bold font-display" style={{ color: '#FF5E00' }}>
                    0{i + 1}
                  </span>
                  <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.07)' }} />
                  <span className="text-xs" style={{ color: 'rgba(160,168,192,0.6)' }}>{step}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* right form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-20 rounded-2xl"
                style={{ border: '1px solid rgba(255,94,0,0.15)', background: 'rgba(20,20,20,0.5)' }}
              >
                <div className="w-14 h-14 rounded-full flex items-center justify-center mb-6"
                  style={{ background: 'linear-gradient(135deg,rgba(255,94,0,0.4),rgba(255,30,30,0.4))', border: '1px solid rgba(255,94,0,0.3)' }}>
                  <Send size={20} style={{ color: '#FF5E00' }} />
                </div>
                <h3 className="font-display font-bold text-xl mb-2" style={{ color: '#e8eaf0' }}>Message sent!</h3>
                <p className="text-sm" style={{ color: 'rgba(160,168,192,0.7)' }}>
                  We'll be in touch within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }}
                className="rounded-2xl p-8 space-y-5"
                style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(20,20,20,0.4)' }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {[
                    { id: 'name', label: 'Full Name *', placeholder: 'John Smith', type: 'text', required: true },
                    { id: 'email', label: 'Email *', placeholder: 'john@company.com', type: 'email', required: true },
                  ].map((f) => (
                    <div key={f.id}>
                      <label className="block text-xs font-medium mb-2 tracking-wide"
                        style={{ color: 'rgba(160,168,192,0.6)' }}>{f.label}</label>
                      <input
                        type={f.type}
                        required={f.required}
                        placeholder={f.placeholder}
                        value={form[f.id as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [f.id]: e.target.value })}
                        className="w-full rounded-xl px-4 py-3.5 text-sm placeholder-white/20"
                        {...field(f.id)}
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-xs font-medium mb-2 tracking-wide"
                    style={{ color: 'rgba(160,168,192,0.6)' }}>Company</label>
                  <input
                    type="text" placeholder="Your Company"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className="w-full rounded-xl px-4 py-3.5 text-sm placeholder-white/20"
                    {...field('company')}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium mb-2 tracking-wide"
                    style={{ color: 'rgba(160,168,192,0.6)' }}>Service Needed</label>
                  <select
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className="w-full rounded-xl px-4 py-3.5 text-sm cursor-pointer"
                    style={{ colorScheme: 'dark', ...field('service').style }}
                    onFocus={() => setFocused('service')}
                    onBlur={() => setFocused(null)}
                  >
                    <option value="" style={{ background: '#141414' }}>Select a service…</option>
                    {services.map((s) => (
                      <option key={s} value={s} style={{ background: '#141414' }}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium mb-2 tracking-wide"
                    style={{ color: 'rgba(160,168,192,0.6)' }}>Tell us about your project *</label>
                  <textarea
                    required rows={5}
                    placeholder="Describe your project, goals, timeline, and budget…"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full rounded-xl px-4 py-3.5 text-sm resize-none placeholder-white/20"
                    {...field('message')}
                  />
                </div>

                <Magnetic className="w-full block">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02, boxShadow: '0 0 28px rgba(255,94,0,0.28)' }}
                    whileTap={{ scale: 0.98 }}
                    className="group w-full flex items-center justify-center gap-2.5 py-4 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer"
                    style={{ background: 'linear-gradient(135deg,#FF5E00,#FF1E1E)', color: '#000000' }}
                  >
                    Send Message
                    <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Magnetic>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
