

  let type_input = () => {
    return `<br> new Type <br><input type="text" class="pokemon-type">`
  }
  
  let catchable_handle_for_the_error_of_the_pokemon_request = (err) => {
    //handle here the pokemon error from the request
    alert(err)
  }
  
  let add_type_input = () => {
    document.getElementById("form").innerHTML += type_input()
  }

  let create_pokemon = () => {
    return new Promise((resolve, reject) => {
      let pokemon_name = document.querySelector("#pokemon-name").value;
      let pokemon_id = document.querySelector("#pokemon-id").value;
      let pokemon_weight = document.querySelector("#pokemon-weight").value;
      let pokemon_height = document.querySelector("#pokemon-height").value;
      let pokemon_experience = document.querySelector("#pokemon-experience").value;
      let types = document.getElementsByClassName("pokemon-type")

      let typeNames = []
      for (var i = 0; i < types.length; i++) {
        typeNames.push(types[i].value)
      }

      axios.post('http://localhost:3000/create', {
        params: {
          name: pokemon_name,
          id: pokemon_id,
          weight: pokemon_weight,
          height: pokemon_height,
          base_experience: pokemon_experience,
          types: typeNames
        }
      })
        .then((response) => {
            console.log(response.data)
        })
        .catch(error => {
          catchable_handle_for_the_error_of_the_pokemon_request(error)
        })
    })
  }