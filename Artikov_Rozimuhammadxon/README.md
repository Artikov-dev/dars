# SmartCity System

Lab Work №1 — Artikov Rozimuhammadxon

A console application that simulates an intelligent city management system: lighting, transport, security and energy subsystems, built with design patterns.

## Run

```bash
npm start
npm test
```

Requires Node.js 22.6+ (TypeScript runs directly via `--experimental-strip-types`).

## Design Patterns

| # | Pattern | Type | File | Purpose |
|---|---------|------|------|---------|
| 1 | Singleton | Creational | `src/core/controller/CityController.ts`, `src/utils/Logger.ts` | |
| 2 | Facade | Structural | `src/core/controller/CityController.ts` | |
| 3 | Factory Method | Creational | `src/core/factories/VehicleFactory.ts` | |
| 4 | Abstract Factory | Creational | `src/core/factories/DistrictFactory.ts` | |
| 5 | Builder | Creational | `src/core/builders/DistrictBuilder.ts` | |
| 6 | Adapter | Structural | `src/core/adapters/WeatherAdapter.ts` | |
| 7 | Proxy | Structural | `src/core/proxy/SecurityProxy.ts` | |
| 8 | Decorator | Structural | `src/core/decorators/SmartLightDecorator.ts` | |

## Project Structure

```text
Artikov_Rozimuhammadxon/
├── src/
│   ├── main.ts
│   ├── core/
│   │   ├── controller/
│   │   │   └── CityController.ts
│   │   ├── factories/
│   │   │   ├── VehicleFactory.ts
│   │   │   └── DistrictFactory.ts
│   │   ├── builders/
│   │   │   └── DistrictBuilder.ts
│   │   ├── adapters/
│   │   │   ├── WeatherAdapter.ts
│   │   │   └── external/
│   │   │       └── ExternalWeatherService.ts
│   │   ├── proxy/
│   │   │   └── SecurityProxy.ts
│   │   ├── decorators/
│   │   │   └── SmartLightDecorator.ts
│   │   └── interfaces/
│   │       ├── ISubsystem.ts
│   │       ├── IVehicle.ts
│   │       ├── ILight.ts
│   │       ├── IWeatherProvider.ts
│   │       └── ISecuritySystem.ts
│   ├── modules/
│   │   ├── lighting/
│   │   │   ├── LightingSystem.ts
│   │   │   └── StreetLight.ts
│   │   ├── transport/
│   │   │   ├── TransportSystem.ts
│   │   │   └── vehicles/
│   │   │       ├── Bus.ts
│   │   │       ├── Tram.ts
│   │   │       └── Taxi.ts
│   │   ├── security/
│   │   │   └── SecuritySystem.ts
│   │   └── energy/
│   │       └── EnergySystem.ts
│   ├── models/
│   │   └── District.ts
│   └── utils/
│       └── Logger.ts
├── tests/
│   ├── singleton.test.ts
│   ├── facade.test.ts
│   ├── factory-method.test.ts
│   ├── abstract-factory.test.ts
│   ├── builder.test.ts
│   ├── adapter.test.ts
│   ├── proxy.test.ts
│   └── decorator.test.ts
├── package.json
├── tsconfig.json
└── README.md
```
