'use client';

import { useEffect, useState } from 'react';

export default function Page() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();

      const telegramId = tg.initDataUnsafe.user?.id;

      fetch(`/api/telegram/get-user?telegramId=${telegramId}`)
        .then(res => res.json())
        .then(setUser);
    }
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <main>
      <h1>Welcome</h1>
      <p><b>Telegram ID:</b> {user.telegramId}</p>
      <p><b>Username:</b> @{user.username}</p>
      <p><b>Phone:</b> {user.phone}</p>
    </main>
  );
}
