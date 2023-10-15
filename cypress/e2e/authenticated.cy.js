import { faker } from '@faker-js/faker'

describe('Scenarios where authentication is a pre-condition', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/notes').as('getNotes')
    cy.sessionLogin()
  })
  it('successfully submits the settings form', () => {
    cy.intercept('POST', '**/prod/billing')
      .as('paymentRequest')

    cy.fillSettingsFormAndSubmit()
    cy.wait('@getNotes')
    cy.wait('@paymentRequest')
      .its('state')
      .should('be.equal', 'Complete')
  })
  it('CRUDs a note', () => {
    const noteDescription = faker.lorem.words(3)
    const updatedDescription = faker.lorem.words(4)

    cy.createNote(noteDescription)
    cy.wait('@getNotes')

    const attachFile = true

    cy.editNote(noteDescription, updatedDescription, attachFile)
    cy.wait('@getNotes')

    cy.deleteNote(updatedDescription)
    cy.wait('@getNotes')
  })
})