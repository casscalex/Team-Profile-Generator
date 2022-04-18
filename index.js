// packages used in app
const fs = require('fs');
const inquirer = require('inquirer');


// Team Members
const Manager = require('./lib/manager');
const Engineer = require('./lib/engineer');
const Intern = require('./lib/intern');

const render = require('./src/template');

const teamMembers = [];
const idArray = [];

function appMenu() {
    // function to create a manager
    function createManager(){
        inquirer.prompt([
            {
                type: "input",
                name: "managerName",
                message: "Enter manager's name:"
            },
            {
                type: "input",
                name: "managerId",
                message: "Enter managers's ID:"
            },
            {
                type: "input",
                name: "managerEmail",
                message: "Enter manager's email:"
            },
            {
                type: "input",
                name: "officeNumber",
                message: "Enter manager's office number:"
            }
        ]).then(answers => {
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.officeNumber);
            teamMembers.push(manager);
            idArray.push(answers.managerId);
            createTeam();
        });
    }

    // funcation to creat team
    function createTeam() {
        inquirer.prompt([
            {
                type: "list",
                name: "teamPosition",
                message: "Would you like to add a new team member?",
                choices: [
                    "Engineer",
                    "Intern",
                    "No, the team is full"
                ]
            }
        ]).then(userChoice => {
            switch (userChoice.teamPosition) {
                case "Engineer":
                    addEngineer();
                    break;
                case "Intern":
                    addIntern();
                    break;
                default:
                    renderPage()
            }
        });
    }

    // function to add an Engineer
    function addEngineer() {
        inquirer.prompt([
            {
                type: "input",
                name: "engName",
                message: "Enter employee's name:"
            },
            {
                type: "input",
                name: "engId",
                message: "Enter employee's ID:"
            },
            {
                type: "input",
                name: "engEmail",
                message: "Enter employee's email:"
            },
            {
                type: "input",
                name: "engGithub",
                message: "Enter employee's GitHub username:"
            }
        ]).then(answers => {
            const engineer = new Engineer(answers.engName, answers.engId, answers.engEmail, answers.engGithub);
            teamMembers.push(engineer);
            idArray.push(answers.engId);
            createTeam();
        });
    }

    // function to create an Intern
    function addIntern() {
        inquirer.prompt([
            {
                type: "input",
                name: "intName",
                message: "Enter employee's name:"
            },
            {
                type: "input",
                name: "intId",
                message: "Enter employee's ID:"
            },
            {
                type: "input",
                name: "intEmail",
                message: "Enter employee's email:"
            },
            {
                type: "input",
                name: "intGithub",
                message: "Enter employee's GitHub username:"
            }
        ]).then(answers => {
            const intern = new Intern(answers.intName, answers.intId, answers.intEmail, answers.intGithub);
            teamMembers.push(intern);
            idArray.push(answers.intId);
            createTeam();
        });
    }

    function renderPage() {
        if (true) {
            return fs.writeFile(
                "index.html",
                render(teamMembers),
            )
        }
    }

    createManager();
}

appMenu();

