let team = []
let effect = {}
let teamSize = 1
let editTeam = true
let opponent = {}

const winDiv = document.querySelector('.pokemon-objwin')
const pokeForm = document.querySelector('#pokeform')
const pokeInput = pokeForm.querySelector('input')
const pokeSelect = document.querySelector('#select')
const numberInput = document.querySelector("#team-number")

fetch('https://pogoapi.net/api/v1/type_effectiveness.json')
.then(r => r.json())
.then(data => effect = data)

pokeForm.addEventListener("submit", event => {
    event.preventDefault()
    
    let poke = pokeInput.value.toLowerCase()
    pokeInput.setAttribute('readonly', true)

    fetch(`https://pokeapi.co/api/v2/pokemon/${poke}`)
    .then(response => response.json())
    .then(data => {
        let pokemon = {
            id: editTeam ? team.length + 1 : 7,
            name: capitalize(poke),
            image: data.sprites.front_default,
            types: []
        }

        if (!editTeam && document.querySelector('.pokemon-objop')){
            document.querySelector('.pokemon-objop').remove()
        }

        const pokeDiv = document.createElement('div')

        const pokeName = document.createElement('p')
        pokeName.textContent = pokemon.name

        const pokePic = document.createElement('img')
        pokePic.setAttribute('src', `${pokemon.image ? pokemon.image : "https://static.wikia.nocookie.net/bec6f033-936d-48c5-9c1e-7fb7207e28af/scale-to-width/755"}`)
        pokePic.setAttribute('alt', pokemon.name)

        const pokeType = document.createElement('ul')

        data.types.forEach(element => {
            let type = element.type.name
            pokemon.types.push(type)
            let pokeTypes = document.createElement('li')
            pokeTypes.textContent = capitalize(type)
            pokeType.appendChild(pokeTypes)
        })

        pokeInput.value = ''
        pokeInput.removeAttribute('readonly')
        pokeDiv.append(pokeName, pokePic, pokeType)

        if (editTeam){ //Edit Team
            pokeDiv.setAttribute('id', `${team.length + 1}`)
            pokeDiv.setAttribute('class', 'pokemon-obj')

            const pokeRemove = document.createElement('button')
            pokeRemove.setAttribute('type', 'click')
            pokeRemove.textContent = "Remove"
            pokeRemove.addEventListener('click', () => {
                team.splice(parseInt(pokeDiv.id.charAt(pokeDiv.id.length - 1)) - 1, 1)
                pokeDiv.remove()
                changeEdit(parseInt(numberInput.value))
                selectWinner()
            })
    
            team.push(pokemon)
            pokeDiv.append(pokeRemove)
            document.querySelector('#team-list').append(pokeDiv)
            changeEdit(teamSize)
        }else{ //Edit Opponent
            opponent = pokemon
            pokeDiv.setAttribute('class', 'pokemon-objop')
            document.querySelector('#opponent-mon').append(pokeDiv)
        }
        selectWinner()
    })
    .catch(() => {
        pokeInput.value = ''
        pokeInput.placeholder = "Not a Pokemon!"
        pokeInput.removeAttribute('readonly')
        pokeInput.style.borderColor = "red"
    })
})

numberInput.addEventListener("wheel", () => {})

numberInput.addEventListener('change', (e) => {
    let size = Math.min(Math.max(e.target.value, 1), 6)
    e.target.value = size
    if (team.length >= size){
        selectWinner()
        team = team.slice(0, size)
    }
    changeEdit(size)
})

function capitalize(str){
    return str.substring(0, 1).toUpperCase() + str.substring(1, str.length)
}

pokeInput.addEventListener('click', () => {
    pokeInput.style.borderColor = "yellow"
    pokeInput.placeholder = "Type a pokemon name..."
})

function changeEdit(size){
    teamSize = size
    updateTeam()
    editTeam = team.length == teamSize ? false : true
    pokeSelect.textContent = editTeam ? "Select Team" : "Select Opponent"
}

function updateTeam(){
    let pokeTeam = document.querySelectorAll(".pokemon-obj")
    for (let i = 0; i < pokeTeam.length; i++){
        let poke = pokeTeam[i]
        if (i + 1 > teamSize){
            poke.remove()
        }else{
            poke.id = poke.id.substring(0, poke.id.length - 1) + (i + 1)
            team[i].id = i + 1
        }
    }
}

function selectWinner(){
    if (team.length > 0 && document.querySelector('.pokemon-objop')){
        let lose = true
        let tie = 0
        team.forEach(poke => {
            if (!lose) {return}
            let player = 0
            let oppo = 0
            poke.types.forEach(e1 => {
                opponent.types.forEach(e2 => {
                    let test1 = effect[`${capitalize(e1)}`][`${capitalize(e2)}`]
                    let test2 = effect[`${capitalize(e2)}`][`${capitalize(e1)}`]
                    if (e1 != e2 && test1 != test2){
                        player += test1
                        oppo += test2
                    }
                })
            })
            if (player > oppo){
                lose = false
                winDiv.innerHTML = `
                    <p>${poke.name} Wins!</p>
                    <img src="${poke.image}" alt="${poke.name}">
                `
            }else if (player == oppo){
                tie++
            }
        })
        if (tie == team.length){
            winDiv.innerHTML = `
                <p>No Winning Type</p>
                <img src="https://i.imgflip.com/31q9zg.png" alt="No Winning Type">
            `
        }else if (lose){
            winDiv.innerHTML = `
                <p>Opponent Wins</p>
                <img src="${opponent.image}" alt="${opponent.name}">
            `
        }
    }else{
        winDiv.innerHTML = `
            <p>No Winning Type</p>
            <img src="https://i.imgflip.com/31q9zg.png" alt="No Winning Type">
        `
    }
}