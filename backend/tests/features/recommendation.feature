Feature: Recommendations by user history
Scenerio: Gerar lista de recomendações
Given A usuária “Victória” está no sistema 
And o sistema possui acesso aos dados do perfil do usuário, histórico de reprodução e interações anteriores. 
When espero que o sistema gere uma lista de recomendações com 5 músicas
Then o sistema analisa os dados do perfil do usuário e histórico de músicas ouvidas.
And o sistema gera uma lista de recomendações com 5 músicas que podem ser visualizadas pelo usuário “Ride-Lana Del Rey”, “Age of Love-Charlotte de Witte”, “Legacy-Sara Landry”, “Dori Me-Deborah de Luca”, “Metal Heart-Cat Pow﻿er”

Scenerio: Excluir música(s) das recomendadas
Given A usuária “Victória” está no sistema 
And a playlist “Músicas recomendadas” associada a usuária “Victória” tem as músicas “Ride-Lana Del Rey”, “Age of Love-Charlotte de Witte”, “Legacy-Sara Landry”, “Dori Me-Deborah de Luca”, “Metal Heart-Cat Pow﻿er”
When seleciono a música “Ride-Lana Del Rey” e a exclui da lista de recomendações
Then a lista de recomendações está sem a música “Ride-Lana Del Rey” e com as músicas “Age of Love-Charlotte de Witte”, “Legacy-Sara Landry”, “Dori Me-Deborah de Luca”, “Metal Heart-Cat Power”

Scenerio: Ver mais recomendações
Given A usuária “Victória” está no sistema
And a playlist “Músicas recomendadas” associada a usuária “Victória” tem as músicas “Ride-Lana Del Rey”, “Age of Love-Charlotte de Witte”, “Legacy-Sara Landry”, “Dori Me-Deborah de Luca”, “Metal Heart-Cat Pow﻿er”
When seleciono a opção “Ver mais”
Then o sistema gera mais 5 recomendações e as adiciona a lista de recomendações “Rigid (Kobosil 44 Rush Mix)-Rosa Anschütz”,  “Hypnotized (Joyhauser Mix)-Amelie Lens”, “Shame-Low”, “Schwarze Schatten-Schepperlotte”, “City Looks Pretty-Courtney Barnett”
And agora a lista de recomendações do sistema tem 10 músicas: as 5 últimas músicas recomendadas “Ride-Lana Del Rey”, “Age of Love-Charlotte de Witte”, “Legacy-Sara Landry”, “Dori Me-Deborah de Luca”, “Metal Heart-Cat Pow﻿er” mais as 5 novas músicas recomendadas “Rigid (Kobosil 44 Rush Mix)-Rosa Anschütz”,  “Hypnotized (Joyhauser Mix)-Amelie Lens”, “Shame-Low”, “Schwarze Schatten-Schepperlotte”, “City Looks Pretty-Courtney Barnett”

Scenerio: Não há recomendações suficientes
Given A usuária “Victória” está no sistema
And o sistema não tem informações sobre as músicas escutadas
When espero que o sistema gere uma lista de recomendações com 5 músicas
Then o sistema mostra uma mensagem de erro “Você não ouviu músicas o suficientes para ter recomendações”

Scenerio: Ver histórico de recomendações
Given A usuária “Victória” está no sistema
And as músicas “Ride-Lana Del Rey”, “Age of Love-Charlotte de Witte”, “Legacy-Sara Landry”, “Dori Me-Deborah de Luca”, “Metal Heart-Cat Powder” foram previamente recomendadas
When seleciono a opção “Histórico de recomendações”
Then o sistema mostra o histórico de recomendações (as recomendações atuais e recomendações antigas): 1 playlist com as músicas “Ride-Lana Del Rey”, “Age of Love-Charlotte de Witte”, “Legacy-Sara Landry”, “Dori Me-Deborah de Luca”, “Metal Heart-Cat Power”
