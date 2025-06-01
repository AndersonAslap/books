const PerformanceCalculator = require('./performance-calculator');

function createStatementData(invoice, plays) {
    const statementData = {};
    statementData.customer = invoice.customer;
    statementData.performances = invoice.performances.map(item => enrichPerformance(item, plays));
    statementData.totalAmount = totalAmount(statementData.performances);
    statementData.totalVolumeCredits = totalVolumeCredits(statementData.performances);
    return statementData;
}

function amountFor(aPerformance) {
    let result = 0;
    switch (aPerformance.play.type) {
        case "tragedy":
            result = 40000;
            if (aPerformance.audience > 30) {
                result += 1000 * (aPerformance.audience - 30);
            }
            break;
        case "comedy":
            result = 30000;
            if (aPerformance.audience > 20) {
                result += 10000 + 500 * (aPerformance.audience - 20);
            }
            result += 300 * aPerformance.audience;
            break;
        default:
            throw new Error(`unknown type: ${aPerformance.play.type}`);
    }
    return result;
}

function playFor(aPerformance, plays) {
    return plays[aPerformance.playID];
}

function volumeCreditsFor(aPerformance) {
    let result = 0;
    result += Math.max(aPerformance.audience - 30, 0);
    if ("comedy" == aPerformance.play.type) {
        result += Math.floor(aPerformance.audience / 5);
    }     
    return result;
}

function totalAmount(aPerformances) {
    return aPerformances
        .reduce((total, p) => total + p.amount, 0);
}

function totalVolumeCredits(aPerformances) {
    return aPerformances
        .reduce((total, p) => total + p.volumeCredits, 0);
}

function enrichPerformance(aPerformance, plays) {
    const calculator = new PerformanceCalculator(aPerformance, playFor(aPerformance, plays));
    const result = Object.assign({}, aPerformance);
    result.play = calculator.play;
    result.amount = amountFor(result);
    result.volumeCredits = volumeCreditsFor(result);
    return result;
}

module.exports = createStatementData;