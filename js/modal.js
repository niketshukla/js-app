let modalRepository = (function(){
    let modalContainer = document.querySelector("#modal-container");
    let showModalPopUp = document.querySelector('#show-modal');

    let showModal = (title, text) => {
        modalContainer.innerHTML = '';

        // creating a div with class modal inside modalContainer
        let modal = document.createElement('div');
        modal.classList.add('modal');
        // creating a close button
        let modalClose = document.createElement('button');
        modalClose.innerText = 'close';
        modalClose.classList.add('modal-close');
        modalClose.addEventListener('click', hideModal);
        // creating a title inside modal
        let modalTitle = document.createElement('h1');
        modalTitle.innerText = title;
        // creating text data in modal
        modalText = document.createElement('p');
        modalText.innerText = text;

        // appending elements created
        modalContainer.appendChild(modal);
        modal.appendChild(modalClose);
        modal.appendChild(modalTitle);
        modal.appendChild(modalText);

        modalContainer.classList.add('is-visible');
    }

    // Hide Modal
    let hideModal = () => {
        modalContainer.classList.remove('is-visible');
    }
    // hiding the modal if the user presses escape key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')){
            hideModal();
        }
    });
    // hiding the modal if the user clicks on overlay of modalContainer
    modalContainer.addEventListener('click', (e) => {
        // Since this is also triggered when clicking INSIDE the modal
        // We only want to close if the user clicks directly on the overlay
        let target = e.target;
        if(target === modalContainer){
            hideModal();
        }
    });

    // Show Modal 
    showModalPopUp.addEventListener('click', (e) => {
        showModal('Modal Title', 'This is modal content');
    });

})();