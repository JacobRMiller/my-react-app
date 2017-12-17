require ('./utils.js');

const utils = require('./utils.js');

it("should add two numbers", () => {
    var r = utils.add(2,1);

    if (r != 4) {
        throw new Error('Value not expected 4 but got ${r}.');    }
});