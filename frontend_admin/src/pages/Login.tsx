import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, ArrowLeft, Eye, EyeOff, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';

interface LoginProps {
  setIsAuthenticated: (auth: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminUser', JSON.stringify(data.user));
        setIsAuthenticated(true);
        navigate('/dashboard');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-nature-50 to-nature-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div 
        animate={{ y: [-20, 20, -20], rotate: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-20 text-nature-300 opacity-50"
      >
        <Leaf size={120} />
      </motion.div>
      <motion.div 
        animate={{ y: [30, -30, 30], rotate: [0, -15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-20 right-20 text-nature-300 opacity-50"
      >
        <Leaf size={150} />
      </motion.div>
      <div className="absolute top-0 left-0 w-full h-full bg-grid-nature-900/[0.02] bg-[size:32px_32px] pointer-events-none" />

      <Link 
        to="/" 
        className="absolute top-6 left-6 flex items-center gap-2 text-nature-700 hover:text-nature-900 transition-colors font-medium z-10"
      >
        <ArrowLeft size={20} />
        Back to Home
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative z-10"
      >
        <div className="p-8 space-y-8">
          <div className="text-center space-y-2">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-nature-100 text-nature-600 mb-4"
            >
              <Lock size={32} />
            </motion.div>
            <h2 className="text-3xl font-bold text-gray-900">Sign In</h2>
            <p className="text-gray-500">Secure access to HyacinthWatch Admin</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="relative group">
                <Mail className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-nature-500 transition-colors" size={20} />
                <input
                  type="email"
                  placeholder="Admin Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-nature-500 focus:bg-white outline-none transition-all"
                  required
                />
              </div>
              <div className="relative group">
                <Lock className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-nature-500 transition-colors" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-nature-500 focus:bg-white outline-none transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && (
              <motion.p 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-xl border border-red-100"
              >
                {error}
              </motion.p>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-nature-600 to-nature-500 hover:from-nature-700 hover:to-nature-600 text-white rounded-xl font-bold shadow-lg shadow-nature-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Authenticating...
                </span>
              ) : 'Access Dashboard'}
            </motion.button>
          </form>
        </div>
        <div className="p-4 bg-gray-50/50 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-400">Restricted Area &bull; Authorized Personnel Only</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
