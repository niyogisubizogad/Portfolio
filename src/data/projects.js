// projects.js
// Data source for <ProjectCard :project="project" />
// Import this into your projects page/section and v-for over it.

export const projects = [
  {
    name: "AVIS",
    tagline: "AI-powered CV & professional identity platform",
    problem:
      "Job seekers need a way to build, showcase, and share a professional identity that's more dynamic than a static PDF résumé — including proof-of-work artifacts and AI feedback on their profile.",
    role: "Owner & Backend developer",
    // Confirmed: Python (GitHub language badge).
    // TODO: confirm exact framework(s) — e.g. FastAPI/Django/Flask for the API,
    // and whatever you used for the frontend and AI integration — then swap these in.
    stack: ["Python", "REST API", "AI/LLM Integration", "Database","React"],
    github: "https://github.com/niyogado/avis",
    demo: "", // add your live demo URL if you have one
    featured: true,
  },
  {
    name: "Library API",
    tagline: "REST API for library management",
    problem:
      "Libraries need a straightforward backend to manage books, members, and borrowing records that other apps (a frontend, a mobile app) can talk to over HTTP.",
    role: "Owner & backend developer",
    // Confirmed: JavaScript (GitHub language badge).
    // TODO: confirm your actual runtime/framework/db — Node + Express + MongoDB
    // is the common pattern for a JS REST API but swap in what you actually used.
    stack: ["JavaScript", "Node.js", "REST API", "Database"],
    github: "https://github.com/niyogado/library-api",
    demo: "",
    featured: false,
  },
  {
    name: "AgriFlow",
    tagline: "Bitcoin Lightning payments for smallholder farmers",
    problem:
      "Farmers and buyers in Rwanda need a fast, low-fee way to trade and settle agricultural payments without requiring either side to understand crypto — built on top of Mobile Money rails.",
    role: "Api Developer & Backend Engineer",// TODO: name your specific role/folder, e.g. "Backend/API" or "Database + Integration"
    // Confirmed from the repo README: Lightning payments via LND/Polar,
    // Postgres/SQLite storage, and an Android mobile client.
    stack: [
      "next.js",
      "Bitcoin Lightning Network (LND)",
      "Polar",
      "PostgreSQL",
      "SQLite",
      "Android",
      "REST API",
    ],
    github: "https://github.com/JoshuaIT123/AgriFlow",
    demo: "https://agriflow-btc.vercel.app/",
    featured: false,
  }, {
    name: "Qoutes",
    tagline: "Simple quotes viewer",
    problem:
      "A lightweight way to browse and display quotes in the browser — no backend, no build step, just a fast, focused UI.",
    role: "Owner & developer",
    // Confirmed from the repo's file tree: index.html, style.css, script.js —
    // a plain client-side site with no framework or build tooling.
    stack: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/niyogado/qoutes",
    demo: "https://qoutes100.netlify.app/", // add a GitHub Pages / Netlify link if you deploy it
    featured: false,
  },

];