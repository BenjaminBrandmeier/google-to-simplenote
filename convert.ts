import {GoogleNotesFormat, ListItem} from "./data.ts";

const createListItem = (item: ListItem) => item.isChecked ? '- [x] ' + item.text : '- [ ] ' + item.text;
const createSimpleNoteFileName = (filename: string) => 'simplenote_generated/' + filename + '.txt';
const createSimpleNoteFile = (filename: string, content: string) => Deno.writeTextFileSync(createSimpleNoteFileName(filename), content);

function parseContents(filename: string) {
    const content = Deno.readTextFileSync('takeout_files/' + filename)
    try {
        const note = JSON.parse(content) as GoogleNotesFormat;
        const newFileName = note.title ? note.title : filename.replace('.json', '');
        if (note.listContent) {
            const newContent = note.listContent.map(createListItem).join('\n')
            createSimpleNoteFile(newFileName, newContent)
        } else if (note.textContent === '' || note.textContent) {
            createSimpleNoteFile(newFileName, note.textContent)
        } else {
            console.log('unexpected format', filename)
        }
    } catch (e) {
        console.log(e)
        console.log('unable to convert', filename)
        return false;
    }
    return true;
}

function printResult(result: boolean[]) {
    const successfulConverted = result.filter(b => b).length;
    console.log(`successful converted ${successfulConverted} files. ${result.length - successfulConverted} conversions failed.`)
}

printResult(
    [...Deno.readDirSync('takeout_files')]
        .filter(f => f.isFile)
        .map(f => f.name)
        .filter(f => f.includes('.json'))
        .map(f => parseContents(f)))