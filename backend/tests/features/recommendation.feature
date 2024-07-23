Feature: Recommendations by user history
Scenario: Gerar lista de recomendações
Given A usuária "Victória" está no sistema 
When uma requisição "POST" for enviada para "/recommendations/generate"
Then o status da resposta deve ser "201"
And o JSON da resposta deve ser uma playlist de músicas
And as músicas "Ride-Lana Del Rey", "Age of Love-Charlotte de Witte", "Legacy-Sara Landry", "Dori Me-Deborah de Luca", "Metal Heart-Cat Powder" estão na playlist

Scenario: Excluir música(s) das recomendadas
Given A usuária "Victória" está no sistema 
And a playlist "Músicas recomendadas" associada a usuária "Victória" tem as músicas "Ride-Lana Del Rey", "Age of Love-Charlotte de Witte", "Legacy-Sara Landry", "Dori Me-Deborah de Luca", "Metal Heart-Cat Powder"
When uma requisição "DELETE" for enviada para "/recommendations/Victoria/Ride-Lana Del Rey" com o corpo da requisição sendo um JSON com a música "Ride-Lana Del Rey"
Then o status da resposta deve ser "200"
And o JSON da resposta deve ser uma playlist de músicas
And a música "Ride-Lana Del Rey" não está na playlist e as músicas "Age of Love-Charlotte de Witte", "Legacy-Sara Landry", "Dori Me-Deborah de Luca", "Metal Heart-Cat Powder" estão na playlist

Scenario: Ver mais recomendações
Given A usuária "Victória" está no sistema
And a playlist "Músicas recomendadas" associada a usuária "Victória" tem as músicas "Ride-Lana Del Rey", "Age of Love-Charlotte de Witte", "Legacy-Sara Landry", "Dori Me-Deborah de Luca", "Metal Heart-Cat Powder"
When uma requisição "POST" for enviada para "/recommendations/more"
Then o status da resposta deve ser "200"
And o JSON da resposta deve ser uma playlist de músicas
And as músicas "Ride-Lana Del Rey", "Age of Love-Charlotte de Witte", "Legacy-Sara Landry", "Dori Me-Deborah de Luca", "Metal Heart-Cat Powder", "Rigid (Kobosil 44 Rush Mix)-Rosa Anschütz",  "Hypnotized (Joyhauser Mix)-Amelie Lens", "Shame-Low", "Schwarze Schatten-Schepperlotte", "City Looks Pretty-Courtney Barnett" estão na playlist

Scenario: Não há recomendações suficientes
Given A usuária "Victória" está no sistema
And a playlist "Músicas recomendadas" associada a usuária "Victória" está vazia
When uma requisição "POST" for enviada para "/recommendations/check"
Then o status da resposta deve ser "400"
And o sistema mostra uma mensagem de erro "Você não ouviu músicas o suficientes para ter recomendações"

Scenario: Ver histórico de recomendações
Given A usuária "Victória" está no sistema
And a playlist "Músicas recomendadas" associada a usuária "Victória" tem as músicas "Ride-Lana Del Rey", "Age of Love-Charlotte de Witte", "Legacy-Sara Landry", "Dori Me-Deborah de Luca", "Metal Heart-Cat Powder"
When uma requisição "GET" for enviada para "/recommendations/history/:userId"
Then o status da resposta deve ser "200"
And o JSON da resposta deve ser uma playlist de músicas
And as músicas "Ride-Lana Del Rey", "Age of Love-Charlotte de Witte", "Legacy-Sara Landry", "Dori Me-Deborah de Luca", "Metal Heart-Cat Powder" estão na playlist
