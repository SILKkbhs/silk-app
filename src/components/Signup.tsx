'use client';
import React, { useState } from "react";
import { auth } from "../components/Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    const emailTrimmed = email.trim();
    const passwordTrimmed = password.trim();
    const confirmTrimmed = confirmPassword.trim();

    // 입력 체크
    if (!emailTrimmed || !passwordTrimmed || !confirmTrimmed) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    // 이메일 형식 체크
    if (!/\S+@\S+\.\S+/.test(emailTrimmed)) {
      alert("올바른 이메일 형식이 아닙니다.");
      return;
    }

    // 비밀번호 길이 체크
    if (passwordTrimmed.length < 6) {
      alert("비밀번호는 최소 6자리 이상이어야 합니다.");
      return;
    }

    // 비밀번호 확인 체크
    if (passwordTrimmed !== confirmTrimmed) {
      alert("비밀번호와 확인이 일치하지 않습니다.");
      return;
    }

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, emailTrimmed, passwordTrimmed);
      alert("회원가입 성공! 로그인 해주세요.");
      window.location.hash = "#login";
    } catch (error: any) {
      alert("회원가입 실패: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 to-pink-400">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">회원가입</h2>

        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <input
          type="password"
          placeholder="비밀번호 (최소 6자리)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <input
          type="password"
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-3 mb-6 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <button
          onClick={handleSignUp}
          disabled={loading}
          className="w-full bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 transition-colors font-semibold"
        >
          {loading ? "가입 중..." : "회원가입"}
        </button>

        <p className="text-center text-gray-500 mt-4">
          이미 계정이 있나요?{" "}
          <a href="#login" className="text-purple-500 font-semibold hover:underline">
            로그인
          </a>
        </p>
      </div>
    </div>
  );
}
