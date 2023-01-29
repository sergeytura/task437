const search = document.querySelector('.app__search')
search.textContent = 'ITS SEARCH'

// const result = document.querySelector('.app__result')
// result.textContent = 'ITS B'
const debounce = (fn, debounceTime) => {
    let timer;
    return function(...args) {
        clearInterval(timer)
        timer = setInterval( () => fn.apply(this,args), debounceTime)
    }
};

const input = document.querySelector('.app__input')
input.addEventListener('input' ,(e) => {
    const { value } = e.target;
    // return getRepo(value).then(a => repos.push(...a.items))
});

const app = document.querySelector('.app')
const res =  document.createElement('div')
// const ul = document.createElement('ul')
// ul.style = "list-style: none;margin: 10px 0px 0px 10px;padding: 0px;"
// const liName = document.createElement('li')
// const liOwner = document.createElement('li')
// const liStars = document.createElement('li')
// liName.textContent = 'Name: FrontEnd'
// liOwner.textContent = 'Owner: Sergey'
// liStars.textContent = 'Stars: 6 stars'
// ul.append(liName)
// ul.append(liOwner)
// ul.append(liStars)
// console.log(ul)

// res.classList.add('app__result')
// res.append(ul)
// app.append(res)




// input.addEventListener('input', (e) => {
//     fetch(`https://api.github.com/search/repositories?q=Q`)
//     .then(response => console.log(response))
// })
// function getRepo(repo) {
//    return new Promise((resolve, reject) => {
//     fetch(`https://api.github.com/search/repositories?q=${repo}&per_page=5`)
//     .then(data => resolve(data.json()))
//     .catch(err => reject(err))
//    }) 
// }

async function getRepo(repo) {
    let data = await fetch(`https://api.github.com/search/repositories?q=${repo}&per_page=5`)
    let dataJson = await data.json()
    return dataJson
}


getRepo('12ga').then(a => reposName.push(...a.items))
// getRepo('tetr').then(a => repos.push(...a.items))

const ul = document.getElementById('ul');
const fragment = document.createDocumentFragment();

const reposName = []

setTimeout( () => {
    for(repo of reposName) {
        const li = document.createElement('li');
        li.textContent = repo.name;
        fragment.append(li);
    }
    ul.append(fragment)
    app.append(ul)
},200)


// console.log(reposName)
// setTimeout( () => repos.forEach(e => console.log(e.name)), 1000)

// setTimeout( () => repos.forEach(e => console.log(e)), 2000)

// async function getRepos () {
//     const repos = []; 

// }

// console.log(getRepo('goga'));


// search.textContent = 
// document.addEventListener('click', (e) => {
//     console.log(e.target)
// })

// debounce(getRepo('goga')

// const element  = document.getElementById('ul'); // assuming ul exists
// const fragment = document.createDocumentFragment();
// const browsers = ['Firefox', 'Chrome', 'Opera',
//     'Safari', 'Internet Explorer'];

// browsers.forEach((browser) => {
//     const li = document.createElement('li');
//     li.textContent = browser;
//     fragment.appendChild(li);
// });

// element.appendChild(fragment);