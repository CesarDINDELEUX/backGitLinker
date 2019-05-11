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
  getCrucialInformations(repos)
  let people = ''
  let totalStars = ''
  let totalRepos = ''
}








// Get github api Rate limit in real time
// Function returns the full json object
async function getRateLimit(){
  let rateLimit = await index.getAPIResponse("https://api.github.com/rate_limit")
  return rateLimit
}

// Get watchers / forks and language informations from a list of repos and returns it.
async function getCrucialInformations(listOfRepos){
   console.log(listOfRepos[0])
   var languageMap = new Map();
   var forkMap = new Map();
   var watchersMap = new Map();
  var myArray = []
  var arrayLanguage= ''
  let totalStars = 0
  for (let index = 0; index < listOfRepos.length; index++) {
    const curRepository = listOfRepos[index];
    totalStars += curRepository.stargazers_count
    let language = curRepository.language
    watchersMap.set(curRepository.name, curRepository.watchers)
    forkMap.set(curRepository.name, curRepository.forks)
    if (language === null){
        language = 'Unknown language'
        if (languageMap.get(language) != undefined) {
          languageMap.set(language, languageMap.get(language) + 1)
        } else {
          languageMap.set(language, 1)
        }
      }
      else {
        if (languageMap.get(language) != undefined) {
          languageMap.set(language, languageMap.get(language) + 1)
        } else {
          languageMap.set(language, 1)
        }
      }
  }
  watchersMap = await sortMap(watchersMap)
  languageMap = await sortMap(languageMap)
  forkMap = await sortMap(forkMap)
  console.log(watchersMap)
  console.log(forkMap)
  console.log(languageMap)
}
async function sortMap(myMap) {
  return new Map([...myMap.entries()].sort((a, b) => b[1] - a[1]));
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
module.exports.getCrucialInformations = getCrucialInformations;
module.exports.fetchInformations = fetchInformations;