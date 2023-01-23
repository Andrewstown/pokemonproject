// submit 6 Pokemon Characters if each character value is True 

let teamPokemonNumber = 3 //0 by default
const teamList = document.querySelector("#team-list")

test()
function test(){
    let num = 0
    let stop = 0
    while (num < teamPokemonNumber){
        fetch('https://example.com/profile')
        .then((response) => response.json())
        .then((data) => { //pokemon name url resolves
            num++
            /*
            logic for making html pokemon
            */
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        })
        stop++
        if (stop == 10){
            num = teamPokemonNumber
        }
    }
}