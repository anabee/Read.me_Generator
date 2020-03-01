const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

inquirer.prompt([
    {
        type: "input",
        message: "What is your GitHub username?",
        name:"username"
    },
    {
        type: "input",
        message: "What is your project's name?",
        name:"project_name"
    },
    {
        type: "input",
        message: "Please write a short description of your project.",
        name:"project_description"
    },
    {
        type: "input",
        message: "What kind of license should your project have?",
        name:"license"
    },
    {
        type: "input",
        message: "What command should be run to install dependencies?",
        name:"dependencies"
    },
    {
        type: "input",
        message: "What command should be run to run tests?",
        name:"run_test"
    },
    {
        type: "input",
        message: "What does the user need to know about using the repo?",
        name:"user_notes"
    },
    {
        type: "input",
        message: "What does the user need to know about contributing to the repo?",
        name:"repo_notes"
    },
])