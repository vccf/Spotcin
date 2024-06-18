Feature: Playlists

Scenario: Criar uma Playlist
    Given que o usuário está logado
    When uma requisição POST for enviada para "/api/playlists" com o corpo da requisição sendo um JSON com o nome "Músicas gospels" e descrição "religião é top demais"
    Then o status da resposta deve ser "200"
    And o JSON da resposta deve conter o nome "Músicas gospels" e descrição "religião é top demais"

#Scenario de erro

Scenario: Uptade de uma playlist
    Given que o PlaylistRepository tem uma playlist com id "42" e nome "Músicas de madrugada"
    When uma requisição PUT for enviada para "/api/playlists/42" com o corpo da requisição sendo um JSON com o nome "Músicas gospels"
    Then o status da resposta deve ser "200"
    And o JSON da resposta deve conter o nome "Músicas gospels"