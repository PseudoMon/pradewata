import { NavLink } from 'remix'

export default function SiteHeader() {
  return (
    <header className="site-header">
      <h1><img src="/images/dendro.png" />Pradewata</h1>
      <h2>Proyek penerjemahan ulang 原神 / Genshin Impact</h2>
      <nav>
        <ul>
          <li><NavLink to="/">Beranda</NavLink></li>
          <li><NavLink to="/about">Tentang</NavLink></li>
          <li><NavLink to="/characters">Tokoh</NavLink></li>
          <li><NavLink to="/terminologies">Istilah</NavLink></li>
        </ul>
      </nav>
    </header>
  )
}
