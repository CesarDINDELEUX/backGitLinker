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
async function getRateLimit(){
  let rateLimit = await index.getAPIResponse("https://api.github.com/rate_limit")
  return rateLimit
}

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
  watchersMap.ser(curRepository.name, curRepository.watchers)
}
}










module.exports.getPopularRepos = getPopularRepos; 
