var express = require("express");
var axios = require("axios");
var helper = require('./Helper/functions.js')
var app = express();
var cors = require('cors');
app.use(cors());
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

app.get("/ratelimit",async function (req,res,next) {
  let rateLimit = await getAPIResponse("https://api.github.com/rate_limit")
  res.send(rateLimit)
})

app.get("/orgs/:orgName",async function (req,res,next) {
  let orga = await getAPIResponse('https://api.github.com/search/repositories?q=user:Zenika&sort=stars&order=desc&per_page=100&page=1')
  let otherPage = ''
  let numberOfCallNeeded = Math.trunc(orga.total_count / 100) + 1
  for (let index = 1; index < numberOfCallNeeded; index++) {
    //console.log(index)
    let pageNumber = index + 1
    console.log(pageNumber)
    otherPage = await getAPIResponse('https://api.github.com/search/repositories?q=user:Zenika&sort=stars&order=desc&per_page=100&page=' + pageNumber)
    orga.items.push(otherPage.items[0])
    for (let y = 0; y < otherPage.items.length; y++) {
      const element = otherPage.items[y];
      orga.items.push(element)
    }
  }
  res.send(orga.items)
})
app.get("/orga", async function (req,res,next) {
  let test =  await getAPIResponse('https://api.github.com/orgs/Zenika/repos?per_page=100')
  //helper.getPopularRepos(test)
  res.json(test)
})

app.get("/orgasearch", async function (req,res,next) {
  let test =  await getAPIResponse('https://api.github.com/search/repositories?q=user:Zenika&sort=stars&order=desc')
  return test
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