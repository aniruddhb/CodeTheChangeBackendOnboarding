const fs = require('fs');

const ASYNC = false;

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

  function (err, content) -> Callback! This function is CALLED when the file
                             is done being read!
  */

  fs.readFile('Sample.txt', 'ascii', (err, data) => {
    if (err === null) {
      content = data;
      console.log(content);
    }
  });
  console.log(`Moved past call to readFile function, content = ${content}`);
}
