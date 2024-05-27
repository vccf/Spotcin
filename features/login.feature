Feature: Login
    As a user
    I want to be able to login to the application
    So that I can access my account

    Scenario: Cadastro com sucesso
        Given o usuário está na página "cadastro"
        And não existe um usuário cadastrado com email "john_2@example.com"
        When o usuário insere um email válido "john_2@example.com"
        And o usuário insere uma senha válida "novaSenha123"
        And o usuário insere seu nome "John Jones"
        And o usuário seleciona a opção “Cadastrar”
        Then o usuário é cadastrado com sucesso
        And o usuário deve ser redirecionado para a página "inicial"
        And deve ver uma mensagem "Cadastro realizado com sucesso! Bem-vindo"