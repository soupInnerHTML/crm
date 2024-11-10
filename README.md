
# О проекте

## 🛠 Запуск
1. Добавить ```.env``` файл в проект, чтобы был доступ к api
2. ```yarn install``` / ```npm install```
3. ```yarn start``` / ```npm install```
4. Enjoy 😉

## 🔥 Deployment

#### https://soupinnerhtml.github.io/crm/

## ℹ️ MVVM
Для проекта я использовал архитектуру MVVM:

1. ```Model``` - бизнес логика / бизнес данные / состояние всего приложение (```mobx```)
2. ```View``` - компоненты (```react```)
3. ```View Model``` - состояние компонент. Связывает Model и View - промежуточное звено. ([@yoskutik/react-vvm](https://www.npmjs.com/package/@yoskutik/react-vvm), [tsyringe](https://www.npmjs.com/package/tsyringe))

Схема взаимодействия: ```Model``` <-> ```View Model``` <-> ```View```. В этом паттерне View и Model не общаются напрямую, только через посредника View Model.

## 🚀 Пример VVM
### Под капотом ```@yoskutik/react-vvm``` использует ```mobx```, ```mobx-react```. Вдохновлен [этой статьей](https://habr.com/ru/articles/692218/)
```typescript 
import { observable, makeObservable } from 'mobx';
import { view, ViewModel } from '@yoskutik/react-vvm';

class ComponentViewModel extends ViewModel {
  @observable data = undefined;

  constructor() {
    super();
    makeObservable(this);
  }

  // Например, в моей реализации эта функция замещает вызов
  // useLayoutEffect(() => { ... }, []);
  protected onViewMountedSync() {
    fetch('url')
      .then(res => res.json())
      .then(res => this.doSomething(res));
  }

  // А эта частично замещает
  // useEffect(() => { ... });
  protected onViewUpdated() {
    console.log('Some functionality after component updated');
  }

  doSomething = (res: any) => {};
}

export const Component = view(ComponentViewModel)(({ viewModel }) => (
  <div>
    {viewModel.data}
  </div>
));
```

## ℹ️ Dependency Injection
В архитектуре MVVM (Model-View-ViewModel) Dependency Injection (DI) используется для инверсии зависимости. DI позволяет инжектировать Model во ViewModel Это делает код более гибким и модульным, а также отделяет бизнес-логику от реализации, что полезно для тестирования и поддержки кода.
Для этого я использую библиотеку [tsyringe](https://www.npmjs.com/package/tsyringe)

## 🚀 Пример использования Dependency Injection в MVVM

```typescript
import { injectable } from 'tsyringe';

@injectable()
class ViewModel {
    constructor(private model: Model) {} // Инжектируется Model 
}