@echo off
chcp 65001 >nul
setlocal

echo ==================================================
echo   1. JAVA KODINI ISHGA TUSHIRISH (javac / java)
echo ==================================================
if not exist "bin" mkdir bin
javac -encoding UTF-8 -d bin src/main/java/*.java
if %errorlevel% neq 0 (
    echo [XATOLIK] Java kompilyatsiyasida xatolik!
    pause
    exit /b %errorlevel%
)
java -cp bin Main

echo.
echo ==================================================
echo   2. TYPESCRIPT KODINI ISHGA TUSHIRISH (node)
echo ==================================================
node --experimental-strip-types typescript/index.ts

echo.
echo ==================================================
echo   Barcha kodlar muvaffaqiyatli bajarildi!
echo ==================================================
pause
