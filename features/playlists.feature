Feature: Playlists
As a usuário
I want to criar playlists com minhas músicas escolhidas
So that eu possa escutar as músicas desejadas naquela playlists

Scenario: Criar uma playlist com sucesso
Given que o usuário "fulano" está logado
And o usuário está na página "Playlists"
When o usuário seleciona a opção "Criar Playlist"
And o usuário preenche o nome com "Músicas legais", a descrição com
"Algumas músicas" e seleciona a foto "carro.jpg"
And o usuário seleciona a opção "Salvar"
Then o usuário ainda está na página "Playlists"
And o usuário consegue ver a imagem "carro.jpg" com o nome "Músicas
legais"