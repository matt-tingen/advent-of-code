const main = require('../../util/main');
const _ = require('lodash');
const numValidPassphrases = require('./numValidPassphrases');

module.exports = exports = numValidPassphrases(passphrase => {
  const words = passphrase.split(' ');
  return words.length === _.uniq(words).length;
});

if (!module.parent) {
  main(exports);
}
