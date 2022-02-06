import path from 'path'
import fs from 'fs/promises'
import markdownIt from 'markdown-it'
import enolib from 'enolib'

const mdParser = new markdownIt()
const textDataPath = path.join(__dirname, "..", "text-data")

export async function getPage(page) {
  const file = await fs.readFile(
    path.join(textDataPath, "site", `${page}.eno`),
    "utf-8"
  )

  const enodoc = enolib.parse(file.toString())
  const header = enodoc.field('header').optionalStringValue()
  const textRaw = enodoc.field('text').optionalStringValue()
  const text = textRaw ? mdParser.render(textRaw) : null
  const updatesRaw = enodoc.field('updates').optionalStringValue()
  const updates = updatesRaw ? mdParser.render(updatesRaw) : null

  return { header, text, updates }
}

export async function getCharacterList() {
  const file = await fs.readFile(
    path.join(textDataPath, "chara-list.eno"),
    "utf-8"
  )

  const enodoc = enolib.parse(file.toString())
  let charaList = []

  enodoc.elements().forEach(element => {
    if (!element.yieldsSection()) {
        // Not a section, so ye fuck up the format, mate
        return
    }

    const name = element.stringKey()
    const nameId = name.toLowerCase().replace(" ", "-")
    // turns "Kaedehara Kazuha" to "kaedehara-kazuha"
    const titles = element.toSection().fieldset('title')
    const title = titles.entry("id-new").requiredStringValue()

    charaList.push({ 
      name, 
      nameId,
      title, 
      sideImage: `/images/chara-side/${name.toLowerCase().replace(" ", "-")}.webp` 
    }) 
  })

  return charaList
}

export async function getCharaData(charaId) {
  // Technically it'll be cheaper if we load this file once,
  // and grab both comment and voice lines
  // alas I am at the moment too lazy to refactor the codes for that
  // This'll have to do
  const file = await fs.readFile(
    path.join(textDataPath, "characters", `${charaId}.eno`),
    "utf-8",
  )

  const enodoc = enolib.parse(file)
  const name = enodoc.field("name").optionalStringValue()
  const title = enodoc.field("title").optionalStringValue()
  const rawComment = enodoc.field("komentar").optionalStringValue()

  return { name, title, comment: mdParser.render(rawComment) }
}

export async function getCharaVoiceLines(charaId) {
  const file = await fs.readFile(
    path.join(textDataPath, "characters", `${charaId}.eno`),
    "utf-8",
  )

  const fallbackData = await getFallbackData(charaId) 
  // will return false if no fallback data file exist

  // Remove carriage returns from the file
  const enodoc = enolib.parse(file.replace(/\r|/g, ''))

  let voiceLines = []

  enodoc.elements().forEach(element => {
    if (!element.yieldsSection()) {
        // Not a section, therefore not a voice line
        return
    }

    const thisVoiceLineData = element.toSection()

    let thisVoiceLine = {
        title: {},
        line: {},
    }

    const title = thisVoiceLineData.fieldset('title')

    title.entries().forEach(entry => {
      // each entry's key is a language id
      thisVoiceLine.title[entry.stringKey()] = entry.requiredStringValue()
    })

    thisVoiceLineData.elements().forEach(element => {
      if (!element.yieldsField()) {
          // Not a field, therefore not the language-specific text
          return
      }

      const thisLanguageLine = element.toField()
      // The key of the line is the language id
      const langId = element.stringKey()
      const rawLine = thisLanguageLine.requiredStringValue() 

      if (langId === "komentar") {
        // Comments get parsed through mardown first
        thisVoiceLine.line[langId] = mdParser.render(rawLine) 
      }
      else {
        thisVoiceLine.line[langId] = rawLine 
      }
      
    })

    if (fallbackData) {
      thisVoiceLine = fillFallbackVoiceLine(fallbackData, thisVoiceLine)
    }

    voiceLines.push(thisVoiceLine)
  })

  return voiceLines
}

async function getFallbackData(charaId) {
  // Returns false if the file doens't exist

  let file 
  try {
    file = await fs.readFile(
      path.join(textDataPath, "characters", "fallback", `${charaId}.json`),
      "utf-8"
    )
  } 
  catch (error) {    
    if (error.code === "ENOENT") {
      //the file doesn't exist
      return false
    } 
    else {
      throw error
    }
  }

  return JSON.parse(file)
}

function fillFallbackVoiceLine(fallbackData, voiceLine) {
  // voiceLine is a SINGLE voice line
  // TODO typescript this shit eventually i guess

  const titlesLang = Object.keys(voiceLine.title)
  const linesLang  = Object.keys(voiceLine.line)

  let extraVoiceLines = {}

  titlesLang.forEach(lang => {
    if ( !linesLang.includes(lang) ) {
      // We have the language specific title
      // but not the line
      // we should get it from the fallback file

      if (typeof fallbackData[lang] === "object" ) {
        // will only fill in if the language exist
        // if the language exist but the line doesn't
        // it'll just be set to undefined
        extraVoiceLines[lang] = fallbackData[lang][voiceLine.title[lang]]
      }
    }
  })

  return {
    title: voiceLine.title,
    line: { ...voiceLine.line, ...extraVoiceLines }
  }
}

export async function getTerminologiesPage() {
  const file = await fs.readFile(
    path.join(textDataPath, "terminologies.eno"),
    "utf-8"
  )

  const enodoc = enolib.parse(file.toString())

  let pageSections = []

  enodoc.elements().forEach(element => {
    if (!element.yieldsSection()) {
        // Not a section, so what is this section doing here?
        return
    }

    const title = element.stringKey()
    const thisSection = element.toSection()
    const text = mdParser.render(thisSection.field("text").optionalStringValue())

    let dict = []
    // should contain a list of entries to the dictionary

    thisSection.section("Dict").elements().forEach(element2 => {
      if (!element2.yieldsFieldset()) {
        // Not a fieldset, messed up formatting
        return
      }

      const phraseFieldset = element2.toFieldset()

      let dictEntry = {}
      // This should later contain e.g.
      // { "id-new": "Pradewata", "en-og": "Allogene", "zh-cn": "原神" }

      phraseFieldset.entries().forEach(entry => {
        dictEntry[entry.stringKey()] = entry.requiredStringValue()
      })

      dict.push(dictEntry)

    })

    pageSections.push({ title, text, dict })
  })

  return pageSections
}