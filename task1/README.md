# Task 1: Factory Method Pattern (TypeScript) ☕🍵

Ushbu vazifada berilgan Java dasturi tahlil qilinib, dizayn andozalari (Design Patterns) yordamida qayta ishlab chiqildi (Refactoring).

---

## 🛑 Berilgan eski kodning kamchiliklari (Anti-pattern)

```java
class Cafe {
    private final String kind;
    Cafe(String kind) { this.kind = kind; }

    void order() {
        if (kind.equals("coffee")) {
            Latte l = new Latte();
            System.out.println("Готовим и выдаём: " + l.name());
        } else if (kind.equals("tea")) {
            Tea t = new Tea();
            System.out.println("Готовим и выдаём: " + t.name());
        } else {
            throw new IllegalArgumentException(kind);
        }
    }
}
```

### Kamchiliklar:
1. **OCP (Open/Closed Principle) buzilgan:** Yangi ichimlik (masalan, `Cappuccino`) qo'shish uchun `Cafe` sinfidagi `order()` metodini o'zgartirish va yangi `else if` shartini qo'shish talab qilinadi.
2. **DIP (Dependency Inversion Principle) buzilgan:** `Cafe` sinfi mavhumlikka (interface) emas, aniq `Latte` va `Tea` sinflariga qattiq bog'langan (*Tight Coupling*).
3. **SRP (Single Responsibility Principle) buzilgan:** `Cafe` sinfi ham obyekt yaratishni, ham buyurtmani bajarishni o'z zimmasiga olgan.

---

## ✅ Qo'llanilgan Dizayn Andozalari (Patterns)

### 1. Klassik GoF Factory Method Pattern
- `Drink` interfeysi — barcha ichimliklar uchun umumiy shartnoma (`name(): string`).
- `Latte` va `Tea` — aniq mahsulotlar (*Concrete Products*).
- `Cafe` abstrakt sinfi (*Creator*) — ichimlik yaratishni vorislarga topshiradi (`createDrink()` mavhum metodi orqali).
- `CoffeeCafe` va `TeaCafe` (*Concrete Creators*) — aynan qaysi obyektni qaytarishni o'zlari belgilaydi.

### 2. Registry Factory (Map asosida OCP yechimi)
- Eski koddagi string parametr (`"coffee"`, `"tea"`) orqali murojaat qilishni xohlagan holatlar uchun `Map<string, FactoryConstructor>` registratsiya mexanizmi qo'llanildi.
- $O(1)$ tezlikda qidiriladi, `if-else` shartlari butunlay yo'qotildi.
- Yangi ichimlik qo'shilganda faqat yangi sinf yozilib, registratsiyaga qo'shiladi — mavjud kodlarga hech qanday o'zgartirish kiritilmaydi.

---

## 📁 Fayllar tuzilishi

```text
task1/
├── Drink.ts              # Umumiy ichimlik interfeysi (Product)
├── Latte.ts              # Latte ichimligi (Concrete Product)
├── Tea.ts                # Choy ichimligi (Concrete Product)
├── Cappuccino.ts         # Kapuchino ichimligi (Yangi qo'shilgan mahsulot)
├── DrinkFactory.ts       # Fabrika interfeysi (Creator)
├── LatteFactory.ts       # Latte fabrikasi (Concrete Creator)
├── TeaFactory.ts         # Choy fabrikasi (Concrete Creator)
├── CappuccinoFactory.ts  # Kapuchino fabrikasi (Concrete Creator)
├── Cafe.ts               # GoF Factory Method va Registry Cafe sinflari
├── Main.ts               # Ishga tushiruvchi asosiy sinf (Client)
├── index.ts              # Barchasi bitta faylda jamlangan qulay variant
├── run.bat               # 1 ta bosishda ishga tushirish skripti
└── package.json          # ES Module konfiguratsiyasi
```

---

## ⚡ Qanday ishga tushiriladi?

### 1-usul: `run.bat` orqali (Eng osoni)
`run.bat` faylini ikki marta bosing yoki terminalda:
```powershell
.\run.bat
```

### 2-usul: Node.js orqali to'g'ridan-to'g'ri:
```powershell
node --experimental-strip-types Main.ts
```
yoki yagona fayl variantini:
```powershell
node --experimental-strip-types index.ts
```
