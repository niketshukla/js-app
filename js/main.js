let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=20';

  let add = (pokemon) => {
      // checking if the pokemon data is in object form or not
      if(typeof pokemon === 'object'){
          pokemonList.push(pokemon);
      } else {
          return;
       }
  }

  let getAll = () => {
      console.log('three - getAll')
      return pokemonList;
  }

  let addListItem = (p) => {
      console.log("five - called addListItem");
      let pokemon_list = document.querySelector('.pokemon_list');
      let listItem = document.createElement('li');
      let pokeBtn = document.createElement('button');
      pokeBtn.innerText = p.name;
      pokeBtn.classList.add('listBtn');
      listItem.appendChild(pokeBtn);
      pokemon_list.appendChild(listItem);

      pokeBtn.addEventListener('click', function(){
          console.log("clicked");
          showDetails(p);
      });
  }

  let loadList = () => {
      console.log("one - Called loadList");
      return fetch(apiUrl).then(function (response) {
        return response.json();
      }).then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      }).catch(function (e) {
        console.error(e);
      });
  }

  function loadDetails(item) {
      let url = item.detailsUrl;
      // console.log(item);
      return fetch(url).then(function (response) {
        return response.json();
      }).then(function (details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      }).catch(function (e) {
        console.error(e);
      });
  }

  let showDetails = (item) => {
      console.log("show");
      pokemonRepository.loadDetails(item).then(function() {
        let modalContainer = document.querySelector('#modal-container');
        // Hide Modal
        let hideModal = () => {
          modalContainer.classList.remove('is-visible');
        }
          
        let showModal = (name, height, image) => {
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
          modalTitle.innerText = name;
          // creating text data in modal
          let modalText = document.createElement('p');
          modalText.innerText = `Height: ${height}`;
          // creating image tag in modal
          let pokeImg = document.createElement('img');
          pokeImg.src = image;
  
          // appending elements created
          modalContainer.appendChild(modal);
          modal.appendChild(modalClose);
          modal.appendChild(modalTitle);
          modal.appendChild(modalText);
          modal.appendChild(pokeImg);

          // To show the modal
          modalContainer.classList.add('is-visible');
        }
        // calling showModal function
        showModal(item.name, item.height, item.imageUrl);

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
      }, () => {
        alert('hi');
      });
  }
 
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
  //   showDetails: showDetails
  };
})();


pokemonRepository.loadList().then(function() {
  console.log("two - inside loadList");
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(poke){
      console.log('four - inside getAll');
      pokemonRepository.addListItem(poke);
  });
});


