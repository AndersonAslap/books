const invoices = require("../data/invoices.json");
const plays = require("../data/plays.json");
const {statement, htmlStatement} = require("./statement");

try {
    const result = statement(invoices[0], plays);
    console.log(result);

    console.log("\n");

    const result2 = htmlStatement(invoices[0], plays);
    console.log(result2);
} catch (err) {
    console.error(err);
}