const input = document.querySelector('.app__input') // поиск на странице

const debounce = (fn, debounceTime) => { // задержка поиска
    let timer;
    return function(...args) {
        clearInterval(timer)
        timer = setTimeout( () => fn.apply(this,args), debounceTime)
    }
};
const debounceSearch = debounce(getRepos, 1000) // реализация дебонс

async function getRepos (name) { // поиск репозиториев
    const repositories = await fetch(`https://api.github.com/search/repositories?q=${name}&per_page=5`)
               .then(data => data.json())
               .then(repo => repo.items)
               .catch(err => new Error(`Ошибка: ${err}`))
    return searchCards(repositories)
}

function searchCards (repositories) { // создание карточек автокомплита
    removeCards ()
    const app = document.querySelector('.app')
    const fragment = document.createDocumentFragment();
    const ul = document.createElement('ul');
    ul.classList.add('app__search')

    for(el of repositories) {
        const li = document.createElement('li');
        const { owner , name , stargazers_count } = el
        li.classList.add('app__search-li')
        li.addEventListener('click', () => {
            li.removeEventListener('click', arguments.callee);
            resultCards({ owner, name, stargazers_count })
        })
        li.textContent = el.name;
        fragment.append(li);
    } 

    ul.append(fragment)
    app.append(ul)
}

function removeCards () { // удаление карточек
    const cards = document.querySelectorAll('.app__search-li');
    for(el of cards) {
        el.remove()
    }
}

function resultCards({ owner, name, stargazers_count }) {     // создание карточки результата
    removeCards ()
    const fragment = document.createDocumentFragment();
    const ul = document.createElement('ul');
    ul.classList.add('app__result')
    const resCard = document.querySelector('.result')
    const nameCard = document.createElement('li');
    const ownerCard = document.createElement('li');
    const starsCard = document.createElement('li');
    const button = document.createElement('button')
    button.classList.add('app__result-button')
    nameCard.textContent = `Name: ${name}` 
    ownerCard.textContent = `Owner: ${owner.login}`
    starsCard.textContent = `Stars: ${stargazers_count}`;
    fragment.append(nameCard,ownerCard,starsCard);
    ul.append(fragment, button)
    resCard.append(ul)
}

document.addEventListener('click', (e) => {  // удаление нажатием на крестик
    if (e.target.matches('.app__result-button')){
        (e.target.closest('ul')).remove()
    }
})

input.addEventListener('input' , (e) => { 
    const { value } = e.target;
    if(value.length == 0) { // если инпут чистый - удаляем автокомлит
        removeCards ()
    }
    return debounceSearch(value) // задержка поиска
});

