import { Outlet } from 'remix'
import SiteHeader from '~/components/site-header'

export default function CharactersPage() {
  return (
    <div>
    <SiteHeader />
    
    <main>
      <Outlet />
    </main>

    </div>
  );
}
