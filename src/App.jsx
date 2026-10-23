import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, HardHat, Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react';
import { COMPANY, ADMIN, CLIENTS, PROJECTS0, ACTIVITY0 } from './data.js';
import { go } from './ui.jsx';
import { Home, About, Gallery, Contact } from './pages/Public.jsx';
import Login from './pages/Login.jsx';
import Admin from './pages/Admin.jsx';
import Client from './pages/Client.jsx';

const getRoute = () => window.location.hash.slice(1) || '/';
const LINKS = [['/', 'Home'], ['/about', 'About'], ['/gallery', 'Gallery'], ['/contact', 'Contact']];

export default function App() {
  const [route, setRoute] = useState(getRoute);
  const [auth, setAuth] = useState(() => { try { return JSON.parse(sessionStorage.getItem('ic_auth')); } catch { return null; } });
  const [projects, setProjects] = useState(PROJECTS0);
  const [activity, setActivity] = useState(ACTIVITY0);
  const [menu, setMenu] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => { const f = () => { setRoute(getRoute()); setMenu(false); window.scrollTo(0, 0); }; window.addEventListener('hashchange', f); return () => window.removeEventListener('hashchange', f); }, []);
  useEffect(() => { const f = () => setSolid(window.scrollY > 40); f(); window.addEventListener('scroll', f); return () => window.removeEventListener('scroll', f); }, []);
  useEffect(() => {
    if (route === '/admin' && auth?.role !== 'admin') go('/admin/login');
    if (route === '/client' && auth?.role !== 'client') go('/client/login');
    if (route === '/admin/login' && auth?.role === 'admin') go('/admin');
    if (route === '/client/login' && auth?.role === 'client') go('/client');
  }, [route, auth]);

  const log = (text) => setActivity((a) => [{ id: 'a' + Date.now(), text, time: 'Just now' }, ...a].slice(0, 12));
  const login = (role, email, pw) => {
    let u = null;
    if (role === 'admin' && email.toLowerCase() === ADMIN.email && pw === ADMIN.password) u = { role: 'admin', id: 'admin', name: ADMIN.name };
    if (role === 'client') { const c = CLIENTS.find((x) => x.email.toLowerCase() === email.toLowerCase() && x.password === pw); if (c) u = { role: 'client', id: c.id, name: c.name }; }
    if (u) { sessionStorage.setItem('ic_auth', JSON.stringify(u)); setAuth(u); go(role === 'admin' ? '/admin' : '/client'); }
    return u;
  };
  const logout = () => { sessionStorage.removeItem('ic_auth'); setAuth(null); go('/'); };

  const dash = route === '/admin' || route === '/client';
  let page;
  if (route === '/about') page = <About />;
  else if (route === '/gallery') page = <Gallery />;
  else if (route === '/contact') page = <Contact onInquiry={(n) => log(`New enquiry received from ${n}`)} />;
  else if (route === '/admin/login') page = <Login role="admin" onLogin={login} />;
  else if (route === '/client/login') page = <Login role="client" onLogin={login} />;
  else if (route === '/admin') page = auth?.role === 'admin' ? <Admin auth={auth} logout={logout} projects={projects} setProjects={setProjects} activity={activity} log={log} /> : null;
  else if (route === '/client') page = auth?.role === 'client' ? <Client auth={auth} logout={logout} projects={projects} /> : null;
  else page = <Home />;

  return (
    <>
      {!dash && (
        <header className={'nav ' + (solid || menu ? 'solid' : '')}>
          <div className="wrap navin">
            <a href="#/" className="logo"><HardHat size={26} /><span>IRON<b>CREST</b></span></a>
            <nav className="links">{LINKS.map(([p, l]) => <a key={p} href={'#' + p} className={route === p ? 'on' : ''}>{l}</a>)}</nav>
            <div className="navr">
              <a className="btn pri sm" href={auth?.role === 'client' ? '#/client' : '#/client/login'}>Client Portal</a>
              <a className="adm" href={auth?.role === 'admin' ? '#/admin' : '#/admin/login'}>Admin</a>
              <button className="burger" aria-label="Menu" onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</button>
            </div>
          </div>
          <AnimatePresence>
            {menu && (
              <motion.div className="mmenu" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                {[...LINKS, ['/client/login', 'Client Portal'], ['/admin/login', 'Admin Login']].map(([p, l], i) => (
                  <motion.a key={p} href={'#' + p} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.05 }}>{l}</motion.a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </header>
      )}
      <AnimatePresence mode="wait">
        <motion.main key={route} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>{page}</motion.main>
      </AnimatePresence>
      {!dash && (
        <footer className="foot">
          <div className="wrap fg">
            <div><a href="#/" className="logo"><HardHat size={24} /><span>IRON<b>CREST</b></span></a><p>Building residential, commercial and industrial spaces with precision, safety and integrity since 2008.</p></div>
            <div><h4>Explore</h4>{LINKS.map(([p, l]) => <a key={p} href={'#' + p}>{l}</a>)}<a href="#/client/login">Client Portal</a><a href="#/admin/login">Admin Login</a></div>
            <div><h4>Contact</h4><span><Phone size={15} /> {COMPANY.phone}</span><span><Mail size={15} /> {COMPANY.email}</span><span><MapPin size={15} /> {COMPANY.address}</span></div>
            <div><h4>Start a project</h4><p>Tell us about your plans and get a free consultation.</p><a className="btn pri sm" href="#/contact">Get a Quote <ArrowUpRight size={16} /></a></div>
          </div>
          <div className="copy">© 2026 {COMPANY.name}. All rights reserved. Demo website.</div>
        </footer>
      )}
    </>
  );
}
