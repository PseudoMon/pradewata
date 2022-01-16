import { useLoaderData } from 'remix'
import { useState } from 'react'
import VoiceLineCard from '~/components/voice-line-card.jsx'
import charaPageStyles from '~/styles/charapage.css'

export function links() {
  return [{ rel: "stylesheet", href: charaPageStyles }]
}

export function loader() {
  return null //TODO
}

export default function CharacterPage() {
  const [currentLang, setLang] = useState("id-new") 

  const getIsLangActive = (lang) => {
    if (currentLang === lang) {
      return "active"
    } else {
      return null
    }
  }

  return (
    <article class="character-main">
      <section class="sidebar">
        <img src="/images/chara-side/xinyan.png" />
      </section>

      <section class="main-content">
        <ul class="lang-picker">
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

        <ul class="voice-lines">
          <li>
            <VoiceLineCard />
          </li>
          <li>
            <VoiceLineCard />
          </li>
          <li>
            <VoiceLineCard />
          </li>
          <li>
            <VoiceLineCard />
          </li>
        </ul>
      </section>
    </article>
  )
}