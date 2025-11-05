'use client';
import * as React from 'react';

export default function Providers({ children }: { children: React.ReactNode }) {
  // اگر بعداً Dark Mode یا Toaster خواستی، همین‌جا اضافه می‌کنیم.
  return <>{children}</>;
}
