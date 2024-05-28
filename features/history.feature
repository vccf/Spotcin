Feature: Histórico de músicas e podcasts.
As a usuário,
I want to ver o histórico de músicas e podcasts,
So that eu posso saber quais as músicas e podcsts que eu mais ouço.

Scenario: Exibição do histórico de músicas/podcasts desta semana.
Given o usuário “João” está logado em sua conta.
And ele está na página “inicial”. 
When ele seleciona a opção “Histórico”. 
And ele seleciona a opção “Histórico de Músicas”.
Then ele é redirecionado para a página “Histórico de Músicas dessa semana”.

Scenario: Exibição do histórico de músicas/podcasts desde sempre.
Given o usuário “João” está logado em sua conta.
And ele está na página “inicial”. 
When ele seleciona a opção “Histórico”. 
And ele seleciona a opção “Histórico de Músicas”.
Then ele é redirecionado para a página “Histórico de Músicas”.
