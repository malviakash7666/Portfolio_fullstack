import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser, getMe } from "../service/authService";

interface Props {
  onClose: () => void;
}

function LoginRegisterModal({ onClose }: Props) {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    username: "",
  });

  // ── Auth guard: already logged in → go straight to their portfolio ──
  useEffect(() => {
    const check = async () => {
      try {
        const data = await getMe();
        // data should have a `username` field from your API
        const username = data?.username || data?.user?.username;
        onClose();
        navigate(`/user/${username}`);
      } catch {
        // Not logged in → show the modal
        setCheckingAuth(false);
        setTimeout(() => setMounted(true), 50);
      }
    };
    check();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async () => {
  setError("");

  if (!form.email || !form.password) {
    setError("Email and password are required.");
    return;
  }

  if (!isLogin && (!form.name || !form.username)) {
    setError("Name and username are required.");
    return;
  }

  setLoading(true);

  try {
    if (isLogin) {
      await loginUser({ email: form.email, password: form.password });
    } else {
      await registerUser(form);
    }

    // 🔥 Always fetch user after login/register
    const user = await getMe();

    onClose();
    navigate(`/user/${user.username}`);

  } catch (err: any) {
    setError(err.response?.data?.message || "Something went wrong.");
  } finally {
    setLoading(false);
  }
};

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

  // Still verifying session — render nothing to avoid flash
  if (checkingAuth) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
        mounted ? "bg-black/60 backdrop-blur-sm" : "bg-transparent"
      }`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Card */}
      <div
        className={`relative w-full max-w-sm mx-4 bg-neutral-950 border border-neutral-800 transition-all duration-500 ${
          mounted
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-6 scale-95"
        }`}
      >
        {/* Top amber line */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

        {/* Corner accents */}
        <span className="absolute top-0 left-0 w-4 h-4 border-t border-l border-amber-400/60" />
        <span className="absolute top-0 right-0 w-4 h-4 border-t border-r border-amber-400/60" />
        <span className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-amber-400/20" />
        <span className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-amber-400/20" />

        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <p className="text-amber-400 font-mono text-[10px] tracking-[0.3em] uppercase mb-2">
              {isLogin ? "Welcome back" : "Get started"}
            </p>
            <h2 className="text-neutral-100 text-2xl font-light tracking-tight">
              {isLogin ? "Sign in to your account" : "Create your account"}
            </h2>
          </div>

          {/* Toggle tabs */}
          <div className="flex mb-8 border border-neutral-800">
            <button
              onClick={() => { setIsLogin(true); setError(""); }}
              className={`flex-1 py-2 font-mono text-xs tracking-widest uppercase transition-all duration-300 ${
                isLogin
                  ? "bg-amber-400 text-neutral-950"
                  : "text-neutral-500 hover:text-neutral-300"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => { setIsLogin(false); setError(""); }}
              className={`flex-1 py-2 font-mono text-xs tracking-widest uppercase transition-all duration-300 ${
                !isLogin
                  ? "bg-amber-400 text-neutral-950"
                  : "text-neutral-500 hover:text-neutral-300"
              }`}
            >
              Register
            </button>
          </div>

          {/* Fields */}
          <div className="flex flex-col gap-3" onKeyDown={handleKeyDown}>
            {!isLogin && (
              <>
                <div>
                  <label className="text-neutral-600 font-mono text-[10px] tracking-widest uppercase block mb-1.5">
                    Full Name
                  </label>
                  <input
                    name="name"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full bg-neutral-900 border border-neutral-800 text-neutral-200 font-mono text-sm px-4 py-3 placeholder-neutral-700 focus:outline-none focus:border-amber-400/60 transition-colors duration-200"
                  />
                </div>
                <div>
                  <label className="text-neutral-600 font-mono text-[10px] tracking-widest uppercase block mb-1.5">
                    Username
                  </label>
                  <input
                    name="username"
                    placeholder="johndoe"
                    value={form.username}
                    onChange={handleChange}
                    className="w-full bg-neutral-900 border border-neutral-800 text-neutral-200 font-mono text-sm px-4 py-3 placeholder-neutral-700 focus:outline-none focus:border-amber-400/60 transition-colors duration-200"
                  />
                </div>
              </>
            )}

            <div>
              <label className="text-neutral-600 font-mono text-[10px] tracking-widest uppercase block mb-1.5">
                Email
              </label>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                className="w-full bg-neutral-900 border border-neutral-800 text-neutral-200 font-mono text-sm px-4 py-3 placeholder-neutral-700 focus:outline-none focus:border-amber-400/60 transition-colors duration-200"
              />
            </div>

            <div>
              <label className="text-neutral-600 font-mono text-[10px] tracking-widest uppercase block mb-1.5">
                Password
              </label>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                className="w-full bg-neutral-900 border border-neutral-800 text-neutral-200 font-mono text-sm px-4 py-3 placeholder-neutral-700 focus:outline-none focus:border-amber-400/60 transition-colors duration-200"
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mt-4 flex items-center gap-2 border border-red-500/20 bg-red-500/5 px-4 py-2.5">
              <span className="w-1 h-1 rounded-full bg-red-400 shrink-0" />
              <p className="text-red-400 font-mono text-xs">{error}</p>
            </div>
          )}

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="group relative w-full mt-6 bg-amber-400 text-neutral-950 font-mono text-xs tracking-widest uppercase py-3.5 overflow-hidden transition-all duration-300 hover:bg-amber-300 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <span className="w-3.5 h-3.5 border border-neutral-950/40 border-t-neutral-950 rounded-full animate-spin" />
                  {isLogin ? "Signing in..." : "Creating account..."}
                </>
              ) : (
                isLogin ? "Sign In →" : "Create Account →"
              )}
            </span>
            {/* Shine sweep */}
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
          </button>

          {/* Footer row */}
          <div className="flex items-center justify-between mt-6">
            <p className="text-neutral-600 font-mono text-[10px]">
              {isLogin ? "No account?" : "Have an account?"}
              <button
                onClick={() => { setIsLogin(!isLogin); setError(""); }}
                className="text-amber-400/80 hover:text-amber-400 ml-1.5 transition-colors duration-200 underline underline-offset-2"
              >
                {isLogin ? "Register" : "Sign in"}
              </button>
            </p>
            <button
              onClick={onClose}
              className="text-neutral-700 hover:text-neutral-400 font-mono text-[10px] tracking-widest uppercase transition-colors duration-200"
            >
              ✕ Close
            </button>
          </div>
        </div>

        {/* Bottom amber line */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />
      </div>
    </div>
  );
}

export default LoginRegisterModal;