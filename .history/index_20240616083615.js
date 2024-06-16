#!/usr/bin/env node

/**
 * @file This file:
 *  
 * @author Kor Dwarshuis
 * @since 2024-06-16
 */


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