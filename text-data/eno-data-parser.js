// import enolib from 'enolib'
// import fs from 'fs'

const enolib = require('enolib')
const fs = require('fs')
const characters = ['xinyan', 'ningguang', 'zhongli']

const getVoiceLinesData = (charaname) => {
    // Remove carriage returns from the eno file, for Windows compatibility
    const datafile = fs.readFileSync(`./${charaname}.eno`, 'utf-8').replace(/\r|/g, '')
    const enodoc = enolib.parse(datafile)

    let charaData = {
        name: enodoc.field('name').requiredStringValue(),
        comment: enodoc.field('komentar').optionalStringValue(),
        voiceLines: [] 
    }

    const enodocData = enodoc.elements()

    enodocData.forEach(element => {
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
            thisVoiceLine.title[entry.stringKey()] = entry.requiredStringValue()
        })

        thisVoiceLineData.elements().forEach(element => {
            if (!element.yieldsField()) {
                // Not a section, therefore not the language-specific text
                return
            }

            const thisLanguageLine = element.toField()

            thisVoiceLine.line[element.stringKey()] = thisLanguageLine.requiredStringValue() 
        })

        charaData.voiceLines.push(thisVoiceLine)
    })

    // oh god
    return charaData
}


let allCharaData = {}

characters.forEach(charaName => {
    thisCharaData = getVoiceLinesData(charaName)
    console.log("Getting data for " + charaName)
    allCharaData[charaName] = thisCharaData
})

console.log("Writing to file...")
fs.writeFileSync(`../src/text-data/allVoiceLines.json`, JSON.stringify(allCharaData))
console.log("Done")