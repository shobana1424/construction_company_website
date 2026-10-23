import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HardHat, LogOut, Search, Plus, Pencil, FolderKanban, Activity, CheckCircle2, Users, Send, X, Globe, PlayCircle } from 'lucide-react';
import { Counter, Badge, go } from '../ui.jsx';
import { CLIENTS, STATUSES, CATEGORIES } from '../data.js';

const COLORS = { Planning: '#8d99a8', 'In Progress': '#e8741a', 'On Hold': '#c9a227', Completed: '#2e9d6b' };
const cname = (id) => CLIENTS.find((c) => c.id === id)?.name || 'Unassigned';
const today = () => new Date().toISOString().slice(0, 10);
const fade = (i) => ({ initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.08 * i, duration: 0.55 } });

function ProjectModal({ init, onSave, onClose }) {
  const [f, setF] = useState(init || { name: '', location: '', category: 'Residential', status: 'Planning', progress: 0, clientId: '', end: '' });
  const [e, setE] = useState({}); const set = (k) => (ev) => { setF({ ...f, [k]: ev.target.value }); setE({ ...e, [k]: '' }); };
  const save = () => {
    const n = {}; const p = Number(f.progress);
    if (f.name.trim().length < 3) n.name = 'Project name required (min 3 characters)';
    if (!f.location.trim()) n.location = 'Location is required';
    if (f.progress === '' || isNaN(p) || p < 0 || p > 100) n.progress = 'Enter a value from 0 to 100';
    setE(n); if (Object.keys(n).length) return;
    onSave({ ...f, name: f.name.trim(), location: f.location.trim(), progress: f.status === 'Completed' ? 100 : p });
  };
  const F = ({ k, l, children }) => <label className={'fld ' + (e[k] ? 'bad' : '')}>{l}{children}{e[k] && <small>{e[k]}</small>}</label>;
  return (
    <motion.div className="mo" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div className="md" onClick={(x) => x.stopPropagation()} initial={{ y: 40, scale: 0.96 }} animate={{ y: 0, scale: 1 }} exit={{ y: 40, opacity: 0 }}>
        <div className="mh"><h3>{init ? 'Edit project' : 'Add new project'}</h3><button className="ib" aria-label="Close" onClick={onClose}><X size={18} /></button></div>
        <div className="mb form2">
          <F k="name" l="Project name *"><input value={f.name} onChange={set('name')} /></F>
          <F k="location" l="Location *"><input value={f.location} onChange={set('location')} /></F>
          <F k="category" l="Category"><select value={f.category} onChange={set('category')}>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select></F>
          <F k="status" l="Status"><select value={f.status} onChange={set('status')}>{STATUSES.map((c) => <option key={c}>{c}</option>)}</select></F>
          <F k="progress" l="Progress % (0–100)"><input type="number" min="0" max="100" value={f.progress} onChange={set('progress')} /></F>
          <F k="end" l="Target completion"><input type="date" value={f.end} onChange={set('end')} /></F>
          <F k="clientId" l="Assigned client"><select value={f.clientId} onChange={set('clientId')}><option value="">Unassigned</option>{CLIENTS.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></F>
        </div>
        <div className="mf"><button className="btn ghost dk" onClick={onClose}>Cancel</button><button className="btn pri" onClick={save}>{init ? 'Save changes' : 'Add project'}</button></div>
      </motion.div>
    </motion.div>
  );
}

export default function Admin({ auth, logout, projects, setProjects, activity, log }) {
  const [q, setQ] = useState(''); const [st, setSt] = useState('All'); const [modal, setModal] = useState(null);
  const [upd, setUpd] = useState({ pid: projects[0]?.id || '', text: '' }); const [uerr, setUerr] = useState(''); const [toast, setToast] = useState('');
  const say = (m) => { setToast(m); setTimeout(() => setToast(''), 2800); };
  const list = useMemo(() => projects.filter((p) => (st === 'All' || p.status === st) && (p.name + p.location + cname(p.clientId)).toLowerCase().includes(q.toLowerCase())), [projects, q, st]);
  const kpis = [[FolderKanban, 'Total Projects', projects.length], [PlayCircle, 'Active Projects', projects.filter((p) => p.status === 'In Progress').length], [CheckCircle2, 'Completed', projects.filter((p) => p.status === 'Completed').length], [Users, 'Registered Clients', CLIENTS.length]];
  let acc = 0; const stops = projects.length ? STATUSES.map((s) => { const a = (acc / projects.length) * 100; acc += projects.filter((p) => p.status === s).length; return `${COLORS[s]} ${a}% ${(acc / projects.length) * 100}%`; }).join(',') : '#ddd 0 100%';
  const recent = projects.flatMap((p) => p.updates.map((u) => ({ ...u, project: p.name }))).sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5);

  const save = (f) => {
    if (modal === 'new') { setProjects([{ ...f, id: 'p' + Date.now(), hue: 25 + projects.length * 37, kind: ['tower', 'house', 'mall', 'crane'][projects.length % 4], start: today(), updates: [] }, ...projects]); log(`New project “${f.name}” added`); say('Project added successfully'); }
    else { setProjects(projects.map((p) => (p.id === modal.id ? { ...p, ...f } : p))); log(`Project “${f.name}” updated`); say('Project updated successfully'); }
    setModal(null);
  };
  const postUpdate = (ev) => {
    ev.preventDefault(); if (upd.text.trim().length < 5) { setUerr('Write at least 5 characters'); return; }
    const p = projects.find((x) => x.id === upd.pid);
    setProjects(projects.map((x) => (x.id === upd.pid ? { ...x, updates: [{ id: 'u' + Date.now(), date: today(), by: 'Site Administrator', text: upd.text.trim() }, ...x.updates] } : x)));
    log(`Daily update posted for ${p.name}`); setUpd({ ...upd, text: '' }); setUerr(''); say('Daily update published');
  };
  const assign = (cid, pid) => {
    setProjects((ps) => ps.map((p) => (p.clientId === cid ? { ...p, clientId: '' } : p)).map((p) => (p.id === pid ? { ...p, clientId: cid } : p)));
    log(pid ? `${cname(cid)} assigned to ${projects.find((p) => p.id === pid).name}` : `${cname(cid)} unassigned from project`); say('Assignment updated');
  };

  return (
    <div className="dash">
      <header className="dtop"><a href="#/" className="logo"><HardHat size={24} /><span>IRON<b>CREST</b></span><em>Admin</em></a>
        <div className="dr"><a className="dl" href="#/"><Globe size={16} /> Website</a><span className="who">{auth.name}</span><button className="btn ghost sm dk" onClick={logout}><LogOut size={16} /> Logout</button></div></header>
      <div className="dwrap">
        <motion.div {...fade(0)} className="dhead"><div><h1>Admin Dashboard</h1><p>Manage projects, post daily updates and assign clients.</p></div><button className="btn pri" onClick={() => setModal('new')}><Plus size={18} /> Add Project</button></motion.div>
        <div className="kpis">{kpis.map(([I, l, v], i) => <motion.div key={l} className="kpi" {...fade(i + 1)} whileHover={{ y: -4 }}><div className="ki"><I size={22} /></div><div><span>{l}</span><b><Counter to={v} /></b></div></motion.div>)}</div>

        <div className="pg2">
          <motion.section className="panel" {...fade(5)}><h3>Progress by project</h3>
            {projects.map((p) => <div className="mb2" key={p.id}><span>{p.name}<em>{p.progress}%</em></span><div className="bar"><motion.i initial={{ width: 0 }} animate={{ width: p.progress + '%' }} transition={{ duration: 1, ease: 'easeOut' }} style={{ background: COLORS[p.status] }} /></div></div>)}</motion.section>
          <motion.section className="panel" {...fade(6)}><h3>Status overview</h3>
            <div className="dn"><motion.div className="donut" style={{ background: `conic-gradient(${stops})` }} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} transition={{ duration: 1 }}><div><b>{projects.length}</b><small>Projects</small></div></motion.div>
              <ul className="leg">{STATUSES.map((s) => <li key={s}><i style={{ background: COLORS[s] }} />{s}<b>{projects.filter((p) => p.status === s).length}</b></li>)}</ul></div></motion.section>
        </div>

        <motion.section className="panel" {...fade(7)}>
          <div className="ph"><h3>Project management</h3><div className="tools"><div className="search"><Search size={16} /><input placeholder="Search project, location, client…" value={q} onChange={(e) => setQ(e.target.value)} /></div>
            <select value={st} onChange={(e) => setSt(e.target.value)}><option>All</option>{STATUSES.map((s) => <option key={s}>{s}</option>)}</select></div></div>
          <div className="tw"><table><thead><tr><th>Project</th><th>Client</th><th>Category</th><th>Status</th><th>Progress</th><th></th></tr></thead><tbody>
            {list.map((p, i) => <motion.tr key={p.id} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}><td><b>{p.name}</b><small>{p.location}</small></td><td>{cname(p.clientId)}</td><td>{p.category}</td><td><Badge s={p.status} /></td>
              <td><div className="bar sm"><i style={{ width: p.progress + '%', background: COLORS[p.status] }} /></div><small>{p.progress}%</small></td><td><button className="ib" aria-label="Edit" onClick={() => setModal(p)}><Pencil size={16} /></button></td></motion.tr>)}</tbody></table>
            {list.length === 0 && <div className="empty">No projects match your search or filter.</div>}</div>
        </motion.section>

        <div className="pg2">
          <motion.section className="panel" {...fade(8)}><h3>Daily construction update</h3>
            <form onSubmit={postUpdate} className="uf"><label className="fld">Project<select value={upd.pid} onChange={(e) => setUpd({ ...upd, pid: e.target.value })}>{projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}</select></label>
              <label className={'fld ' + (uerr ? 'bad' : '')}>Update<textarea rows={3} value={upd.text} onChange={(e) => { setUpd({ ...upd, text: e.target.value }); setUerr(''); }} placeholder="e.g. Slab casting completed on 7th floor…" />{uerr && <small>{uerr}</small>}</label>
              <button className="btn pri"><Send size={16} /> Publish update</button></form>
            <h4>Latest updates</h4><ul className="feed">{recent.map((u) => <li key={u.id}><b>{u.project}</b><p>{u.text}</p><small>{u.date} · {u.by}</small></li>)}</ul></motion.section>
          <motion.section className="panel" {...fade(9)}><h3>Client assignments</h3>
            <ul className="asg">{CLIENTS.map((c) => { const cur = projects.find((p) => p.clientId === c.id); return (
              <li key={c.id}><div><b>{c.name}</b><small>{c.org}</small></div><select aria-label={'Project for ' + c.name} value={cur?.id || ''} onChange={(e) => assign(c.id, e.target.value)}><option value="">No project</option>{projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}</select></li>); })}</ul>
            <h4><Activity size={15} /> Activity feed</h4><ul className="feed">{activity.slice(0, 6).map((a) => <li key={a.id}><p>{a.text}</p><small>{a.time}</small></li>)}</ul></motion.section>
        </div>
      </div>
      <AnimatePresence>{modal && <ProjectModal init={modal === 'new' ? null : modal} onSave={save} onClose={() => setModal(null)} />}</AnimatePresence>
      <AnimatePresence>{toast && <motion.div className="toast" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }}><CheckCircle2 size={18} /> {toast}</motion.div>}</AnimatePresence>
    </div>
  );
}
