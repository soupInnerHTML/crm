import {create} from "mobx-persist";

export const hydrate = create({
    storage: localStorage,
    jsonify: true, // Преобразует данные в JSON перед сохранением
})