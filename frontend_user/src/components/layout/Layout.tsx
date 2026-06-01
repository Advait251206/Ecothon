import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Leaf, Map, Camera, LayoutDashboard, Menu } from 'lucide-react';
import { Button } from '../common/Button';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        isHome && !isScrolled 
          ? "bg-transparent border-transparent py-6" 
          : "bg-nature-950/80 backdrop-blur-md border-nature-800 py-3"
      )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <motion.div
               animate={{ rotate: [0, 5, -5, 0] }}
               transition={{ duration: 4, repeat: Infinity, repeatDelay: 1 }}
               className="bg-nature-800 p-2 rounded-xl group-hover:bg-nature-700 transition-colors"
            >
              <Leaf className="w-6 h-6 text-nature-400 fill-nature-400" />
            </motion.div>
          </div>
          <div>
             <span className="text-xl font-bold text-white block leading-none">
                HyacinthWatch
             </span>
             <span className="text-[10px] text-nature-400 tracking-wider uppercase font-medium">
                Sustain & Monitor
             </span>
          </div>
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
           <NavLink to="/" label="Home" active={location.pathname === '/'} />
           <NavLink to="/map" label="Live Map" active={location.pathname === '/map'} />
           <NavLink to="/dashboard" label="Government Data" active={location.pathname === '/dashboard'} />
           <Link to="/report">
             <Button size="sm" className="bg-nature-400 text-nature-950 hover:bg-nature-300 font-semibold rounded-full px-6">
               Submit Report
             </Button>
           </Link>
        </div>

        <div className="md:hidden">
           <Button variant="ghost" size="sm" className="text-white hover:bg-nature-800">
             <Menu className="w-6 h-6" />
           </Button>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, label, active }: { to: string, label: string, active: boolean }) => (
  <Link 
    to={to} 
    className={cn(
      "text-sm font-medium transition-colors hover:text-nature-300",
      active ? "text-nature-400" : "text-nature-100/70"
    )}
  >
    {label}
  </Link>
);

const BottomNav = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    { path: '/map', icon: Map, label: 'Map' },
    { path: '/report', icon: Camera, label: 'Report' },
    { path: '/dashboard', icon: LayoutDashboard, label: 'Admin' },
  ];

  return (
    <div className="md:hidden fixed bottom-4 left-4 right-4 z-50">
      <div className="glass-panel bg-nature-950/90 backdrop-blur-xl border-nature-800 rounded-2xl shadow-xl shadow-black/20 p-1 flex justify-around items-center h-16">
        {navItems.map((item) => (
          <Link to={item.path} key={item.path} className="relative w-full h-full flex flex-col items-center justify-center rounded-xl overflow-hidden group">
            {isActive(item.path) && (
               <motion.div
                 layoutId="nav-pill"
                 className="absolute inset-0 bg-nature-800"
                 transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
               />
            )}
            <div className={`relative z-10 flex flex-col items-center gap-1 transition-colors ${isActive(item.path) ? 'text-nature-300' : 'text-nature-500 group-hover:text-nature-400'}`}>
              <item.icon className={isActive(item.path) ? 'fill-current' : ''} size={22} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

import { Footer } from './Footer';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen bg-nature-50 font-sans text-nature-900 pb-20 md:pb-0 flex flex-col">
      <Navbar />
      <main className={cn(
        "animate-fade-in relative z-0 flex-grow",
        !isHome && "pt-24" // Add top padding only for non-home pages to account for fixed navbar
      )}>
         {children}
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
};
