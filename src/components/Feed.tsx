
'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { rtdb } from '@/lib/firebase';

type EmotionCard = {
  id: string;
  userId: string;
  color: string;
  shape?: string;
  sound?: string;
  timestamp: number;
  likes?: number;
};

export default function Feed() {
  const [cards, setCards] = useState<EmotionCard[]>([]);

  useEffect(() => {
    const emotionsRef = ref(rtdb, 'emotions');
    const unsub = onValue(emotionsRef, (snap) => {
      const val = snap.val() || {};
      const list: EmotionCard[] = Object.entries(val).map(([id, v]: any) => ({ id, ...v }));
      setCards(list);
    });
    return () => unsub();
  }, []);

  const recent = useMemo(() => {
    const now = Date.now();
    return cards
      .filter((c) => now - c.timestamp <= 24 * 60 * 60 * 1000)
      .sort((a, b) => b.timestamp - a.timestamp);
  }, [cards]);

  return (
    <section style={{ padding: 16 }}>
      <h2>최근 24시간 카드</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12 }}>
        {recent.map((c) => (
          <div key={c.id} style={{ border: '1px solid #eee', borderRadius: 12, padding: 12 }}>
            <div style={{ height: 80, borderRadius: 8, background: c.color }} />
            <div style={{ marginTop: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <small>{new Date(c.timestamp).toLocaleString()}</small>
              <strong>❤ {c.likes || 0}</strong>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
