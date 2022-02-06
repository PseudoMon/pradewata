import { Link, Outlet, useLoaderData } from 'remix'
import SiteHeader from '~/components/site-header'
import SiteFooter from '~/components/site-footer'
import { getPage } from '~/parse-files'

export async function loader() {
  return await getPage("about")
}

export default function AboutPage() {
  const data = useLoaderData()

  return (
    <div>
    <SiteHeader />
    
    <main className="about">
      <h1>{ data.header }</h1>
      { typeof data.text === "string" ? <div 
        className="text" 
        dangerouslySetInnerHTML={{ __html: data.text || ""}} 
      /> : null }
    </main>

    <SiteFooter />

    </div>
  );
}
