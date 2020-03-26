var inquirer = require("inquirer");

inquirer.prompt([
    {
      type: "input",
      message: "What is your GitHub username?",
      name: "username"
    }
  ]);