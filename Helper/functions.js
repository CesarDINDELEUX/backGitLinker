var axios = require("axios");
var index = require('../index.js');


async function getPopularRepos(jsonOrga){
  let repos = await index.getAPIResponse(jsonOrga.repos_url)
  console.log(repos[0])
  for (let index = 0; index < repos.length; index++) {
      const element = repos[index];
      console.log(element.name + ' ' + element.stargazers_count)
  }

}

module.exports.getPopularRepos = getPopularRepos; 
