const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://notes-serverless-app.com/',
    env: {
      viewportWidthBreakpoint: 768,
    }
  },
  projectId: '9y3wth',
  chromeWebSecurity: false,
})
