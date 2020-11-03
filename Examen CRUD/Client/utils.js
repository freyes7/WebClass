
let get_card  = (name, id, weight, height, base_experience) => {
  return `<td><div class="card" id = "card" style = "border: thick dotted red"> <div class="found-pokemon">name: ${name} <div class="id">id: ${id} </div> <div class="weight">weight: ${weight} </div> <div class="height">height: ${height} </div> <div class="base_experience">base experience: ${base_experience} </div> </div> </div></td>`
}

let get_hand = (hand) => {
  var component = `<tr>`
  for(var i = 0; i < hand.length; i++){
    component += get_card(hand[i].name, hand[i].id, hand[i].weight, hand[i].height, hand[i].base_experience)
  }
  component += `</tr>`

  return component
}


let show_hands = (hands) => {
  let inner = `<table>`
  
  for(var i = 0; i < hands.length; i++){
    inner += get_hand(hands[i]["cards"])
  }
  inner += `</table>`
  document.getElementById("hands").innerHTML = inner
}

let update = () => {
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:3000/getAll', {})
      .then((response) => {
          console.log(response)
          show_hands(response.data)
      })
      .catch(error => {
        catchable_handle_for_the_error_of_the_pokemon_request(error)
      })
  })
}

let repeatUpdates = () => {
  setTimeout(function(){ repeatUpdates() }, 5000);
  update()
}

  let catchable_handle_for_the_error_of_the_pokemon_request = (err) => {
    //handle here the pokemon error from the request
    alert(err)
  }

  let new_hand = () => {
    return new Promise((resolve, reject) => {
      axios.post('http://localhost:3000/newHand', {})
        .then((response) => {
            console.log(response.data)
            update()
        })
        .catch(error => {
          catchable_handle_for_the_error_of_the_pokemon_request(error)
        })
    })
  }