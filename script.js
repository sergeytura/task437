const search = document.querySelector('.app__search')
search.textContent = 'ITS SEARCH'

const result = document.querySelector('.app__result')
result.textContent = 'ITS B'

const input = document.querySelector('.app__input')

input.addEventListener('input', (e) => {
    fetch(`https://api.github.com/search/repositories?q=Q`)
    .then(response => console.log(response))
})