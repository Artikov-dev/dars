import { RealBankAccount } from './RealBankAccount.ts';
import { BankAccountProxy } from './BankAccountProxy.ts';

export class BankApp {
    static main() {
        console.log("==================================================");
        console.log("   BANK HISOBIGA KIRISHNI BOSHQARISH TIZIMI (PROXY)");
        console.log("==================================================\n");

        const realAccount = new RealBankAccount("UZB-8888-1234", 1000);
        const proxyAccount = new BankAccountProxy(realAccount);

        console.log("--- 1-HOLAT: Tizimga kirmasdan pul yechishga urinish ---");
        proxyAccount.withdraw(200);

        console.log("--- 2-HOLAT: Tizimga kirish va muvaffaqiyatli pul yechish ---");
        proxyAccount.login("Ali Valiyev");
        proxyAccount.withdraw(300);

        console.log("--- 3-HOLAT: Balansdan ortiqcha summa yechishga urinish ---");
        proxyAccount.withdraw(1500);

        console.log("--- 4-HOLAT: Tizimdan chiqish va qayta pul yechishga urinish ---");
        proxyAccount.logout();
        proxyAccount.withdraw(100);

        console.log("--- 5-HOLAT: Qayta tizimga kirib to'g'ri operatsiya bajarish ---");
        proxyAccount.login("Ali Valiyev");
        proxyAccount.withdraw(200);

        console.log(`Yakuniy balans: $${proxyAccount.getBalance()}`);
        console.log("\n==================================================");
        console.log("   Barcha tekshiruvlar muvaffaqiyatli yakunlandi!");
        console.log("==================================================");
    }
}

BankApp.main();
