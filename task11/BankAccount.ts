export interface BankAccount {
    withdraw(amount: number): void;
    getBalance(): number;
}
