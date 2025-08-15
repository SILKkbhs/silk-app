'use client';
import React from 'react';

type Tab = 'feed' | 'write' | 'explore' | 'login';

export default function TabBar({ current }: { current: Tab }) {
  const tabLink = (t: Tab, label: string, extraStyle: React.CSSProperties = {}) => (
    <a
      key={t}
      href={`#${t}`}
      style={{
        padding: '8px 12px',
        borderRadius: 10,
        border: '1px solid #ddd',
        background: current === t ? '#111' : '#fff',
        color: current === t ? '#fff' : '#111',
        textDecoration: 'none',
        ...extraStyle,
      }}
    >
      {label}
    </a>
  );

  return (
    <nav
      style={{
        display: 'flex',
        gap: 8,
        padding: 12,
        position: 'sticky',
        top: 0,
        background: '#fafafa',
        zIndex: 10,
      }}
    >
      {tabLink('feed', 'Feed')}
      {tabLink('write', 'Write')}
      {tabLink('explore', 'Explore')}
      {/* 로그인 버튼만 오른쪽 끝으로 */}
      {tabLink('login', 'Login', { marginLeft: 'auto' })}
    </nav>
  );
}
