import { Logger } from './Logger.ts';

export class Database {
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
