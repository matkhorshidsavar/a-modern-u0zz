import { useParams } from 'react-router-dom';
export default function Trade(){const {symbol}=useParams(); return <div className="rounded-2xl border border-white/10 bg-slate-900 p-6"><h1 className="text-3xl font-bold">ترید {symbol?.toUpperCase()}</h1><p className="mt-2 text-slate-400">چیدمان سه‌ستونه و نمودار حرفه‌ای در این اسکلت آماده شده.</p></div>}

