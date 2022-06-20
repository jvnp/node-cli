const arg = require('arg');
const inquirer = require('inquirer');

function parseArgumentsIntoOptions(rawArgs) {
    const args = arg({
      '--yes': Boolean,
      '--param1': Boolean,
      '--param2': Boolean,
      '-y': '--yes',
      '-oa': '--param1',
      '-ob': '--param2',
    }, {
      argv: rawArgs.slice(2),
    });
  
    return {
      skipPrompts: args['--yes'] || false,
      paramOne: args['--param1'] || false,
      input: args._[0],
      paramTwo: args['--param2'] || false,
    };
  }

  async function promptForMissingOptions(options) {
    const defaultTemplate = 'JavaScript';
    if (options.skipPrompts) {
      return {
        ...options,
        template: options.template || defaultTemplate,
      };
    }
   
    const questions = [];
    if (!options.template) {
      questions.push({
        type: 'list',
        name: 'template',
        message: 'Please choose option for project to initiate',
        choices: ['Option One', 'Option Two'],
        default: defaultTemplate,
      });
    }
   
    if (!options.param1) {
      questions.push({
        type: 'confirm',
        name: 'param1',
        message: 'Initialize Parameter One?',
        default: false,
      });
    }
   
    const answers = await inquirer.prompt(questions);

    return {
      ...options,
      template: options.template || answers.template,
      param1: options.param1 || answers.param1,
    };
  }

  module.exports = {parseArgumentsIntoOptions, promptForMissingOptions}