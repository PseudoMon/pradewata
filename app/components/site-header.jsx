import { Link } from 'remix'

export default function SiteHeader() {
  return (
    <header className="site-header">
      <h1><img src="/images/dendro.png" />Pradewata</h1>
      <h2>Proyek penerjemahan ulang 原神 / Genshin Impact</h2>
      <nav>
        <ul>
          <li><Link to="/">Beranda</Link></li>
          <li><Link to="/about">Tentang</Link></li>
          <li><Link to="/characters">Tokoh</Link></li>
          <li><Link to="/terminologies">Istilah</Link></li>
        </ul>
      </nav>
    </header>
  )
}
