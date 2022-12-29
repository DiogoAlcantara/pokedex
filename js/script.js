// Selecionando as informações dos pokemons
const pokemonName = document.querySelector(".pokemon_name");
const pokemonNumber = document.querySelector(".pokemon_number");
const pokemonImage = document.querySelector(".pokemon_image");

// Selecionando as informações do formulário
const form = document.querySelector(".form");
const input = document.querySelector(".input_search");

// Selecionando os botões
const buttonPrev = document.querySelector(".btn-prev");
const buttonNext = document.querySelector(".btn-next");

let searchPokemon = 1;

// Obtem os dados da API e retorna como um json
const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );
  // Só retorna os dados caso a chamada para API tenha funcionado
  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
};

// Renderiza os dados da API e devolve as informações escolhidas
const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = "Loading...";
  pokemonNumber.innerHTML = "";

  const data = await fetchPokemon(pokemon);

  // Só executa o trecho abaixo se houver algo na constante data
  if (data) {
    pokemonImage.style.display = "block";
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src =
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ];
    input.value = "";
    searchPokemon = data.id;
  } else {
    pokemonImage.style.display = "none";
    pokemonName.innerHTML = "Not found";
    pokemonNumber.innerHTML = "";
  }
};

// Adiciona um evento de submit ao formulario, quando o evento acontece previne o comportamento padrão e chama a função responsável por renderizar as informações dos pokemons;
form.addEventListener("submit", (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener("click", () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener("click", () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});
renderPokemon(searchPokemon);
