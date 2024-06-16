#!/usr/bin/env node

/**
 * @file This file:
 *  
 * @author Kor Dwarshuis
 * @since 2024-06-16
 */


function main() {
  // Load the fs and path modules to work with the file system and paths
  const fs = require('fs');
  // const path = require('path');

  // Define the path to the package.json file in the current working directory
  // const packageJsonPath = path.join(process.cwd(), 'package.json');
  const packageJsonPath = 'package.json';
  const packageJsonBackupPath = 'package.json.backup';

  // Copy the package.json file to package.json.backup
  fs.copyFile(packageJsonPath, packageJsonBackupPath, (err) => {
    if (err) {
      console.error('Error copying package.json:', err);
      return;
    }
    console.log('package.json has been backed up to package.json.backup');

    // Read the package.json file
    fs.readFile(packageJsonPath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading package.json:', err);
        return;
      }

      // Parse the package.json content to a JavaScript object
      let packageJson;
      try {
        packageJson = JSON.parse(data);
      } catch (parseErr) {
        console.error('Error parsing package.json:', parseErr);
        return;
      }

      // Remove the existing "scripts" entry if it exists
      delete packageJson.scripts;

      // Add the new "scripts" entry
      packageJson.scripts = {
        "edit": "node -e \"require('spec-up-t')()\"",
        "render": "node -e \"require('spec-up-t')({ nowatch: true })\"",
        "dev": "node -e \"require('spec-up-t')({ dev: true })\"",
        "xrefs": "node -e \"require('spec-up-t/src/get-xrefs-data.js').getXrefsData()\""
      };

      // Remove the existing "dependencies" entry if it exists
      delete packageJson.dependencies;

      // Add the new "dependencies" entry
      packageJson.dependencies = {
        "spec-up-t": "^0.11.0"
      };

      // Write the updated package.json back to the file
      fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8', (writeErr) => {
        if (writeErr) {
          console.error('Error writing package.json:', writeErr);
          return;
        }
        console.log('package.json has been updated successfully.');
      });
    });
  });
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