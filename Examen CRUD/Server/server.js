import axios from 'axios'
import express from 'express'
import MongoClient from 'mongodb'
const app = express()
import cors from 'cors'
app.use(express.json())
app.use(cors())

let pokemonsSaved = {}
let pokemonById = {}

var DBurl = "mongodb+srv://<user>:<password>@crudpokemon.6kqry.mongodb.net/pokemon?retryWrites=true&w=majority";

var dbo

MongoClient.connect(DBurl, function(err, db) {
  if (err) throw err;
  dbo = db.db("pokemon");
});

function random_id(){
  return Math.floor((Math.random() * 10) + 1)
}

function contains(ids, id){
  for(var i = 0; i < ids.length; i++){
    if(Math.abs(ids[i] - id) < 0.5){
      return true
    }
  }

  return false
}

function find(result, id){
  for(var i = 0; i < result.length; i++){
    if(Math.abs(result[i]["id"] - id) < 0.5){
      return result[i]
    }
  }

  return result[0]
}

function create_hand(){
  let ids = []

  while(ids.length < 5){
    let id = random_id();
    if(!contains(ids, id)){
      ids.push(id)
    }
  }

  return ids
}

function processParams (req) {
    return Object.assign({}, req.body, req.params, req.query)
}

app.get('/getAll', function(req, res) {
  
  dbo.collection("hands").find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      res.send(result)
    })
})

app.post('/newHand', function(req, res){

  let handIds = create_hand()
  let hand = []
  let handObject = {}

  //Adding to DB
  dbo.collection("attributes").find({}).toArray(function(err, result) {
    for(var i = 0; i < handIds.length; i++){
      hand.push(find(result, handIds[i]))
    }
    handObject.cards = hand
    dbo.collection("hands").insertOne(handObject, function(err, res) {
      if (err) throw err;
      console.log("hand inserted");
    })
  })
})

app.listen(3000)