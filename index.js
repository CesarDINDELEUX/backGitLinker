var express = require("express");
var axios = require("axios");
var helper = require('./Helper/functions.js')
var cors = require('cors');
const config = require('dotenv').config()
const githubToken = process.env.TOKEN

var app = express();
app.use(cors());

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
 console.log("Server running on port " + PORT);
});

app.get("/url", (req, res, next) => {
    res.json(["JOAN","T","MOCHE","<3 <3"]);
});

app.get("/user/:userName", async function (req,res,next) {
    let user = await getAPIResponse('https://api.github.com/users/' + req.params.userName)
    console.log(user)
})

app.get("/ratelimit",async function (req,res,next) {
  let rateLimit = await getAPIResponse("https://api.github.com/rate_limit")
  res.send(rateLimit)
})


app.get("/user/pr/:username",async function (req,res,next) {
  let username = req.params.username
  let pr = await getAPIResponse("https://api.github.com/search/issues?q=is:pr+author:" + username)
  res.send(pr)
})

app.get("/orgs/:orgName/members",async function (req,res,next) {
  let orga = []
  for (let index = 1; index < 200; index++) {
    let pageToCall = 'https://api.github.com/orgs/Zenika/members?per_page=100&page=' + index
    let resultByPage = await getAPIResponse(pageToCall)
    console.log('Getting org members page n°' + index)
    if (resultByPage.length === 0) {
      break;
    }
    else {
      for (let index = 0; index < resultByPage.length; index++) {
        const element = resultByPage[index];
        orga.push(element)
      }
    }
  }
  res.send(orga)
})

app.get("/orgs/:orgName",async function (req,res,next) {
  let orga = await getAPIResponse('https://api.github.com/search/repositories?q=user:Zenika&sort=stars&order=desc&per_page=100&page=1')
  let otherPage = ''
  let numberOfCallNeeded = Math.trunc(orga.total_count / 100) + 1
  for (let index = 1; index < numberOfCallNeeded; index++) {
    //console.log(index)
    let pageNumber = index + 1
    // console.log(pageNumber)
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