let modalRepository = (function(){
    let modalContainer = document.querySelector("#modal-container");
    let showModalPopUp = document.querySelector('#show-modal');
    let showDialogPopUp = document.querySelector('#show-dialog');
    let dialogPromiseReject;

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

        if (dialogPromiseReject) {
            dialogPromiseReject();
            dialogPromiseReject = null;
        }
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

    // Show Dialog
    let showDialog = (title, text) => {
        showModal(title, text);

        let modal = modalContainer.querySelector('.modal');
        // creating confirm button
        let confirmButton = document.createElement('button');
        confirmButton.classList.add('modal-confirm');
        confirmButton.innerText = 'Confirm';
        // creating cancel button
        let cancelButton = document.createElement('button');
        cancelButton.classList.add('modal-cancel');
        cancelButton.innerText = 'Cancel';

        // appending elements created
        modal.appendChild(confirmButton);
        modal.appendChild(cancelButton);

        // confirm button on focus so the user can just press enter
        confirmButton.focus();

        // Return a promise that resolves when confirmed, else rejects
        return new Promise((resolve, reject) => {
            cancelButton.addEventListener('click', hideModal);
            confirmButton.addEventListener('click', () => {
                dialogPromiseReject = null; // Reset this
                hideModal();
                resolve();
            });
            // This can be used to reject from other functions
            dialogPromiseReject = reject;
        });
    }

    // Show Modal click functionality
    showModalPopUp.addEventListener('click', (e) => {
        showModal('Modal Title', 'This is modal content');
    });
    // Show Dialog click functionality
    showDialogPopUp.addEventListener('click', () => {
        showDialog('Alert', 'Are you sure you want to do this?')
        .then(function() {
            alert('Confirmed!');
        }, () => {
            alert('Canceled')
        });
    });

})();