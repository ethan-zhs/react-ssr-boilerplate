const log4js = require('log4js');

log4js.configure({
    appenders: {
        console: { type: 'console' },
        error: {
            type: 'dateFile',
            category: 'logError',
            filename: '/var/log/nginx/',
            pattern: 'node.error.log', // 错误日志输出
            alwaysIncludePattern: true,
            maxLogSize: 104800,
            backups: 100
        },
        info: {
            type: 'dateFile',
            category: 'logInfo',
            filename: '/var/log/nginx/',
            pattern: 'node.log', // 日志输出
            alwaysIncludePattern: true,
            maxLogSize: 104800,
            backups: 100
        }
    },
    categories: { 
        error: { appenders: ['error'], level: 'error' },
        info: { appenders: ['info'], level: 'info' },
        default: { appenders: ['info'], level: 'info' } 
    },
    pm2: true // 识别pm2 多进程部署，防止log无法打印
});

const loggerInfo = log4js.getLogger('info');
const loggerError = log4js.getLogger('error');

const logInit = function () {
    global.logger = {
        log: (...args) => {
            const argsStr = args.map(arg => arg.toString()).join(' ');
            loggerInfo.info(argsStr);
            console.log(...args);
        },
        error: (...args) => {
            const argsStr = args.map(arg => arg.toString()).join(' ');
            loggerError.error(argsStr);
            console.error(...args);
        }
    };
};

module.exports = logInit;
