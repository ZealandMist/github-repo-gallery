const overview = document.querySelector(".overview");
const username = "ZealandMist";
const repoList = document.querySelector(".repo-list");
const repoSection = document.querySelector(".repos");
const repoDataSection = document.querySelector(".repo-data");

const getUserInfo = async function() {
  const response = await fetch(`https://api.github.com/users/${username}`);
  const data = await response.json();
  displayInfo(data);
};

getUserInfo();

const displayInfo = function (data) {
  const div = document.createElement("div");
  div.classList.add("user-info");
  div.innerHTML = `
    <figure>
      <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>
  `;
  overview.append(div);
  getRepoInfo();
};
  
const getRepoInfo = async function() {
  const repoInfo = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
  const repoData = await repoInfo.json();
  displayRepos(repoData);
};

const displayRepos = function (repos) {
  for (const repo of repos) {
    const repoItem = document.createElement("li");
    repoItem.classList.add("repo");
    repoItem.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(repoItem);
  }
};

repoList.addEventListener("click", function(e){
  if (e.target.matches("h3")){
    const repoName = e.target.innerText;
    eachRepo(repoName);
  }
});

const eachRepo = async function(repoName) {
  const userRepo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
  const repoInfo  = await userRepo.json();
  console.log(repoInfo);

  const fetchLanguages = await fetch(repoInfo.languages_url);
  const languageData = await fetchLanguages.json();
  console.log(languageData);

  const languages = [];
  for (const lang in languageData) {
    languages.push(lang);
  }

};

const displayEachRepo = function(repoInfo, languages){
  repoDataSection.innerHTML = "";
  repoDataSection.classList.remove("hide");
  repoSection.classList.add("hide");

  const divRepo = document.createElement("div");
  divRepo.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
  `;
  repoDataSection.append(div);
};