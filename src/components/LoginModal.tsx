import { useState } from "react";
import { Mail, Lock } from "lucide-react";

export interface LoginUser {
  name: string;
  email: string;
  role: 'employee' | 'manager';
}

interface LoginModalProps {
  onLogin: (user: LoginUser) => void;
}

export function LoginModal({ onLogin }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    setError("");

    // Simple client-side validation (no backend)
    if (!email.trim() || !password.trim()) {
      setError("Please enter email and password.");
      return;
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Determine role based on email
    let role: 'employee' | 'manager' = 'employee';
    if (email.toLowerCase().includes('saif')) {
      role = 'manager';
    }

    const user: LoginUser = { 
      name: email.split('@')[0], 
      email, 
      role 
    };

    try {
      localStorage.setItem("user", JSON.stringify(user));
      onLogin(user);
    } catch (_e) {
      setError("Unable to save login.");
    }
  };

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-modal-title"
    >
      <div className="w-full max-w-[380px] rounded-2xl bg-white p-8 shadow-[0_10px_30px_rgba(147,51,234,0.3)] animate-scale">
        <h2
          id="login-modal-title"
          className="mb-4 text-center text-2xl font-extrabold bg-gradient-to-br from-[#9333ea] to-[#7c3aed] bg-clip-text text-transparent"
        >
          Sign In
        </h2>

        {error && (
          <p className="mb-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}

        <div className="mb-4 relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9333ea]" size={18} />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full rounded-lg border border-[#d6b8ff] px-4 pl-11 py-3 text-base outline-none transition focus:border-[#9333ea] focus:shadow-[0_0_5px_rgba(147,51,234,0.4)]"
            aria-label="Email"
          />
        </div>

        <div className="mb-6 relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9333ea]" size={18} />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-lg border border-[#d6b8ff] px-4 pl-11 py-3 text-base outline-none transition focus:border-[#9333ea] focus:shadow-[0_0_5px_rgba(147,51,234,0.4)]"
            aria-label="Password"
          />
        </div>

        <button
          onClick={handleLogin}
          className="mb-3 w-full transform rounded-lg bg-gradient-to-br from-[#9333ea] to-[#7c3aed] px-4 py-3 text-base font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(147,51,234,0.4)]"
        >
          Sign In
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Demo: Use any email to login
        </p>
      </div>

      <style>{`
        /* small scale animation similar to your popup keyframes */
        .animate-scale {
          animation: popup 0.28s ease;
        }
        @keyframes popup {
          from {
            transform: scale(0.96);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

