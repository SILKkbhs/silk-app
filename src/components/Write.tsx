
'use client';
import React, { useEffect, useRef, useState } from 'react';
import { ref, set } from 'firebase/database';
import { rtdb } from '@/lib/firebase';

export default function Write() {
  const [userId, setUserId] = useState<string>('');
  const [color, setColor] = useState<string>('#ff8aa1');
  const [shape, setShape] = useState<string>('circle');
  const [sound, setSound] = useState<string>('ding');

  useEffect(() => {
    const saved = localStorage.getItem('currentUser') || '';
    setUserId(saved);
  }, []);

  const onSave = async () => {
    if (!userId) {
      alert('로그인이 필요합니다. (임시: 상단 입력으로 userId 저장)');
      return;
    }
    const id = `${userId}_${Date.now()}`;
    await set(ref(rtdb, `emotions/${id}`), {
      id,
      userId,
      color,
      shape,
      sound,
      timestamp: Date.now(),
      likes: 0,
    });
    alert('저장 완료! Feed 탭에서 확인해보세요.');
  };

  return (
    <section style={{ padding: 16 }}>
      <h2>감정 카드 작성</h2>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <label>임시 로그인 ID: <input value={userId} onChange={(e) => { setUserId(e.target.value); localStorage.setItem('currentUser', e.target.value); }} placeholder="예: kbhs_jsw" /></label>
        <label>색상: <input type="color" value={color} onChange={(e) => setColor(e.target.value)} /></label>
        <label>모양:
          <select value={shape} onChange={(e) => setShape(e.target.value)}>
            <option value="circle">원</option>
            <option value="triangle">삼각형</option>
            <option value="square">사각형</option>
          </select>
        </label>
        <label>소리:
          <select value={sound} onChange={(e) => setSound(e.target.value)}>
            <option value="ding">ding</option>
            <option value="bubble">bubble</option>
            <option value="chime">chime</option>
          </select>
        </label>
        <button onClick={onSave} style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #ddd' }}>저장</button>
      </div>

      <div style={{ marginTop: 16, display: 'flex', gap: 16, alignItems: 'center' }}>
        <div style={{ width: 160, height: 120, borderRadius: 12, background: color, display: 'grid', placeItems: 'center' }}>
          <span style={{ color: '#fff', fontWeight: 700 }}>{shape}</span>
        </div>
        <audio controls src={`/sounds/${sound}.mp3`} />
      </div>
    </section>
  );
}
