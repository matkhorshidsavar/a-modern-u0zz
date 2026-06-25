import { useParams } from 'react-router-dom';
export default function CoinDetail(){const {id}=useParams(); return <div className="rounded-2xl border border-white/10 bg-slate-900 p-6"><h1 className="text-3xl font-bold">جزئیات {id}</h1></div>}

