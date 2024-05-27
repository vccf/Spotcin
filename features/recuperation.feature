Feature: Recuperação de senha via e-mail/Esqueci a senha.
As a usuário,
I want to recuperar a minha senha pelo e-mail, 
So that eu posso recuperar o acesso a minha conta.

Scenario: Recuperação da conta via e-mail com sucesso.
Given que o usuário “John Connor” está na página “Recuperação da Senha”.
And o usuário “John Connor” está cadastrado no sistema com o e-mail “john.connor@ufpe.br” e senha “Todos contra a Skynet”.
When ele preencher o campo e-mail com “john.connor@ufpe.br”
And ele seleciona a opção “Enviar”.
Then ele recebe no e-mail “john.connor@ufpe.br” a senha “Todos contra a Skynet”.

Scenario: Falha na recuperação da conta via e-mail.
Given que o usuário “John Connor” está na página “Recuperação da Senha”.
And não existe o email “john.connor@ufpe.br” cadastrado no sistema.
When ele preencher o campo e-mail com “john.connor@ufpe.br”
And ele seleciona a opção “Enviar”.
Then ele vê uma mensagem de erro “email não cadastrado”.
