Recomendações com base no escutado pelo usuário:
Analisando as músicas escutadas pelo usuário recomendar 5 novas músicas que o usuário ainda não ouviu e provavelmente vai gostar

Cenário: Criar ﻿playlist com recomendaçõe﻿s (GUI)
Given a usuária “Victória” está logada 
And estou na página “Recomendações”
When seleciono a opção “Criar playlist”
Then sou redirecionada para a página “Músicas recomendadas” com 1 playlist das 5 últimas músicas recomendadas “Ride-Lana Del Rey”, “Age of Love-Charlotte de Witte”, “Legacy-Sara Landry”, “Dori Me-Deborah de Luca”, “Metal Heart-Cat Pow﻿er”

Cenário: Não há recomendações suficientes (GUI)
Given a usuária “Victória” está logada 
And estou na página “Recomendações”
When seleciono a opção “Criar playlist”
Then  continuo na página “Recomendações”
And vejo uma mensagem “Você não ouviu músicas o suficientes para ter recomendações”

