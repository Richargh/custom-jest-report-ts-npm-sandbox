import {readFileSync, createWriteStream} from 'fs';

function main(){
    try {

        const data = readFileSync('./reports/jest.json', 'utf8');
        const report = JSON.parse(data);
    
        const writableStream = createWriteStream('./reports/jest.html', {encoding: 'utf8'});
        writeHead(writableStream);
        writeBody(writableStream, report);
        writeFoot(writableStream);
        writableStream.end();
    } catch (err) {
        console.log(`Error reading file from disk: ${err}`);
    }
}

function writeMain(writableStream, report){
    writableStream.write('      <h2>Tests</h2>\n');
    writableStream.write('      <ul>\n');
    report.testResults.forEach(testResult => {
        testResult.assertionResults.forEach(r => {
            writableStream.write(`          <li>${r.fullName}</li>\n`);
        });
    });
    writableStream.write('      </ul>\n');
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
function writeBody(writableStream, report){
    writableStream.write('<body>\n');
    writableStream.write('  <header>\n');
    writableStream.write('      <h1>My Custom Jest Report</h1>\n');
    writableStream.write('  </header>\n');
    writableStream.write('  <main>\n');
    writeMain(writableStream, report);
    writableStream.write('  </main>\n');
    writableStream.write('</body>\n');
}
function writeFoot(writableStream){
    writableStream.write('</html>\n');
}

main();