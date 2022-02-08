import { useLoaderData } from 'remix'
import { useState } from 'react'
import { getCharaVoiceLines, getCharaData } from '~/parse-files'
import VoiceLineCard from '~/components/voice-line-card.jsx'
import charaPageStyles from '~/styles/charapage.css'

export function meta({ data }) {
  const charaName = data.charaData.name 
  return { title: `Pradewata | ${charaName}` };
}

export function links() {
  return [{ rel: "stylesheet", href: charaPageStyles }]
}

export async function loader({ params }) {
  const charaId = params.chara
  let charaData = await getCharaData(charaId)
  let voiceLines = await getCharaVoiceLines(charaId)
  
  voiceLines = voiceLines.map(voiceLine => ({
    ...voiceLine,
    isCommented: Object.keys(voiceLine.line).includes("komentar")
  }))

  return { voiceLines, charaId, charaData }
}

export default function CharacterPage() {
  const { voiceLines, charaId, charaData } = useLoaderData()

  const [currentLang, setLang] = useState("id-new") 
  const [commentIsOpen, setCommentOpenState] = useState(false)
  
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
        <img src={`/images/chara-side/${ charaId }.webp`} />
        <div class="character-header">
          <span class="character-title">{ charaData.title }</span>
          <span class="character-name">{ charaData.name }</span>
          <button 
            class="comment-button"
            onClick={ () => setCommentOpenState(true) } 
          >
            Komentar
            <svg width="18px" height="18px">
              <image href="https://icongr.am/fontawesome/bars.svg?size=18&color=E8E6EA" />
            </svg>
          </button>
        </div>

        { commentIsOpen ? (
          <section class="comment-overlay">
            <div dangerouslySetInnerHTML={
              { __html: charaData.comment } 
            } />

            <button
              onClick={ () => setCommentOpenState(false) } 
            >Tutup</button>
          </section>
          ) : null
        }
        
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
          >ID Ofc</li>
          <li
            className={ getIsLangActive("en-og") }
            onClick={ () => setLang("en-og") }
          >EN Ofc</li>
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