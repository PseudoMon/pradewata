import { useState } from 'react'

export default function VoiceLineCard({ voiceLine, lang }) {
  const [isOpen, setOpenState] = useState(false)

  console.log(voiceLine)
  return (
    <div className="voice-line-card">

      <div 
        className="header"
        onClick={() => setOpenState(!isOpen)}
      >
        <span>{ voiceLine.title[lang] }</span>
        <svg width="32px" height="32px">        
          <image xlink:href="https://icongr.am/fontawesome/chevron-circle-down.svg?size=32&color=E8E6EA" />    
        </svg>
      </div>
      
      {
        isOpen ? (
          <div className="content">
            <p>{ voiceLine.line[lang] }</p>
          </div>
        ) : null
      }
      
    </div>
  )
}