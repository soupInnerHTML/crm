export function camelCaseToText(str: string) {
    return str
        .replace(/([A-Z])/g, ' $1') // Добавляем пробел перед каждой заглавной буквой
        .replace(/^./, (char) => char.toUpperCase()) // Делаем первую букву заглавной
        .toLowerCase()
}