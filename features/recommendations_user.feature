Recomendações com base no escutado pelo usuário:
Analisando as músicas escutadas pelo usuário recomendar 5 novas músicas que o usuário ainda não ouviu e provavelmente vai gostar

Cenário: Recomendações mais recentes (GUI)
Given a usuária “Victória” está logada 
And estou na página “Recomendações”
When seleciono a opção “Recomendações mais recentes”
Then sou redirecionada para a página “Músicas recomendadas” com 1 playlist das 5 últimas músicas recomendadas “Ride-Lana Del Rey”, “Age of Love-Charlotte de Witte”, “Legacy-Sara Landry”, “Dori Me-Deborah de Luca”, “Metal Heart-Cat Pow﻿er”

Cenário: Criar ﻿playlist com recomendaçõe﻿s (GUI)
Given a usuária “Victória” está logada 
And estou na página “Recomendações”
When seleciono a opção “Criar playlist”
Then sou redirecionada para a página “Músicas recomendadas” com 1 playlist das 5 últimas músicas recomendadas “Ride-Lana Del Rey”, “Age of Love-Charlotte de Witte”, “Legacy-Sara Landry”, “Dori Me-Deborah de Luca”, “Metal Heart-Cat Pow﻿er”

Cenário: Excluir música(s) da playlist recomendações (GUI)
Given a usuária “Victória” está logada 
And estou na página “Músicas recomendadas”
And posso visualizar as músicas “Ride-Lana Del Rey”, “Age of Love-Charlotte﻿ de Witte”, “Legacy-Sara Landry”, “Dori Me-Deborah de Luca”, “Metal Heart-Cat Pow﻿er”
When seleciono a opção “excluir” associada a música  “Ride-Lana Del Rey”
Then a página “Músicas recomendadas” é recarregada com 1 playlist das músicas recomendadas sem a música “Ride-Lana Del Rey” e com as músicas “Age of Love-Charlotte﻿ de Witte”, “Legacy-Sara Landry”, “Dori Me-Deborah de Luca”, “Metal Heart-Cat Pow﻿er”

Cenário: Histórico de recomendações (GUI)
Given a usuária “Victória” está logada 
And estou na página “Recomendações”
When seleciono a opção “Histórico de recomendações”
Then sou redirecionado para a página “Histórico de recomendações” com recomendações antigas

Cenário: Ver mais recomendações (GUI)
Given a usuária “Victória” está logada 
And estou na página “Recomendações”
When seleciono a opção “Ver mais recomendações”
Then sou redirecionado para a página “Músicas recomendadas” com 10 músicas: as 5 últimas músicas recomendadas “Ride-Lana Del Rey”, “Age of Love-Charlotte de Witte”, “Legacy-Sara Landry”, “Dori Me-Deborah de Luca”, “Metal Heart-Cat Pow﻿er” mais as 5 novas músicas recomendadas “Rigid (Kobosil 44 Rush Mix)-Rosa Anschütz”,  “Hypnotized (Joyhauser Mix)-Amelie Lens”, “Shame-Low”,  “Schwarze Schatten-Schepperlotte”,  “City Looks Pretty-Courtney Barnett”

Cenário:  Ver mais recomendações (II) (GUI)
Given a usuária “Victória” está logada 
And estou na página “Músicas recomendadas”
And posso visualizar as músicas “Ride-Lana Del Rey”, “Age of Love-Charlotte de Witte”, “Legacy-Sara Landry”, “Dori Me-Deborah de Luca”, “Metal Heart-Cat Pow﻿er”
When seleciono a opção “Ver mais”
Then continuo na página “Músicas recomendadas” com 10 músicas: as 5 últimas músicas recomendadas “Ride-Lana Del Rey”, “Age of Love-Charlotte de Witte”, “Legacy-Sara Landry”, “Dori Me-Deborah de Luca”, “Metal Heart-Cat Pow﻿er” mais as 5 novas músicas recomendadas “Rigid (Kobosil 44 Rush Mix)-Rosa Anschütz”,  “Hypnotized (Joyhauser Mix)-Amelie Lens”, “Shame-Low”, “Schwarze Schatten-Schepperlotte”, “City Looks Pretty-Courtney Barnett”

Cenário: Não há recomendações suficientes (GUI)
Given a usuária “Victória” está logada 
And estou na página “Recomendações”
When seleciono a opção “Criar playlist”
Then  continuo na página “Recomendações”
And vejo uma mensagem “Você não ouviu músicas o suficientes para ter recomendações”