// resultRepos([
//     {
//         "id": 60259108,
//         "node_id": "MDEwOlJlcG9zaXRvcnk2MDI1OTEwOA==",
//         "name": "posters",
//         "full_name": "UKHomeOffice/posters",
//         "private": false,
//         "owner": {
//             "login": "UKHomeOffice",
//             "id": 3778081,
//             "node_id": "MDEyOk9yZ2FuaXphdGlvbjM3NzgwODE=",
//             "avatar_url": "https://avatars.githubusercontent.com/u/3778081?v=4",
//             "gravatar_id": "",
//             "url": "https://api.github.com/users/UKHomeOffice",
//             "html_url": "https://github.com/UKHomeOffice",
//             "followers_url": "https://api.github.com/users/UKHomeOffice/followers",
//             "following_url": "https://api.github.com/users/UKHomeOffice/following{/other_user}",
//             "gists_url": "https://api.github.com/users/UKHomeOffice/gists{/gist_id}",
//             "starred_url": "https://api.github.com/users/UKHomeOffice/starred{/owner}{/repo}",
//             "subscriptions_url": "https://api.github.com/users/UKHomeOffice/subscriptions",
//             "organizations_url": "https://api.github.com/users/UKHomeOffice/orgs",
//             "repos_url": "https://api.github.com/users/UKHomeOffice/repos",
//             "events_url": "https://api.github.com/users/UKHomeOffice/events{/privacy}",
//             "received_events_url": "https://api.github.com/users/UKHomeOffice/received_events",
//             "type": "Organization",
//             "site_admin": false
//         },
//         "html_url": "https://github.com/UKHomeOffice/posters",
//         "description": "Home Office Digital repository of posters covering different topics - research, access needs, accessibility, design.",
//         "fork": false,
//         "url": "https://api.github.com/repos/UKHomeOffice/posters",
//         "forks_url": "https://api.github.com/repos/UKHomeOffice/posters/forks",
//         "keys_url": "https://api.github.com/repos/UKHomeOffice/posters/keys{/key_id}",
//         "collaborators_url": "https://api.github.com/repos/UKHomeOffice/posters/collaborators{/collaborator}",
//         "teams_url": "https://api.github.com/repos/UKHomeOffice/posters/teams",
//         "hooks_url": "https://api.github.com/repos/UKHomeOffice/posters/hooks",
//         "issue_events_url": "https://api.github.com/repos/UKHomeOffice/posters/issues/events{/number}",
//         "events_url": "https://api.github.com/repos/UKHomeOffice/posters/events",
//         "assignees_url": "https://api.github.com/repos/UKHomeOffice/posters/assignees{/user}",
//         "branches_url": "https://api.github.com/repos/UKHomeOffice/posters/branches{/branch}",
//         "tags_url": "https://api.github.com/repos/UKHomeOffice/posters/tags",
//         "blobs_url": "https://api.github.com/repos/UKHomeOffice/posters/git/blobs{/sha}",
//         "git_tags_url": "https://api.github.com/repos/UKHomeOffice/posters/git/tags{/sha}",
//         "git_refs_url": "https://api.github.com/repos/UKHomeOffice/posters/git/refs{/sha}",
//         "trees_url": "https://api.github.com/repos/UKHomeOffice/posters/git/trees{/sha}",
//         "statuses_url": "https://api.github.com/repos/UKHomeOffice/posters/statuses/{sha}",
//         "languages_url": "https://api.github.com/repos/UKHomeOffice/posters/languages",
//         "stargazers_url": "https://api.github.com/repos/UKHomeOffice/posters/stargazers",
//         "contributors_url": "https://api.github.com/repos/UKHomeOffice/posters/contributors",
//         "subscribers_url": "https://api.github.com/repos/UKHomeOffice/posters/subscribers",
//         "subscription_url": "https://api.github.com/repos/UKHomeOffice/posters/subscription",
//         "commits_url": "https://api.github.com/repos/UKHomeOffice/posters/commits{/sha}",
//         "git_commits_url": "https://api.github.com/repos/UKHomeOffice/posters/git/commits{/sha}",
//         "comments_url": "https://api.github.com/repos/UKHomeOffice/posters/comments{/number}",
//         "issue_comment_url": "https://api.github.com/repos/UKHomeOffice/posters/issues/comments{/number}",
//         "contents_url": "https://api.github.com/repos/UKHomeOffice/posters/contents/{+path}",
//         "compare_url": "https://api.github.com/repos/UKHomeOffice/posters/compare/{base}...{head}",
//         "merges_url": "https://api.github.com/repos/UKHomeOffice/posters/merges",
//         "archive_url": "https://api.github.com/repos/UKHomeOffice/posters/{archive_format}{/ref}",
//         "downloads_url": "https://api.github.com/repos/UKHomeOffice/posters/downloads",
//         "issues_url": "https://api.github.com/repos/UKHomeOffice/posters/issues{/number}",
//         "pulls_url": "https://api.github.com/repos/UKHomeOffice/posters/pulls{/number}",
//         "milestones_url": "https://api.github.com/repos/UKHomeOffice/posters/milestones{/number}",
//         "notifications_url": "https://api.github.com/repos/UKHomeOffice/posters/notifications{?since,all,participating}",
//         "labels_url": "https://api.github.com/repos/UKHomeOffice/posters/labels{/name}",
//         "releases_url": "https://api.github.com/repos/UKHomeOffice/posters/releases{/id}",
//         "deployments_url": "https://api.github.com/repos/UKHomeOffice/posters/deployments",
//         "created_at": "2016-06-02T11:38:12Z",
//         "updated_at": "2023-01-25T13:03:36Z",
//         "pushed_at": "2022-10-25T15:10:18Z",
//         "git_url": "git://github.com/UKHomeOffice/posters.git",
//         "ssh_url": "git@github.com:UKHomeOffice/posters.git",
//         "clone_url": "https://github.com/UKHomeOffice/posters.git",
//         "svn_url": "https://github.com/UKHomeOffice/posters",
//         "homepage": null,
//         "size": 158727,
//         "stargazers_count": 2740,
//         "watchers_count": 2740,
//         "language": null,
//         "has_issues": true,
//         "has_projects": true,
//         "has_downloads": true,
//         "has_wiki": true,
//         "has_pages": true,
//         "has_discussions": false,
//         "forks_count": 290,
//         "mirror_url": null,
//         "archived": false,
//         "disabled": false,
//         "open_issues_count": 19,
//         "license": {
//             "key": "other",
//             "name": "Other",
//             "spdx_id": "NOASSERTION",
//             "url": null,
//             "node_id": "MDc6TGljZW5zZTA="
//         },
//         "allow_forking": true,
//         "is_template": false,
//         "web_commit_signoff_required": false,
//         "topics": [],
//         "visibility": "public",
//         "forks": 290,
//         "open_issues": 19,
//         "watchers": 2740,
//         "default_branch": "master",
//         "score": 1
//     }
// ])

