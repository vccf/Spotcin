Feature: Histórico de músicas e podcasts.
As a usuário,
I want to ver o histórico de músicas e podcasts,
So that eu posso saber quais as músicas e podcsts que eu mais ouço.

Scenario: Exibição do histórico de Múdicas dessa semana.
Given que o usuário “João” está logado em sua conta.
And ele está na página “inicial”. 
When ele seleciona a opção “Histórico”. 
And ele seleciona a opção “Histórico de Músicas”.
Then ele é redirecionado para a página “Histórico de Músicas”.
And ele vê o "Histórico de Músicas dessa semana".

Scenario: Exibição do histórico de podcasts dessa semana.
Given que o usuário “João” está logado em sua conta.
And ele está na página “inicial”. 
When ele seleciona a opção “Histórico”. 
And ele seleciona a opção “Histórico de Músicas”.
Then ele é redirecionado para a página “Histórico de podcasts".
And ele vê o "Histórico de podcasts dessa semana".

Scenario: Exibiçaõ do histórico de podcasts desde sempre.
Given que o usuário "John Connor" está logado em sua conta.
And ele está na página "Histórico de podcasts".
When ele seleciona a opção "Veja Mais".
Then ele é vê o Histórico de podcasts desde sempre".
