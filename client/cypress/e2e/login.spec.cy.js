/* eslint-env cypress */

describe('Tela de Login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login')
  })

  it('deve mostrar os campos de email e senha', () => {
    cy.get('[data-testid="email-input"] input').should('exist', { force: true })
    cy.get('[data-testid="password-input"] input').should('exist', { force: true })
    cy.contains('button', 'Logar').should('exist')
  })

  it('deve mostrar erro se o login for inválido', () => {
    cy.get('[data-testid="email-input"] input').type('usuario@invalido.com', { force: true })
    cy.get('[data-testid="password-input"] input').type('senhaErrada', { force: true })
    cy.contains('button', 'Logar').click()

    cy.contains('Credenciais inválidas').should('be.visible')
  })

  it('deve logar com sucesso e redirecionar para /home', () => {
    cy.get('[data-testid="email-input"] input').type('admin@email.com', { force: true })
    cy.get('[data-testid="password-input"] input').type('123456', { force: true })
    cy.contains('button', 'Logar').click()

    cy.url().should('include', '/')
  })
})
