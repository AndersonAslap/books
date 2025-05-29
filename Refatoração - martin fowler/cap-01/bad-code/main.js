const invoices = require("../data/invoices.json");
const plays = require("../data/plays.json");
const statement = require("./statement");

try {
    const result = statement(invoices[0], plays);
    console.log(result);
} catch (err) {
    console.error(err);
}