import { Link, Outlet, useLoaderData } from 'remix'
import SiteHeader from '~/components/site-header'
import SiteFooter from '~/components/site-footer'
import { getPage } from '~/parse-files'

export function meta() {
  return { title: "Pradewata | Beranda" };
}

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
      { typeof data.text === "string" ? <div 
        className="text" 
        dangerouslySetInnerHTML={{ __html: data.text || ""}} 
      /> : null }

      { typeof data.updates === "string" ? <div 
        className="text" 
        dangerouslySetInnerHTML={{ __html: data.updates || ""}} 
      /> : null }
    </main>

    <SiteFooter />

    </div>
  );
}
