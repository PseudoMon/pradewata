import { Link, Outlet, useLoaderData } from 'remix'
import SiteHeader from '~/components/site-header'
import { getCharacterList } from '~/parse-files'
import charaListStyles from '~/styles/charalist.css'

export async function loader() {
  return await getCharacterList()
}

export function links() {
  return [{ rel: "stylesheet", href: charaListStyles }]
}

export default function CharactersPage() {
  const charactersData = useLoaderData()
  console.log(charactersData)

  return (
    <div>
    <SiteHeader />
    
    <main>
      <ul className="character-list">
        {
          charactersData.map((chara) => (
            <li style={{ 
              backgroundImage: `url("${ chara.sideImage }")` 
            }}>
              <Link to ={ chara.name.toLowerCase() }>
                <span class="character-title">{ chara.title }</span>
                <span class="character-name">{ chara.name }</span>
              </Link>
            </li>
          ) )
        }
      </ul>
    </main>

    </div>
  );
}
