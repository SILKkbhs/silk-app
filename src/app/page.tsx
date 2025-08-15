
'use client';
import React, { useEffect, useState } from 'react';
import TabBar from '@/components/TabBar';
import Feed from '@/components/Feed';
import Write from '@/components/Write';
import Explore from '@/components/Explore';
import LoginPage from '@/components/Login';


type Tab = 'feed' | 'write' | 'explore | login'

export default function Page() {
  const [tab, setTab] = useState<Tab>('feed');

  useEffect(() => {
    const initial = (location.hash.replace('#','') || 'feed') as Tab;
    setTab(initial);
    const onHash = () => {
      const next = (location.hash.replace('#','') || 'feed') as Tab;
      setTab(next);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  return (
    <main style={{ maxWidth: 960, margin: '0 auto' }}>
      <TabBar current = {tab} />
      {tab === 'feed' && <Feed />}
      {tab === 'write' && <Write />}
      {tab === 'explore' && <Explore />}
      {tab === 'login' && <LoginPage />}
    </main>
  );
}
