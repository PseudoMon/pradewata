import { Link } from 'remix'

export default function SiteFooter() {
    return (
      <footer class="site-footer">
        <ul class="footer-links">
          <li><Link to="/about">Tentang</Link></li>
          <li><a target="_blank" href="https://github.com/PseudoMon/pradewata">GitHub Source Code</a></li>
          <li><a target="_blank" href="https://twitter.com/PseudoMonious">Twitter Pembuat</a></li>
        </ul>

        <p>Proyek Pradewata adalah sepenuhnya proyek <em>fanmade</em> dan tidak berafiliasi dengan miHoYo</p>
        <p>Berbagai tulisan dalam website ini, selain yang merupakan milik miHoYo, dilisensikan di bawah <a target="_blank" href="http://creativecommons.org/licenses/by-nc/4.0/">CC BY-NC 4.0.</a></p>
      </footer>
    )
}