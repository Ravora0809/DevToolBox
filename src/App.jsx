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
import { PrivacyPage, TermsPage, DisclaimerPage } from './components/pages/LegalPages';

import { TOOLS } from './data/tools';
import { BLOG_POSTS } from './data/blogs';

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

  // Dynamic SEO meta tags and titles
  useEffect(() => {
    let title = 'DevToolBox - Essential Developer Utilities';
    let description = 'Fast browser-based developer utilities: JSON formatter, regex tester, Base64 encoder, UUID generator, and HTML formatter.';
    let canonical = `https://devtoolbox.io/#${currentRoute}`;

    if (currentRoute === 'home') {
      title = 'DevToolBox - Fast & Accessible Developer Utilities';
      description = 'Free, fast, and accessible developer tools for daily engineering workflows. Formatter, encoder, regex tester, and generators.';
    } else if (currentRoute === 'tools') {
      title = 'All Developer Tools Directory - DevToolBox';
      description = 'Browse all 11+ browser-based utilities including JSON formatters, Base64 encoders, UUID generators, and Regex testers.';
    } else if (currentRoute.startsWith('tool-')) {
      const toolId = currentRoute.replace('tool-', '');
      const tool = TOOLS.find(t => t.id === toolId);
      if (tool) {
        title = `${tool.metaTitle || tool.name + ' - DevToolBox'}`;
        description = tool.metaDescription || tool.description;
      }
    } else if (currentRoute.startsWith('blog-')) {
      const slug = currentRoute.replace('blog-', '');
      const post = BLOG_POSTS.find(p => p.slug === slug || p.id === slug);
      if (post) {
        title = `${post.title} - DevToolBox Guides`;
        description = post.summary;
      }
    } else if (currentRoute === 'blog') {
      title = 'Developer Articles & Technical Guides - DevToolBox';
      description = 'In-depth engineering articles on JSON standards, Regular Expressions, Base64 serialization, Unix timestamps, and TypeScript compilers.';
    } else if (currentRoute === 'about') {
      title = 'About & Engineering Standards - DevToolBox';
      description = 'Learn about DevToolBox architecture, browser-local execution, and our commitment to fast developer tools.';
    } else if (currentRoute === 'contact') {
      title = 'Contact & Tool Requests - DevToolBox';
      description = 'Request a new developer utility or report formatting inaccuracies to the DevToolBox team.';
    } else if (currentRoute === 'privacy') {
      title = 'Privacy Policy - DevToolBox';
      description = 'DevToolBox privacy policy and data processing architecture.';
    } else if (currentRoute === 'terms') {
      title = 'Terms of Service - DevToolBox';
      description = 'Terms and acceptable usage conditions for DevToolBox utilities.';
    } else if (currentRoute === 'disclaimer') {
      title = 'Disclaimer - DevToolBox';
      description = 'Disclaimer of warranties and accuracy for DevToolBox developer utilities.';
    }

    document.title = title;

    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    }

    // Update Open Graph
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);

    // Update canonical link
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (canonicalTag) {
      canonicalTag.setAttribute('href', canonical);
    }
  }, [currentRoute]);

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

    if (currentRoute.startsWith('blog-')) {
      const slug = currentRoute.replace('blog-', '');
      return <BlogPage onNavigate={navigateTo} initialSlug={slug} />;
    }

    if (currentRoute === 'blog') {
      return <BlogPage onNavigate={navigateTo} />;
    }

    if (currentRoute === 'about') {
      return <AboutPage onNavigate={navigateTo} />;
    }

    if (currentRoute === 'contact') {
      return <ContactPage onNavigate={navigateTo} />;
    }

    if (currentRoute === 'privacy') {
      return <PrivacyPage onNavigate={navigateTo} />;
    }

    if (currentRoute === 'terms') {
      return <TermsPage onNavigate={navigateTo} />;
    }

    if (currentRoute === 'disclaimer') {
      return <DisclaimerPage onNavigate={navigateTo} />;
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
