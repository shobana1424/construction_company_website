import { motion } from 'framer-motion';
import { HardHat, LogOut, Globe, MapPin, CalendarDays, Lock, Check, Loader2, Circle, ClipboardList, FolderX } from 'lucide-react';
import { Badge, Pic, Counter } from '../ui.jsx';
import { CLIENTS, MILESTONES } from '../data.js';

const fade = (i) => ({ initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.1 * i, duration: 0.55 } });

export default function Client({ auth, logout, projects }) {
  const me = CLIENTS.find((c) => c.id === auth.id);
  const p = projects.find((x) => x.clientId === auth.id);
  const firstOpen = p ? MILESTONES.findIndex((_, i) => p.progress < (i + 1) * 20) : -1;
  const R = 54, C = 2 * Math.PI * R;
  return (
    <div className="dash">
      <header className="dtop"><a href="#/" className="logo"><HardHat size={24} /><span>IRON<b>CREST</b></span><em>Client</em></a>
        <div className="dr"><a className="dl" href="#/"><Globe size={16} /> Website</a><span className="who">{auth.name}</span><button className="btn ghost sm dk" onClick={logout}><LogOut size={16} /> Logout</button></div></header>
      <div className="dwrap">
        <motion.div {...fade(0)} className="dhead"><div><h1>Welcome, {auth.name}</h1><p>{me?.org} · Your authorised construction project</p></div><span className="ro"><Lock size={14} /> Read-only view</span></motion.div>
        {!p ? <motion.div {...fade(1)} className="panel empty big"><FolderX size={40} /><h3>No project assigned yet</h3><p>Your project manager will assign a project to your account shortly.</p></motion.div> : (<>
          <motion.section {...fade(1)} className="panel proj">
            <div className="pj"><div><Badge s={p.status} /><h2>{p.name}</h2><p><MapPin size={15} /> {p.location}</p><p><CalendarDays size={15} /> {p.start} → {p.end || 'TBD'}</p><small>{p.category} project</small></div>
              <div className="ring"><svg viewBox="0 0 140 140" width="160" height="160"><circle cx="70" cy="70" r={R} fill="none" stroke="#e5e6e8" strokeWidth="12" />
                <motion.circle cx="70" cy="70" r={R} fill="none" stroke="#e8741a" strokeWidth="12" strokeLinecap="round" strokeDasharray={C} initial={{ strokeDashoffset: C }} animate={{ strokeDashoffset: C * (1 - p.progress / 100) }} transition={{ duration: 1.4, ease: 'easeOut' }} transform="rotate(-90 70 70)" /></svg>
                <div><b><Counter to={p.progress} suffix="%" /></b><small>Complete</small></div></div></div>
          </motion.section>
          <div className="pg2">
            <motion.section {...fade(2)} className="panel"><h3>Construction milestones</h3>
              <ol className="ms">{MILESTONES.map((m, i) => { const st = p.progress >= (i + 1) * 20 ? 'done' : i === firstOpen ? 'cur' : 'up'; return (
                <motion.li key={m} className={st} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1 }}>
                  <span>{st === 'done' ? <Check size={16} /> : st === 'cur' ? <Loader2 size={16} className="spin" /> : <Circle size={12} />}</span><div><b>{m}</b><small>{st === 'done' ? 'Completed' : st === 'cur' ? 'In progress' : 'Upcoming'}</small></div></motion.li>); })}</ol></motion.section>
            <motion.section {...fade(3)} className="panel"><h3>Daily updates</h3>
              {p.updates.length === 0 ? <div className="empty">No updates posted yet.</div> : <ul className="feed">{p.updates.map((u, i) => <motion.li key={u.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.08 }}><p>{u.text}</p><small>{u.date} · {u.by}</small></motion.li>)}</ul>}</motion.section>
          </div>
          <motion.section {...fade(4)} className="panel"><h3>Progress images</h3>
            <div className="g3">{[['Site overview', 'tower', 0], ['Structural work', 'crane', 25], ['Finishing stage', 'mall', -20]].map(([c, k, d], i) => <motion.figure key={c} whileHover={{ y: -6 }} initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 + i * 0.12 }}><div className="pimg"><Pic hue={(p.hue + d + 360) % 360} kind={i === 0 ? p.kind : k} /></div><figcaption>{c}</figcaption></motion.figure>)}</div></motion.section>
          <motion.section {...fade(5)} className="panel"><h3>Recent activities</h3>
            <ul className="feed act">{p.updates.slice(0, 4).map((u) => <li key={u.id}><ClipboardList size={16} /><div><p>{u.by} posted an update</p><small>{u.date}</small></div></li>)}</ul></motion.section>
        </>)}
      </div>
    </div>
  );
}
