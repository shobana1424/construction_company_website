import { useEffect, useId, useRef, useState } from 'react';
import { motion, useInView, animate, useReducedMotion } from 'framer-motion';

export const go = (p) => { window.location.hash = p; };

const SHAPES = {
  tower: (w) => <g fill={`url(#${w})`}><rect x="150" y="50" width="100" height="240" /><rect x="95" y="125" width="60" height="165" /><rect x="250" y="95" width="70" height="195" /></g>,
  house: (w) => <g fill={`url(#${w})`}><path d="M70 175 L200 85 L330 175Z" fill="#20242c" /><rect x="95" y="175" width="210" height="115" /></g>,
  mall: (w) => <g fill={`url(#${w})`}><rect x="40" y="150" width="320" height="140" /><rect x="110" y="105" width="180" height="45" /></g>,
  crane: (w) => <g><rect x="140" y="190" width="170" height="100" fill={`url(#${w})`} /><path d="M110 290V50H310M110 50L50 85M290 50V120" stroke="#e8741a" strokeWidth="7" fill="none" /></g>,
};

export function Pic({ hue = 25, kind = 'tower', className = '' }) {
  const u = useId().replace(/:/g, '');
  return (
    <svg className={'pic ' + className} viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id={'g' + u} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={`hsl(${hue} 70% 62%)`} /><stop offset=".6" stopColor={`hsl(${hue} 35% 38%)`} /><stop offset="1" stopColor="#16181d" /></linearGradient>
        <pattern id={'w' + u} width="14" height="18" patternUnits="userSpaceOnUse"><rect width="14" height="18" fill="#20242c" /><rect x="3" y="4" width="7" height="9" fill="#f6a35a" opacity=".75" /></pattern>
      </defs>
      <rect width="400" height="300" fill={`url(#g${u})`} /><circle cx="320" cy="70" r="34" fill="#ffd9a8" opacity=".55" />
      {SHAPES[kind]('w' + u)}<rect y="286" width="400" height="14" fill="#0f1114" />
    </svg>
  );
}

export const Reveal = ({ children, delay = 0, y = 36, className = '' }) => (
  <motion.div className={className} initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7, delay, ease: [0.2, 0.8, 0.2, 1] }}>{children}</motion.div>
);

export function Counter({ to, suffix = '', dur = 1.6 }) {
  const ref = useRef(null); const inView = useInView(ref, { once: true }); const red = useReducedMotion(); const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (red) { setV(to); return; }
    const c = animate(0, to, { duration: dur, ease: 'easeOut', onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref}>{v}{suffix}</span>;
}

export const Badge = ({ s }) => <span className={'bd ' + s.replace(/\s/g, '').toLowerCase()}>{s}</span>;
