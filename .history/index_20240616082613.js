#!/usr/bin/env node

/**
 * @file This file:
 *  
 * @author Kor Dwarshuis
 * @since 2024-06-16
 */

const fs = require('fs');
const path = require('path');
const fixContent = require('./fix-content.js');
const readline = require('readline');

// Get the current working directory
const projectRoot = process.cwd();

// Use require to load JSON data
const specs = require(path.join(projectRoot, 'specs.json'));
const specDirectory = specs.specs[0].spec_directory;

// remove “./” or “/” at the beginning from specDirectory
const specDirectoryWithoutBeginningSlash = specDirectory.replace(/^\.\/|\/$/g, '');
const specPathPrefix = specDirectoryWithoutBeginningSlash + '/';

const defaultTermsAndDefinitionsFileName = 'terms_and_definitions.md';
const defaultTermsAndDefinitionsDirName = 'terms-definitions';

// Retrieve command line arguments or set default values
const args = process.argv.slice(2);
const pathToTermsFileToBeSplit = args[0] || defaultTermsAndDefinitionsFileName; // Default glossary file path
const pathToTermFilesDir = args[1] || defaultTermsAndDefinitionsDirName; // Default output file path

/* CONFIG */
const config = {
  definitionStringHead: '[[def:' // This is the string that indicates the start of a definition and is used as a divider to split up the files
};
/* END CONFIG */


function main() {

}



// Extra step to ask the user if they are sure they want to split the files
function areYouSure() {
  // Create readline interface
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  // Prompt the user
  rl.question('Are you sure you want to split files? (yes/no) ', (answer) => {
    // Check the user's answer
    if (answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y') {
      console.log('Proceeding with the script...');
      // Place your script logic here
      main();

    } else {
      console.log('Operation canceled.');
    }

    // Close the readline interface
    rl.close();
  });
}

// If case of help command, show help text and exit…
if (args[0] === "help" || args[0] === "-h" || args[0] === "-help" || args[0] === "--help") {
  const helpFilePath = path.join(__dirname, 'help.txt');
  fs.readFile(helpFilePath, 'utf8', (err, helptext) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(helptext);
  });

  // …else run main function
} else {
  areYouSure();
}