import { faker } from '@faker-js/faker'

describe('Sign up on Scrach app', () => {
  const emailAddress = `${faker.string.uuid()}@${Cypress.env('MAILOSAUR_SERVER_ID')}.mailosaur.net`
  const password = Cypress.env('USER_PASSWORD')
  it('successfully signs up using confirmation code sent via email', () => {
    cy.fillSignupFormAndSubmit(emailAddress, password)
    cy.contains('h1', 'Your Notes')
      .should('be.visible')
  })
})