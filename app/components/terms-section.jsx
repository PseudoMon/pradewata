import { useState } from 'react'

export default function TermsSection({ section }) {
  const [isClosed, setCloseStatus] = useState(true) 
  const [textIsClosed, setTextCloseStatus] = useState(true)
  // text referring to the explanation text

  return (
    <article class={`terms-section${isClosed ? " closed" : ""}`}>
      <header 
        class="terms-header"
        onClick={ () => setCloseStatus(!isClosed) }
      >
        <svg width="32px" height="32px">        
          <image href="https://icongr.am/fontawesome/chevron-circle-down.svg?size=32&color=E8E6EA" />    
        </svg>
        { section.title }
        <svg width="32px" height="32px">        
          <image href="https://icongr.am/fontawesome/chevron-circle-down.svg?size=32&color=E8E6EA" />    
        </svg>
      </header>

      <table class="dict-table">
        <thead>
          <tr>
            <th>ID New</th>
            <th>EN Official</th>
            <th>ZH Original</th>
          </tr>
        </thead>

        <tbody>
          { section.dict.map(entry => (
            <tr>
              <td>{ entry["id-new"] }</td>
              <td>{ entry["en-og"] }</td>
              <td>{ entry["zh-cn"] }</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        class="terms-text-button"
        onClick={ () => setTextCloseStatus(!textIsClosed) }
      >
        <svg width="32px" height="32px">
          <image href="https://icongr.am/fontawesome/angle-double-down.svg?size=32&color=E8E6EA" />
        </svg>
        Penjelasan
        <svg width="32px" height="32px">
          <image href="https://icongr.am/fontawesome/angle-double-down.svg?size=32&color=E8E6EA" />
        </svg>
      </button>

      <section 
        className={`text${textIsClosed ? " closed" : ""}`} 
        dangerouslySetInnerHTML={{ __html: section.text || ""}} 
      /> 

    </article>
  )
}