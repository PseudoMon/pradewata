import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "remix";

import normalizeStyles from '~/styles/normalize.css'
import baseStyles from '~/styles/base.css' 

export function meta() {
  return { 
    title: "Pradewata",
    author: "Aliya N. A.",
    description: "Proyek penerjemahan ulang (sebagian) Genshin Impact ke bahasa Indonesia" 
  };
}

export function links() {
  return [
    { 
      rel: "preconnect",
      href: "https://fonts.googleapis.com"
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Gentium+Book+Basic&family=Signika:wght@400;600;700&family=Outfit&family=Signika+Negative&display=swap"
    },
    { rel: "stylesheet", href: normalizeStyles },
    { rel: "stylesheet", href: baseStyles },
  ]
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}
