import { hydrate } from "./hydrate";

// Декоратор persistable для автоматической гидрации
export function persistable(storageKey: string) {
    return function <T extends { new(...args: any[]): {} }>(constructor: T) {
        return class extends constructor {
            constructor(...args: any[]) {
                super(...args);
                // Гидрация экземпляра класса
                hydrate(storageKey, this)
                    .then(() => {
                        if ((this as IHydratable)._onHydrated) {
                            (this as IHydratable)._onHydrated!();
                        }
                    })
                    .catch(error => {
                        console.error(`Ошибка гидрации для ${storageKey}:`, error);
                    });
            }
        };
    };
}
