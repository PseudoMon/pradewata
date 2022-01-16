import { Link, Outlet, useLoaderData } from 'remix'
import SiteHeader from '~/components/site-header'
import { getPage } from '~/parse-files'

export async function loader() {
  return await getPage("homepage")
}

export default function Index() {
  const data = useLoaderData()

  return (
    <div>
    <SiteHeader />
    
    <main className="homepage">
      <h1>{ data.header }</h1>
      <div 
        className="text" 
        dangerouslySetInnerHTML={{ __html: data.text }} 
      />
    </main>

    </div>
  );
}
