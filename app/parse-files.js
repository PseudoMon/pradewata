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

  return { header, text }
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
      sideImage: `/images/chara-side/${name.toLowerCase()}.png` 
    }) 
  })

  return charaList
}

export async function getCharaVoiceLines(charaId) {
  const file = await fs.readFile(
    path.join(textDataPath, "characters", `${charaId}.eno`),
    "utf-8",
  )

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

      thisVoiceLine.line[element.stringKey()] = thisLanguageLine.requiredStringValue() 
    })

    voiceLines.push(thisVoiceLine)
  })

  return voiceLines
}