var express = require("express");
var axios = require("axios");
var app = express();
const config = require('dotenv').config()
const githubToken = process.env.TOKEN
app.listen(3000, () => {
 console.log("Server running on port 3000");
});

app.get("/url", (req, res, next) => {
    res.json(["Tony","Lisa","Michael","Ginger","Food"]);
});

app.get("/user/:userName", (req,res,next) => {
    axios
      .get('https://api.github.com/users/' + req.params.userName, {
        headers: {
          'Authorization': process.env.TOKEN
        }
      })
      .then((response) => {
        //console.log(getOrganizations('https://api.github.com/users/CesarDINDELEUX/orgs'))
        res.json(response.data)
      })
      .catch(err => {
        //document.body.textContent = 'Error: ' + err.stack
        // console.log(err)
      })
})
app.get("/orgs", (req,res,next) => {
  axios
    .get('https://api.github.com/orgs/Zenika/members', {
      headers: {
        'Authorization': process.env.TOKEN
      }
    })
    .then((response) => {
      console.log(formatUserInfos(response.data[0]))
    })
    .catch(err => {
      //document.body.textContent = 'Error: ' + err.stack
      console.log(err)
    })
})





app.get("/orga", (req,res,next) => {
    axios
      .get('https://api.github.com/users/CesarDINDELEUX/orgs', {
        headers: {
          'Authorization': ''
        }
      })
      .then((response) => {
        response.data
      })
      .catch(err => {
        document.body.textContent = 'Error: ' + err.stack
        console.log(err)
      })
})
function getAPIResponse(url) {
    axios
      .get(url, {
        headers: {
          'Authorization': ''
        }
      })
      .then((response) => {
        return response.data
      })
      .catch(err => {
        document.body.textContent = 'Error: ' + err.stack
        console.log(err)
      })
}

function formatUserInfos(userNotFormated){
let user = new Object(null)
user.login = userNotFormated.login
user.name = userNotFormated.name
user.github_profile = userNotFormated.html_url
user.avatarURL = userNotFormated.avatar_url
user.reposURL = userNotFormated.repos_url
user.bio = userNotFormated.bio
user.publicReposURL = userNotFormated.repos_url
user.followersURL = userNotFormated.followers_url
user.orgaURL = userNotFormated.organizations_url
user.location = userNotFormated.location
return user
}

function formatRepoInfos(repoNotFormated) {
let repo = new Object(null)
repo.id = repoNotFormated.id
repo.name = repoNotFormated.name
repo.starCount = repoNotFormated.stargazers_count
repo.language = repoNotFormated.language
return repo
}