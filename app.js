const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser(){   
    return inquirer.prompt([
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
}

// This function will generate an html file with the data in it
function generateReadMe (answers){
    return `
    <h1>Homework 9 - README.md</h1>

    Descirption

    ${answers.project_description}

    Table of Contents
     * Installation 
     * Usage 
    `
}

// Tells node to first run the propmtUser function
promptUser()
// then the following funtion will take the input and store it into a variable.
    .then(function(answers){
        const userInput = generateReadMe(answers);

       return writeFileAsync("README.md",userInput)
    })
    .then(function(){
        console.log("Successfully wrote to README.md");
    })
    .catch(function(err) {
        console.log(err);
      });