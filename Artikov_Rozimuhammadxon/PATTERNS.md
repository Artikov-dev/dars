# SmartCity Tizimi — Loyihalash Andozalari (Design Patterns) Bo'yicha Hisobot

**Muallif:** Artikov Rozimuhammadxon  
**Yo'nalish:** Dasturiy ta'minot arxitekturasi (Lab Work №1)  
**Texnologiyalar:** TypeScript, Node.js (v22+, `--experimental-strip-types`), `node:test`

---

## Kirish va Loyiha Konsepsiyasi

SmartCity — bu zamonaviy shahar infratuzilmasini (ko'cha yoritish tizimi, jamoat transporti, videokuzatuv va xavfsizlik, energiya balansi hamda ob-havo monitoringi) simulyatsiya qiluvchi konsol ilovasi. 

Ushbu laboratoriya ishini bajarishda asosiy maqsad shunchaki ishlaydigan kod yozish emas, balki murakkab va o'zaro bog'langan tizimlarni to'g'ri arxitektura asosida qurish bo'ldi. Dasturda **Gang of Four (GoF)** ning 8 ta klassik loyihalash andozasidan foydalandim. Har bir pattern tizimdagi aniq muammoni hal qilish va kodni toza, kengaytiriluvchan (scalable) hamda qulay testlanadigan holatga keltirish uchun tanlandi.

---

## 1. Loyihada Qo'llanilgan Patternlar Xaritasi

| № | Pattern nomi | Turi | Asosiy fayllar | Loyihadagi vazifasi |
|---|--------------|------|----------------|---------------------|
| 1 | **Singleton** | Creational | `src/core/controller/CityController.ts`<br>`src/utils/Logger.ts` | Shahar boshqaruv markazi va tizim loglarining yagona nusxada bo'lishini ta'minlash. |
| 2 | **Facade** | Structural | `src/core/controller/CityController.ts` | 5 ta mustaqil subsistemani (yoritish, transport, xavfsizlik, energiya, ob-havo) bitta qulay interfeys orqali boshqarish. |
| 3 | **Factory Method** | Creational | `src/core/factories/VehicleFactory.ts` | Yangi transport vositalarini (avtobus, tramvay, taksi) standart tartibda ro'yxatga olish va chiqarish. |
| 4 | **Abstract Factory** | Creational | `src/core/factories/DistrictFactory.ts` | Har xil turdagi tumanlar (turar-joy, biznes, sanoat) uchun mos chiroqlar va transport vositalari oilasini yaratish. |
| 5 | **Builder** | Creational | `src/core/builders/DistrictBuilder.ts` | Murakkab parametrli tuman obyektlarini qadamma-qadam, xavfsiz va validatsiya bilan yig'ish. |
| 6 | **Adapter** | Structural | `src/core/adapters/WeatherAdapter.ts` | Tashqi ob-havo servisidan keladigan mos kelmaydigan formatdagi ma'lumotlarni tizim standartiga moslash. |
| 7 | **Proxy** | Structural | `src/core/proxy/SecurityProxy.ts` | Xavfsizlik tizimiga noqonuniy kirishni cheklash, rollar (admin/foydalanuvchi) va audit jurnalini yuritish. |
| 8 | **Decorator** | Structural | `src/core/decorators/SmartLightDecorator.ts` | Ko'cha chiroqlariga yangi aqlli funksiyalarni (harakat sensori, tejamkor LED) ish vaqtida dinamik qo'shish. |

---

## 2. Tizim Arxitekturasi va O'zaro Bog'liqlik

Loyihani loyihalashda komponentlarning bir-biriga qattiq bog'lanib qolmasligiga (loose coupling) alohida e'tibor qaratdim:

```text
                     Konsol Interfeysi (main.ts)
                                │
                                ▼
                 ┌─────────────────────────────┐
                 │  CityController (Singleton) │ ◄── [Fasad / Yagona Boshqaruv Markazi]
                 └──────────────┬──────────────┘
       ┌──────────────┬─────────┼──────────────┬──────────────┐
       ▼              ▼         ▼              ▼              ▼
  Lighting        Transport  Security        Energy        Weather
   System          System      Proxy         System        Adapter
     ▲               ▲          │                              │
     │               │          ▼                              ▼
     │               │    SecuritySystem             ExternalWeatherService
     │               │    (Haqiqiy modul)             (Tashqi Meteo Xizmat)
     │               │
     └── DistrictBuilder ◄── DistrictFactory ──► VehicleFactory
            (Builder)      (Abstract Factory)    (Factory Method)
                                   │
                                   ▼
                         SmartLightDecorator
                            (Decorator)
```

**Amaliy oqim:**
1. Foydalanuvchi `main.ts` orqali faqat `CityController` (Facade) bilan muloqot qiladi. `main.ts` ichki modullarning qanday ishlashini bilishi shart emas.
2. Shaharga yangi tuman qo'shilganda `DistrictBuilder` ishga tushadi. U o'ziga kerakli elementlarni `DistrictFactory` (Abstract Factory) orqali oladi.
3. `DistrictFactory` esa o'z navbatida transport vositalarini `VehicleFactory` (Factory Method) orqali, yoritish moslamalarini esa `SmartLightDecorator` bilan o'ragan holda yetkazib beradi.
4. Shahar ob-havosi o'zgarganda `WeatherAdapter` tashqi servis ma'lumotini o'girib beradi, `CityController` esa bir vaqtning o'zida yoritish va transport tezligini shunga moslaydi.
5. Xavfsizlik bo'yicha buyruqlar to'g'ridan-to'g'ri tizimga bormaydi, balki `SecurityProxy` orqali tekshirilib, jurnalga qayd etiladi.
6. Har bir modul o'zining energiya sarfini hisoblab turadi, `EnergySystem` esa umumiy sarfni limit bilan solishtiradi.

---

## 3. Har Bir Patternning Batafsil Tahlili

### 1. Singleton (Yakkalik)
* **Fayllar:** `src/core/controller/CityController.ts`, `src/utils/Logger.ts`
* **Qanday muammoga duch keldik?**  
  Shaharda bir nechta boshqaruv markazi yoki har xil joyga yoziladigan alohida log jurnallari bo'lishi mumkin emas. Agar kimdir `new CityController()` qilib yangi shahar ochib olsa, bitta joyda tungi rejim yoqilgani boshqa joyda ko'rinmay qolardi.
* **Yechim va arxitektura:**  
  Konstruktor `private` qilindi. Obyekt faqat statik `getInstance()` metodi orqali taqdim etiladi. Agar obyekt mavjud bo'lsa o'shaning o'zi qaytadi, bo'lmasa yaratiladi:
  ```typescript
  export class CityController {
      private static instance: CityController | null = null;
      private constructor() { ... }

      static getInstance(): CityController {
          if (!CityController.instance) CityController.instance = new CityController();
          return CityController.instance;
      }
      static resetInstance() { CityController.instance = null; }
  }
  ```
* **Qanday tekshirildi?**  
  `tests/singleton.test.ts` da `getInstance()` qayta-qayta chaqirilganda ham xotirada aynan bitta manzilga ishora qilishi va holat (state) umumiy ekanligi tekshirildi.

---

### 2. Facade (Fasad)
* **Fayl:** `src/core/controller/CityController.ts`
* **Qanday muammoga duch keldik?**  
  Shaharda bir vaqtning o'zida yoritish, transport, xavfsizlik va energiya subsistemalari mavjud. Masalan, "Tungi rejim"ga o'tish uchun: chiroqlarni yoqish, yorqinlikni sozlash, xavfsizlikni faollashtirish va energiyani qayta hisoblash kerak. Agar menyu yoki tashqi kod bu 4 ta servisni alohida-alohida chaqirsa, kod chigallashib, xatoliklar ko'payadi.
* **Yechim va arxitektura:**  
  `CityController` fasad sifatida barcha murakkablikni o'z ichiga yashiradi va tashqariga oddiy, bitta qatorli metodlarni (`activateNightMode()`, `updateWeather()`, `addDistrict()`) taqdim etadi:
  ```typescript
  activateNightMode() {
      this.nightMode = true;
      this.lighting.turnAllOn();
      this.lighting.setBrightnessAll(this.currentBrightness());
      this.security.arm();
      this.logger.info("Tungi rejim yoqildi");
      this.checkEnergy();
      return [ ... ];
  }
  ```
* **Qanday tekshirildi?**  
  `tests/facade.test.ts` faylidagi 11 ta test orqali tuman qo'shish, kunduzgi/tungi rejim, ob-havo va transport integratsiyasi to'liq sinovdan o'tkazildi.

---

### 3. Factory Method (Fabrika Metodi)
* **Fayl:** `src/core/factories/VehicleFactory.ts`
* **Qanday muammoga duch keldik?**  
  Shaharga har xil transport turlari (avtobus, tramvay, taksi) kerak. Transport yaratishda umumiy mantiq bor: seriya raqami berish (ID hisoblagich), marshrutni biriktirish va Logger orqali jurnalga yozish. Lekin yaratiladigan aniq obyekt har xil parametrga ega.
* **Yechim va arxitektura:**  
  Umumiy boshqaruv va ro'yxatga olish logikasini `deploy()` metodida qoldirib, qaysi transport turi yaratilishini voris klasslarga (`BusFactory`, `TramFactory`, `TaxiFactory`) topshirdik:
  ```typescript
  export abstract class VehicleFactory {
      protected abstract createVehicle(id: string, route: string): IVehicle;
      protected abstract getPrefix(): string;

      deploy(route: string): IVehicle {
          const prefix = this.getPrefix();
          const next = (VehicleFactory.counters.get(prefix) ?? 0) + 1;
          VehicleFactory.counters.set(prefix, next);
          const vehicle = this.createVehicle(`${prefix}-${next}`, route);
          Logger.getInstance().info(`Yangi transport: ${vehicle.describe()}`);
          return vehicle;
      }
  }
  ```
* **Qanday tekshirildi?**  
  `tests/factory-method.test.ts` da har bir fabrika o'z turidagi transportni yaratishi, seriya raqamlari (BUS-1, BUS-2, TRAM-1) to'g'ri o'sishi va xato turlar rad etilishi tekshirildi.

---

### 4. Abstract Factory (Abstrakt Fabrika)
* **Fayl:** `src/core/factories/DistrictFactory.ts`
* **Qanday muammoga duch keldik?**  
  Shahar har xil zonalardan iborat: turar-joy, biznes markazi, sanoat zonasi. Har bir zonaga o'ziga mos moslamalar oilasi kerak. Masalan: turar-joyga tejamkor LED chiroq va avtobus, biznes hududiga harakat sensorli chiroq va taksi, sanoat zonasiga esa kuchli chiroq va og'ir tramvay kerak. Ushbu buyumlar aralashib ketmasligi lozim.
* **Yechim va arxitektura:**  
  `DistrictFactory` interfeysi orqali bir-biriga mos buyumlar oilasini yaratish kafolatlandi:
  ```typescript
  export interface DistrictFactory {
      getDistrictType(): string;
      createLight(id: string, location: string): ILight;
      createVehicle(route: string): IVehicle;
  }
  ```
  | Fabrika turi | Yoritish turi | Transport turi |
  |--------------|---------------|----------------|
  | `ResidentialDistrictFactory` | LED tejamkor (100W) | Avtobus (80 o'rin) |
  | `BusinessDistrictFactory` | Harakat sensorli (150W) | Taksi (4 o'rin) |
  | `IndustrialDistrictFactory` | Oddiy kuchli (250W) | Tramvay (150 o'rin) |
* **Qanday tekshirildi?**  
  `tests/abstract-factory.test.ts` da har bir fabrikaning mahsulotlar oilasi, energiya sarfi darajasi va nom orqali to'g'ri tanlanishi sinovdan o'tdi.

---

### 5. Builder (Quruvchi)
* **Fayl:** `src/core/builders/DistrictBuilder.ts` (Mahsulot: `src/models/District.ts`)
* **Qanday muammoga duch keldik?**  
  Yangi tuman qurish — murakkab jarayon. Tumanda nom, tur, aholi, chiroqlar, transport, videokameralar va energiya limiti bor. Agar bularni bitta ulkan konstruktorga `new District("Chilonzor", factory, 270000, lights, ...)` qilib uzatsak, kod o'qilmay qoladi va parametrlar o'rnini adashtirib yuborish oson bo'ladi.
* **Yechim va arxitektura:**  
  Bosqichma-bosqich yig'uvchi Fluent API uslubidagi Builder klassini yaratdik. Har bir qadam o'z ma'lumotini tekshiradi, `build()` metodi esa tayyor tumanni hosil qilib, builderni tozalaydi:
  ```typescript
  const district = new DistrictBuilder()
      .setName("Chilonzor")
      .setFactory(createDistrictFactory("residential"))
      .setPopulation(270000)
      .addLights(6, "Bunyodkor shoh ko'chasi")
      .addVehicles(3, "Chilonzor - Markaz")
      .addCameras("Metro bekati", "Chorsu")
      .setEnergyLimit(250)
      .build();
  ```
* **Qanday tekshirildi?**  
  `tests/builder.test.ts` da ketma-ket chaqiruvlar, majburiy maydonlar yo'qligida xato berishi va noto'g'ri qiymatlarni rad etishi tekshirildi.

---

### 6. Adapter (Moslashtiruvchi)
* **Fayllar:** `src/core/adapters/WeatherAdapter.ts`, `src/core/adapters/external/ExternalWeatherService.ts`
* **Qanday muammoga duch keldik?**  
  Ob-havo ma'lumotini tashqi servisdan olamiz. Tashqi servis esa ma'lumotni tizim tushunmaydigan formatda beradi: Farengeyt shkalasi, stansiya kodlari (`TAS`, `SAM`), qisqartmalar (`CLR`, `RA`, `FG`) va ko'rinish masofasi metrlarda. Tashqi servis kutubxonasini o'zgartirishning iloji yo'q.
* **Yechim va arxitektura:**  
  `WeatherAdapter` tashqi servis ma'lumotlarini qabul qilib, bizning `IWeatherProvider` interfeysimizga moslab beradi: Farengeytni Selsiyga, kodlarni o'zbekcha so'zlarga o'giradi:
  ```typescript
  export class WeatherAdapter implements IWeatherProvider {
      getWeather(city: string): WeatherInfo {
          const name = this.resolveCity(city);
          const raw = JSON.parse(this.service.fetchRawData(CITY_STATIONS[name]));
          return {
              city: name,
              temperature: Math.round(((raw.temp_f - 32) * 5) / 9),
              condition: SKY_CONDITIONS[raw.sky_code] ?? "Noma'lum",
              poorVisibility: raw.visibility_m < 1000,
              precipitation: raw.sky_code === "RA" || raw.sky_code === "SN",
          };
      }
  }
  ```
* **Qanday tekshirildi?**  
  `tests/adapter.test.ts` dagi 9 ta test orqali Farengeyt-Selsiy konvertatsiyasi, ko'rinish yomonlashganda chiroqlarni 100% ga chiqarish va transport tezligini 30 km/soat ga tushirish ishlashi tasdiqlandi.

---

### 7. Proxy (Vakil)
* **Fayl:** `src/core/proxy/SecurityProxy.ts` (Haqiqiy obyekt: `src/modules/security/SecuritySystem.ts`)
* **Qanday muammoga duch keldik?**  
  Xavfsizlik tizimi (kameralar, signallarni boshqarish, tizimni o'chirish) o'ta nozik joy. Har qanday foydalanuvchi xohlagan paytda xavfsizlikni o'chirib qo'ymasligi kerak. Asosiy `SecuritySystem` klassi esa o'z ichida foydalanuvchi parolini tekshirish bilan shug'ullanmasligi lozim (Single Responsibility).
* **Yechim va arxitektura:**  
  Xavfsizlik tizimi oldiga `SecurityProxy` qo'yildi. Oddiy amallar (holatni ko'rish, xavf tugmasini bosish) ochiq qoldirildi, tizimni yoqish/o'chirish va kameralarni ko'rish esa admin parolini (`admin123`) talab qiladi. Shuningdek, barcha ruxsatsiz urinishlar jurnalga yozib boriladi:
  ```typescript
  arm() {
      this.authorize("Tizimni yoqish");
      this.real.arm();
  }

  private authorize(action: string) {
      if (!this.authenticated) {
          this.record(`RAD ETILDI: ${action}`);
          throw new AccessDeniedError(action);
      }
      this.record(`Ruxsat berildi: ${action}`);
  }
  ```
* **Qanday tekshirildi?**  
  `tests/proxy.test.ts` da parolsiz kirish taqiqlanishi, noto'g'ri parol kiritilganda ogohlantirish berilishi va login/logout mexanizmi sinab ko'rildi.

---

### 8. Decorator (Dekorator)
* **Fayl:** `src/core/decorators/SmartLightDecorator.ts`
* **Qanday muammoga duch keldik?**  
  Shahardagi ko'cha chiroqlariga yangi "aqlli" qobiliyatlar qo'shish kerak: harakat sensori yoki energiya tejovchi LED modul. Agar buni oddiy vorislik (inheritance) orqali qilsak, har bir kombinatsiya uchun yangi klass yozishga to'g'ri kelardi (`SensorLight`, `EcoLight`, `SensorEcoLight`...). Bu klasslar portlashiga (class explosion) olib keladi.
* **Yechim va arxitektura:**  
  `SmartLightDecorator` bazaviy dekoratori orqali chiroqlarni ustma-ust o'rash imkoniyati yaratildi. Har bir dekorator asosiy obyektning xatti-harakatini boyitadi:
  ```typescript
  export class MotionSensorLight extends SmartLightDecorator {
      protected getFeatureName() { return "harakat sensori"; }
      getPowerUsage() { return this.light.getPowerUsage() * 0.6; } // -40% sarf
  }

  export class EnergySavingLight extends SmartLightDecorator {
      protected getFeatureName() { return "LED tejamkor"; }
      getPowerUsage() { return this.light.getPowerUsage() * 0.5; } // -50% sarf
  }
  ```
  Masalan, 100 W li chiroqqa ikkala funksiyani qo'shsak: `100 * 0.6 * 0.5 = 30 W` ga tushadi.
* **Qanday tekshirildi?**  
  `tests/decorator.test.ts` da energiya hisob-kitoblari, xususiyatlarning to'g'ri qo'shilishi va bir xil funksiyani qayta qo'shish taqiqlanganligi tekshirildi.

---

## 4. Testlar va Tekshiruv Natijalari

Loyiha to'liq `node:test` va `node:assert/strict` kutubxonalari yordamida qamrab olingan. Hech qanday uchinchi tomon test kutubxonasi (Jest, Mocha) ishlatilmadi — barchasi Node.js ning o'zida ishlaydi.

Ishga tushirish buyrug'i:
```bash
npm test
```

**Haqiqiy test natijasi:**
```text
✔ Abstract Factory: DistrictFactory (6 ta test)
✔ Adapter: WeatherAdapter (9 ta test)
✔ Builder: DistrictBuilder (8 ta test)
✔ Decorator: SmartLightDecorator (7 ta test)
✔ Facade: CityController (11 ta test)
✔ Factory Method: VehicleFactory (6 ta test)
✔ Proxy: SecurityProxy (8 ta test)
✔ Singleton: CityController (3 ta test)
✔ Singleton: Logger (3 ta test)

ℹ tests 61
ℹ suites 9
ℹ pass 61
ℹ fail 0
```

---

## 5. Xulosa

Ushbu laboratoriya ishi jarayonida design patternlar shunchaki nazariy tushuncha emas, balki real dasturlashdagi chalkashliklarning oldini oluvchi eng to'g'ri yechim ekanligiga amin bo'ldim:
1. **Yangi xususiyat qo'shish osonlashdi:** Yangi transport turini qo'shish uchun faqat bitta klass va bitta fabrika yoziladi, asosiy tizim kodiga tegilmaydi (Open/Closed Principle).
2. **Kod o'qilishi soddalashdi:** `main.ts` dagi konsol menyu fasad tufayli ixcham va tushunarli bo'lib qoldi.
3. **Ishonchlilik oshdi:** Barcha 8 ta pattern o'zaro birikib, 61 ta unit test orqali to'liq kafolatlangan yaxlit SmartCity tizimini hosil qildi.
