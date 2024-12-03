import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Header } from './components/Header';
import { MainContent } from './components/MainContent';
import { EmailPopup } from './components/EmailPopup';
import { EmailAdmin } from './components/EmailAdmin';

function App() {
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault(); // Prevent default browser behavior
        setShowAdmin(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <Helmet>
        <title>Trending Hashtags - Social Media Analytics</title>
        <meta 
          name="description" 
          content="Discover trending hashtags for TikTok and Instagram. Get real-time insights, engagement rates, and emerging opportunities for content creators." 
        />
        <meta name="keywords" content="hashtags, TikTok, Instagram, social media, trending, content creation, engagement rates" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Trending Hashtags - Social Media Analytics" />
        <meta property="og:description" content="Discover trending hashtags for TikTok and Instagram. Get real-time insights, engagement rates, and emerging opportunities for content creators." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Trending Hashtags - Social Media Analytics" />
        <meta name="twitter:description" content="Discover trending hashtags for TikTok and Instagram. Get real-time insights, engagement rates, and emerging opportunities for content creators." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <Header />
          <MainContent />
          {showAdmin && <EmailAdmin />}
        </div>
      </div>
      
      <EmailPopup />
    </>
  );
}

export default App;