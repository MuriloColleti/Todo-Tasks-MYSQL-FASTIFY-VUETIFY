// cypress/e2e/tasks.spec.cy.js
describe('Task Dialog', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login')

    cy.get('[data-testid="email-input"]').type('admin@email.com')
    cy.get('[data-testid="password-input"]').type('123456')
    cy.contains('button', 'Logar').click()

    cy.url().should('include', '/')
  })

  it('deve abrir o diálogo e preencher os campos para criar uma task', () => {
    cy.get('[data-testid="new-task-btn"]').click({ force: true })

    cy.get('.v-dialog').should('be.visible')
    cy.contains('Criar Tarefa').should('exist')

    cy.get('[data-testid="title-input"]').type('Minha Nova Task')
    cy.get('[data-testid="body-input"]').type('Descrição da task')

    cy.get('[data-testid="user-select"]').click({ force: true })

    cy.get('body').find('.v-list-item').contains('admin').click({ force: true })

    cy.get('[data-testid="prioridade-select"]').click({ force: true })
    cy.get('body').find('.v-list-item').contains('Alta').click({ force: true })

    cy.get('[data-testid="status-select"]').click({ force: true })
    cy.get('body').find('.v-list-item').contains('Concluido').click({ force: true })

    cy.get('button').contains('Salvar').should('not.be.disabled').click({ force: true })
  })

  it('deve fechar o diálogo ao clicar em cancelar', () => {
    cy.get('[data-testid="new-task-btn"]').click({ force: true })
    cy.get('button').contains('Cancelar').click({ force: true })
  })
})
