/* eslint-env cypress */

describe('Tela de Login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/register')
  })

  it('deve mostrar os campos', () => {
    cy.get('[data-testid="username-input"] input').should('exist', { force: true })
    cy.get('[data-testid="email-input"] input').should('exist', { force: true })
    cy.get('[data-testid="password-input"] input').should('exist', { force: true })
    cy.contains('button', 'Registrar').should('exist')
  })

  it('deve registrar com sucesso e redirecionar para /login', () => {
    cy.get('[data-testid="username-input"] input').type('Cypress', { force: true })
    cy.get('[data-testid="email-input"] input').type('cypress@email.com', { force: true })
    cy.get('[data-testid="password-input"] input').type('123456', { force: true })
    cy.contains('button', 'Registrar').click()

    cy.url().should('include', '/login')
  })
})
