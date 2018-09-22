const fs = require('fs');

const ASYNC = true;

/* Store file content in this variable */
let content = undefined;

/* Synchronous */
if (!ASYNC) {
  content = fs.readFileSync('Sample.txt', 'ascii');
  console.log(`Moved past call to readFileSync, content = ${content}`);
}
/* Asynchronous */
else {
  /* Old Syntax

  content = fs.readFile('Sample.txt', 'ascii', function (err, content) {
    if (err === null) {
      console.log(content);
    }
  });

  */

  content = fs.readFile('Sample.txt', 'ascii', (err, content) => {
    if (err === null) {
      console.log(content);
    }
  });
  console.log(`Moved past call to readFile function, content = ${content}`);
}
