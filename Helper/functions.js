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
// Get github api Rate limit in real time
// Function returns the full json object
async function getRateLimit(){
  let rateLimit = await index.getAPIResponse("https://api.github.com/rate_limit")
  return rateLimit
}

// Get watchers / forks and language informations from a list of repos and returns it.
async function getCrucialInformations(listOfRepos){
  var languageMap = new Map();
  var forkMap = new Map();
  var watchersMap = new Map();
  for (let index = 0; index < listOfRepos.length; index++) {
    const curRepository = listOfRepos[index];
  // Add repos language in a MAP (if it has already been pushed, just +1 for the usage number)
    if(languageMap.get(curRepository.language) != undefined) { // Laguage already in the map, just +1 in the usage value
      languageMap.set(curRepository.language, languageMap.get(curRepository) + 1)
    }
    else { // if the language isn't in the map, add it with 1 usage
      languageMap.set(curRepository.language, 1)
    }
  forkMap.set(curRepository.name, curRepository.forks_count)
  watchersMap.set(curRepository.name, curRepository.watchers)
  }
}

// Get user informations such as followers, following etc ...
async function gatherUserInformations(user) {
  var followers = await index.getAPIResponse(user.followers_url)
  var following = await index.getAPIResponse(user.following_url)
}

module.exports.getPopularRepos = getPopularRepos;
module.exports.getRateLimit = getRateLimit;
module.exports.getCrucialInformations = getCrucialInformations;
