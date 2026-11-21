@echo off
chcp 65001 >nul
node --experimental-strip-types Main.ts
pause
