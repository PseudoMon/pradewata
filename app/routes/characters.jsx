import { Outlet } from 'remix'
import SiteHeader from '~/components/site-header'
import SiteFooter from '~/components/site-footer'

export default function CharactersPage() {
  return (
    <div>
    <SiteHeader />
    
    <main>
      <Outlet />
    </main>

    <SiteFooter />

    </div>
  );
}
