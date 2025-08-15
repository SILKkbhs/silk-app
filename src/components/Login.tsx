"use client";

import { useState } from "react";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true); // true면 로그인, false면 회원가입

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          {isLogin ? "로그인" : "회원가입"}
        </h1>

        <input
          type="email"
          placeholder="이메일"
          className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="password"
          placeholder="비밀번호"
          className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* 회원가입 모드일 때만 비밀번호 확인 input 표시 */}
        {!isLogin && (
          <input
            type="password"
            placeholder="비밀번호 확인"
            className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        )}

        <button
          type="button"
          className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition"
        >
          {isLogin ? "로그인" : "회원가입"}
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          {isLogin ? "계정이 없으신가요?" : "이미 계정이 있으신가요?"}{""}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-indigo-600 hover:underline"
          >
            {isLogin ? "회원가입" : "로그인"}
          </button>
        </p>
      </div>
    </div>
  );
}
