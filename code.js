let team = []
let teamSize = 1

const pokeForm = document.querySelector("#pokeform")
const pokeTeam = document.querySelector("#team-list")

function captialize(str){
    return str.substring(0, 1).toUpperCase() + str.substring(1, str.length)
}

pokeForm.addEventListener("submit", event => {
    event.preventDefault()

    let poke = event.target.pokeInput.value.toLowerCase()
    event.target.pokeInput.value = ''
    fetch(`https://pokeapi.co/api/v2/pokemon/${poke}`)
    .then(response => response.json())
    .then(data => {
        let pokemon = {
            name: captialize(poke),
            image: data.sprites.front_default,
            types: []
        }

        const pokeDiv = document.createElement('div')
        pokeDiv.setAttribute('id', `pokeNum${teamSize}`)
        pokeDiv.setAttribute('class', 'pokemon-obj')

        const pokeName = document.createElement('p')
        pokeName.textContent = pokemon.name

        const pokePic = document.createElement('img')
        pokePic.setAttribute('src', `${pokemon.image}`)
        pokePic.setAttribute('alt', pokemon.name)

        const pokeType = document.createElement('ol')

        data.types.forEach(element => {
            let type = element.type.name
            pokemon.types.push(type)
            let pokeTypes = document.createElement('li')
            pokeTypes.textContent = captialize(type)
            pokeType.appendChild(pokeTypes)
        })

        team.push(pokemon)
        pokeDiv.append(pokeName, pokePic, pokeType)
        pokeTeam.append(pokeDiv)
    })
    .catch(error => {
        let errorMsg = event.target.pokeInput
        errorMsg.style.borderColor = "red"
        errorMsg.style.color = "darkred"
        errorMsg.value = "Not a Pokemon!"
        console.error('Error:', error);
    })
});