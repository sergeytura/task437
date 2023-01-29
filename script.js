// const search = document.querySelector('.app__search')
// search.textContent = 'ITS SEARCH'

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

async function getRepo(repo) {
    let data = await fetch(`https://api.github.com/search/repositories?q=${repo}&per_page=5`)
    let dataJson = await data.json()
    return dataJson
}

getRepo('breed').then(a => reposName.push(...a.items))

const ul = document.createElement('ul');
ul.classList.add('app__search')
const fragment = document.createDocumentFragment();
const reposName = []
console.log(reposName)

setTimeout( () => {
    for(repo of reposName) {
        const li = document.createElement('li');
        li.innerHTML = `<a href='${repo.html_url}'>${repo.name}</a>`;
        fragment.append(li);
    }
    ul.append(fragment)
    app.append(ul)
},500)

// document.addEventListener('click', (e) => {
//     console.log(e.target)
// })
