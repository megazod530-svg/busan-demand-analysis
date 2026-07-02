import { FormEvent, useMemo, useState } from 'react';
import { LockKeyhole, LogOut } from 'lucide-react';
import { dashboardHtml } from './dashboardHtml';

const PASSWORD_HASH = '5a2dc9071d885a0c03d8049a6feed7528815d1ebc4c60b953e4f1c6cda0563c4';
const AUTH_STORAGE_KEY = 'busan-demand-dashboard-authenticated';

async function sha256(message: string) {
  const data = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

function AuthGate({ onUnlock }: { onUnlock: () => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isChecking, setIsChecking] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setIsChecking(true);

    try {
      const hash = await sha256(password);
      if (hash === PASSWORD_HASH) {
        localStorage.setItem(AUTH_STORAGE_KEY, 'true');
        onUnlock();
        return;
      }
      setError('비밀번호가 맞지 않습니다.');
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <main className="auth-page">
      <form className="auth-panel" onSubmit={handleSubmit}>
        <div className="auth-icon" aria-hidden="true">
          <LockKeyhole size={28} strokeWidth={1.8} />
        </div>
        <h1>수요 분석 자료</h1>
        <p>비밀번호 입력 후 대시보드를 확인할 수 있습니다.</p>
        <label htmlFor="dashboard-password">비밀번호</label>
        <input
          id="dashboard-password"
          autoFocus
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="비밀번호 입력"
        />
        {error && <div className="auth-error">{error}</div>}
        <button type="submit" disabled={isChecking}>
          <LockKeyhole size={18} strokeWidth={2} />
          {isChecking ? '확인 중' : '접속하기'}
        </button>
      </form>
    </main>
  );
}

function Dashboard() {
  return (
    <div className="protected-dashboard">
      <button
        className="lock-button"
        type="button"
        onClick={() => {
          localStorage.removeItem(AUTH_STORAGE_KEY);
          window.location.reload();
        }}
      >
        <LogOut size={16} strokeWidth={2} />
        잠금
      </button>
      <div dangerouslySetInnerHTML={{ __html: dashboardHtml }} />
    </div>
  );
}

export default function App() {
  const isInitiallyUnlocked = useMemo(() => {
    return localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
  }, []);
  const [isUnlocked, setIsUnlocked] = useState(isInitiallyUnlocked);

  if (!isUnlocked) {
    return <AuthGate onUnlock={() => setIsUnlocked(true)} />;
  }

  return <Dashboard />;
}
