let suma = 0
let isItemValidated = false
let isValueValidated = false
function get_element_li (name, price) {
    return `<li class="added-item" price= ${price}>name: ${name} price: ${price}  <button class="remove-item" id= "${name}">remove</button></li>`
  }

  let add_item_to_list_with_template = (template_function) => {
    return (event) => {
      let item_name = document.querySelector("#item-name").value;
      let item_value = document.querySelector("#item-value").value.replace(/\s+/g,"");
      document.getElementById("item-name").className = null
      if(item_name.replace(/\s/g, "").length === 0){
        document.getElementById("item-name").className = 'wrong'
      }
      else if(!isFinite(item_value) || item_value === ''){
        document.getElementById("item-value").className = 'wrong'
      }
      else{
        document.getElementById("item-name").className = null
        document.getElementById("item-value").className = null
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
    if(itemSpacesFree.length === 0){
      document.getElementById("item-name").className = 'wrong'
      isItemValidated = false
    }
    else{
      document.getElementById("item-name").className = null
      isItemValidated = 
    }
  }

  function validateValue(e){

  }