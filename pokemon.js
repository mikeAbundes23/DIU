const tabInput = document.getElementById('tab-input');
const btnSearch = document.getElementById('search-pokemon');
const listInfo = document.getElementById('pokemon-info');
const btnClear = document.getElementById('clear-screen');
const card = document.getElementById('pokemon-card');
const historyList = document.getElementById('history-list');
const historyLabel = document.getElementById('history-label');
const alertPlaceholder = document.getElementById('liveAlertPlaceholder')

// Función para mostrar alertas
const appendAlert = (message) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-danger alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '</div>'
    ].join('')

    alertPlaceholder.append(wrapper)
}

// Función para limpiar la pantalla
function clearScreen() {
    card.style.display = 'none';
    btnClear.style.display = 'none';
    tabInput.value = '';
    historyList.innerHTML = '';
    alertPlaceholder.innerHTML = '';
    historyLabel.style.display = 'none';
}

// Función para añadir un item al historial
function addToHistory(pokemon) {
    const historyItem = document.createElement('li');
    historyItem.className = 'list-group-item';
    historyItem.textContent = pokemon;

    // Limitamos el historial a 5 elementos
    if (historyList.querySelectorAll('li').length == 5) {
        console.log('removing last child');
        historyList.removeChild(historyList.lastElementChild);
    }
    historyList.insertBefore(historyItem, historyList.firstChild);
}

// Función para crear la tarjeta del pokemon
function createPokemonCard(data) {
    // Obtenemos los elementos del DOM
    const image = document.getElementById('pokemon-img');
    const pokemonName = document.getElementById('pokemon-name');
    const pokemonId = document.getElementById('pokemon-id');
    const pokemonAbilities = document.getElementById('pokemon-abilities');
    const pokemonType = document.getElementById('pokemon-type');

    // Asignamos los valores a los elementos del DOM
    image.src = data.sprites.front_default;
    nameToUpperCase = data.name.charAt(0).toUpperCase() + data.name.slice(1);
    pokemonName.textContent = `Name: ${nameToUpperCase}`;
    pokemonId.textContent = `ID: ${data.id}`;

    let abilities = '';
    for (let i = 0; i < data.abilities.length; i++) { // Obtenemos las habilidades del pokemon
        abilities += data.abilities[i].ability.name.charAt(0).toUpperCase() + data.abilities[i].ability.name.slice(1);
        if (i < data.abilities.length - 1) {
            abilities += ', ';
        } 
    }
    
    pokemonAbilities.textContent = `Abilities: ${abilities+'.'}`;
    
    let types = '';
    for (let i = 0; i < data.types.length; i++) { // Obtenemos los tipos del pokemon
        types += data.types[i].type.name.charAt(0).toUpperCase() + data.types[i].type.name.slice(1);
        if (i < data.types.length - 1) {
            types += ', ';
        }
    }

    pokemonType.textContent = `Type: ${types+'.'}`;

    // Mostramos la tarjeta y el botón de limpiar
    card.style.display = 'block';
    btnClear.style.display = 'block';
    addToHistory(nameToUpperCase);
}

async function fetchPokemon() {
    try {
        const pokemon =  tabInput.value.trim();
        const pokemonLower = pokemon.toLowerCase();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonLower}`);
        tabInput.value = '';

        // Si el pokemon no existe, mostramos una alerta
        if (!response.ok) {
            alertPlaceholder.innerHTML = '';
            appendAlert(`Pokemon ${pokemonLower} not found`);
            card.style.display = 'none';
            btnClear.style.display = 'block';
            alertPlaceholder.style.display = 'block';      
        } else {
            alertPlaceholder.innerHTML = '';
        }

        const data = await response.json();
        createPokemonCard(data);
        historyLabel.style.display = 'block';

    } catch (error) {
        console.error(error);
    }
}


btnSearch.addEventListener('click', fetchPokemon);

tabInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        fetchPokemon();
    }
});

// Al hacer click en el botón de limpiar, se limpia la pantalla
btnClear.addEventListener('click', clearScreen);

// Al hacer click en un item del historial, se busca el pokemon
historyList.addEventListener('click', function(event) {
    if (event.target.tagName === 'LI') {
        tabInput.value = event.target.textContent;
        fetchPokemon();
    }
});

