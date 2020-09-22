import axios from 'axios'
import express from 'express'
const app = express()
import cors from 'cors'
app.use(express.json())
app.use(cors())

let pokemonsSaved = {}

function processParams (req) {
    return Object.assign({}, req.body, req.params, req.query)
}

app.get('/', function(req, res) {
    res.send('Server Running')
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