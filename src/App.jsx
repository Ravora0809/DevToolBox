import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AdBanner from './components/common/AdBanner';
import CommandPalette from './components/common/CommandPalette';

// Pages
import HomePage from './components/pages/HomePage';
import ToolsDirectoryPage from './components/pages/ToolsDirectoryPage';
import ToolDetailPage from './components/pages/ToolDetailPage';
import BlogPage from './components/pages/BlogPage';
import AboutPage from './components/pages/AboutPage';
import ContactPage from './components/pages/ContactPage';
import { PrivacyPage, TermsPage } from './components/pages/LegalPages';

export default function App() {
  // Routing state
  const [currentRoute, setCurrentRoute] = useState(() => {
    const hash = window.location.hash.replace('#', '');
    return hash || 'home';
  });

  // Command palette state
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  // Favorites state persisted to localStorage
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('devtoolbox_favorites');
      return saved ? JSON.parse(saved) : ['json-formatter', 'regex-tester', 'uuid-generator'];
    } catch {
      return ['json-formatter', 'regex-tester', 'uuid-generator'];
    }
  });

  // Sync hash routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      setCurrentRoute(hash || 'home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (route) => {
    window.location.hash = route;
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleFavorite = (toolId) => {
    setFavorites(prev => {
      const next = prev.includes(toolId) ? prev.filter(id => id !== toolId) : [...prev, toolId];
      try {
        localStorage.setItem('devtoolbox_favorites', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  // Keyboard shortcut for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Determine current page view
  const renderCurrentView = () => {
    if (currentRoute === 'home') {
      return (
        <HomePage
          onNavigate={navigateTo}
          onOpenCommandPalette={() => setCommandPaletteOpen(true)}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />
      );
    }

    if (currentRoute === 'tools') {
      return (
        <ToolsDirectoryPage
          onNavigate={navigateTo}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />
      );
    }

    if (currentRoute.startsWith('tool-')) {
      const toolId = currentRoute.replace('tool-', '');
      return (
        <ToolDetailPage
          toolId={toolId}
          onNavigate={navigateTo}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />
      );
    }

    if (currentRoute === 'blog') {
      return <BlogPage onNavigate={navigateTo} />;
    }

    if (currentRoute === 'about') {
      return <AboutPage />;
    }

    if (currentRoute === 'contact') {
      return <ContactPage />;
    }

    if (currentRoute === 'privacy') {
      return <PrivacyPage />;
    }

    if (currentRoute === 'terms') {
      return <TermsPage />;
    }

    // Default fallback
    return (
      <HomePage
        onNavigate={navigateTo}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
      />
    );
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Top Banner */}
      <AdBanner slot="header" />

      {/* Global Navbar */}
      <Navbar
        currentRoute={currentRoute}
        onNavigate={navigateTo}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {renderCurrentView()}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Global Cmd+K Search Command Palette */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onSelectTool={(toolId) => navigateTo(`tool-${toolId}`)}
      />
    </div>
  );
}
