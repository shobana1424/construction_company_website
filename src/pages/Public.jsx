import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Phone, Mail, MapPin, Clock, Star, X, ChevronLeft, ChevronRight, ZoomIn, Target, Eye, Loader2 } from 'lucide-react';
import { Pic, Reveal, Counter } from '../ui.jsx';
import { COMPANY, SERVICES, WHY, PROCESS, TESTIMONIALS, STATS, TEAM, VALUES, GALLERY, CATS } from '../data.js';

const Head = ({ k, t, s }) => <Reveal className="head"><span className="kick">{k}</span><h2>{t}</h2>{s && <p>{s}</p>}</Reveal>;
const PageHero = ({ k, t, s }) => (
  <section className="phero"><Pic hue={25} kind="crane" className="bgpic" /><div className="shade" />
    <div className="wrap"><motion.span className="kick" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{k}</motion.span>
      <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>{t}</motion.h1>
      <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}>{s}</motion.p></div></section>
);

export function Home() {
  const words = ['We', 'Build', 'What', 'Lasts.'];
  return (<>
    <section className="hero"><Pic hue={25} kind="tower" className="bgpic" /><div className="shade" />
      <div className="wrap hc">
        <motion.span className="kick" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>Since 2008 · Madurai, Tamil Nadu</motion.span>
        <h1>{words.map((w, i) => <span className="mask" key={i}><motion.span className={i === 3 ? 'acc' : ''} initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ delay: 0.3 + i * 0.13, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}>{w}&nbsp;</motion.span></span>)}</h1>
        <motion.p className="lead" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>Premium residential, commercial and industrial construction — engineered with precision and delivered with integrity.</motion.p>
        <motion.div className="ctas" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}>
          <a className="btn pri" href="#/contact">Get a Free Quote <ArrowRight size={18} /></a><a className="btn ghost" href="#/gallery">View Projects</a></motion.div>
      </div>
      <motion.div className="scroll" animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.8 }} />
    </section>

    <section className="sec"><div className="wrap">
      <Head k="Who We Are" t="Building trust, one structure at a time" s="IronCrest is a full-service construction company delivering safe, high-quality buildings across South India for 18 years." />
      <div className="grid3">{SERVICES.map((s, i) => <Reveal key={s.t} delay={(i % 3) * 0.1}><div className="svc"><div className="ico"><s.i size={26} /></div><h3>{s.t}</h3><p>{s.d}</p></div></Reveal>)}</div>
    </div></section>

    <section className="sec grey"><div className="wrap">
      <Head k="Featured Projects" t="Landmarks we are proud of" />
      <div className="grid3">{GALLERY.slice(0, 3).map((g, i) => (
        <Reveal key={g.id} delay={i * 0.12}><a href="#/gallery" className="pcard"><div className="pimg"><Pic hue={g.hue} kind={g.kind} /><div className="ov"><ZoomIn size={28} /><span>View project</span></div></div>
          <div className="pinfo"><small>{g.cat}</small><h3>{g.title}</h3><p><MapPin size={14} /> {g.loc}</p></div></a></Reveal>))}</div>
      <Reveal className="center"><a className="btn dark" href="#/gallery">Explore Full Gallery <ArrowRight size={18} /></a></Reveal>
    </div></section>

    <section className="stats"><div className="wrap sg">{STATS.map(([n, s, l]) => <Reveal key={l}><div className="stat"><b><Counter to={n} suffix={s} /></b><span>{l}</span></div></Reveal>)}</div></section>

    <section className="sec"><div className="wrap">
      <Head k="Why Choose Us" t="The IronCrest advantage" />
      <div className="grid4">{WHY.map((w, i) => <Reveal key={w.t} delay={i * 0.1}><div className="why"><w.i size={30} /><h3>{w.t}</h3><p>{w.d}</p></div></Reveal>)}</div>
    </div></section>

    <section className="sec dark"><div className="wrap">
      <Head k="Our Process" t="From first conversation to final handover" />
      <ol className="tl">{PROCESS.map(([t, d], i) => (
        <motion.li key={t} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.6 }}><span>{i + 1}</span><h3>{t}</h3><p>{d}</p></motion.li>))}</ol>
    </div></section>

    <section className="sec"><div className="wrap">
      <Head k="Testimonials" t="What our clients say" />
      <div className="grid3">{TESTIMONIALS.map((t, i) => <Reveal key={t.n} delay={i * 0.12}><div className="tcard"><div className="stars">{[0, 1, 2, 3, 4].map((x) => <Star key={x} size={16} fill="currentColor" />)}</div><p>“{t.t}”</p><b>{t.n}</b><small>{t.r}</small></div></Reveal>)}</div>
    </div></section>

    <section className="cta"><div className="wrap"><Reveal><h2>Ready to start your project?</h2><p>Talk to our engineers today for a free consultation and site visit.</p>
      <div className="ctas"><a className="btn dark" href="#/contact">Contact Us <ArrowRight size={18} /></a><a className="btn ghost" href={'tel:' + COMPANY.phone.replace(/\s/g, '')}><Phone size={18} /> {COMPANY.phone}</a></div></Reveal></div></section>
  </>);
}

