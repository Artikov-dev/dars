import type { Drink } from './Drink.ts';
import type { Dessert } from './Dessert.ts';
import type { CafeFactory } from './CafeFactory.ts';
import { Tea } from './Tea.ts';
import { Cookie } from './Cookie.ts';

export class TeaComboFactory implements CafeFactory {
    public createDrink(): Drink {
        return new Tea();
    }

    public createDessert(): Dessert {
        return new Cookie();
    }
}
