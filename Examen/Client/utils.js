/*this is one template function that can be passed to add_item_to_list_with_template 
  and add the remove event of the button
  or you can create another template function wich create a dom element like 
  Document.createElement() and add the event to that element
  https://developer.mozilla.org/es/docs/Web/API/Document/createElement 
*/
let get_card  = (name, id, weight, height, base_experience) => {
    return `<div class="found-pokemon">name: ${name} <img src="https://pokeres.bastionbot.org/images/pokemon/${id}.png"> <div class="id">id: ${id} </div> <div class="weight">weight: ${weight} </div> <div class="height">height: ${height} </div> <div class="base_experience">base experience: ${base_experience} </div> </div>`
  }
  
  let add_types = (template, typeNames) => {
    template  += `<h3> Types </h3> <ul class="types">`
    typeNames.forEach((type) => {
      template += `<li> ${type} </li>`
    })
    template += `</ul>`
    return template
  }

  let add_item_to_list_with_template = (template_function, name, id, weight, height, base_experience, typeNames) => {
    let template = template_function(name, id, weight, height, base_experience)
    document.getElementById("card").innerHTML = add_types(template, typeNames)
  }
  
  let thenable_handle_for_the_result_of_the_pokemon_request = (result, pokemon_name) => {
    let id = result.id
    let weight = result.weight
    let height = result.height
    let base_experience = result.base_experience

    let typeNames = []
    result.types.forEach((typeData) => {
      typeNames.push(typeData.type.name)
    })

    add_item_to_list_with_template(get_card, pokemon_name, id, weight, height, base_experience, typeNames)
  }
  
  let catchable_handle_for_the_error_of_the_pokemon_request = (err) => {
    //handle here the pokemon error from the request
    alert(err)
  }
  
  /* 
    for this it can be solved by adding a custom XMLHttpRequest but i don't recomend it, try to 
    use other libs that basically solve this, an alternative you can use axios 
    https://www.npmjs.com/package/axios
  */
  let get_pokemon_data = () => {
    return new Promise((resolve, reject) => {
      // add the logic of the request here
      let pokemon_name = document.querySelector("#pokemon-name").value;

      axios.get('http://localhost:3000/pokemon', {
        params: {
          name: pokemon_name
        }
      })
        .then((response) => {
          if(response.data.is_error) {
            console.log(response.data.message)
            catchable_handle_for_the_error_of_the_pokemon_request(response.data.message)
          }
          else {
            thenable_handle_for_the_result_of_the_pokemon_request(response.data.attributes, pokemon_name)
          }
        })
        .catch(error => {
          catchable_handle_for_the_error_of_the_pokemon_request(error)
        })
      
    })
  }