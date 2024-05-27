Recomendações com base no escutado pelo usuário:
Analisando as músicas escutadas pelo usuário recomendar 5 novas músicas que o usuário ainda não ouviu e provavelmente vai gostar

Cenário: Recomendações mais recentes (GUI)
Given a usuária “Victória” está logada 
And estou na página “Recomendações”
When seleciono a opção “Recomendações mais recentes”
Then sou redirecionada para a página “Músicas recomendadas” com 1 playlist das 5 últimas músicas recomendadas “Ride-Lana Del Rey”, “Age of Love-Charlotte de Witte”, “Legacy-Sara Landry”, “Dori Me-Deborah de Luca”, “Metal Heart-Cat Power”

Cenário: Criar playlist com recomendações (GUI)
Given a usuária “Victória” está logada 
And estou na página “Recomendações”
When seleciono a opção “Criar playlist”
Then sou redirecionada para a página “Músicas recomendadas” com 1 playlist das 5 últimas músicas recomendadas “Ride-Lana Del Rey”, “Age of Love-Charlotte de Witte”, “Legacy-Sara Landry”, “Dori Me-Deborah de Luca”, “Metal Heart-Cat Power”

Cenário: Excluir música(s) da playlist recomendações (GUI)
Given a usuária “Victória” está logada 
And estou na página “Músicas recomendadas”
And posso visualizar as músicas “Ride-Lana Del Rey”, “Age of Love-Charlotte de Witte”, “Legacy-Sara Landry”, “Dori Me-Deborah de Luca”, “Metal Heart-Cat Power”
When seleciono a opção “excluir” associada a música  “Ride-Lana Del Rey”
Then a página “Músicas recomendadas” é recarregada com 1 playlist das músicas recomendadas sem a música “Ride-Lana Del Rey” e com as músicas “Age of Love-Charlotte de Witte”, “Legacy-Sara Landry”, “Dori Me-Deborah de Luca”, “Metal Heart-Cat Power”

Cenário: Histórico de recomendações (GUI)
Given a usuária “Victória” está logada 
And estou na página “Recomendações”
When seleciono a opção “Histórico de recomendações”
Then sou redirecionado para a página “Histórico de recomendações” com o histórico de recomendações (as recomendações atuais e recomendações antigas) 
And posso visualizar 1 playlist com as músicas “Ride-Lana Del Rey”, “Age of Love-Charlotte de Witte”, “Legacy-Sara Landry”, “Dori Me-Deborah de Luca”, “Metal Heart-Cat Power”

Cenário: Ver mais recomendações (GUI)
Given a usuária “Victória” está logada 
And estou na página “Recomendações”
When seleciono a opção “Ver mais recomendações”
Then sou redirecionado para a página “Músicas recomendadas” com 10 músicas: as 5 últimas músicas recomendadas “Ride-Lana Del Rey”, “Age of Love-Charlotte de Witte”, “Legacy-Sara Landry”, “Dori Me-Deborah de Luca”, “Metal Heart-Cat Power” mais as 5 novas músicas recomendadas “Rigid (Kobosil 44 Rush Mix)-Rosa Anschütz”,  “Hypnotized (Joyhauser Mix)-Amelie Lens”, “Shame-Low”,  “Schwarze Schatten-Schepperlotte”,  “City Looks Pretty-Courtney Barnett”

Cenário:  Ver mais recomendações (II) (GUI)
Given a usuária “Victória” está logada 
And estou na página “Músicas recomendadas”
And posso visualizar as músicas “Ride-Lana Del Rey”, “Age of Love-Charlotte de Witte”, “Legacy-Sara Landry”, “Dori Me-Deborah de Luca”, “Metal Heart-Cat Pow﻿er”
When seleciono a opção “Ver mais”
Then continuo na página “Músicas recomendadas” com 10 músicas: as 5 últimas músicas recomendadas “Ride-Lana Del Rey”, “Age of Love-Charlotte de Witte”, “Legacy-Sara Landry”, “Dori Me-Deborah de Luca”, “Metal Heart-Cat Power” mais as 5 novas músicas recomendadas “Rigid (Kobosil 44 Rush Mix)-Rosa Anschütz”,  “Hypnotized (Joyhauser Mix)-Amelie Lens”, “Shame-Low”, “Schwarze Schatten-Schepperlotte”, “City Looks Pretty-Courtney Barnett”

