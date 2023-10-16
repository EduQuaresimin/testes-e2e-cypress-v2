/// <reference path="../support/commands.d.ts" />
describe('Log in into Scrach app', () => {
  it('successfully logs in', () => {
    cy.guiLogin()
  })
})