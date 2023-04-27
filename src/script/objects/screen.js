const screen = {
    userProfile: document.querySelector(".profile-data"),
    renderUser(user){
        this.userProfile.innerHTML = `<div class="info">
                                 <img src="${user.avatarUrl}" alt="Foto do perfil do usário" />
                                 <div class="data">
                                    <h1>${user.name ?? "Não possui nome cadastrado 😥:("}</h1>
                                    <p>${user.bio ?? "Não possui bio cadastrada 😥"}</p>
                                    <p><span>👥Seguidores: </span>${user.followers}</p>
                                    <p><span>👥Seguindo: </span>${user.following}</p>
                                </div> 
                            </div>`
        let repositoriesItens = ''

        if(user.repositories.length > 0){

            user.repositories.forEach(repo => repositoriesItens += 
           `<li>
                <a href="${repo.html_url}" target="_blanck">
                    <h3>${repo.name}</h3><br>
                    <span> 🍴${repo.forks}</span>
                    <span>👀${repo.watchers}</span>
                    <span>⭐${repo.stargazers_count}</span> 
                    <span>👨‍💻${repo.language}</span>
                </a>
            </li>`)  
            this.userProfile.innerHTML += `<div class="repositories section">
                                                <h2>Repositórios</h2>
                                                <ul>${repositoriesItens}</ul>
                                            </div>`
        }
        
        
        let eventsList = '';
        user.events.forEach(event => {
        let message = '';

        if (event.type === 'CreateEvent') {
            message = 'Sem mensagem';
        } else if (event.type === 'PushEvent' && event.payload.commits.length > 0) {
            event.payload.commits.forEach(commit => {
            message += `<span>${commit.message}</span>`;
            });
        }
        eventsList += `
            <li class ="events">
            <p>${event.repo.name} - </p>
            <span>${message}</span>
            </li>
        `;
        });                                     


        this.userProfile.innerHTML +=
                                        `<div class="section">
                                            <h2>Eventos</h2>
                                                <ul>${eventsList}</ul>
                                            </div>`

    }
    ,
    renderNotFound(){
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>"
    },
}

export { screen }