exports.config = {
  tests: './*_test.js',
  output: './output',
  helpers: {
    MailSlurp: {
      apiKey: 'your-api-key',
      require: '@codeceptjs/mailslurp-helper',
    },
  },
  bootstrap: null,
  mocha: {},
  name: 'codeceptjs',
};
