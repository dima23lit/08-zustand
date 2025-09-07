'use client';

import Link from 'next/link';
import css from '@/app/not-found.module.css'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
  alternates: {
    canonical: "https://yourdomain.com/not-found", // 🔑 абсолютний URL
  },
  openGraph: {
    title: "404 - Page Not Found",
    description: "The page you are looking for does not exist.",
    url: "https://yourdomain.com/not-found", // 🔑 обовʼязково абсолютний URL
    images: [
      {
        url: "https://via.placeholder.com/1200x630.png?text=404", // 🔑 справжня картинка
        width: 1200,
        height: 630,
        alt: "404 - Not Found",
      },
    ],
  },
};

const NotFound = () => {
  return (
      <div className={css.container}>
          <h1 className={css.title}>404 - Page not found</h1>
          <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
          <Link href="/">Go back home</Link>
    </div>
  );
};

export default NotFound;