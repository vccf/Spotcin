// cypress/e2e/duckduckgo.ts
import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

//When("I visit duckduckgo.com", () => {
//  cy.visit("https://www.duckduckgo.com");
//});

//Then("I should see a search bar", () => {
//  cy.get("input").should(
//    "have.attr",
//    "placeholder",
//    "Search the web without being tracked"
//  );
//});

//Cenário 1: Recomendações mais recentes (GUI)

it('Recomendações mais recentes', () => {
  // Login como Victória
  // Navegar até a página de Recomendações

  // Selecionar a opção "Recomendações mais recentes"
  cy.contains('Recomendações mais recentes').click();

  // Verificar redirecionamento para a página correta
  cy.url().should('include', '/musicas-recomendadas');

  // Verificar se a playlist contém as músicas corretas
  cy.get('.playlist').should('contain', 'Ride-Lana Del Rey');
  cy.get('.playlist').should('contain', 'Age of Love-Charlotte de Witte');
  cy.get('.playlist').should('contain', 'Legacy-Sara Landry');
  cy.get('.playlist').should('contain', 'Dori Me-Deborah de Luca');
  cy.get('.playlist').should('contain', 'Metal Heart-Cat Power');
});

//Cenário 2: Criar playlist com recomendações (GUI)

it('Criar playlist com recomendações', () => {
  // Login como Victória
  // Navegar até a página de Recomendações

  // Selecionar a opção "Criar playlist"
  cy.contains('Criar playlist').click();

  // Verificar redirecionamento para a página de Músicas recomendadas
  cy.url().should('include', '/musicas-recomendadas');

  // Verificar se a playlist contém as músicas corretas
  cy.get('.playlist').should('contain', 'Ride-Lana Del Rey');
  cy.get('.playlist').should('contain', 'Age of Love-Charlotte de Witte');
  cy.get('.playlist').should('contain', 'Legacy-Sara Landry');
  cy.get('.playlist').should('contain', 'Dori Me-Deborah de Luca');
  cy.get('.playlist').should('contain', 'Metal Heart-Cat Power');
});

//Cenário 3: Excluir música(s) da playlist recomendações (GUI)

it('Excluir música(s) da playlist recomendações', () => {
  // Login como Victória
  // Navegar até a página de Músicas recomendadas

  // Selecionar a opção "excluir" associada à música "Ride-Lana Del Rey"
  cy.contains('.playlist-item', 'Ride-Lana Del Rey').find('.excluir-button').click();

  // Verificar se a página é recarregada com a música removida
  cy.get('.playlist').should('not.contain', 'Ride-Lana Del Rey');
  cy.get('.playlist').should('contain', 'Age of Love-Charlotte de Witte');
  cy.get('.playlist').should('contain', 'Legacy-Sara Landry');
  cy.get('.playlist').should('contain', 'Dori Me-Deborah de Luca');
  cy.get('.playlist').should('contain', 'Metal Heart-Cat Power');
});

//Cenário 4: Histórico de recomendações (GUI)

it('Histórico de recomendações', () => {
  // Login como Victória
  // Navegar até a página de Recomendações

  // Selecionar a opção "Histórico de recomendações"
  cy.contains('Histórico de recomendações').click();

  // Verificar redirecionamento para a página correta
  cy.url().should('include', '/historico-recomendacoes');

  // Verificar se a playlist de histórico contém as músicas corretas
  cy.get('.historico-playlist').should('contain', 'Ride-Lana Del Rey');
  cy.get('.historico-playlist').should('contain', 'Age of Love-Charlotte de Witte');
  cy.get('.historico-playlist').should('contain', 'Legacy-Sara Landry');
  cy.get('.historico-playlist').should('contain', 'Dori Me-Deborah de Luca');
  cy.get('.historico-playlist').should('contain', 'Metal Heart-Cat Power');
});

//Cenário 5: Ver mais recomendações (GUI)

it('Ver mais recomendações', () => {
  // Login como Victória
  // Navegar até a página de Recomendações

  // Selecionar a opção "Ver mais recomendações"
  cy.contains('Ver mais recomendações').click();

  // Verificar redirecionamento para a página de Músicas recomendadas com 10 músicas
  cy.url().should('include', '/musicas-recomendadas');

  // Verificar se a playlist contém as últimas 5 e as 5 novas músicas recomendadas
  cy.get('.playlist').should('contain', 'Ride-Lana Del Rey');
  cy.get('.playlist').should('contain', 'Age of Love-Charlotte de Witte');
  cy.get('.playlist').should('contain', 'Legacy-Sara Landry');
  cy.get('.playlist').should('contain', 'Dori Me-Deborah de Luca');
  cy.get('.playlist').should('contain', 'Metal Heart-Cat Power');
  cy.get('.playlist').should('contain', 'Rigid (Kobosil 44 Rush Mix)-Rosa Anschütz');
  cy.get('.playlist').should('contain', 'Hypnotized (Joyhauser Mix)-Amelie Lens');
  cy.get('.playlist').should('contain', 'Shame-Low');
  cy.get('.playlist').should('contain', 'Schwarze Schatten-Schepperlotte');
  cy.get('.playlist').should('contain', 'City Looks Pretty-Courtney Barnett');
});

//Cenário 6: Ver mais recomendações (II) (GUI)

it('Ver mais recomendações (II)', () => {
  // Login como Victória
  // Navegar até a página de Músicas recomendadas

  // Selecionar a opção "Ver mais"
  cy.contains('Ver mais').click();

  // Verificar se continuo na página de Músicas recomendadas com 10 músicas
  cy.url().should('include', '/musicas-recomendadas');

  // Verificar se a playlist contém as últimas 5 e as 5 novas músicas recomendadas
  cy.get('.playlist').should('contain', 'Ride-Lana Del Rey');
  cy.get('.playlist').should('contain', 'Age of Love-Charlotte de Witte');
  cy.get('.playlist').should('contain', 'Legacy-Sara Landry');
  cy.get('.playlist').should('contain', 'Dori Me-Deborah de Luca');
  cy.get('.playlist').should('contain', 'Metal Heart-Cat Power');
  cy.get('.playlist').should('contain', 'Rigid (Kobosil 44 Rush Mix)-Rosa Anschütz');
  cy.get('.playlist').should('contain', 'Hypnotized (Joyhauser Mix)-Amelie Lens');
  cy.get('.playlist').should('contain', 'Shame-Low');
  cy.get('.playlist').should('contain', 'Schwarze Schatten-Schepperlotte');
  cy.get('.playlist').should('contain', 'City Looks Pretty-Courtney Barnett');
});

//Cenário 7: Não há recomendações suficientes (GUI)

it('Não há recomendações suficientes', () => {
  // Login como Victória
  // Navegar até a página de Recomendações

  // Selecionar a opção "Criar playlist"
  cy.contains('Criar playlist').click();

  // Verificar se permaneço na página de Recomendações
  cy.url().should('include', '/recomendacoes');

  // Verificar se vejo a mensagem correta
  cy.contains('Você não ouviu músicas o suficiente para ter recomendações');
});