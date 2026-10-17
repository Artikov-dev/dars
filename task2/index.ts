type LogLevel = 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';

interface LogEntry {
    timestamp: string;
    level: LogLevel;
    context: string;
    message: string;
}

class Logger {
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

        const badge = level === 'ERROR' ? '[ERROR] ❌'
                    : level === 'WARN'  ? '[WARN ] ⚠️ '
                    : level === 'DEBUG' ? '[DEBUG] 🔍'
                    :                     '[INFO ] ℹ️ ';

        console.log(`[${time}] ${badge} [${context}] ${message}`);
    }

    public getLogs(): readonly LogEntry[] {
        return this.logs;
    }

    public getLogsByLevel(level: LogLevel): LogEntry[] {
        return this.logs.filter(entry => entry.level === level);
    }
}

class Database {
    private static instance: Database | null = null;
    private isConnected: boolean = false;
    private logger = Logger.getInstance();

    private constructor() {
        this.logger.info('Database', 'Ma\'lumotlar bazasi pooli yaratildi');
    }

    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    public connect(): void {
        this.isConnected = true;
        this.logger.info('Database', 'PostgreSQL serveriga ulandi');
    }

    public query(sql: string): void {
        if (!this.isConnected) {
            this.logger.error('Database', `So'rov bajarilmadi, baza ulanmagan: ${sql}`);
            return;
        }
        this.logger.debug('Database', `SQL bajarildi: ${sql}`);
    }

    public disconnect(): void {
        this.isConnected = false;
        this.logger.info('Database', 'Baza ulanishi uzildi');
    }
}

class UserService {
    private logger = Logger.getInstance();
    private db = Database.getInstance();

    public register(username: string): void {
        this.logger.info('UserService', `Foydalanuvchi ro'yxatdan o'tkazilmoqda: ${username}`);
        this.db.query(`INSERT INTO users VALUES ('${username}')`);
        this.logger.info('UserService', `Foydalanuvchi muvaffaqiyatli saqlandi: ${username}`);
    }

    public login(username: string, passwordLength: number): void {
        if (passwordLength < 6) {
            this.logger.warn('UserService', `Xavfsiz bo'lmagan parol bilan kirish urinishi: ${username}`);
            return;
        }
        this.logger.info('UserService', `Tizimga muvaffaqiyatli kirdi: ${username}`);
    }
}

function main(): void {
    console.log("=== 1. SINGLETON IDENTITY TEKSHIRUVI ===");
    const logger1 = Logger.getInstance();
    const logger2 = Logger.getInstance();
    console.log(`logger1 === logger2: ${logger1 === logger2}`);

    const db1 = Database.getInstance();
    const db2 = Database.getInstance();
    console.log(`db1 === db2: ${db1 === db2}\n`);

    console.log("=== 2. ISHLASH JARAYONI VA LOGLAR ===");
    db1.connect();

    const userService = new UserService();
    userService.register("ali_coder");
    userService.login("ali_coder", 8);
    userService.login("hacker", 4);

    db2.disconnect();
    db2.query("SELECT * FROM users");

    console.log("\n=== 3. YAGONA XOTIRADAGI LOGLAR TAHLILI ===");
    console.log(`Jami loglar: ${logger2.getLogs().length} ta`);
    console.log(`Xatolar (ERROR): ${logger2.getLogsByLevel('ERROR').length} ta`);
    console.log(`Ogohlantirishlar (WARN): ${logger2.getLogsByLevel('WARN').length} ta`);
}

main();
