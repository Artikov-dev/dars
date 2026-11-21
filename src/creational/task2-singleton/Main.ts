import { Logger } from './Logger.ts';
import { Database } from './Database.ts';
import { UserService } from './UserService.ts';

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
    db2.query("SELECT * FROM users"); // Baza uzilgan paytda so'rov -> ERROR log

    console.log("\n=== 3. YAGONA XOTIRADAGI LOGLAR TAHLILI ===");
    console.log(`Jami loglar: ${logger2.getLogs().length} ta`);
    console.log(`Xatolar (ERROR): ${logger2.getLogsByLevel('ERROR').length} ta`);
    console.log(`Ogohlantirishlar (WARN): ${logger2.getLogsByLevel('WARN').length} ta`);
}

main();