export function About() {
  const bars = [['Residential', 95], ['Commercial', 90], ['Industrial', 82], ['Renovation', 88]];
  const hist = [['2008', 'Founded in Madurai by Karthik Subramanian with a team of 12.'], ['2013', 'Expanded into commercial construction and crossed 50 projects.'], ['2018', 'Launched in-house design studio and project management office.'], ['2024', 'Introduced the client portal with daily progress reporting.']];
  return (<>
    <PageHero k="About Us" t="Engineers. Builders. Partners." s="A people-first construction company built on craftsmanship, safety and trust." />
    <section className="sec"><div className="wrap split">
      <Reveal><span className="kick">Company Profile</span><h2>18 years of building South India</h2>
        <p>IronCrest Constructions designs and builds homes, offices, factories and restoration projects. Our in-house engineers, architects and safety officers manage every stage — so clients deal with one accountable team.</p>
        <div className="bars">{bars.map(([l, v]) => <div key={l}><span>{l}<em>{v}%</em></span><div className="bar"><motion.i initial={{ width: 0 }} whileInView={{ width: v + '%' }} viewport={{ once: true }} transition={{ duration: 1.2 }} /></div></div>)}</div></Reveal>
      <Reveal delay={0.15}><div className="pimg tall"><Pic hue={25} kind="tower" /></div></Reveal>
    </div></section>
    <section className="sec grey"><div className="wrap"><Head k="Our History" t="A journey of steady growth" />
      <div className="hist">{hist.map(([y, t], i) => <Reveal key={y} delay={i * 0.1}><div className="hi"><b>{y}</b><p>{t}</p></div></Reveal>)}</div></div></section>
    <section className="sec"><div className="wrap"><div className="grid2">
      <Reveal><div className="mv"><Target size={32} /><h3>Our Mission</h3><p>To deliver safe, durable and beautiful buildings on time and within budget, with complete transparency for every client.</p></div></Reveal>
      <Reveal delay={0.12}><div className="mv"><Eye size={32} /><h3>Our Vision</h3><p>To be the most trusted construction partner in South India, known for quality, innovation and zero-incident sites.</p></div></Reveal></div>
      <Head k="Core Values" t="What drives every decision" />
      <div className="grid4">{VALUES.map((v, i) => <Reveal key={v.t} delay={i * 0.1}><div className="why"><v.i size={30} /><h3>{v.t}</h3><p>{v.d}</p></div></Reveal>)}</div></div></section>
    <section className="sec dark"><div className="wrap"><Head k="Leadership Team" t="The people behind the projects" />
      <div className="grid4">{TEAM.map((m, i) => <Reveal key={m.n} delay={i * 0.1}><div className="tm"><div className="avt" style={{ background: `linear-gradient(135deg,hsl(${m.h} 70% 55%),#2b2f37)` }}>{m.n.split(' ').map((x) => x[0]).join('')}</div><h3>{m.n}</h3><p>{m.r}</p></div></Reveal>)}</div></div></section>
    <section className="sec"><div className="wrap"><Head k="Quality & Safety" t="Standards we never compromise" />
      <div className="grid3">{[['ISO-aligned quality plans', 'Stage-wise inspections, material testing and documented sign-offs.'], ['Zero-incident safety culture', 'Daily toolbox talks, PPE enforcement and monthly independent audits.'], ['Warranty & after-care', 'Structural warranty and dedicated support after handover.']].map(([t, d], i) => <Reveal key={t} delay={i * 0.1}><div className="svc"><h3>{t}</h3><p>{d}</p></div></Reveal>)}</div></div></section>
  </>);
}

export function Gallery() {
  const [cat, setCat] = useState('All'); const [open, setOpen] = useState(null);
  const list = useMemo(() => GALLERY.filter((g) => cat === 'All' || g.cat === cat), [cat]);
  const step = (d) => setOpen((o) => (o + d + list.length) % list.length);
  useEffect(() => {
    if (open === null) return;
    const k = (e) => { if (e.key === 'Escape') setOpen(null); if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1); };
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k);
  });
  const cur = open !== null ? list[open] : null;
  return (<>
    <PageHero k="Gallery" t="Our completed work" s="Browse approved images from residential, commercial, renovation and industrial projects." />
    <section className="sec"><div className="wrap">
      <div className="chips">{CATS.map((c) => <button key={c} className={cat === c ? 'on' : ''} onClick={() => setCat(c)}>{cat === c && <motion.i layoutId="chip" className="chipbg" />}<span>{c}</span></button>)}</div>
      <motion.div layout className="ggrid"><AnimatePresence mode="popLayout">{list.map((g, i) => (
        <motion.button layout key={g.id} className="gitem" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.4, delay: i * 0.03 }} onClick={() => setOpen(i)}>
          <Pic hue={g.hue} kind={g.kind} /><div className="ov"><ZoomIn size={26} /><b>{g.title}</b><small>{g.cat} · {g.loc}</small></div></motion.button>))}</AnimatePresence></motion.div>
      {list.length === 0 && <p className="center">No projects in this category yet.</p>}
    </div></section>
    <AnimatePresence>{cur && (
      <motion.div className="lb" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)}>
        <button className="lbx" aria-label="Close" onClick={() => setOpen(null)}><X /></button>
        <button className="lbn l" aria-label="Previous" onClick={(e) => { e.stopPropagation(); step(-1); }}><ChevronLeft /></button>
        <button className="lbn r" aria-label="Next" onClick={(e) => { e.stopPropagation(); step(1); }}><ChevronRight /></button>
        <motion.div key={cur.id} className="lbc" onClick={(e) => e.stopPropagation()} initial={{ opacity: 0, scale: 0.92, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.35 }}>
          <div className="lbimg"><Pic hue={cur.hue} kind={cur.kind} /></div>
          <div className="lbt"><small>{cur.cat} · {cur.year}</small><h3>{cur.title}</h3><p><MapPin size={14} /> {cur.loc}</p><p>{cur.desc}</p><span>{open + 1} / {list.length}</span></div>
        </motion.div></motion.div>)}</AnimatePresence>
  </>);
}

