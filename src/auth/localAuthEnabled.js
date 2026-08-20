// LOCAL DEV ONLY — single source of truth for whether the Auth0 bypass is active.
//
// BOTH conditions are required. The NODE_ENV check is not belt-and-braces, it is
// load-bearing: Create React App loads `.env.local` for every NODE_ENV except "test"
// (see react-scripts/config/env.js — `.env.local` is only skipped for tests). So a
// plain `npm run build` on a developer machine that has REACT_APP_LOCAL_AUTH=true in
// its gitignored .env.local would otherwise produce a production bundle with all 16
// protected routes unguarded and the real Auth0 login broken.
//
// The server is independently gated on the `local` Spring profile, so no data is
// exposed either way — but the SPA itself must not ship in bypass mode.
const localAuthEnabled =
    process.env.REACT_APP_LOCAL_AUTH === 'true' && process.env.NODE_ENV !== 'production';

export default localAuthEnabled;
