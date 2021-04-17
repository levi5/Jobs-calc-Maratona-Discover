const inputs = document.querySelectorAll('.form-login input');
const visiblePasswordEmoji = document.querySelector('#visible-password-emoji');


function addEmoji(elementName, emoji) {
  document.querySelector(elementName).textContent = emoji
}

function checkEmptyInput(elementInput) {
  return elementInput.value && true
}

inputs.forEach(input => {

  const elementName = `#input-${input.getAttribute('name')}-emoji`
  const element = document.querySelector(elementName)

  input.addEventListener('focus', () => {
    element.classList.add('active')
    addEmoji(elementName, '👍')
  })
  
  input.addEventListener('focusout', () => {
    element.classList.remove('active')
    const emoji = checkEmptyInput(input) ? '🟢' : '🔴'
    addEmoji(elementName, emoji)
  })

  input.addEventListener("keyup", () => {
    const emoji = checkEmptyInput(input) ? '👍' : '👎'
    addEmoji(elementName, emoji)
  })

  visiblePasswordEmoji.addEventListener('click', () => {
    const name = input.getAttribute('name')
    if (name === "password") {
      const type = input.getAttribute('type') === "password" ? "text" : "password"
      input.setAttribute('type', type)
    }
  })
})

