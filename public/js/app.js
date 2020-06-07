console.log("Kekehands")

const weatherSearch = document.querySelector('form')
const search = document.querySelector('input')
const m1 = document.querySelector('#m1')
const m2 = document.querySelector('#m2')

m1.textContent = ""
m2.textContent = ""

weatherSearch.addEventListener('submit', (event) => {
    event.preventDefault()
    const location = search.value

    m1.textContent = "Loading data."
    m2.textContent = ""

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            m1.textContent = data.error
            m2.textContent = ""
            console.log(data.error)
        } else {
            m1.textContent = data.address
            m2.textContent = data.forecast
            console.log(data.address)
            console.log(data.forecast)
        }
    })
})
})