// render.js

// Import the necessary classes
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

function render(teamMembers) {
    // Start with an HTML template
    const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>My Team</title>
    </head>
    <body>
      <h1>My Team</h1>
      <div class="team-members">
        <!-- Render team members here -->
        ${generateMemberCards(teamMembers)}
      </div>
    </body>
    </html>
  `;

    return htmlTemplate;
}

function generateMemberCards(teamMembers) {
    // Loop through the array of team members and generate a card for each
    return teamMembers.map((member) => {
        // Customize this based on your class properties and structure
        return `
      <div class="member-card">
        <h2>${member.getName()}</h2>
        <p>ID: ${member.getId()}</p>
        <p>Email: ${member.getEmail()}</p>
        <p>Role: ${member.getRole()}</p>
        ${additionalInfo(member)}
      </div>
    `;
    }).join('');
}

function additionalInfo(member) {
    // Customize this based on the member's role
    if (member instanceof Manager) {
        return `<p>Office Number: ${member.getOfficeNumber()}</p>`;
    } else if (member instanceof Engineer) {
        return `<p>GitHub: ${member.getGithub()}</p>`;
    } else if (member instanceof Intern) {
        return `<p>School: ${member.getSchool()}</p>`;
    }
}

module.exports = render;