/// <reference path="../support/commands.d.ts" />
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
  it('logs out', { tags: '@desktop-and-tablet' }, () => {
    cy.visit('/')
    cy.wait('@getNotes')

    if (Cypress.config('viewportWidth') < Cypress.env('viewportWidthBreakpoint')) {
      cy.get('.navbar-toggle.collapsed')
        .should('be.visible')
        .click()
    }

    cy.contains('.nav a', 'Logout')
      .click()
    cy.get('#email')
      .should('be.visible')
  })
})