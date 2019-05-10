var express = require("express");
var axios = require("axios");
var helper = require('./Helper/functions.js')
var app = express();
const config = require('dotenv').config()
const githubToken = process.env.TOKEN
app.listen(3000, () => {
 console.log("Server running on port 3000");
});

app.get("/url", (req, res, next) => {
    res.json(["Tony","Lisa","Michael","Ginger","Food"]);
});

app.get("/user/:userName", async function (req,res,next) {
    let user = await getAPIResponse('https://api.github.com/users/' + req.params.userName)
    console.log(user)
})
app.get("/orgs/:orgName",async function (req,res,next) {
  let orga = await getAPIResponse('https://api.github.com/orgs/' + req.params.orgName)
  console.log(orga)
})
app.get("/orga", async function (req,res,next) {
  let test =  await getAPIResponse('https://api.github.com/orgs/Zenika')
  helper.getPopularRepos(test)
})

app.get("/orgasearch", async function (req,res,next) {
  let test =  await getAPIResponse('https://api.github.com/search/repositories?q=user:Zenika&sort=stars&order=desc')
  console.log(test)
})

app.get("/")


async function getAPIResponse(url) {
let apiCall = await axios.get(url, {
  headers: {
    'Authorization': process.env.TOKEN
  }
})
return apiCall.data
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

module.exports.getAPIResponse = getAPIResponse