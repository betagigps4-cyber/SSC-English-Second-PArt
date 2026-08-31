import React, { useState } from 'react';
import { Phone, Mail, Award, BookOpen, GraduationCap, Heart, CheckCircle2, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const [imgError, setImgError] = useState(false);
  const [copiedMobile, setCopiedMobile] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const primaryImage = 'https://i.ibb.co.com/Lz1qrSv4/My-Passport-Photo.png';
  const fallbackImage = 'https://i.imgur.com/akJtZZb.jpeg';

  const copyToClipboard = (text: string, type: 'mobile' | 'email') => {
    navigator.clipboard.writeText(text);
    if (type === 'mobile') {
      setCopiedMobile(true);
      setTimeout(() => setCopiedMobile(false), 2000);
    } else {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-200 border-t-4 border-emerald-600 relative overflow-hidden mt-12">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/40 via-slate-950 to-slate-950 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 relative z-10">
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-sm">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-8">
            {/* Circular Profile Photo */}
            <div className="shrink-0 relative group">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-gradient-to-tr from-amber-400 via-emerald-500 to-teal-400 shadow-xl ring-4 ring-emerald-500/30">
                <img
                  src={imgError ? fallbackImage : primaryImage}
                  alt="Md. Ismail Hossain"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover object-top rounded-full bg-slate-800"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-1 right-1 bg-emerald-600 text-white rounded-full p-1 shadow-md border-2 border-slate-900">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>

            {/* Author Biography and Full Credits */}
            <div className="flex-1 text-center lg:text-left space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>Designer & Developer Profile</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Md. Ismail Hossain
              </h3>

              <div className="text-xs sm:text-sm text-slate-300 font-medium space-y-1">
                <p className="text-emerald-400 font-semibold">
                  Assistant Teacher, Uttar Deshanterkathi GPS
                </p>
                <p className="text-slate-300">
                  <span className="font-semibold text-amber-300">Academic Qualifications:</span> B.A. (Hons), B.Ed., M.A. in English
                </p>
                <p className="text-slate-400 leading-relaxed text-xs sm:text-sm">
                  Specially trained under <span className="text-emerald-300 font-medium">British Council in Bangladesh</span> for Master Trainer of English of Primary education, Betagi Upazilla, Barguna.
                </p>
              </div>

              {/* Exact Developer Statement Text */}
              <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3.5 text-xs text-slate-400 leading-relaxed text-left">
                <p>
                  <strong className="text-slate-200">Official Note:</strong> The page is designed and developed by{' '}
                  <span className="text-emerald-300 font-semibold">Md. Ismail Hossain</span>. Assistant Teacher, Uttar Deshanterkathi GPS. B.A. (Hons) B.Ed. M.A. in English. Specially trained under British Council in Bangladesh for Master Trainer of English of Primary education, Betagi Upazilla, Barguna. Mobile: 01728-295215. E-mail: ismailhossain627@yahoo.com.
                </p>
              </div>

              {/* Quick Contact Badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                <a
                  href="tel:01728295215"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 text-xs sm:text-sm font-semibold transition-all hover:scale-105"
                >
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>01728-295215</span>
                </a>

                <button
                  onClick={() => copyToClipboard('01728295215', 'mobile')}
                  className="px-2.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 border border-slate-700 transition"
                  title="Copy Mobile Number"
                >
                  {copiedMobile ? 'Copied! ✓' : 'Copy Phone'}
                </button>

                <a
                  href="mailto:ismailhossain627@yahoo.com"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 text-xs sm:text-sm font-semibold transition-all hover:scale-105"
                >
                  <Mail className="w-4 h-4 text-indigo-400" />
                  <span>ismailhossain627@yahoo.com</span>
                </a>

                <button
                  onClick={() => copyToClipboard('ismailhossain627@yahoo.com', 'email')}
                  className="px-2.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 border border-slate-700 transition"
                  title="Copy Email Address"
                >
                  {copiedEmail ? 'Copied! ✓' : 'Copy Email'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright and dedication */}
        <div className="mt-8 text-center text-xs text-slate-300 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-800/80 pt-6">
          <p>© 2026 SSC English Second Part. Dedicated to students of Bangladesh.</p>
          <p className="flex items-center gap-1.5 text-slate-300">
            <span>Crafted with pedagogical care & interactive AI technology</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </p>
        </div>
      </div>
    </footer>
  );
};
