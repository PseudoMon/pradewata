import { useLoaderData } from 'remix'
import { useState } from 'react'
import { getCharaVoiceLines } from '~/parse-files'
import VoiceLineCard from '~/components/voice-line-card.jsx'
import charaPageStyles from '~/styles/charapage.css'

export function links() {
  return [{ rel: "stylesheet", href: charaPageStyles }]
}

export async function loader({ params }) {
  const charaId = params.chara
  const voiceLines = await getCharaVoiceLines(params.chara)
  
  return { voiceLines, charaId }
}

export default function CharacterPage() {
  const [currentLang, setLang] = useState("id-new") 
  const { voiceLines, charaId } = useLoaderData()

  const getIsLangActive = (lang) => {
    if (currentLang === lang) {
      return "active"
    } else {
      return null
    }
  }

  return (
    <article className="character-main">
      <section className="sidebar">
        <img src={`/images/chara-side/${ charaId }.png`} />
      </section>

      <section className="main-content">
        <ul className="lang-picker">
          <li 
            className={ getIsLangActive("id-new") }
            onClick={ () => setLang("id-new") }
          >ID New</li>
          <li
            className={ getIsLangActive("id-og") }
            onClick={ () => setLang("id-og") }
          >ID Official</li>
          <li
            className={ getIsLangActive("en-og") }
            onClick={ () => setLang("en-og") }
          >EN Official</li>
          <li
            className={ getIsLangActive("zh-cn") }
            onClick={ () => setLang("zh-cn") }
          >ZH Orig</li>
        </ul>

        <ul className="voice-lines">
          { voiceLines.map(voiceLine => (
            <li><VoiceLineCard 
              voiceLine={voiceLine} 
              lang={ currentLang }
            /></li>
          )) }
        </ul>
      </section>
    </article>
  )
}