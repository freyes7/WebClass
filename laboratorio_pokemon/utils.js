let suma = 0
/*this is one template function that can be passed to add_item_to_list_with_template 
  and add the remove event of the button
  or you can create another template function wich create a dom element like 
  Document.createElement() and add the event to that element
  https://developer.mozilla.org/es/docs/Web/API/Document/createElement 
*/
let get_element_li  = (name, weight, image) => {
    return `<li class="added-pokemon" style = "border: thick dotted red" weight = ${weight}>name: ${name} <img src="${image}"> <div class="weight">weight: ${weight} </div> <button class="remove-pokemon">remove</button></li>`
  }
  
  let add_item_to_list_with_template = (template_function, name, weight, image) => {
    let template = template_function(name, weight, image)
    document.getElementById("list-items").innerHTML += template

    //update the remove buttons
    let remove_buttons = document.getElementsByClassName("remove-pokemon")
    for(i=0; i< remove_buttons.length; i++){
      remove_buttons[i].addEventListener("click", function(e){
        remove_element_event(e)
      })
    }
  }
  /*
   for removing elements could be this way
    let element_to_delete = document.querySelector("selector").lastElementChild;
    element_to_delete.parentNode.removeChild(element_to_delete);
    or we could use ChildNode.remove()
    https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/remove
  */
  let remove_element_event = (event) => {
    let remove_item  = (node_to_remove) => {
      // add the remove logic here 
      node_to_remove.remove()
    }
    // check which dom element triggered the event of remove, that is in event
    suma -= event.currentTarget.parentNode.getAttribute('weight')
    document.getElementById("sum").textContent = suma
    remove_item(event.currentTarget.parentNode)
  }
  
  let thenable_handle_for_the_result_of_the_pokemon_request = (result, pokemon_name) => {
    let weight = result.weight
    let image = result.sprites.front_default
    add_item_to_list_with_template(get_element_li, pokemon_name, weight, image)
    suma += weight
    document.getElementById("sum").textContent = suma
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
      axios.get('https://pokeapi.co/api/v2/pokemon/')
        .then((response) => {
          let pokemons  = response.data.results;
          let pokemon_name = document.querySelector("#pokemon-name").value;
          let pokemon = pokemons.find(element => element.name === pokemon_name)
          if(pokemon === undefined){
            catchable_handle_for_the_error_of_the_pokemon_request("There is not any pokemon with the provided name")
          }
          else{
            axios.get(pokemon.url)
              .then((response) => {
                thenable_handle_for_the_result_of_the_pokemon_request(response.data, pokemon_name)
              })
              .catch(error => {
                catchable_handle_for_the_error_of_the_pokemon_request(error)
              })
          }
        })
        .catch(error => {
          catchable_handle_for_the_error_of_the_pokemon_request(error)
        })
      
    })
  }