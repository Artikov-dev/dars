@echo off
chcp 65001 >nul
echo ==================================================
echo   TASK 11: PROXY PATTERN (BANK ACCOUNT ACCESS)
echo ==================================================
node --experimental-strip-types BankApp.ts
echo ==================================================
pause
