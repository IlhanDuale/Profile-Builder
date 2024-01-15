import Manager from "./lib/Manager.js";
import Engineer from "./lib/Engineer.js";
import Intern from "./lib/Intern.js";
import inquirer from 'inquirer';
import path from "path";
import fs from "fs";
import { promisify } from 'util';

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

import render from "./src/page-template.js";

const teamMembers = [];

const writeFileAsync = promisify(fs.writeFile);

async function promptManager() {
    try {
        const answers = await inquirer.prompt([{
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
        ]);

        const manager = new Manager(
            answers.name,
            answers.id,
            answers.email,
            answers.officeNumber
        );

        teamMembers.push(manager);
        await promptMenu();
    } catch (error) {
        console.error('Error during manager prompt:', error);
    }
}

async function promptEngineer() {
    try {
        const answers = await inquirer.prompt([{
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
        ]);

        const engineer = new Engineer(
            answers.name,
            answers.id,
            answers.email,
            answers.github
        );

        teamMembers.push(engineer);
        await promptMenu();
    } catch (error) {
        console.error('Error during engineer prompt:', error);
    }
}

async function promptIntern() {
    try {
        const answers = await inquirer.prompt([{
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
        ]);

        const intern = new Intern(
            answers.name,
            answers.id,
            answers.email,
            answers.school
        );

        teamMembers.push(intern);
        await promptMenu();
    } catch (error) {
        console.error('Error during intern prompt:', error);
    }
}

async function promptMenu() {
    try {
        const answer = await inquirer.prompt([{
            type: 'list',
            name: 'menuChoice',
            message: 'What would you like to do?',
            choices: ['Add an engineer', 'Add an intern', 'Finish building the team'],
        }, ]);

        switch (answer.menuChoice) {
            case 'Add an engineer':
                await promptEngineer();
                break;
            case 'Add an intern':
                await promptIntern();
                break;
            case 'Finish building the team':
                await generateHTML();
                break;
            default:
                break;
        }
    } catch (error) {
        console.error('Error during menu prompt:', error);
    }
}

async function generateHTML() {
    try {
        const renderedHtml = render(teamMembers);

        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR);
        }

        await writeFileAsync(outputPath, renderedHtml);
        console.log(`HTML file generated successfully at ${outputPath}`);
    } catch (error) {
        console.error('Error generating HTML:', error);
    }
}

promptManager();