import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link to="/" className="font-bold text-emerald-400">BIT3UN</Link>
        <nav className="flex gap-4 text-sm text-slate-300">
          <NavLink to="/markets">بازارها</NavLink>
          <NavLink to="/wallet">کیف پول</NavLink>
          <NavLink to="/settings">تنظیمات</NavLink>
        </nav>
      </div>
    </header>
  );
}

