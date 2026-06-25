import { Link } from 'react-router-dom';
const stats = [['کاربر', '1,250,000+'], ['حجم 24h', '$4.8B'], ['کوین', '250+'], ['آخرین به‌روزرسانی', 'همین حالا']];
export default function Home() {
  return (
    <div className="space-y-10">
      <section className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-500/20 via-slate-900 to-slate-950 p-8 md:p-14">
        <h1 className="text-4xl font-black md:text-6xl">صرافی ارز دیجیتال BIT3UN</h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-300">خرید و فروش امن و سریع بیش از ۲۵۰ ارز دیجیتال</p>
        <div className="mt-8 flex gap-3">
          <Link className="rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-white" to="/signup">شروع کنید</Link>
          <Link className="rounded-xl border border-white/15 px-5 py-3 font-semibold" to="/markets">مشاهده بازارها</Link>
        </div>
      </section>
      <section className="grid gap-4 md:grid-cols-4">
        {stats.map(([l, v]) => <div key={l} className="rounded-2xl border border-white/10 bg-slate-900 p-5"><div className="text-sm text-slate-400">{l}</div><div className="mt-2 text-2xl font-bold">{v}</div></div>)}
      </section>
      <section className="rounded-3xl border border-white/10 bg-slate-900 p-6">
        <h2 className="mb-4 text-2xl font-bold">ویژگی‌ها</h2>
        <div className="grid gap-4 md:grid-cols-4"><div>امنیت بالا</div><div>واریز سریع</div><div>پشتیبانی 24/7</div><div>رابط ساده</div></div>
      </section>
    </div>
  );
}

