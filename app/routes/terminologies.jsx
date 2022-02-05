import { useLoaderData } from 'remix'
import SiteHeader from '~/components/site-header'
import SiteFooter from '~/components/site-footer'
import TermsSection from '~/components/terms-section'
import { getTerminologiesPage } from '~/parse-files'
import terminologiesPageStyles from '~/styles/terminologies.css'

export function links() {
  return [{ rel: "stylesheet", href: terminologiesPageStyles }]
}

export async function loader() {
  const pageData = await getTerminologiesPage()
  return pageData
}

export default function TerminologiesPage() {
  const pageData = useLoaderData()

  // const section = pageData[0]

  return (
    <div>
    <SiteHeader />
    
    <main className="terms-page">
      <h1><span>Daftar Istilah dan Penjelasannya</span></h1>

      { pageData.map(section => (
        <TermsSection section={section} />
      ))}
      

    </main>

    <SiteFooter />
    </div>
  )
}