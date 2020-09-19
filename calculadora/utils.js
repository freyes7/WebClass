let isItemValidated = false
let isValueValidated = false
let suma = 0
function get_element_li (name, price) {
    return `<li class="added-item" price= ${price}>name: ${name} price: ${price}  <button class="remove-item" id= "${name}">remove</button></li>`
  }

  let add_item_to_list_with_template = (template_function) => {
    return (event) => {
      if(isItemValidated && isValueValidated){
        let item_name = document.querySelector("#item-name").value;
        let item_value = document.querySelector("#item-value").value.replace(/\s+/g,"");
        suma += parseFloat(item_value)
        document.getElementById("sum").textContent = suma
        let template = template_function(item_name, item_value)
        document.getElementById("list-items").innerHTML += template
        let remove_buttons = document.getElementsByClassName("remove-item")
        for(i=0; i< remove_buttons.length; i++){
          remove_buttons[i].addEventListener("click", function(e){
            suma -= e.currentTarget.parentNode.getAttribute('price')
            document.getElementById("sum").textContent = suma
            e.currentTarget.parentNode.remove()
          })
        }
      }
    }
  }

  function validateItem(e){
    let itemSpacesFree = document.querySelector("#item-name").value.replace(/\s/g, "")
    if(itemSpacesFree.length !== 0){
      document.getElementById("item-name").className = null
      isItemValidated = true
    }
    else{
      document.getElementById("item-name").className = 'wrong'
      isItemValidated = false
    }
  }

  function validateValue(e){
    let valueSpacesFree = document.querySelector("#item-value").value.replace(/\s/g, "")
    if(isFinite(valueSpacesFree) && valueSpacesFree != ''){
      document.getElementById("item-value").className = null
      isValueValidated = true
    }
    else{
      document.getElementById("item-value").className = 'wrong'
      isValueValidated = false
    }
  } 