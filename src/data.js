import { Building2, Home as HomeI, Hammer, HardHat, Ruler, Warehouse, ShieldCheck, Clock, BadgeCheck, Handshake, Lightbulb, Gem } from 'lucide-react';

export const COMPANY = { name: 'IronCrest Constructions', phone: '+91 98765 43210', email: 'hello@ironcrest.in', address: '24, Industrial Estate Road, Madurai, Tamil Nadu 625001', hours: 'Mon – Sat, 9:00 AM – 6:00 PM' };
export const ADMIN = { email: 'admin@ironcrest.in', password: 'Admin@123', name: 'Site Administrator' };
export const CLIENTS = [
  { id: 'c1', name: 'Rahul Menon', email: 'client@demo.com', password: 'Client@123', org: 'Menon Family Trust' },
  { id: 'c2', name: 'Priya Nair', email: 'priya@orchidgroup.in', password: 'Client@123', org: 'Orchid Group' },
  { id: 'c3', name: 'Arjun Das', email: 'arjun@lotusestates.in', password: 'Client@123', org: 'Lotus Estates' },
  { id: 'c4', name: 'Lakshmi Exports', email: 'ops@lakshmiexports.in', password: 'Client@123', org: 'Lakshmi Exports Pvt Ltd' },
];
export const STATUSES = ['Planning', 'In Progress', 'On Hold', 'Completed'];
export const CATEGORIES = ['Residential', 'Commercial', 'Renovation', 'Industrial'];
export const MILESTONES = ['Site mobilisation', 'Foundation & substructure', 'Structural frame', 'MEP & interior finishing', 'Handover & inspection'];

export const PROJECTS0 = [
  { id: 'p1', name: 'Skyline Residency', location: 'Anna Nagar, Madurai', category: 'Residential', status: 'In Progress', progress: 62, clientId: 'c1', hue: 25, kind: 'tower', start: '2025-11-04', end: '2027-02-28',
    updates: [
      { id: 'u1', date: '2026-10-22', by: 'Site Engineer', text: '6th floor slab casting completed. Curing in progress.' },
      { id: 'u2', date: '2026-10-19', by: 'Project Manager', text: 'Electrical conduit layout approved for floors 1–5.' },
      { id: 'u3', date: '2026-10-14', by: 'Safety Officer', text: 'Monthly safety audit passed with zero observations.' },
      { id: 'u4', date: '2026-10-08', by: 'Site Engineer', text: 'Brick masonry started on 4th and 5th floors.' } ] },
  { id: 'p2', name: 'Orchid Business Park', location: 'Tirunelveli Highway', category: 'Commercial', status: 'In Progress', progress: 38, clientId: 'c2', hue: 200, kind: 'mall', start: '2026-01-12', end: '2027-08-30',
    updates: [{ id: 'u5', date: '2026-10-21', by: 'Site Engineer', text: 'Column reinforcement completed for Block B.' }, { id: 'u6', date: '2026-10-15', by: 'Project Manager', text: 'Steel delivery for the atrium roof received.' }] },
  { id: 'p3', name: 'Lotus Villa Estate', location: 'K. Pudur, Madurai', category: 'Residential', status: 'Completed', progress: 100, clientId: 'c3', hue: 150, kind: 'house', start: '2024-06-10', end: '2026-08-15',
    updates: [{ id: 'u7', date: '2026-08-15', by: 'Project Manager', text: 'Final inspection cleared. Keys handed over.' }] },
  { id: 'p4', name: 'Heritage Mansion Revival', location: 'Teppakulam, Madurai', category: 'Renovation', status: 'Planning', progress: 8, clientId: '', hue: 340, kind: 'house', start: '2026-11-15', end: '2027-06-30',
    updates: [{ id: 'u8', date: '2026-10-18', by: 'Chief Architect', text: 'Heritage structural survey completed.' }] },
  { id: 'p5', name: 'Steelworks Logistics Hub', location: 'Melur Industrial Zone', category: 'Industrial', status: 'On Hold', progress: 21, clientId: 'c4', hue: 45, kind: 'crane', start: '2026-03-02', end: '2027-04-20',
    updates: [{ id: 'u9', date: '2026-10-10', by: 'Project Manager', text: 'Work paused pending pollution board clearance.' }] },
  { id: 'p6', name: 'Lakeview Apartments', location: 'Vandiyur, Madurai', category: 'Residential', status: 'In Progress', progress: 74, clientId: '', hue: 190, kind: 'tower', start: '2025-07-21', end: '2026-12-20',
    updates: [{ id: 'u10', date: '2026-10-20', by: 'Site Engineer', text: 'Plastering completed up to 9th floor.' }] },
];
export const ACTIVITY0 = [
  { id: 'a1', text: 'Daily update posted for Skyline Residency', time: 'Today, 9:40 AM' },
  { id: 'a2', text: 'Lotus Villa Estate marked as Completed', time: '15 Aug 2026' },
  { id: 'a3', text: 'Client Priya Nair assigned to Orchid Business Park', time: '12 Oct 2026' },
];

