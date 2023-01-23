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

const pokemonName = "pikachu"
const pokeForm = document.querySelector("#pokeform")
const pokeRoster = document.querySelector("#team-list")
pokeForm.addEventListener("submit", (event) => {
    event.preventDefault()

    const pokeDiv = document.createElement('div')
    pokeDiv.setAttribute('id', 'pokeNumber')
    pokeDiv.setAttribute('class', 'pokemonObj')

    const pokeName = document.createElement('p')
    pokeName.textContent = pokemonName
    //pokeName.appendChild(pokeChild)

    const pokePic = document.createElement('img')
    pokePic.setAttribute('src', "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png")
    pokePic.setAttribute('alt', pokemonName)

    const pokeType = document.createElement('ol')
    pokeType.setAttribute('class', "pokemon-type")

    let pokeTypes = document.createElement('li')
    pokeTypes.textContent = "water"
    pokeType.appendChild(pokeTypes)
    pokeTypes = document.createElement('li')
    pokeTypes.textContent = "grass"
    pokeType.appendChild(pokeTypes)

    pokeDiv.append(pokeName, pokePic, pokeType)
    pokeRoster.append(pokeDiv)

});