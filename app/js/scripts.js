const button = document.getElementById("btn")

const randomId = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

button.addEventListener('click', ()=>{
    const random = randomId(1,152)
    fetchData(random)
})

// document.addEventListener('DOMContentLoaded', () => {
//     const random = randomId(1,152)
//     fetchData(random)
// })

const fetchData = async (id) => {
    try{
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const data = await res.json()
        const pokemon = {
            id: data.id,
            name: data.species.name,
            image: data.sprites.front_default,
            type: data.types,
            height: data.height,
            weight: data.weight
        }
        completeCard(pokemon)

    } catch (error){
        console.log(error)
    }
}

const completeCard = (pokemon) => {
    const flex = document.querySelector('.flex')
    const template = document.getElementById("template").content
    const clone = template.cloneNode(true)
    const fragment = document.createDocumentFragment()

    clone.querySelector('.card__name').textContent = `${pokemon.id}. ${pokemon.name}`
    clone.querySelector('.card__image').setAttribute('src', pokemon.image)
    let typeCont=1
    for(element in pokemon.type){
        let p = document.createElement('P')
        let type = JSON.stringify(pokemon.type[element].type.name)
        p.textContent = `Type ${typeCont}: ${type.replaceAll('"', '')}`
        clone.querySelector('.card__stats').appendChild(p)
        typeCont++
    }
    let height = document.createElement('P')
    let weight = document.createElement('P')
    height.textContent = `Height: ${pokemon.height*10} cm`
    weight.textContent = `Weight: ${pokemon.weight/10} kg`
    clone.querySelector('.card__stats').appendChild(height)
    clone.querySelector('.card__stats').appendChild(weight)

    fragment.appendChild(clone)

    if(flex.children[1]){
        flex.removeChild(flex.children[1])
    }
    flex.appendChild(fragment)
}