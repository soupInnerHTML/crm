import { hydrate } from "./hydrate";

// Декоратор persistable для автоматической гидратации
export function persistable(storageKey: string) {
    return function <T extends { new(...args: any[]): {} }>(constructor: T) {
        return class extends constructor {
            constructor(...args: any[]) {
                super(...args);
                // Гидратация экземпляра класса
                hydrate(storageKey, this)
                    .then(() => {
                        if ((this as IHydratable)._onHydrated) {
                            (this as IHydratable)._onHydrated!();
                        }
                    })
                    .catch(error => {
                        console.error(`Ошибка гидратации для ${storageKey}:`, error);
                    });
            }
        };
    };
}