// searchCards([
//     {
//         "id": 60259108,
//         "node_id": "MDEwOlJlcG9zaXRvcnk2MDI1OTEwOA==",
//         "name": "posters",
//         "full_name": "UKHomeOffice/posters",
//         "private": false,
//         "owner": {
//             "login": "UKHomeOffice",
//             "id": 3778081,
//             "node_id": "MDEyOk9yZ2FuaXphdGlvbjM3NzgwODE=",
//             "avatar_url": "https://avatars.githubusercontent.com/u/3778081?v=4",
//             "gravatar_id": "",
//             "url": "https://api.github.com/users/UKHomeOffice",
//             "html_url": "https://github.com/UKHomeOffice",
//             "followers_url": "https://api.github.com/users/UKHomeOffice/followers",
//             "following_url": "https://api.github.com/users/UKHomeOffice/following{/other_user}",
//             "gists_url": "https://api.github.com/users/UKHomeOffice/gists{/gist_id}",
//             "starred_url": "https://api.github.com/users/UKHomeOffice/starred{/owner}{/repo}",
//             "subscriptions_url": "https://api.github.com/users/UKHomeOffice/subscriptions",
//             "organizations_url": "https://api.github.com/users/UKHomeOffice/orgs",
//             "repos_url": "https://api.github.com/users/UKHomeOffice/repos",
//             "events_url": "https://api.github.com/users/UKHomeOffice/events{/privacy}",
//             "received_events_url": "https://api.github.com/users/UKHomeOffice/received_events",
//             "type": "Organization",
//             "site_admin": false
//         },
//         "html_url": "https://github.com/UKHomeOffice/posters",
//         "description": "Home Office Digital repository of posters covering different topics - research, access needs, accessibility, design.",
//         "fork": false,
//         "url": "https://api.github.com/repos/UKHomeOffice/posters",
//         "forks_url": "https://api.github.com/repos/UKHomeOffice/posters/forks",
//         "keys_url": "https://api.github.com/repos/UKHomeOffice/posters/keys{/key_id}",
//         "collaborators_url": "https://api.github.com/repos/UKHomeOffice/posters/collaborators{/collaborator}",
//         "teams_url": "https://api.github.com/repos/UKHomeOffice/posters/teams",
//         "hooks_url": "https://api.github.com/repos/UKHomeOffice/posters/hooks",
//         "issue_events_url": "https://api.github.com/repos/UKHomeOffice/posters/issues/events{/number}",
//         "events_url": "https://api.github.com/repos/UKHomeOffice/posters/events",
//         "assignees_url": "https://api.github.com/repos/UKHomeOffice/posters/assignees{/user}",
//         "branches_url": "https://api.github.com/repos/UKHomeOffice/posters/branches{/branch}",
//         "tags_url": "https://api.github.com/repos/UKHomeOffice/posters/tags",
//         "blobs_url": "https://api.github.com/repos/UKHomeOffice/posters/git/blobs{/sha}",
//         "git_tags_url": "https://api.github.com/repos/UKHomeOffice/posters/git/tags{/sha}",
//         "git_refs_url": "https://api.github.com/repos/UKHomeOffice/posters/git/refs{/sha}",
//         "trees_url": "https://api.github.com/repos/UKHomeOffice/posters/git/trees{/sha}",
//         "statuses_url": "https://api.github.com/repos/UKHomeOffice/posters/statuses/{sha}",
//         "languages_url": "https://api.github.com/repos/UKHomeOffice/posters/languages",
//         "stargazers_url": "https://api.github.com/repos/UKHomeOffice/posters/stargazers",
//         "contributors_url": "https://api.github.com/repos/UKHomeOffice/posters/contributors",
//         "subscribers_url": "https://api.github.com/repos/UKHomeOffice/posters/subscribers",
//         "subscription_url": "https://api.github.com/repos/UKHomeOffice/posters/subscription",
//         "commits_url": "https://api.github.com/repos/UKHomeOffice/posters/commits{/sha}",
//         "git_commits_url": "https://api.github.com/repos/UKHomeOffice/posters/git/commits{/sha}",
//         "comments_url": "https://api.github.com/repos/UKHomeOffice/posters/comments{/number}",
//         "issue_comment_url": "https://api.github.com/repos/UKHomeOffice/posters/issues/comments{/number}",
//         "contents_url": "https://api.github.com/repos/UKHomeOffice/posters/contents/{+path}",
//         "compare_url": "https://api.github.com/repos/UKHomeOffice/posters/compare/{base}...{head}",
//         "merges_url": "https://api.github.com/repos/UKHomeOffice/posters/merges",
//         "archive_url": "https://api.github.com/repos/UKHomeOffice/posters/{archive_format}{/ref}",
//         "downloads_url": "https://api.github.com/repos/UKHomeOffice/posters/downloads",
//         "issues_url": "https://api.github.com/repos/UKHomeOffice/posters/issues{/number}",
//         "pulls_url": "https://api.github.com/repos/UKHomeOffice/posters/pulls{/number}",
//         "milestones_url": "https://api.github.com/repos/UKHomeOffice/posters/milestones{/number}",
//         "notifications_url": "https://api.github.com/repos/UKHomeOffice/posters/notifications{?since,all,participating}",
//         "labels_url": "https://api.github.com/repos/UKHomeOffice/posters/labels{/name}",
//         "releases_url": "https://api.github.com/repos/UKHomeOffice/posters/releases{/id}",
//         "deployments_url": "https://api.github.com/repos/UKHomeOffice/posters/deployments",
//         "created_at": "2016-06-02T11:38:12Z",
//         "updated_at": "2023-01-25T13:03:36Z",
//         "pushed_at": "2022-10-25T15:10:18Z",
//         "git_url": "git://github.com/UKHomeOffice/posters.git",
//         "ssh_url": "git@github.com:UKHomeOffice/posters.git",
//         "clone_url": "https://github.com/UKHomeOffice/posters.git",
//         "svn_url": "https://github.com/UKHomeOffice/posters",
//         "homepage": null,
//         "size": 158727,
//         "stargazers_count": 2740,
//         "watchers_count": 2740,
//         "language": null,
//         "has_issues": true,
//         "has_projects": true,
//         "has_downloads": true,
//         "has_wiki": true,
//         "has_pages": true,
//         "has_discussions": false,
//         "forks_count": 290,
//         "mirror_url": null,
//         "archived": false,
//         "disabled": false,
//         "open_issues_count": 19,
//         "license": {
//             "key": "other",
//             "name": "Other",
//             "spdx_id": "NOASSERTION",
//             "url": null,
//             "node_id": "MDc6TGljZW5zZTA="
//         },
//         "allow_forking": true,
//         "is_template": false,
//         "web_commit_signoff_required": false,
//         "topics": [],
//         "visibility": "public",
//         "forks": 290,
//         "open_issues": 19,
//         "watchers": 2740,
//         "default_branch": "master",
//         "score": 1
//     }
// ])