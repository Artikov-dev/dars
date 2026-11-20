import type { BankAccount } from './BankAccount.ts';
import { RealBankAccount } from './RealBankAccount.ts';

export class BankAccountProxy implements BankAccount {
    private realAccount: RealBankAccount;
    private authenticated: boolean = false;
    private currentUser: string | null = null;

    constructor(realAccount: RealBankAccount) {
        this.realAccount = realAccount;
    }

    login(username: string): void {
        this.authenticated = true;
        this.currentUser = username;
        console.log(`[TIZIMGA KIRILDI] Foydalanuvchi "${username}" tizimga muvaffaqiyatli kirdi.`);
    }

    logout(): void {
        console.log(`[TIZIMDAN CHIQILDI] Foydalanuvchi "${this.currentUser}" tizimdan chiqdi.`);
        this.authenticated = false;
        this.currentUser = null;
    }

    isAuthenticated(): boolean {
        return this.authenticated;
    }

    withdraw(amount: number): void {
        console.log(`--> Pul yechishga urinish: $${amount}`);
        if (!this.authenticated) {
            console.log(`[OPERATSIYA TAQIQLANDI] Xatolik: Foydalanuvchi tizimga kirmagan! Pul yechish uchun avval tizimga kiring.\n`);
            return;
        }

        console.log(`[RUXSAT BERILDI] Foydalanuvchi autentifikatsiyadan o'tgan.`);
        this.realAccount.withdraw(amount);
        console.log();
    }

    getBalance(): number {
        if (!this.authenticated) {
            console.log(`[OPERATSIYA TAQIQLANDI] Balansni ko'rish uchun tizimga kirish talab qilinadi.`);
            return 0;
        }
        return this.realAccount.getBalance();
    }
}
