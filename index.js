const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const markdownpdf = require("markdown-pdf");
const axios = require("axios");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser(){   
    let result = {}
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
            name:"runtest"
        },
        {
            type: "input",
            message: "What does the user need to know about using this repo?",
            name:"user_notes"
        },
        {
            type: "input",
            message: "What does the user need to know about contributing to the repo?",
            name:"repo_notes"
        },
    ])
    .then(function({username, ...userInput}){
        const queryUrl = `https://api.github.com/users/${username}`;

        result = { username, ...userInput };
        return axios.get(queryUrl) 
    })
    .then(function(response){
        result.github = response.data;
        return result;
    }) 
}


// This function will generate an md file with the data in it
function generateReadMe (answers){

    return `# ${answers.project_name} - README.md

![Github License](https://img.shields.io/badge/license-${answers.license}-blue.svg)

## Description

${answers.project_description}

## Table of Contents
* [Installation](#installation) 
* [Usage](#usage) 
* [License](#license)
* [Contributing](#contributing)
* [Tests](#tests) 
* [Questions](#questions)

## Installation
To install necessary dependencies, run the following command: 

    ${answers.dependencies}


## Usage 

${answers.user_notes}

## License 
This project is licensed under ${answers.license}


## Contributing

${answers.repo_notes}


## Tests 
To run tests, run thew following command:

    ${answers.runtest}

## Questions 

<img src="${answers.github.avatar_url}" alt="avatar" style="border-radius: 16px" width="30 />

> If you have any questions about the repo, open an issue or contact ${answers.username} directly at: [GitHub](${answers.github.url}) | [Email](${answers.github.email})
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

        return markdownpdf()
        .from("README.md")
        .to("README.pdf", function(){
            console.log("Successfully created PDF.")
        });
    })
    .then()
    .catch(function(err) {
        console.log(err);
      });
