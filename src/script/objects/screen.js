const screen = {
  userProfile: document.querySelector(".profile-data"),
  renderUser(user) {
    this.userProfile.innerHTML = 
            `<div class="info">
                <img src="${user.avatarUrl}" alt="Foto do perfil do usário" />
                <div class="data">
                    <h1>${user.name ?? "Não possui nome cadastrado 😥:("}</h1>
                    <p>${user.bio ?? "Não possui bio cadastrada 😥"}</p>
                    <p><span>👥Seguidores: </span>${user.followers}</p>
                    <p><span>👥Seguindo: </span>${user.following}</p>
                </div> 
            </div>`;

    let repositoriesItens = "";

    if (user.repositories.length > 0) {
      user.repositories.forEach(
        (repo) =>
          (repositoriesItens += 
            `<li>
                <a href="${repo.html_url}" target="_blanck">
                    <h3>${repo.name}</h3><br>
                    <span> 🍴${
                      repo.forks === 0 ? "Sem forks" : repo.forks
                    }</span>
                    <span>👀${
                      repo.watchers === 0 ? "Sem watchers" : repo.watchers
                    }</span>
                    <span>⭐${
                      repo.stargazers_count === 0
                        ? "Sem estrelas"
                        : repo.stargazers_count
                    }</span> 
                    <span>👨‍💻${repo.language ?? "Sem Linguagens"}</span>
                </a>
            </li>`)
      );
      this.userProfile.innerHTML += 
            `<div class="repositories section">
                <h2>Repositórios</h2>
                <ul>${repositoriesItens}</ul>
            </div>`;
    }

    let eventsItens = '';
    user.events.forEach(element =>{
      if (element.type === 'PushEvent'){
          eventsItens += 
          `<li class ="events">
            <h3>${element.repo.name}</h3>
            <p> -- ${element.payload.commits[0].message}</p>
          </li>`
      }else{
        eventsItens += 
        `<li class="events">
            <h3>${element.repo.name}</h3>
            <p> -- Criado um  ${element.payload.ref_type}</p>
          </li>`
      }
    })

    if(user.events.length === 0) {
      this.userProfile.innerHTML += `
      <div class="section">
          <h2>Eventos</h2>
          <h3>Não há eventos</h3>
      </div>`
      } 
      else{
        this.userProfile.innerHTML += 
        `<div class="section">
            <h2>Eventos</h2>
            <ul>${eventsItens}</ul>
        </div>`;
      }
      
  },
  renderNotFound() {
    this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>";
  },
};
export { screen };