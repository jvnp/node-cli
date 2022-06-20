const {parseArgumentsIntoOptions, promptForMissingOptions} = require('./lib'); 

const args = process.argv;
(async () => {
  let options = parseArgumentsIntoOptions(args);
  options = await promptForMissingOptions(options);
  console.log(options);
})();
