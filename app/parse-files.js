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
    const titles = element.toSection().fieldset('title')
    const title = titles.entry("id-new").requiredStringValue()

    charaList.push({ 
      name, 
      title, 
      sideImage: `/images/chara-side/${name.toLowerCase()}.png` 
    }) 
  })

  return charaList
}