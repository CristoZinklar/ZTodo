# ZTodo

El ejercicio de hoy será intentar replicar un TodoList hecho funcionalmente a OOP aplicando las cosas básicas que hemos aprendido en la sesión.

El resultado de como lo acabé haciendo yo está en la rama oop-training-completed. Usadlo como último recurso, que lo interesante es ver cuanto somos capaces de hacer en un breve periodo de tiempo.

## Getting started

Para usar la aplicación necesitaremos yarn instalado o en su defecto npx

```bash
yarn install
yarn start
```

```bash
npx yarn install
npx yarn start
```

## Expectativas

Recordad que esto no es un ejemplo real, ni nunca lo será. Intentaremos forzar siertos aspectos de la POO por amor al arte.
Disfrutad de la frustación y el aprendizaje.

SUERTE!💪

---

## Objetivos:

El objetivo será hacer en lo que nos quede de sesión lo máximo posible de features en pareja, y ver quién pudo llegar más lejos y como lo resolvieron.

El punto de partida es simplemente un división entre lo que sería funcionalmente, o con OOP a través de un botón. Podéis reutilizar los componentes que están en la carpeta "componente".

Nuestro TodoList en OOP deberá intentar tener para acabar la sesión lo siguiente:

- [ ] Tener una clase que se encargará de las siguientes operaciones

  - [ ] Añadir TODO
  - [ ] Eliminar TODO
  - [ ] Editar TODO

  - [ ] Además de tener una clase render.
        **BONUS**
  - [ ] Filtrar por All, Active y Completed

  ** Deberemos intentar que las opciones se muestren en la lista sin necesidad de un botón extra **

## Ver solo lo siguiente si estamos estancados en como conseguir el refresh. (Al menos como lo resolví yo)

La clase principal debe tener un campo privado que se llame observers

Añadiremos a cada clase que vaya a actualizar algún field la siguiente línea de código:

```
    this.#observers.forEach((f) => f(this));
```

Además añadiremos dos métodos que usaremos para estar observando los cambos de nuestra clase:

```
  subscribe(observer) {
    if (this.#observers.indexOf(observer) === -1) {
      this.#observers.push(observer);
    }
  }

  unsubscribe(observer) {
    this.#observers = this.#observers.filter((f) => {
      return f !== observer;
    });
  }
```

finalmente en el componente donde estemos renderizando la lista necesitaremos un useEffect que esté chequeando si lo que tenemos en nuestro observer (que será nuestra clase actualizada), tiene los mismos valores que lo que necesitamos, si no actualizaremos dentro de nuestro componente.

```
  useEffect(() => {
    const observer = (o) => {
      if (o.tasks !== tasks) {
        setTasks([...o.tasks]);
      }

      if (o.filter !== filter) {
        setFilter(o.filter);
        debugger;
        const taskFiltered = o.getTaskList();
        setTasks(taskFiltered);
      }
    };
    todoClass.subscribe(observer);
    return function cleanup() {
      todoClass.unsubscribe(observer);
    };
  }, [todoClass, tasks, filter]);

```

con esto tendríais todo.