const G = [
  ['Skyline Residency', 'Residential', 25, 'tower', 'Anna Nagar'], ['Orchid Business Park', 'Commercial', 200, 'mall', 'Tirunelveli Highway'],
  ['Lotus Villa Estate', 'Residential', 150, 'house', 'K. Pudur'], ['Heritage Mansion Revival', 'Renovation', 340, 'house', 'Teppakulam'],
  ['Steelworks Logistics Hub', 'Industrial', 45, 'crane', 'Melur'], ['Lakeview Apartments', 'Residential', 190, 'tower', 'Vandiyur'],
  ['Central Plaza Tower', 'Commercial', 260, 'tower', 'Goripalayam'], ['Old Town Library Restoration', 'Renovation', 20, 'mall', 'Simmakkal'],
  ['Precision Components Factory', 'Industrial', 215, 'crane', 'Kappalur'], ['Palm Grove Villas', 'Residential', 95, 'house', 'Thirupparankundram'],
  ['TechNest Office Campus', 'Commercial', 175, 'mall', 'Ilandhaikulam'], ['Temple Street Shopfronts', 'Renovation', 10, 'house', 'East Masi Street'],
];
export const GALLERY = G.map(([title, cat, hue, kind, loc], i) => ({ id: i, title, cat, hue, kind, loc, year: 2019 + (i % 8), desc: `A completed ${cat.toLowerCase()} project in ${loc}, delivered with certified materials, strict safety practice and on-time handover.` }));
export const CATS = ['All', ...CATEGORIES];

export const SERVICES = [
  { i: Building2, t: 'Commercial Construction', d: 'Offices, retail and mixed-use complexes delivered on schedule.' },
  { i: HomeI, t: 'Residential Projects', d: 'Villas, apartments and gated communities built to last.' },
  { i: Hammer, t: 'Renovation & Restoration', d: 'Structural upgrades and heritage revival with minimal disruption.' },
  { i: Warehouse, t: 'Industrial Buildings', d: 'Factories, warehouses and logistics hubs engineered for load.' },
  { i: Ruler, t: 'Design & Planning', d: 'Architectural drawings, estimation and statutory approvals.' },
  { i: HardHat, t: 'Project Management', d: 'End-to-end supervision with transparent daily reporting.' },
];
export const WHY = [
  { i: ShieldCheck, t: 'Safety First', d: 'A zero-incident culture backed by daily toolbox talks and audits.' },
  { i: Clock, t: 'On-Time Delivery', d: 'Milestone-driven planning keeps every project on schedule.' },
  { i: BadgeCheck, t: 'Certified Quality', d: 'Tested materials and multi-stage quality inspections.' },
  { i: Handshake, t: 'Transparent Partnership', d: 'Clients see real-time progress through a private portal.' },
];
export const PROCESS = [
  ['Consultation', 'We understand your vision, budget and site.'], ['Design & Estimate', 'Detailed drawings and a transparent quotation.'],
  ['Approvals', 'We handle permits and statutory clearances.'], ['Construction', 'Supervised build with daily progress updates.'], ['Handover', 'Final inspection, documentation and after-care.'],
];
export const STATS = [[250, '+', 'Projects Delivered'], [18, '', 'Years of Experience'], [140, '+', 'Skilled Professionals'], [98, '%', 'Client Satisfaction']];
export const TESTIMONIALS = [
  { n: 'Dr. S. Ramesh', r: 'Villa Owner', t: 'IronCrest delivered our villa two weeks early with flawless finishing. The daily updates gave us complete peace of mind.' },
  { n: 'Meenakshi Textiles', r: 'Commercial Client', t: 'Professional, safe and transparent. Our showroom was ready exactly as promised and within budget.' },
  { n: 'K. Balasubramanian', r: 'Heritage Home Owner', t: 'They restored our ancestral home with real respect for its character. Outstanding craftsmanship.' },
];
export const TEAM = [
  { n: 'Karthik Subramanian', r: 'Founder & Managing Director', h: 25 }, { n: 'Anitha Rajan', r: 'Chief Architect', h: 200 },
  { n: 'Vijay Kumar', r: 'Head of Projects', h: 150 }, { n: 'Divya Prakash', r: 'Safety & Quality Lead', h: 340 },
];
export const VALUES = [
  { i: Gem, t: 'Craftsmanship', d: 'Every joint, finish and detail is built to be proud of.' }, { i: ShieldCheck, t: 'Safety', d: 'Nothing is more important than every person going home safe.' },
  { i: Handshake, t: 'Integrity', d: 'Honest quotes, honest timelines, honest communication.' }, { i: Lightbulb, t: 'Innovation', d: 'Modern methods and materials for smarter, greener buildings.' },
];