Cenário: Não há recomendações suficientes (GUI)
Given a usuária “Victória” está logada 
And estou na página “Recomendações”
When seleciono a opção “Criar playlist”
Then  continuo na página “Recomendações”
And vejo uma mensagem “Você não ouviu músicas o suficientes para ter recomendações”

Cenário: Gerar lista de recomendações (serviço)
Given A usuária “Victória” está no sistema 
And o sistema possui acesso aos dados do perfil do usuário, histórico de reprodução e interações anteriores. 
When espero que o sistema gere uma lista de recomendações com 5 músicas
Then o sistema analisa os dados do perfil do usuário e histórico de músicas ouvidas.
And  o sistema gera uma lista de recomendações com 5 músicas que podem ser visualizadas pelo usuário “Ride-Lana Del Rey”, “Age of Love-Charlotte de Witte”, “Legacy-Sara Landry”, “Dori Me-Deborah de Luca”, “Metal Heart-Cat Pow﻿er”

Cenário: Excluir música(s) das recomendadas (serviço)
Given A usuária “Victória” está no sistema 
And a playlist “Músicas recomendadas” associada a usuária “Victória" tem as músicas “Ride-Lana Del Rey”, “Age of Love-Charlotte de Witte”, “Legacy-Sara Landry”, “Dori Me-Deborah de Luca”, “Metal Heart-Cat Pow﻿er”
When seleciona a música “Ride-Lana Del Rey” e a exclui da lista de recomendações
Then a lista de recomendações está sem a música “Ride-Lana Del Rey” e com as músicas “Age of Love-Charlotte de Witte”, “Legacy-Sara Landry”, “Dori Me-Deborah de Luca”, “Metal Heart-Cat Power”

Cenário: Ver mais recomendações (serviço)
Given A usuária “Victória” está no sistema
And a playlist “Músicas recomendadas” associada a usuária “Victória” tem as músicas “Ride-Lana Del Rey”, “Age of Love-Charlotte de Witte”, “Legacy-Sara Landry”, “Dori Me-Deborah de Luca”, “Metal Heart-Cat Pow﻿er”
When seleciono a opção "Ver mais"
Then o sistema gera mais 5 recomendações e as adiciona a lista de recomendações “Rigid (Kobosil 44 Rush Mix)-Rosa Anschütz”,  “Hypnotized (Joyhauser Mix)-Amelie Lens”, “Shame-Low”, “Schwarze Schatten-Schepperlotte”, “City Looks Pretty-Courtney Barnett”
And agora a lista de recomendações do sistema tem 10 músicas: as 5 últimas músicas recomendadas “Ride-Lana Del Rey”, “Age of Love-Charlotte de Witte”, “Legacy-Sara Landry”, “Dori Me-Deborah de Luca”, “Metal Heart-Cat Pow﻿er” mais as 5 novas músicas recomendadas “Rigid (Kobosil 44 Rush Mix)-Rosa Anschütz”,  “Hypnotized (Joyhauser Mix)-Amelie Lens”, “Shame-Low”, “Schwarze Schatten-Schepperlotte”, “City Looks Pretty-Courtney Barnett”

Cenário: Não há recomendações suficientes (serviço)
Given A usuária “Victória” está no sistema
And o sistema não tem informações sobre as músicas escutadas
When espero que o sistema gere uma lista de recomendações com 5 músicas
Then o sistema mostra uma mensagem de erro “Você não ouviu músicas o suficientes para ter recomendações”