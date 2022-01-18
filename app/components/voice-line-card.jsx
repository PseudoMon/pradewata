import { useState } from 'react'

export default function VoiceLineCard({ voiceLine, lang }) {
  const isCommented = voiceLine.isCommented

  const [isOpen, setOpenState] = useState(false)
  const [commentIsOpen, setCommentOpenState] = useState(false)

  return (
    <div className={`voice-line-card${ isCommented ? " commented" : ""}`}>

      <div 
        className="header"
        onClick={() => setOpenState(!isOpen)}
      >
        <span>{ voiceLine.title[lang] }</span>
        <svg width="32px" height="32px">        
          <image href="https://icongr.am/fontawesome/chevron-circle-down.svg?size=32&color=E8E6EA" />    
        </svg>
      </div>
      
      {
        isOpen ? (
          <div className="content">
            <p>{ voiceLine.line[lang] }</p>
          </div>
        ) : null
      }

      {
        voiceLine.isCommented && isOpen ? (
          <button 
            className="comment-button"
            onClick={ () => setCommentOpenState(!commentIsOpen) }
          >
            <span>Komentar</span>
            <svg width="32px" height="32px">
              <image href="https://icongr.am/fontawesome/angle-double-down.svg?size=32&color=E8E6EA" />
            </svg>
          </button>
        ) : null
      }

      {
        commentIsOpen ? (
          <div className="comment-box"
            dangerouslySetInnerHTML={{ __html: voiceLine.line["komentar"] }}
           />
        ) : null
      }
      
    </div>
  )
}