const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, 'input.md');
const outputPath = path.join(__dirname, 'output.jsonl');

const ascii =
    "       ░▒▓█▓▒░░▒▓███████▓▒░░▒▓██████▓▒░░▒▓███████▓▒░░▒▓█▓▒░        \n" +
    "       ░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░        \n" +
    "       ░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░        \n" +
    "       ░▒▓█▓▒░░▒▓██████▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░        \n" +
    "░▒▓█▓▒░░▒▓█▓▒░      ░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░        \n" +
    "░▒▓█▓▒░░▒▓█▓▒░      ░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░        \n" +
    " ░▒▓██████▓▒░░▒▓███████▓▒░ ░▒▓██████▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓████████▓▒░ \n" +
    "                                                                   \n";
console.clear();
console.log(ascii);

const input = fs.readFileSync(inputPath, 'utf8');
const sections = parseSections(input);

console.log("[INFO] Found " + sections.length + " sections in input file.");

writeOutput(sections);

console.log("[INFO] Output written to " + outputPath);

function parseSections(text)
{
    const promptStart = "# --PROMPT";
    const promptEnd = "# --ENDPROMPT";
    const resultStart = "# --RESULT";
    const resultEnd = "# --ENDRESULT";

    let sections = [];

    let promptIndex = text.indexOf(promptStart);
    let resultIndex = text.indexOf(resultStart);

    while (promptIndex !== -1 && resultIndex !== -1)
    {
        let promptEndIndex = text.indexOf(promptEnd, promptIndex);
        let resultEndIndex = text.indexOf(resultEnd, resultIndex);

        let prompt = text.substring(promptIndex + promptStart.length, promptEndIndex).trim();
        let result = text.substring(resultIndex + resultStart.length, resultEndIndex).trim();

        sections.push({prompt, result});

        promptIndex = text.indexOf(promptStart, promptEndIndex);
        resultIndex = text.indexOf(resultStart, resultEndIndex);
    }

    return sections;
}

function writeOutput(sections)
{
    let output = {
        messages: []
    };

    sections.forEach(section => {
        output.messages.push({role: "user", content: section.prompt});
        output.messages.push({role: "assistant", content: section.result});
    });

    fs.writeFileSync(outputPath, JSON.stringify(output));
}