const Fld = ({ l, err, children }) => <label className={'fld ' + (err ? 'bad' : '')}>{l}{children}{err && <small>{err}</small>}</label>;
export function Contact({ onInquiry }) {
  const empty = { name: '', email: '', phone: '', subject: '', message: '' };
  const [f, setF] = useState(empty); const [e, setE] = useState({}); const [done, setDone] = useState(false); const [busy, setBusy] = useState(false);
  const set = (k) => (ev) => { setF({ ...f, [k]: ev.target.value }); setE({ ...e, [k]: '' }); };
  const submit = (ev) => {
    ev.preventDefault(); const n = {};
    if (f.name.trim().length < 2) n.name = 'Please enter your full name';
    if (!/^\S+@\S+\.\S+$/.test(f.email)) n.email = 'Enter a valid email address';
    if (!/^[+\d][\d\s-]{8,14}$/.test(f.phone.trim())) n.phone = 'Enter a valid phone number';
    if (!f.subject) n.subject = 'Select a subject';
    if (f.message.trim().length < 10) n.message = 'Message must be at least 10 characters';
    setE(n); if (Object.keys(n).length) return;
    setBusy(true); setTimeout(() => { setBusy(false); setDone(true); onInquiry(f.name.trim()); }, 900);
  };
  return (<>
    <PageHero k="Contact" t="Let’s build together" s="Share your requirements and our team will respond within one business day." />
    <section className="sec"><div className="wrap cgrid">
      <Reveal><div className="fcard"><AnimatePresence mode="wait">{done ? (
        <motion.div key="ok" className="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
          <svg viewBox="0 0 52 52" width="96" height="96"><motion.circle cx="26" cy="26" r="23" fill="none" stroke="#e8741a" strokeWidth="3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6 }} />
            <motion.path d="M15 27l8 8 14-16" fill="none" stroke="#e8741a" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5, duration: 0.5 }} /></svg>
          <h3>Message sent!</h3><p>Thank you, {f.name.trim()}. Our team will contact you shortly.</p>
          <button className="btn dark" onClick={() => { setF(empty); setDone(false); }}>Send another message</button></motion.div>
      ) : (
        <motion.form key="form" noValidate onSubmit={submit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <h3>Send us a message</h3>
          <div className="row2"><Fld l="Full name" err={e.name}><input value={f.name} onChange={set('name')} placeholder="Your name" /></Fld><Fld l="Email" err={e.email}><input type="email" value={f.email} onChange={set('email')} placeholder="you@example.com" /></Fld></div>
          <div className="row2"><Fld l="Phone" err={e.phone}><input value={f.phone} onChange={set('phone')} placeholder="+91 98765 43210" /></Fld>
            <Fld l="Subject" err={e.subject}><select value={f.subject} onChange={set('subject')}><option value="">Select subject</option><option>New construction</option><option>Renovation</option><option>Commercial project</option><option>Other enquiry</option></select></Fld></div>
          <Fld l="Message" err={e.message}><textarea rows={5} value={f.message} onChange={set('message')} placeholder="Tell us about your project…" /></Fld>
          <button className="btn pri full" disabled={busy}>{busy ? <><Loader2 className="spin" size={18} /> Sending…</> : <>Send Message <ArrowRight size={18} /></>}</button>
        </motion.form>)}</AnimatePresence></div></Reveal>
      <Reveal delay={0.15}><div className="cinfo">
        <div><Phone /><span><b>Phone</b>{COMPANY.phone}</span></div><div><Mail /><span><b>Email</b>{COMPANY.email}</span></div>
        <div><MapPin /><span><b>Address</b>{COMPANY.address}</span></div><div><Clock /><span><b>Working hours</b>{COMPANY.hours}</span></div>
        <div className="mapph" role="img" aria-label="Map placeholder"><motion.span animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}><MapPin size={34} /></motion.span><small>Map placeholder — Madurai</small></div>
      </div></Reveal>
    </div></section>
  </>);
}
