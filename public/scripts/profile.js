import Modal from './modal.js';

const modal = Modal({ animateClasses: ['animate-pop', 'back'] })
const deleteButton  = document.querySelector('#delete-profile')
const deleteForm    = document.querySelector('#delete-user')

const userId = deleteButton.dataset.id

deleteButton.onclick = () => {
    modal.open()
    const action = deleteForm.getAttribute('action')
    deleteForm.setAttribute('action' , action + userId)
}
