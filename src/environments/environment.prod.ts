export const environment = {
    production: true,
    apiBaseUrl: 'https://c2pc23z3g56uv27migqpynpnkq0jrpmi.lambda-url.ap-southeast-2.on.aws/',
    quizUrl: 'quiz',
    quizFunction: {
        path: 'quiz',
        actioncd: {
            getquiz: '?actioncd=getquiz',
            getquizitems: '?actioncd=getquizitems',
            getscoredetails: '?actioncd=getscoredetails'
        }
    }
};