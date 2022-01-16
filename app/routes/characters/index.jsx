import { Link, Outlet, useLoaderData } from 'remix'
import { getCharacterList } from '~/parse-files'
import charaListStyles from '~/styles/charalist.css'

export async function loader() {
  return await getCharacterList()
}

export function links() {
  return [{ rel: "stylesheet", href: charaListStyles }]
}

export default function CharacterListPage() {
  const charactersData = useLoaderData()
  console.log(charactersData)

  return (
    <ul className="character-list">
      {
        charactersData.map((chara) => (
          <li style={{ 
            backgroundImage: `url("${ chara.sideImage }")` 
          }}>
            <Link to ={ chara.nameId }>
              <span class="character-title">{ chara.title }</span>
              <span class="character-name">{ chara.name }</span>
            </Link>
          </li>
        ) )
      }
    </ul>
  )
}
