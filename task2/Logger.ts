export type LogLevel = 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';

export interface LogEntry {
    timestamp: string;
    level: LogLevel;
    context: string;
    message: string;
}

export class Logger {
    private static instance: Logger | null = null;
    private logs: LogEntry[] = [];

    private constructor() {}

    public static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    public info(context: string, message: string): void {
        this.log('INFO', context, message);
    }

    public warn(context: string, message: string): void {
        this.log('WARN', context, message);
    }

    public error(context: string, message: string): void {
        this.log('ERROR', context, message);
    }

    public debug(context: string, message: string): void {
        this.log('DEBUG', context, message);
    }

    private log(level: LogLevel, context: string, message: string): void {
        const time = new Date().toLocaleTimeString();
        const entry: LogEntry = {
            timestamp: time,
            level,
            context,
            message
        };

        this.logs.push(entry);

        const badge = level === 'ERROR' ? '[ERROR] '
                    : level === 'WARN'  ? '[WARN ] '
                    : level === 'DEBUG' ? '[DEBUG] '
                    :                     '[INFO ] ℹ ';

        console.log(`[${time}] ${badge} [${context}] ${message}`);
    }

    public getLogs(): readonly LogEntry[] {
        return this.logs;
    }

    public getLogsByLevel(level: LogLevel): LogEntry[] {
        return this.logs.filter(entry => entry.level === level);
    }
}
