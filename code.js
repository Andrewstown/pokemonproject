// submit 6 Pokemon Characters if each character value is True 

// let teamPokemonNumber = 1 //0 by default
// const teamList = document.querySelector("#team-list")

// test()
// function test() {

//     let pokeName = "Pikachu"
//     while (num < teamPokemonNumber) {
//         fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName.toLowerCase()}`)
//             .then(response => response.json())
//             .then(data => {
//                 num++
//                 console.log(data)
//                 /*
//                 logic for making html pokemon
//                 */
//                 console.log('Success:', data);
//             })
//             .catch((error) => {
//                 console.error('Error:', error);
//             })
//         stop++
//         if (stop == 10) {
//             num = teamPokemonNumber
//         }
//     }
// }

const pokeForm = document.querySelector("#pokeform")
const pokeRoster = document.querySelector("#team-list")
pokeForm.addEventListener("submit", (event) => {
    event.preventDefault()
    const pokeDiv = document.createElement('div')
    pokeDiv.setAttribute('id', 'pokeNumber')
    pokeDiv.setAttribute('class', 'pokemonObj')
    const pokeName = document.createElement('p')
    pokeName.textContent = pokemon.name




    pokeRoster.append(pokeDiv)

});