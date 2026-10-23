import { useState } from 'react';
import { motion } from 'framer-motion';
import { HardHat, Eye, EyeOff, Loader2, ArrowLeft, Lock, ShieldAlert } from 'lucide-react';
import { Pic } from '../ui.jsx';
import { ADMIN, CLIENTS } from '../data.js';

export default function Login({ role, onLogin }) {
  const admin = role === 'admin'; const demo = admin ? ADMIN : CLIENTS[0];
  const [f, setF] = useState({ email: '', password: '' }); const [show, setShow] = useState(false);
  const [e, setE] = useState({}); const [busy, setBusy] = useState(false); const [msg, setMsg] = useState('');
  const submit = (ev) => {
    ev.preventDefault(); const n = {};
    if (!/^\S+@\S+\.\S+$/.test(f.email)) n.email = 'Enter a valid email address';
    if (f.password.length < 6) n.password = 'Password must be at least 6 characters';
    setE(n); setMsg(''); if (Object.keys(n).length) return;
    setBusy(true); setTimeout(() => { const u = onLogin(role, f.email.trim(), f.password); setBusy(false); if (!u) setMsg('Invalid email or password for this portal.'); }, 700);
  };
  return (
    <section className="lg"><Pic hue={admin ? 25 : 200} kind={admin ? 'crane' : 'tower'} className="bgpic" /><div className="shade" />
      <motion.div className="lgc" initial={{ opacity: 0, y: 40, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}>
        <a href="#/" className="back"><ArrowLeft size={16} /> Back to website</a>
        <div className="lgi"><Lock size={26} /></div>
        <h1>{admin ? 'Admin Login' : 'Client Portal'}</h1>
        <p>{admin ? 'Restricted area. Authorised administrators only.' : 'Sign in with your credentials to view your project.'}</p>
        <form noValidate onSubmit={submit}>
          <label className={'fld ' + (e.email ? 'bad' : '')}>Email<input type="email" value={f.email} onChange={(x) => { setF({ ...f, email: x.target.value }); setE({ ...e, email: '' }); }} placeholder="name@example.com" autoComplete="username" />{e.email && <small>{e.email}</small>}</label>
          <label className={'fld ' + (e.password ? 'bad' : '')}>Password<div className="pw"><input type={show ? 'text' : 'password'} value={f.password} onChange={(x) => { setF({ ...f, password: x.target.value }); setE({ ...e, password: '' }); }} placeholder="••••••••" autoComplete="current-password" />
            <button type="button" aria-label="Toggle password" onClick={() => setShow(!show)}>{show ? <EyeOff size={18} /> : <Eye size={18} />}</button></div>{e.password && <small>{e.password}</small>}</label>
          {msg && <motion.div key={msg} className="alert" initial={{ x: -10 }} animate={{ x: [-10, 10, -6, 6, 0] }} transition={{ duration: 0.4 }}><ShieldAlert size={16} /> {msg}</motion.div>}
          <button className="btn pri full" disabled={busy}>{busy ? <><Loader2 className="spin" size={18} /> Signing in…</> : 'Sign In'}</button>
        </form>
        <button className="demo" type="button" onClick={() => { setF({ email: demo.email, password: demo.password }); setE({}); setMsg(''); }}><HardHat size={15} /> Fill demo credentials</button>
        <small className="hint">Demo only — frontend authentication is not secure.</small>
        <a className="sw" href={admin ? '#/client/login' : '#/admin/login'}>{admin ? 'Client login →' : 'Admin login →'}</a>
      </motion.div></section>
  );
}
