'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, KeyRound, Mail } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '../../../lib/supabase/client';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const reason = new URLSearchParams(window.location.search).get('error');
    if (reason === 'setup') {
      setError('The Supabase project is not configured yet. Check the app environment variables and database schema.');
    } else if (reason === 'access') {
      setError('This account does not have an active writer or administrator profile.');
    }
  }, []);

  const sendCode = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError('');
    setMessage('');
    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithOtp({
        email: email.trim().toLowerCase(),
        options: { shouldCreateUser: false },
      });
      if (authError) throw authError;
      setCodeSent(true);
      setMessage('Check your email for the one-time login code.');
    } catch (requestError) {
      setError(requestError.message || 'Could not send the login code.');
    } finally {
      setBusy(false);
    }
  };

  const verifyCode = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.verifyOtp({
        email: email.trim().toLowerCase(),
        token: otp.trim(),
        type: 'email',
      });
      if (authError) throw authError;
      router.replace('/admin');
      router.refresh();
    } catch (requestError) {
      setError(requestError.message || 'The code could not be verified.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary-950 via-primary-900 to-slate-900 px-4 py-12">
      <section className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl sm:p-10">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-primary-700 hover:text-primary-950">
          <ArrowLeft size={16} /> Back to website
        </Link>
        <div className="mt-8">
          <span className="inline-flex rounded-full bg-secondary-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-900">
            Editorial workspace
          </span>
          <h1 className="mt-4 font-display text-3xl font-extrabold text-primary-950">
            {codeSent ? 'Enter your login code' : 'Sign in with email'}
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Only email addresses already added to this Supabase project can sign in. No password is needed.
          </p>
        </div>

        <form onSubmit={codeSent ? verifyCode : sendCode} className="mt-8 space-y-5">
          <label className="block text-sm font-semibold text-slate-700">
            Email address
            <span className="relative mt-2 block">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                disabled={codeSent}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-slate-900 outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-100 disabled:opacity-70"
                placeholder="you@example.com"
              />
            </span>
          </label>

          {codeSent && (
            <label className="block text-sm font-semibold text-slate-700">
              One-time code
              <span className="relative mt-2 block">
                <KeyRound size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  required
                  minLength={6}
                  maxLength={8}
                  value={otp}
                  onChange={(event) => setOtp(event.target.value.replace(/\D/g, ''))}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-lg tracking-[0.3em] text-slate-900 outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-100"
                  placeholder="000000"
                />
              </span>
            </label>
          )}

          {message && <p role="status" className="rounded-xl bg-green-50 p-3 text-sm text-green-800">{message}</p>}
          {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-800">{error}</p>}

          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-xl bg-primary-900 px-5 py-3.5 font-bold text-white transition hover:bg-primary-800 disabled:cursor-wait disabled:opacity-60"
          >
            {busy ? 'Please wait…' : codeSent ? 'Verify code and sign in' : 'Email me a one-time code'}
          </button>

          {codeSent && (
            <button
              type="button"
              onClick={() => { setCodeSent(false); setOtp(''); setMessage(''); setError(''); }}
              className="w-full text-sm font-semibold text-primary-700 hover:text-primary-950"
            >
              Use a different email address
            </button>
          )}
        </form>
      </section>
    </main>
  );
}
