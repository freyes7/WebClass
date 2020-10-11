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

function processParams (req) {
    return Object.assign({}, req.body, req.params, req.query)
}

app.get('/getAll', function(req, res) {
    res.send(pokemonsSaved)
})

app.get('/get/:id', function(req, res) {
    let pokemon_name = pokemonById[req.param('id')]
    attributes = pokemonsSaved[pokemon_name]
    res.send(pokemon_name, attributes)
})

app.post('/create', function(req, res) {
    let params = processParams(req).params
    let attributes = {}
    let name = params.name
    attributes.id = params.id
    attributes.weight = params.weight
    attributes.height = params.height
    attributes.base_experience = params.base_experience
    attributes.types = params.types
    pokemonById[attributes.id] = name
    pokemonsSaved[name] = attributes
    attributes.name = name
    
    //Adding to DB
    MongoClient.connect(DBurl, function(err, db) {
      if (err) throw err;
      var dbo = db.db("pokemon");
      dbo.collection("attributes").insertOne(attributes, function(err, res) {
        if (err) throw err;
        console.log("pokemon inserted");
        db.close();
      });
    });

    res.send(attributes)
})

app.put('/update/:id', function(req, res) {
  let params = processParams(req)
  let attributes = {}
  attributes.id = req.param('id')
  attributes.weight = params.weight
  attributes.height = params.height
  attributes.base_experience = params.base_experience
  attributes.types = params.types
  let name = pokemonById[attributes.id]
  pokemonsSaved[name] = attributes
})

app.get('/delete/:id', function(req, res) {
  let id = req.param('id')
  let pokemon_name = pokemonById[id]
  delete pokemonById[id]
  delete pokemonsSaved[pokemon_name]
})

app.get('/pokemon', function(req, res) {
    let params = processParams(req)
    let pokemon_name = params.name
    if(pokemonsSaved.hasOwnProperty(pokemon_name)) {
        let attributes = pokemonsSaved[pokemon_name]
        res.send({is_error: false, attributes})
        return;
    }
    axios.get('https://pokeapi.co/api/v2/pokemon/')
        .then((response) => {
          let pokemons  = response.data.results;
          let pokemon = pokemons.find(element => element.name === pokemon_name)
          if(pokemon === undefined){
            res.send({is_error: true, message: "There is not any pokemon with the provided name"})
            return;
          }
          else{
            axios.get(pokemon.url)
              .then((response) => {
                  let attributes = response.data
                  pokemonsSaved[pokemon_name] = attributes
                  pokemonById[attributes.id] = pokemon_name
                  res.send({is_error: false, attributes})
                  return;
              })
              .catch(error => {
                  let message = error.toString()
                res.send({is_error: true, message})
                return;
              })
          }
        })
        .catch(error => {
            let message = error.toString()
            res.send({is_error: true, message})
            return;
        })
})

app.listen(3000)