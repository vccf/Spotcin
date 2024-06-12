Feature: Playlists
As a usuário
I want to criar playlists com minhas músicas escolhidas
So that eu possa escutar as músicas desejadas naquela playlists

Scenario: Criar uma playlist com sucessoo
Given que o usuário "fulano" está logado
And o usuário está na página "Playlists"
When o usuário seleciona a opção "Criar Playlist"
And o usuário preenche o nome com "Músicas legais", a descrição com
"Algumas músicas" e seleciona a foto "carro.jpg"
And o usuário seleciona a opção "Salvar"
Then o usuário ainda está na página "Playlists"
And o usuário consegue ver a playlist com o nome "Músicas
legais"

Scenario: Falha ao tentar criar uma playlist pois o nome não foi dito
Given que o usuário "fulano" está logado
And o usuário está na página "Playlists"
When o usuário seleciona a opção "Criar Playlist"
And o usuário seleciona a opção "Salvar"
Then o usuário ainda está na página "Playlists"
And o usuário consegue ver a mensagem "Por favor preencha o campo do nome"

Scenario: Falha ao tentar criar uma playlist pois o nome já existe
Given que o usuário "fulano" está logado
And o usuário está na página "Playlists"
And a playlist "Músicas legais" já existe
When o usuário seleciona a opção "Criar Playlist"
And o usuário preenche o nome com "Músicas legais", a descrição com
"Algumas músicas" e seleciona a foto "carro.jpg"
And o usuário seleciona a opção "Salvar"
Then o usuário ainda está na página "Playlists"
And o usuário consegue ver a mensagem "Essa playlist já existe, escolha um novo nome"

