var express = require("express");
var axios = require("axios");
var app = express();
app.listen(3000, () => {
 console.log("Server running on port 3000");
});

app.get("/url", (req, res, next) => {
    res.json(["Tony","Lisa","Michael","Ginger","Food"]);
});

app.get("/user", (req,res,next) => {
    axios
      .get('https://api.github.com/user', {
        headers: {
          'Authorization': 'token 16c971dbea6d13b52da8390e6967cfa1cbf76431'
        }
      })
      .then((response) => {
        //console.log(getOrganizations('https://api.github.com/users/CesarDINDELEUX/orgs'))
        res.json(response.data)
      })
      .catch(err => {
        document.body.textContent = 'Error: ' + err.stack
        console.log(err)
      })
})

app.get("/orga", (req,res,next) => {
    axios
      .get('https://api.github.com/users/CesarDINDELEUX/orgs', {
        headers: {
          'Authorization': 'token 16c971dbea6d13b52da8390e6967cfa1cbf76431'
        }
      })
      .then((response) => {
        res.json(response.data)
      })
      .catch(err => {
        document.body.textContent = 'Error: ' + err.stack
        console.log(err)
      })
})

function getOrganizations(url) {
    axios
      .get(url, {
        headers: {
          'Authorization': 'token 16c971dbea6d13b52da8390e6967cfa1cbf76431'
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