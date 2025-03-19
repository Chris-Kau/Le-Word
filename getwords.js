const fs = require('fs');

function getWordsSync() {
    const answers = fs.readFileSync(__dirname + "/answers.txt", "utf8").split('\n').map(line => line.trim());
    const additionalGuesses = fs.readFileSync(__dirname + "/additionalguesses.txt", "utf8").split('\n').map(line => line.trim());

    return [answers, additionalGuesses];
}

module.exports = getWordsSync;