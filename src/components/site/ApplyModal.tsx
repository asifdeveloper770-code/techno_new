<<<<<<< HEAD
=======
<<<<<<< HEAD
import React, { useState } from 'react';
import { X, Upload, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface ApplyModalProps {
  role: { id: string; title: string } | null;
  onClose: () => void;
}

export function ApplyModal({ role, onClose }: ApplyModalProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!role) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert('Please upload your CV.');

    setSubmitting(true);
    try {
      // 1. Upload CV to storage bucket
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `resumes/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from('resumes')
        .getPublicUrl(filePath);

      // 2. Submit record to applications table
      const { error: dbError } = await supabase.from('applications').insert({
        job_role_id: role.id,
        job_title: role.title,
        full_name: fullName,
        email,
        portfolio_url: portfolioUrl || null,
        resume_url: publicUrlData.publicUrl,
      });

      if (dbError) throw dbError;

      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
      }, 2000);
    } catch (err: any) {
      alert(err.message || 'Error submitting application');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-lg rounded-2xl bg-background p-6 shadow-xl border border-border">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-muted-foreground hover:bg-secondary"
        >
          <X className="size-5" />
        </button>

        <h3 className="text-xl font-semibold">Apply for Role</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Complete the details below to submit your application.
        </p>

        {success ? (
          <div className="my-8 text-center font-medium text-emerald-500">
            Application submitted successfully!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold uppercase text-muted-foreground">
                Job Role
              </label>
              <input
                type="text"
                value={role.title}
                readOnly
                className="mt-1 w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground focus:outline-none cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-muted-foreground">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-muted-foreground">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-muted-foreground">
                Portfolio URL
              </label>
              <input
                type="url"
                placeholder="https://yourportfolio.com"
                value={portfolioUrl}
                onChange={(e) => setPortfolioUrl(e.target.value)}
                className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-muted-foreground">
                Upload CV (PDF, DOCX) *
              </label>
              <div className="mt-1 flex items-center gap-3">
                <input
                  type="file"
                  required
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="w-full text-sm text-muted-foreground file:mr-4 file:rounded-full file:border-0 file:bg-secondary file:px-4 file:py-2 file:font-semibold hover:file:bg-secondary/80"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-medium text-primary-foreground"
              style={{ background: 'var(--gradient-metal)' }}
            >
              {submitting ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <>
                  <Upload className="size-4" /> Submit Application
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
=======
>>>>>>> 997fea8 (Update Technogate website)
import React, { useState } from 'react';
import { X, Upload, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface ApplyModalProps {
  role: { id: string; title: string } | null;
  onClose: () => void;
}

export function ApplyModal({ role, onClose }: ApplyModalProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!role) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert('Please upload your CV.');

    setSubmitting(true);
    try {
      // 1. Upload CV to storage bucket
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `resumes/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from('resumes')
        .getPublicUrl(filePath);

      // 2. Submit record to applications table
      const { error: dbError } = await supabase.from('applications').insert({
        job_role_id: role.id,
        job_title: role.title,
        full_name: fullName,
        email,
        portfolio_url: portfolioUrl || null,
        resume_url: publicUrlData.publicUrl,
      });

      if (dbError) throw dbError;

      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
      }, 2000);
    } catch (err: any) {
      alert(err.message || 'Error submitting application');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-lg rounded-2xl bg-background p-6 shadow-xl border border-border">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-muted-foreground hover:bg-secondary"
        >
          <X className="size-5" />
        </button>

        <h3 className="text-xl font-semibold">Apply for Role</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Complete the details below to submit your application.
        </p>

        {success ? (
          <div className="my-8 text-center font-medium text-emerald-500">
            Application submitted successfully!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold uppercase text-muted-foreground">
                Job Role
              </label>
              <input
                type="text"
                value={role.title}
                readOnly
                className="mt-1 w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground focus:outline-none cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-muted-foreground">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-muted-foreground">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-muted-foreground">
                Portfolio URL
              </label>
              <input
                type="url"
                placeholder="https://yourportfolio.com"
                value={portfolioUrl}
                onChange={(e) => setPortfolioUrl(e.target.value)}
                className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-muted-foreground">
                Upload CV (PDF, DOCX) *
              </label>
              <div className="mt-1 flex items-center gap-3">
                <input
                  type="file"
                  required
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="w-full text-sm text-muted-foreground file:mr-4 file:rounded-full file:border-0 file:bg-secondary file:px-4 file:py-2 file:font-semibold hover:file:bg-secondary/80"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-medium text-primary-foreground"
              style={{ background: 'var(--gradient-metal)' }}
            >
              {submitting ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <>
                  <Upload className="size-4" /> Submit Application
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
<<<<<<< HEAD
=======
>>>>>>> ef1e385 (Update Technogate website)
>>>>>>> 997fea8 (Update Technogate website)
}