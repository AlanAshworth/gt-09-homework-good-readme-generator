var inquirer = require("inquirer");
var axios = require("axios");
var fs = require("fs");

inquirer
  .prompt([
    {
      type: "input",
      name: "username",
      message: "What is your GitHub username?"
    }
  ])
  .then(function({ username }) {
    const queryUrl = `https://api.github.com/users/${username}`;

    axios.get(queryUrl).then(function(response) {
      const userEmail = response.data.email;
      const userAvatar = response.data.avatar_url;
      // console.log(userEmail);
      // console.log(userAvatar);
      getProjectInfo();
    });
  })
  .catch(error => {
    console.log("Inquirer prompt error: ", error);
  });

const getProjectInfo = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "projectTitle",
        message: "What is the name of the project?"
      },
      {
        type: "input",
        name: "projectDescription",
        message: "Provide a description of the project:"
      },
      {
        type: "input",
        name: "projectUsage",
        message: "How will this project be used?"
      },
      {
        type: "input",
        name: "projectLicense",
        message: "Under what license with this project be protected?"
      },
      {
        type: "input",
        name: "projectContributors",
        message: "Who is contributing to this project?"
      }
    ])
    .then(data => {
      console.log(data);

      fs.writeFile("README.md", JSON.stringify(data), function(error) {
        if (error) {
          throw error;
        }
        console.log("saved data");
      });
    })
    .catch(error => {
      console.log("Inquirer prompt error: ", error);
    });
};
