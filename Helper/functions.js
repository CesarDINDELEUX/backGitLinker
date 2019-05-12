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


async function fetchInformations(jsonOrga){
  console.log('Hello from fetchInfos')
  let repos = await index.getAPIResponse(jsonOrga.repos_url)
  return repos
}

// Get github api Rate limit in real time
// Function returns the full json object
async function getRateLimit(){
  let rateLimit = await index.getAPIResponse("https://api.github.com/rate_limit")
  return rateLimit
}


function mapToObj(inputMap) {
  let obj = {};

  inputMap.forEach(function(value, key){
      obj[key] = value
  });

  return obj;
}
//watchersMap.set(curRepository.name, curRepository.watchers)
//forkMap.set(curRepository.name, curRepository.forks)
// if (language === null){
//   language = 'Unknown language'
//   if (languageMap.get(language) != undefined) {
//     languageMap.set(language, languageMap.get(language) + 1)
//   } else {
//     languageMap.set(language, 1)
//   }
// }
// else {
//   if (languageMap.get(language) != undefined) {
//     languageMap.set(language, languageMap.get(language) + 1)
//   } else {
//     languageMap.set(language, 1)
//   }
// }




// Get user informations such as followers, following etc ...
async function gatherUserInformations(user) {
  var followers = await index.getAPIResponse(user.followers_url)
  var following = await index.getAPIResponse(user.following_url)
}

module.exports.getPopularRepos = getPopularRepos;
module.exports.getRateLimit = getRateLimit;
module.exports.fetchInformations = fetchInformations;