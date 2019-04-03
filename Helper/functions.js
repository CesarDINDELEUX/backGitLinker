var axios = require("axios");
var index = require('../index.js');


async function getPopularRepos(jsonOrga){
  let repos = await index.getAPIResponse(jsonOrga.repos_url)
  console.log(repos[0])
}

module.exports.getPopularRepos = getPopularRepos; 
