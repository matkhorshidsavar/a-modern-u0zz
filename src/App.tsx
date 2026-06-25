import { motion } from 'framer-motion';
import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Markets from './pages/Markets';
import Trade from './pages/Trade';
import CoinDetail from './pages/CoinDetail';
import Wallet from './pages/Wallet';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

const Page = ({ children }: { children: React.ReactNode }) => (
  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
    {children}
  </motion.div>
);

export default function App() {
  return (
    <div className="min-h-screen text-slate-100">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-6">
        <Routes>
          <Route path="/" element={<Page><Home /></Page>} />
          <Route path="/markets" element={<Page><Markets /></Page>} />
          <Route path="/trade/:symbol" element={<Page><Trade /></Page>} />
          <Route path="/coin/:id" element={<Page><CoinDetail /></Page>} />
          <Route path="/wallet" element={<Page><Wallet /></Page>} />
          <Route path="/login" element={<Page><Login /></Page>} />
          <Route path="/signup" element={<Page><Signup /></Page>} />
          <Route path="/settings" element={<Page><Settings /></Page>} />
          <Route path="*" element={<Page><NotFound /></Page>} />
          <Route path="/home" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

