import type { BankAccount } from './BankAccount.ts';

export class RealBankAccount implements BankAccount {
    private accountNumber: string;
    private balance: number;

    constructor(accountNumber: string, initialBalance: number = 0) {
        this.accountNumber = accountNumber;
        this.balance = initialBalance;
    }

    withdraw(amount: number): void {
        if (amount <= 0) {
            console.log(`[XATOLIK] Noto'g'ri summa kiritildi: $${amount}. Summa musbat bo'lishi kerak.`);
            return;
        }

        if (amount > this.balance) {
            console.log(`[RAD ETILDI] Mablag' yetarli emas! Hisobingizda: $${this.balance}, so'ralgan: $${amount}`);
            return;
        }

        this.balance -= amount;
        console.log(`[MUVAFFAQINLI] Hisobdan $${amount} yechildi. Qolgan balans: $${this.balance}`);
    }

    getBalance(): number {
        return this.balance;
    }

    getAccountNumber(): string {
        return this.accountNumber;
    }
}
