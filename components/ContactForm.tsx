"use client";

import { useState } from "react";
import { site } from "@/lib/site";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState("Website");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`New project inquiry from ${name || "website"}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nProject type: ${projectType}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  }

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-brand-purple";

  return (
    <form onSubmit={handleSubmit} className="card space-y-5 rounded-2xl p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-xs font-medium text-white/60">Your name</label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
            placeholder="Jane Silva"
          />
        </div>
        <div>
          <label className="mb-2 block text-xs font-medium text-white/60">Email</label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            placeholder="jane@business.com"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-xs font-medium text-white/60">Project type</label>
        <select
          value={projectType}
          onChange={(e) => setProjectType(e.target.value)}
          className={inputClass}
        >
          <option>Website</option>
          <option>Web / Mobile App</option>
          <option>Graphic / Brand Design</option>
          <option>Digital Marketing</option>
          <option>Something else</option>
        </select>
      </div>

      <div>
        <label className="mb-2 block text-xs font-medium text-white/60">Tell us about your project</label>
        <textarea
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          className={inputClass}
          placeholder="What are you looking to build?"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-full bg-brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-900/30 transition-transform hover:scale-[1.02]"
      >
        Send Message
      </button>
      <p className="text-center text-xs text-white/40">
        This opens your email app with the message pre-filled — nothing is sent automatically.
      </p>
    </form>
  );
}
