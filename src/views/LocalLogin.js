import {useState} from "react";
import {useDispatch} from "react-redux";
import {setToken} from "../slices/authReducer";

// LOCAL DEV ONLY. Bypasses Auth0 by talking to the server's /api/local-auth/login,
// which only exists when the server runs with the `local` Spring profile active.
// Reachable at #/local-login. Accounts match LocalAuthController on the server.
const ACCOUNTS = [
    {username: "chiefofficer", role: "Admin (Chief Officer)"},
    {username: "accountant", role: "Regular user (Accountant)"},
    {username: "superadmin", role: "Super Admin"},
];

const LocalLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const submit = async (event) => {
        event.preventDefault();
        setError("");
        setLoading(true);
        try {
            const response = await fetch("/api/local-auth/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({username, password}),
            });
            if (!response.ok) {
                setError("Invalid local credentials.");
                return;
            }
            const {token} = await response.json();
            localStorage.setItem("authToken", token);
            dispatch(setToken(token));
            // Hard reload landing on Home (not /dashboard directly) — Home.js is what
            // normally populates the Redux auth slice's token and then redirects to
            // /dashboard; skipping it left several thunks (budgets, metadata) reading
            // an empty token from Redux with no localStorage fallback.
            window.location.hash = "#/";
            window.location.reload();
        } catch (e) {
            setError("Could not reach the server. Is it running with SPRING_PROFILES_ACTIVE=local?");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{maxWidth: 380, margin: "8% auto", fontFamily: "sans-serif", padding: "0 20px"}}>
            <h2 style={{marginBottom: 4}}>Local dev login</h2>
            <p style={{fontSize: 13, color: "#666", marginTop: 0}}>
                Bypasses Auth0 — only works when the server is running with the <code>local</code> profile.
            </p>
            <ul style={{fontSize: 13, color: "#666", paddingLeft: 18}}>
                {ACCOUNTS.map(a => (
                    <li key={a.username}><code>{a.username}</code> — {a.role}</li>
                ))}
            </ul>
            <p style={{fontSize: 13, color: "#666"}}>Password for all seeded accounts: <code>local1234</code></p>
            <p style={{fontSize: 13, color: "#666"}}>
                A user created inside the app can also sign in here — use their <strong>email address</strong> as
                the username, with the same password. Their real password lives in Auth0 and is not known locally.
            </p>
            <form onSubmit={submit} style={{display: "flex", flexDirection: "column", gap: 10}}>
                <input
                    placeholder="username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    style={{padding: 8, fontSize: 14}}
                />
                <input
                    placeholder="password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    style={{padding: 8, fontSize: 14}}
                />
                {error && <p style={{color: "#b00020", fontSize: 13, margin: 0}}>{error}</p>}
                <button type="submit" disabled={loading} style={{padding: "10px 16px", fontSize: 14}}>
                    {loading ? "Signing in…" : "Log in"}
                </button>
            </form>
        </div>
    );
};

export default LocalLogin;
