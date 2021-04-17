const btnBugger = document.querySelector("#menu-bugger")
const menuBugger = document.querySelector("#menu-bugger-content")


btnBugger.addEventListener('click', ()=>{
    btnBugger.querySelectorAll('span').forEach(span =>{
        span.classList.toggle('active')
    })
    menuBugger.classList.toggle('active')
})