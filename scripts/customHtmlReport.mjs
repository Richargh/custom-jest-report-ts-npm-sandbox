import {readFileSync, createWriteStream} from 'fs';

function main(){
    try {

        const data = readFileSync('./reports/jest.json', 'utf8');
        const report = JSON.parse(data);

        const groups = groupTestResults(report);
    
        const writableStream = createWriteStream('./reports/jest.html', {encoding: 'utf8'});
        writeHead(writableStream);
        writeBody(writableStream, groups);
        writeFoot(writableStream);
        writableStream.end();
    } catch (err) {
        console.log(`Error reading file from disk: ${err}`);
    }
}

function groupTestResults(report){
    const groups = new Map();

    report.testResults.forEach(testResult => {
        testResult.assertionResults.forEach(assertionResult => {
            let currentGroup = groups;
            assertionResult.ancestorTitles.forEach(ancestor => {
                if(!currentGroup.has(ancestor)){
                    currentGroup.set(ancestor, new Map());
                }
                currentGroup = currentGroup.get(ancestor);
            });
            
            currentGroup.set(assertionResult.title, assertionResult.status);
        });
    });

    return groups;
}

function writeMain(writableStream, groups){
    const level = 2;
    writableStream.write(`${levelSpace(level)}<h2>Tests</h2>\n`);
    writableStream.write(`${levelSpace(level)}<ul>\n`);
    writeGroups(writableStream, groups, 3);
    writableStream.write(`${levelSpace(level)}</ul>\n`);
}


function writeGroups(writableStream, groups, level){
    groups.forEach((value, key) => {
        if(value instanceof Map){
            writableStream.write(`${levelSpace(level)}<li>${key}\n`);
            writableStream.write(`${levelSpace(level + 1)}<ul>\n`);
            writeGroups(writableStream, value, level + 2);
            writableStream.write(`${levelSpace(level + 1)}</ul>\n`);
            writableStream.write(`${levelSpace(level)}</li>\n`);
        }
        else {
            writableStream.write(`${' '.repeat(level * 4)}<li>${key}: ${value}</li>\n`);
        }
    });
}

function writeHead(writableStream){
    writableStream.write('<!DOCTYPE html>\n');
    writableStream.write('<html lang="en">\n');
    writableStream.write('<head>\n');
    writableStream.write('  <meta charset="UTF-8">\n');
    writableStream.write('  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n');
    writableStream.write('  <title>My Custom Jest Report</title>');
    writableStream.write('  <link rel="stylesheet" href="https://cdn.simplecss.org/simple.min.css"></link>');
    writableStream.write('</head>\n');
}
function writeBody(writableStream, groups){
    writableStream.write('<body>\n');
    writableStream.write('  <header>\n');
    writableStream.write('      <h1>My Custom Jest Report</h1>\n');
    writableStream.write('  </header>\n');
    writableStream.write('  <main>\n');
    writeMain(writableStream, groups);
    writableStream.write('  </main>\n');
    writableStream.write('</body>\n');
}
function writeFoot(writableStream){
    writableStream.write('</html>\n');
}

function levelSpace(level){
    return ' '.repeat((level)*4);
}

main();