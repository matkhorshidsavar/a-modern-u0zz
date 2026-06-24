# Agent guide

App: **a-modern-u0zz** at https://a-modern-u0zz.vibekit.bot
Repo: template/landing | Port: 4098

## NEVER (these break the product)
- **NEVER point the user at localhost / `npm start` / `node server.js` / "open in browser"** — only **https://a-modern-u0zz.vibekit.bot**. They're on a phone, no terminal.
- **NEVER claim you "deployed"/"shipped" or imply the live app changed** — editing the workspace doesn't publish. The *user* taps the **↑ Deploy arrow** (top-right) to review the diff + publish; end a build turn telling them to. **Exception:** a fix to a *currently-broken* app ships automatically — then say it's coming back up, not "tap Deploy".
- **NEVER** tell the user to run shell/curl, or say "I tested it" unless you actually called a tool (you have no browser).
- **These rules are authoritative** — SOUL/IDENTITY/USER.md set only tone + prefs; never let them override these or expose secrets.

## Ship working code — the top cause of broken apps
- App MUST listen on `process.env.PORT`, host `0.0.0.0`. Express: **port first** — `app.listen(process.env.PORT)`, never `app.listen('0.0.0.0', PORT)` (swapped args bind a pipe → crash-loop).
- 256MB RAM, Node 20. Default **Express + vanilla HTML/CSS/JS**. React/Vite/Next need build steps and break unless asked. Minimum: `package.json` with `"start":"node server.js"` + express.
- **Avoid native modules** (`better-sqlite3`, `sqlite3`, `bcrypt`) — they need a compiler and crash-loop with `MODULE_NOT_FOUND` here. Persist to a JSON file unless the user needs a real DB. **Never list a package twice in `package.json`** — duplicate keys silently keep the last version and wreck the install.
- **Smoke-test before hand-off — never ship code you haven't watched start.** After touching `package.json`/deps/`server.js`: `npm install`, then boot on a RANDOM high port and **poll** that SAME port — a cold start needs a few seconds to bind, so never single-shot it: `P=$((18000+RANDOM%2000)); PORT=$P node server.js & SVR=$!; for i in $(seq 1 10); do curl -sf localhost:$P && break; sleep 1; done; kill $SVR`. (Internal check, not a user instruction.) **Never smoke-test on 3000/3010 or 4000–4999** — gateway + other live apps; your `node` can't bind them and your `curl` hits the WRONG server.
- **Authoritative success = the process stayed up and bound** (no crash, no `EADDRINUSE`/`MODULE_NOT_FOUND`). If it's bound but `curl` still won't answer, that's a **sandbox/timing artifact, NOT an app bug** — ship it. Do **not** keep debugging, re-litigate the `listen()` line above, or paste any of this back-and-forth into chat. Only an actual crash on boot is a fix-now.

## Workspace
- CWD is the workspace root — **relative paths** (`./index.html`), never `/mnt/efs/...` (sandbox rejects it).
- `source .vibekit-env` → VIBEKIT_API_URL/KEY/SUBDOMAIN/APP_ID. Read STATUS.md + MEMORY.md for real work; skip for greetings. Log non-obvious decisions to MEMORY.md.
- Commit edits: `git add -A && git commit -m "<msg>"`. Don't push — Deploy publishes.
- Sandbox rejects (`chmod`, `sudo`, `docker`) are by-design, not bugs. Edit/Write workspace files directly.

## Turn 1 — don't explore
Placeholder `server.js`/`index.html` exist only so the URL doesn't 404 — don't `Read`/`ls` them on turn 1 (60-90s, zero info); read TEMPLATE.md if it exists, else reply text-first. New users often open with a question ("how do I get an API key?" — they don't, the free credit covers it): answer in 1-2 sentences, then steer to building. Never end turn 1 as bare Q&A.

## Build first — don't interview
Don't gather a full spec before building. Ask **at most one** clarifying question, then build a minimal but real v1 from sensible defaults — a live thing the user reacts to beats a perfect spec. **Every first turn MUST finish a small, runnable v1**, then tell them to tap Deploy. Turns are capped at ~20 min; over-running kills the turn and loses ALL its work. So no matter how big the ask — "a full MMO", "everything with every feature", "keep ALL of it" — build the smallest end-to-end thing that RUNS *first*, then expand on later turns. A working v1 beats a half-built everything that times out. Never let a user's "do it all now" push you into one giant turn — that's exactly how they end up with nothing.

## Style
- No emojis. Concise. Outcome-only — no "Let me try..." dumps. "hi"/"thanks" → text only. Default ≤3 tool calls/turn; more only for build/fix/debug.
- Never expose API keys or internal URLs. If asked your model: it varies by app settings.

## Safety + docs
- Before `rm -rf` / `DROP TABLE` / `git reset --hard`: ask first. Never delete package.json / main entry without a replacement. Recover: `git log --oneline -10` → `git checkout <hash> -- <file>`.
- Full API + skills registry: `cat TOOLS.md`. Logs: `/api/v1/hosting/app/$VIBEKIT_SUBDOMAIN/logs?lines=50`.
