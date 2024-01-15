// index.js
import Manager from "./lib/Manager.js";
import Engineer from "./lib/Engineer.js";
import Intern from "./lib/Intern.js";
import inquirer from 'inquirer';
import path from "path";
import fs from "fs";

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

import render from "./src/page-template.js";

const teamMembers = [];

function promptManager() {
    inquirer
        .prompt([{
                type: 'input',
                name: 'name',
                message: "Enter the team manager's name:",
            },
            {
                type: 'input',
                name: 'id',
                message: "Enter the team manager's employee ID:",
            },
            {
                type: 'input',
                name: 'email',
                message: "Enter the team manager's email:",
            },
            {
                type: 'input',
                name: 'officeNumber',
                message: "Enter the team manager's office number:",
            },
        ])
        .then((answers) => {
            const manager = new Manager(
                answers.name,
                answers.id,
                answers.email,
                answers.officeNumber
            );
            teamMembers.push(manager);
            promptMenu();
        });
}

function promptEngineer() {
    inquirer
        .prompt([{
                type: 'input',
                name: 'name',
                message: "Enter the engineer's name:",
            },
            {
                type: 'input',
                name: 'id',
                message: "Enter the engineer's employee ID:",
            },
            {
                type: 'input',
                name: 'email',
                message: "Enter the engineer's email:",
            },
            {
                type: 'input',
                name: 'github',
                message: "Enter the engineer's GitHub username:",
            },
        ])
        .then((answers) => {
            const engineer = new Engineer(
                answers.name,
                answers.id,
                answers.email,
                answers.github
            );
            teamMembers.push(engineer);
            promptMenu();
        });
}

function promptIntern() {
    inquirer
        .prompt([{
                type: 'input',
                name: 'name',
                message: "Enter the intern's name:",
            },
            {
                type: 'input',
                name: 'id',
                message: "Enter the intern's employee ID:",
            },
            {
                type: 'input',
                name: 'email',
                message: "Enter the intern's email:",
            },
            {
                type: 'input',
                name: 'school',
                message: "Enter the intern's school:",
            },
        ])
        .then((answers) => {
            const intern = new Intern(
                answers.name,
                answers.id,
                answers.email,
                answers.school
            );
            teamMembers.push(intern);
            promptMenu();
        });
}

function promptMenu() {
    inquirer
        .prompt([{
            type: 'list',
            name: 'menuChoice',
            message: 'What would you like to do?',
            choices: ['Add an engineer', 'Add an intern', 'Finish building the team'],
        }, ])
        .then((answer) => {
            switch (answer.menuChoice) {
                case 'Add an engineer':
                    promptEngineer();
                    break;
                case 'Add an intern':
                    promptIntern();
                    break;
                case 'Finish building the team':
                    generateHTML();
                    break;
                default:
                    break;
            }
        });
}

function generateHTML() {
    const renderedHtml = render(teamMembers);
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFileSync(outputPath, renderedHtml);
    console.log(`HTML file generated successfully at ${outputPath}`);
}

promptManager();