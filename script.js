const search = document.querySelector('.app__search')
search.textContent = 'ITS SEARCH'

// const result = document.querySelector('.app__result')
// result.textContent = 'ITS B'

const input = document.querySelector('.app__input')

const app = document.querySelector('.app')
const res =  document.createElement('div')
const ul = document.createElement('ul')
ul.style = "list-style: none;margin: 10px 0px 0px 10px;padding: 0px;"
const liName = document.createElement('li')
const liOwner = document.createElement('li')
const liStars = document.createElement('li')
liName.textContent = 'Name: FrontEnd'
liOwner.textContent = 'Owner: Sergey'
liStars.textContent = 'Stars: 6 stars'
ul.append(liName)
ul.append(liOwner)
ul.append(liStars)
console.log(ul)

res.classList.add('app__result')
res.append(ul)
app.append(res)


// input.addEventListener('input', (e) => {
//     fetch(`https://api.github.com/search/repositories?q=Q`)
//     .then(response => console.log(response))
// })
function getRepo(repo) {
   return new Promise((resolve, reject) => {
    fetch(`https://api.github.com/search/repositories?q=${repo}&per_page=5`)
    .then(data => resolve(data.json()))
    .catch(err => reject(err))
   }) 
}

let repos = []
getRepo('goga').then(a => repos.push(...a.items))
console.log(repos)
setTimeout( () => repos.forEach(e => console.log(e.name)), 1000)
// search.textContent = 
// document.addEventListener('click', (e) => {
//     console.log(e.target)
// })
