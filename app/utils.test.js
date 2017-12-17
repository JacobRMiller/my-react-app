const utils = require('./utils.js');

it("should add two numbers", () => {
    var r = utils.add(20,80);

    if (r != 100) {
        throw new Error(`Value not expected 4 but got ${r}.`);  
     }
});