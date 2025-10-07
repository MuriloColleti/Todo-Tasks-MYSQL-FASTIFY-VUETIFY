describe('User Dialog', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login')

    cy.get('[data-testid="email-input"]').type('admin@email.com')
    cy.get('[data-testid="password-input"]').type('123456')
    cy.contains('button', 'Logar').click()

    cy.url().should('include', '/')
    cy.wait(500)

    cy.get('[data-testid="nav-drawer-btn"]').click({ force: true })

    cy.contains('.v-list-item', 'Usuarios').click({ force: true })
    cy.url().should('include', '/users')
  })

  it('deve criar um novo usuário', () => {
    cy.contains('button', 'Novo Usuario').click({ force: true })

    cy.get('[data-testid="username-input"]').type('teste_user')
    cy.get('[data-testid="email-input"]').type('teste_user@email.com')
    cy.get('[data-testid="password-input"]').type('123456')

    cy.contains('button', 'Salvar').click({ force: true })

    cy.contains('td', 'teste_user').should('exist')
  })

  it('deve editar o usuário criado', () => {
    cy.contains('td', 'teste_user')
      .parent('tr')
      .within(() => {
        cy.get('[data-testid="edit-user-btn"]').click({ force: true })
      })

    cy.get('[data-testid="username-input"]').clear().type('teste_user_editado')
    cy.contains('button', 'Salvar').click({ force: true })

    cy.contains('td', 'teste_user_editado').should('exist')
  })

  it('deve remover o usuário editado', () => {
    cy.contains('td', 'teste_user_editado')
      .parent('tr')
      .within(() => {
        cy.get('[data-testid="delete-user-btn"]').click({ force: true })
      })

    cy.get('body').then(($body) => {
      if ($body.find('[data-testid="confirm-delete-btn"]').length) {
        cy.get('[data-testid="confirm-delete-btn"]').click({ force: true })
      }
    })

    cy.contains('td', 'teste_user_editado').should('not.exist')
  })
})
