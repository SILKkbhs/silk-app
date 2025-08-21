'use client';
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../components/Firebase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const emailTrimmed = email.trim();
    const passwordTrimmed = password.trim();

    if (!emailTrimmed || !passwordTrimmed) {
      setError('이메일과 비밀번호를 모두 입력해주세요.');
      setLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, emailTrimmed, passwordTrimmed);
      alert('로그인 성공!');
      window.location.href = '/';
    } catch (err: any) {
      console.error(err);
      setError('로그인 실패: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 to-pink-400">
      <form 
        onSubmit={handleLogin} 
        className="bg-white p-8 rounded-2xl shadow-xl w-96"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">로그인</h2>

        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-3 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        {error && (
          <p className="text-red-500 mb-4">{error}</p>
        )}

        <button 
          type="submit" 
          disabled={loading} 
          className="w-full bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 transition-colors font-semibold"
        >
          {loading ? '로그인 중...' : '로그인'}
        </button>

        <p className="text-center text-gray-500 mt-4">
          계정이 없으신가요?{" "}
          <a href="#signup" className="text-purple-500 font-semibold hover:underline">
            회원가입
          </a>
        </p>
      </form>
    </div>
  );
}
