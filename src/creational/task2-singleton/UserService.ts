import { Logger } from './Logger.ts';
import { Database } from './Database.ts';

export class UserService {
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
