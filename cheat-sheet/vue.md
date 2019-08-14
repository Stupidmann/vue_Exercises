# [Vue Mastery - Intro to Vue.js](https://www.vuemastery.com/courses/intro-to-vue-js)

## Constructor de Vue

``` js
new Vue({
  el: '#app', // Selector del elemento dónde aplica Vue.
  data: {
    // Valores a utilizar en la plantilla de HTML.
  }
});
```

## Expresiones

Esto es una expresión: "{{}}", puedo contener o evaluar un valor.
Podemos evaluar expresiones dentro de una plantilla HTML utilizando los
valores que almacenamos en la propiedad "data" de la instancia de Vue. Por
ejemplo:

``` html
<h1>El siguiente texto lo define Vue: {{ text }}</h1>
```

```js
new Vue({
  el: '#app',
  data: {
    text: 'Hola mundo!'
  }
});
```

## Expresiones dentro de atributos

Para evaluar una expresión dentro del atributo de un elemento debemos utilizar
el atributo `v-bind:nombre-del-atributo="expresión"`. Por ejemplo, si guardamos
la ruta de una imagen bajo el nombre de "image", podemos utilizarla como:

``` html
<img v-bind:src="image" />
```

Una forma más corta de escribirlo es `:nombre-del-atributo="expresión"`.

## Renderizado condicional

Mediante los atributos "v-if", "v-else-if" y "v-else" podemos evaluar una, o un
conjunto de propiedades, para así determinar si un elemento debe aparecer o no
en pantalla. Por ejemplo:

``` html
<p v-if="inventory > 10">En stock</p>
<p v-else-if="inventory <= 10 && inventory > 0">Pocas unidades disponibles</p>
<p v-else>Sin stock</p>
```

En aquellos casos donde querramos mostrar un elemento si se cumple una
condición, y ocultarlo si no se cumple, resulta más eficiente utilizar "v-show".
Este oculta el elemento que no verifica la condición, que es más eficiente que
agregar un elemento y eliminar el otro, que es lo que "v-if" y compañia hacen.

## Renderización de valores en forma de lista

Si queremos mostrar una serie de valores dentro de una lista, podemos guardar
esos valores dentro de un array como un propiedad dentro de la propiedad "data"
del constructor de Vue.

``` js
new Vue({
  el: '#app',
  data: {
    animals: [ 'dog', 'cat', 'bird', 'shark' ],
    dogs: [
      {
        name: 'Canela',
        age: 2
      },
      {
        name: 'Taco',
        age: 5
      }
    ]
  }
});
```

Luego para mostrarlos recurrimos al atributo "v-for", de la siguiente manera:

``` html
<ul>
  <li v-for="animal in animals">{{ animal }}<li>
</ul>
```

No necesariamiente tiene que ser una lista:

``` html
<div v-for="dog in dogs" :key="dog.name">
  <p>{{ dog.name }}</p>
  <p>{{ dog.age }}</p>
</div>
```

Cuando nuestros elementos dependan del valor que contengan sus propiedades, o
del estado del DOM (por ejemplo, cuando el usuario interactua con formas),
deberemos utilizar el atributo ":key" para que Vue pueda tener un registro de la
identidad de cada nodo, y de este modo, poder reutilizarlos y reordenarlos de
ser necesario.

## Eventos

Para agregar eventos tenemos que utilizar el atributo
`v-on:nombre-del-evento="manejador-de-eventos"`. Una forma más corta de
escribirlo es `@nombre-del-evento="manejador-de-eventos"`.
El manejador de eventos debe estar definido dentro de la propiedad "methods" del
constructor de Vue. Por ejemplo:

``` html
<button @click="addToCart">Agregar al carrito</button>
<div class="cart">
  <p>Carrito({{ cart }})</p>
</div>
```

``` js
new Vue({
  el: '#app',
  data: {
    cart: 0
  }
  methods: {
    addToCart () {
      // Al usar "this" nos referimos a las propiedades del objeto "data".
      ++this.cart;
    }
  }
});
```

Podemos utilizar modificadores en los eventos, por ejemplo `@keyup.enter="..."`.

## Expresiones dentro de estilos

Podemos asignar un estilo a través de una expresion mediante el atríbuto
`:style="{ nombreDeLaPropiedadCSS: expresión }"`. Por ejemplo:

``` html
<div class="color-box" v-for="color in colors"
     :style="{ backgroundColor: color }"></div>
```

``` js
new Vue({
  el: '#app',
  data: {
    colors: [ 'green', 'blue', 'red', 'orange' ]
  }
});
```

La propiedad de CSS se debe escribir en camelCase, alternativamente podemos
utilizar kebab-case encerrando la propiedad entre tildes, por ejemplo:
`:style="{ 'background-color': color }"`, donde `"color: 'green'"`.

También podemos pasar un objeto, por ejemplo: `:style="styleObject"`, donde
`"styleObject: { color: 'red', fontSize: '12px' }"`.

## Expresiones dentro de clases

La evaluación de expresiones dentro de clases es de la siguiente manera:

``` html
<button :disabled="!inStock" :class="{ disabledButton: !inStock }">
  Agregar al carrito
</button>
```

``` js
new Vue({
  el: '#app',
  data: {
    inStock: true
  }
});
```

`"disabledButton: !inStock"` se puede leer como "aplica la clase llamada
'disabledButton' cuando la variable inStock almacenada en el objeto 'data'
evalue como false. Es decir, cuando una expresión es verdadera, la clase
asociada a esa expresión es aplicada.

Al igual que con los estilos, es posible pasar un objeto con múltiples clases y
expresiones. Por ejemplo:

``` html
<div :class="classObject"></div>
```

``` js
new Vue({
  el: '#app',
  data: {
    classObject: {
      active: true, // la clase "active" va a aplicarse
      'text-danger': false // la clase "text-danger" no
    }
  }
});
```

También podemos aplicar un conjunto de clases dentro de un arreglo, y realizar
una evaluación condicional utilizando el operador ternario. Por ejemplo:

``` html
<div :class="[isActive ? activeClass : '', errorClass]"></div>
```

``` js
new Vue({
  el: '#app',
  data: {
    classObject: {
      isActive: true,
      activeClass: 'active',
      errorClass: 'text-danger'
    }
  }
});
```

El HTML del ejemplo se traduciría a lo siguiente:

``` html
<div class="active text-danger"></div>
```

## Propiedades calculadas

Si queremos evaluar una expresión compleja, podemos recurrir a las propiedades
calculadas. Estas se ubican en la propiedad "computed" del constructor de Vue,
pero se utilizan igual que los valores almacenados en la propiedad "data".
Por ejemplo:

``` html
<p>{{ text }}</p>
```

``` js
new Vue({
  el: '#app',
  data: {
    product: 'Zapatillas',
    brand: 'Reebok',
    model: 'Nano 8'
  },
  computed: {
    title () {
      return this.product + ' ' + this.brand + ' ' + this.model;
    }
  }
});
```

Esto se evalúa en el HTML como:

``` html
<p>Zapatillas Reebok Nano 8</p>
```

## Componentes

Los componentes nos permiten encapsular un conjunto de elementos HTML, junto con
su funcionalidad, dentro de una única etiqueta de HTML.

Para crear un componente recurrimos al método "component" de Vue, que requiere
un nombre (que será el nombre de la etiqueta HTML del componente) y un objeto
con la funcionalidad del componente. Por ejemplo:

``` js
Vue.component('product', {
  // "props" contiene valores que pasamos al componente por medio de atributos.
  props: {
    inStock: {
      type: Boolean,
      required: true,
      default: false
    },
    price: {
      type: Number,
      required: true
    },
    brand: {
      type: String,
      required: True
    },
    model: {
      type: String,
      required: True
    },
    product: {
      type: String,
      required: True
    }
  },
  // La plantilla del componente, sólo puede tener un elemento raíz.
  template: `
    <div>
      <p>{{ text }}</p>
      <p>{{ price }}</p>
      <p>{{ inStock }}</p>
      <button :disable="!inStock" :class="{ 'disabled-btn': !inStock }">
        Comprar
      </button>
    </div>
  `,
  // Los componentes, al igual que el constructor de Vue, aceptan una propiedad
  // "data" y una propiedad "computed". En el caso de que nuestro componente
  // requiera de un "data", deberemos pasarlo como una función que retorna un
  // objeto. Esto pues, de pasarlo como un objeto convencional, todos los
  // componentes de su tipo tendrían el mismo "data".
  /*
  data () {
    return {
    
    }
  },
  */
  computed: {
    title () {
      return this.product + ' ' + this.brand + ' ' + this.model;
    }
  }
});
```

Este componente puede utilizarse como:

``` html
<product v-for:"product in products" :key="product.id"
         :product="product.product" :brand="product.brand"
         :model="product.model" :inStock="product.inStock"
         :price="product.price"
</product>
```

``` js
Vue.component('product', { ... });

new Vue({
  el: '#app',
  data: {
    products: [
      {
        id: 143,
        product: 'Zapatillas',
        brand: 'Reebok',
        model: 'Nano 8',
        price: '$4500',
        inStock: true
      },
      {
        id: 220,
        product: 'Remera',
        brand: 'Adidas',
        model: 'Originals',
        price: '$1500',
        inStock: true
      }
    ]
  }
});
```

## Emisión de eventos para habilitar la comunicación entre componentes

Un componente puede emitir un evento, y esté ser recibido y procesado por otro.
Veamoslo partiendo del componente definido en la sección anterior.

``` js
Vue.component('product', {
  ...
  methods: {
    // Al ocurrir este método se dispara el evento "add-to-cart", y quién lo
    // escucha recibe el id del producto agregado al carrito.
    addToCart () {
      this.$emit('add-to-cart', this.id);
    }
  }
});
```

``` html
<div class="cart">
  <p>Carrito({{ cart.length }})</p>
</div>
<product ... @add-to-cart="updateCart"></product>
```

``` js
new Vue({
  el: '#app',
  data: {
    cart: [] // Contiene los id de los productos que se encuentran en el carrito
  },
  methods: {
    updateCart (id) {
      this.cart.push(id);
    }
  }
});
```

## Comunicación en ambos sentidos

Hemos visto que mediante al atributo "v-bind" podemos establecer una
comunicación desde el los parámetros de Vue hacia los elementos de la plantilla
HTML. Sin embargo va a haber casos em que, como en las formas, querramos que la
comunicación sea en ambos sentidos. Para lograr esto utilizamos el atributo
`v-model="expresión"`.
Ahora puedo escribir en un input y esa información será almacenada por Vue, y
mostrada en cualquier elemento que haga uso de ella.
Por ejemplo, utilizando nuevamente el componente "product":

``` js
Vue.component('product', {
  template: `
    ...
    // Ahora product incorpora un nuevo componente.
    <product-review></product-review>
  `
  ...
});

Vue.component('product-review', {
  template: `
    <input v-model="name">
  `,
  data () {
    return {
      // Si escribimos en el input de este componente, el valor "name" se
      // actualizará. Además, si modifico ese mismo valor desde dónde sea, el
      // input mostrará el nuevo valor.
      name: null
    }
  }
});
```

``` html
<product ...></product>
```

Al igual que con los eventos podemos utilizar modificadores, por ejemplo, si
tengo un select con números, puedo utilizar el modificador "number" para que
la opción escogida sea transformada a un entero.
Los otros dos modificadores son:
- "lazy": que actualiza la variable que guarda la información del input cuando
este deja de estar activo.
- "trim": que borra los espacios que introduce el usuario.

``` js
Vue.component('product-review', {
  template: `
    <select id="rating" v-model.number="rating">
      <option>5</option>
      <option>4</option>
      <option>3</option>
      <option>2</option>
      <option>1</option>
    </select>
  `,
  data() {
    return {
      rating: null
    }
  }
});
```

---

# [The Net Ninja - Vue JS 2 Tutorial](https://www.youtube.com/playlist?list=PL4cUxeGkcC9gQcYgjhBoeQH7wiAyZNrYa)

## Modificadores de eventos

Como vimos podemos agregar eventos de la siguiente manera:
`@nombre-del-evento="manejador-de-eventos"`. También se vio que los eventos
pueden tener modificadores, como por ejemplo:
`@key-up.enter="manejadorDeEventos"`.

Un modificador nos permite prevenir que un evento por defecto ocurra; que un
evento se propage; nos permite capturar un evento antes de que se aplique a un
elemento; nos deja aplicar un evento sólo una vez, entre otros. Estos
modificadores son "prevent", "stop", "capture" y "once", respectivamente.

También podemos utilizar modificadores para detectar cuando un usuario presiona
un, o una combinación, de teclas o botones, ya que los modificadores pueden
encadenarse.

La forma en la que se comportan los modificadores de eventos no es exacta. Es
decir, si agrego un evento de la siguiente manera: `@click.ctrl="onClick"`,
este ocurrirá aún si además de apretar ctrl + click presiono también shift o
cualquier otra tecla. Para evitar esto debemos encadenar el modificador "exact".

## Referencias

Podemos almacenar un elemento HTML dentro de la propiedad "$refs" de la
instancia de Vue agregando el atributo "ref" al mismo. Por ejemplo:

``` html
<p ref="prueba">Texto de prueba</p>
```

Podemos acceder al elemento del ejemplo mediante "this.$refs.prueba".

## Vue CLI

Crear proyectos con el CLI de Vue nos brinda los siguientes beneficios:

- Webpack preconfigurado, es decir, nuestro código es transpilado y minificado
al construir el proyecto para producción.
- Podemos probar nuestra aplicación en un servidor que se refresca cada vez que
introducimos algún cambio.
- Podemos utilizar componentes de Vue.
- Podemos probar componentes sin necesidad de crear un proyecto.

Para instalarlo y crear un proyecto hacemos lo siguiente:

``` bash
sudo npm i -g @vue/cli
vue create nombre-proyecto && cd nombre-proyecto
```

- Podemos crear un servidor local con `npm run serve`, construir el proyecto con
`npm run build` y buscar errores con `npm run lint`.
- Podemos instalarle plugins mediante `vue add nombre-del-plugin`.
- Para probar componentes sin crear un proyecto debemos hacer lo siguiente:

``` bash
sudo npm i -g @vue/cli-service-global
vue serve nombre-del-componente
```

Alternativamente, podemos utilizar el CLI desde una GUI mediante `vue ui`.

## Proyectos creados con Vue CLI

Los proyectos creados con el CLI de Vue tienen algunas peculiaridades:

- Ya no necesitamos utilizar `Vue.component('nombre', { ... })` para crear un
componente. En lugar de eso, nuestro componente se encuentra en un archivo con
extensión .vue, que está conformado por tres apartados:
  * `<template></template>`: Aquí se encuentra todo el HTML que conforma al
  componente.
  * `<script></script>`: Aquí se encuentra todo el JS o TS que utiliza el
  componente.
  * `<style lang="scss" scoped></style>`: Aquí se encuentran los estilos que
  utiliza el componente, podemos utilizar un lenguaje de preprocesado. El
  atributo "scoped" indica que los estilos que escribamos sólo aplicaran a ese
  componente.
- También utilizaremos estos archivos para representar páginas. Al crear un
proyecto encontraremos un archivo llamado "App.vue", que es la página que se
carga al servidor. Las páginas pueden incluir componentes.
- Deberemos importar las páginas y componentes para poder usarlos. Para ello
escribimos al comienzo de la página:
`import NombreDelComponente from './components/nombre-del-componente.vue'`.
- Ahora nuestra instancia de Vue incluirá una propiedad que dice así:
`render: h => h(App)`. Esto lo que hace es colocar todo el contenido de la
página que le especificamos como argumento en el elemento que especificamos en
la propiedad "el".

## Anidando componentes

Cuando creamos componentes, tenemos que importarlos antes de poder usarlos.
Puede que queremos que determinados componentes estén disponibles de forma
global, y otros de forma local a algún componente.

Para importar los componentes de forma global, en nuestro archivo index/main.js,
añadimos las siguientes líneas:

``` js
import NombreDelComponente from './components/nombre-del-componente.vue';

Vue.component('NombreDelComponente', NombreDelComponente);
```

Para importarlos de forma local a algún componente, abrimos el archivo de ese
componente e introducimos los siguiente:

``` vue
// Componente sobre el que queremos importar "nombre-del-componente" de forma
// local.
<template>
  <nombre-del-componente></nombre-del-componente>
</template>

<script>
import NombreDelComponente from './components/nombre-del-componente.vue';

export default {
  components: {
    'nombre-del-componente': NombreDelComponente
  },
  ...
}
</script>
```

## Emisión de eventos para habilitar la comunicación entre componentes hermanos

Si quieremos emitir un evento y que este sea procesado por un componente
hermano, primero debe recibirlo el componente padre y transmitirlo al componente
deseado.

Alternativamente podemos crear un "Event Bus". Para hacer esto debemos:

1. Crear una nueva instancia de Vue en index/main.js y exportarla.
2. Importar esa instancia en el, o los, componentes hermanos.
3. Emitir un evento desde alguno de los componentes hermanos a esa instancia de
Vue que acabamos de importar.
4. Ahora podemos detectar el evento dentro de algún "Hook" del otro u otros
componentes hermanos. En particular, podemos detectar el evento emitido por el
bus dentro del hook "created", y hacer algo al respecto.

``` js
<!-- main.js -->
export const bus = new Vue(); // (1)

new Vue({
  ...
});
```

``` js
<!-- body.vue (hermano1) -->
<template>
  <div>
    <p>{{ text }}</p>
    <button @click="changeTitle">Cambiar el footer</button>
  </div>
</template>

<script>
import { bus } from '../main'; // (2)

export default {
  data () {
    return {
      title: 'Lorem ipsum...'
    }
  }
  methods: {
    changeTitle () {
      bus.$emit('titleChanged', 'Nuevo título'); // (3)
    }
  }
};
</script>
```

``` js
<!-- header.vue (hermano 2) -->
<template>
  <header>
    <h1 :title="title"></h1>
  </header>
</template>

<script>
import { bus } from '../main'; // (2)

export default {
  props: {
    title: {
      type: String,
      required: true
    }
  },
  created () {
    bus.$on('titleChanged', title => this.title = title; // (4)
  }
};
</script>
```

## Life-cycle Hooks

Cuando se crea una instancia de Vue suceden muchas cosas. Por ejemplo, se tienen
que recopilar los datos, compilar la plantilla, montarla en el DOM y
actualizarla cuando algún dato cambia.
A lo largo de este proceso se ejecutan una serie de funciones llamadas
_lifecycle hooks_, que le dan al usuario la oportunidad de ejecutar algún código
en etapas específicas.

Vue cuenta con los siguientes lifecycle hooks, que se ejecutan tras finalizar
alguna etapa específica.

- beforeCreate: se inicializan los eventos.
- created: se crea la instancia de Vue.
- beforeMount: se compila el template.
- mounted: se renderiza el template en el DOM.
- beforeUpdate: se actualizan los datos de la instancia de Vue y se ejecuta
esta función.
- updated: habiendo actualizado los datos se actualiza el DOM.
- beforeDestroy
- destroyed

## Slots

Además de pasar datos por medio de propiedades a los componentes, podemos pasar
elementos u otros componentes para que formen parte del mismo. Es decir,
nuestros componentes pueden tener _"slots"_, que son espacios que pueden ser
ocupados por otros elementos o componentes.

``` vue
<!-- componente.vue -->
<template>
  <slot name="ejemplo1"></slot>
  <h1>Mi componente</h1>
  <slot name="ejemplo2"></slot>
</template>

<script>
export default {
  ...
}
</script>
```

``` vue
<!-- app.vue -->
<template>
  <componente>
    <p slot="ejemplo1">Este texto se va a ubicar arriba del h1</p>
    <p slot="ejemplo2">Este texto se va a ubicar abajo del h1</p>
  </componente>
<template>

<script>
import componente from './components/componente.vue';

export default {
  components: {
    componente
  },
  ...
}
</script>
```

Mediante el atributo "name" podemos diferenciar los slots, a los cuales podemos
referirnos por medio del atributo "slot", al utilizar el componente.

Si tenemos más de un slot y no utilizamos el atributo "name", todos los
elementos que coloquemos dentro del componente se repetirán por cada slot que
haya.

## Componentes dinámicos

Podemos utilizar el elemento _"component"_, en conjunto al atributo "is", para
mostrar una serie de componentes a partir de una expresión.

Esto puede no tener mucha utilidad, ya que si bien evito tener que escribir
las etiquetas de cada uno de los componentes que quiero mostrar, igual tengo
que almacenarlas en un arreglo, y además las etiquetas son más legibles.

Este elemento resulta útil cuando queremos mostrar una cosa u otra, en función
de una expresión. Por ejemplo:

``` vue
<!-- app.vue -->
<template>
  <component :is="component"></component>
  <button :click="component = 'preview-tab'">
    Cambiar al modo de visualización
  </button>
  <button :click="component = 'edit-tab'">
    Cambiar al modo de edición
  </button>
</template>

<script>
import editTab from './components/edit-tab.vue';
import previewTab from './components/preview-tab.vue';

export default {
  data () {
    return {
      component: 'edit-tab'
    }
  },
  components: {
    'edit-tab': editTab,
    'preview-tab': previewTab
  }
}
</script>
```

El problema de utilizar el elemento component para ello, es que cada vez que se
cambia el elemento a mostrar, se destruye el anterior, de modo que toda la
información que tenía almacenada el mismo se pierde.
Para solucionar esto utilizamos el elemento _"keep-alive"_, de la siguiente
manera:

``` vue
<template>
  <keep-alive>
    <component :is="component"></component>
  <keep-alive>
  ...
</template>
```

## Form input bindings

Ya vimos que podemos actualizar la información almacenada de un input a medida
que lo modificamos mediante el atributo "v-model", pero no se comento nada con
respecto a inputs que no sean de texto.

- Checkbox: así como los checkboxes de un mismo grupo deben poseer el mismo
valor en su atributo "name", lo mismo vale para el atributo "v-model". Además,
la propiedad dentro del objeto "data" que almacena los checkboxes marcados debe
ser un arreglo. Lo que se agrega al arreglo al marcar un checkbox es el valor
almacenado en el atributo "value" del mismo.
- Select: así como extraemos la opción seleccionada de un select desde el mismo
select, el atributo "v-model" debe estar asignado al mismo.

## Directivas

Una directiva es todo atributo que podemos utilizar que comienza con "v-",
como por ejemplo, "v-on", "v-if", "v-model", etc.
Podemos crear nuestras propias directivas de la siguiente manera:

``` js
Vue.directive('nombre', {
  bind (el, binding, vnode) {
    ...
    // "el" es el elemento en donde se aplica la directiva.
    // binding es el valor que le pasamos.
    // Si además le pasamos un argumento a la directiva, podemos acceder a el
    // desde binding.arg.
  }
});
```

Una directiva tiene puede tener un argumento, un modificador y un valor, de la
siguiente manera: `v-ejemplo:argument.modificador="valor"`.

Si queremos registrar nuestras directivas de forma local, sólo tenemos que
definirlas dentro de la propiedad "directives".

## Filtros

En ocasiones, tendremos un conjunto de valores que queramos mostrar de un modo
diferente, pero sin alterar su valor original. Para lograr esto necesitamos un
filtro.

Los filtros se utilizan como `{{ expresión | filtro }}`, y se definen de la
siguiente manera`Vue.filter('nombre-del-filtro', function (...) { ... });`.
Por ejemplo:

``` vue
<template>
  <h1>{{ title | toUppercase }}</h1>
</template>

<script>
export default {
  data () {
    return {
      title: 'Un título de ejemplo'
    }
  }
}
</script>
```

``` js
Vue.filter('toUppercase', function (text) {
  return text.toUppercase();
});
```

Si queremos registrar nuestros filtros de forma local, sólo tenemos que
definirlos dentro de la propiedad "filters".

## Custom search filter

Si nuestra aplicación tiene una barra de búsqueda, esta tendrá que filtrar los
elementos disponibles acorde a la búsqueda realizada por el usuario. Para esto
podríamos utilizar un filtro dentro de la lista, sin embargo esto es muy lento.

Para filtrar los elementos de una búsqueda debemos utilizar un propiedad
calculada, de la siguiente manera:

``` vue
<template>
  <input type="text" v-model="search"/ placeholder="Busca un elemento..." />
  <ul>
    <li v-for="item in filteredItems">
      <p>{{ item }}</p>
    </li>
  </ul>
</template>

<script>
export default {
  data () {
    return {
      items: [ ... ],
      search: ''
    }
  },
  computed: {
    filteredItems () {
      return this.items.filter(item => item.match(this.search));
    }
  }
}
</script>
```

## Mixins

Vue posee "mixins", que se comportan igual a los mixins de Sass y nos permiten
reutilizar código. La idea es, tenemos una o más funciones que utilizamos en más
de un componente. En lugar de redefinirlas para cada uno, creamos un mixin y lo
importamos en cada componente.

``` js
// search-filter-mixin.js
export default {
  computed: {
    filteredItems () {
      return this.items.filter(item => item.match(this.search));
    }
  }
}
```

``` vue
<template>
  <input type="text" v-model="search"/ placeholder="Busca un elemento..." />
  <ul>
    <li v-for="item in filteredItems">
      <p>{{ item }}</p>
    </li>
  </ul>
</template>

<script>
import searchFilter from './mixins/search-filter-mixin';

export default {
  data () {
    return {
      items: [ ... ],
      search: ''
    }
  },
  mixins: [
    searchFilter
  ]
}
</script>
```

## Watchers

Mediante los watchers podemos hacer algo al detectar que un un dato o propiedad
de un componente cambia. Para esto agregamos la propiedad "watch" y dentro
de ella una función con el nombre de la propiedad que nos interesa. Dentro de
esa función podemos acceder al nuevo y viejo valor y hacer algo al detectar el
cambio.

``` vue
<script>
export default {
  data () {
    return {
      counter: 0
    }
  },
  watch: {
    counter (newValue, oldValue) {
      console.log(`antiguo valor: ${oldValue}, nuevo valor: ${newValue}`)
    }
  }
}
</script>
```
Me quede en https://youtu.be/OEitxLemE_g?t=293

# [Documentación](https://vuejs.org/v2/guide/)

## Reactividad

Vue es un framework reactivo, esto significa que cuando el valor de una
propiedad cambia, el DOM se actualiza para reflejar el cambio de esa propiedad.

Para que esto funcione no podemos simplemente modificar las propiedades de Vue
como las de cualquier otro objeto.

Para modificar una propiedad o indice de un arreglo tenemos que usar el método
"$set", de la siguiente manera:

`this.$set(this.propiedad, 'nombre-propiedad', nuevoValor)`
`this.$set(this.arreglo, indiceDelArreglo, nuevoValor)`

En el caso de arreglos, Vue además conserva la reactividad al utilizar los
métodos mutables de su prototipo, es decir, push, pop, splice, reverse, sort,
etc.

En el caso de métodos inmutables, es decir, aquellos que producen un nuevo
arreglo, podemos reemplazar el arreglo original con tranquilidad, sin perder la
reactividad.

`this.arreglo = this.arreglo.sort()`

---

# [Vuex Tutorial - The Net Ninja](https://www.youtube.com/playlist?list=PL4cUxeGkcC9i371QO_Rtkl26MwtiJ30P2)

## Introducción

Cuando nuestra aplicación crezca y tengamos muchos componentes, tendremos un
problema al momento de transmitir y modificar información entre nuestros
componentes.

Si queremos que una determinada información este disponible en un conjunto de
componentes, deberemos almacenar esa información en un en componente padre
común a todos esos componentes.
Para acceder a esa información desde un componente, deberemos hacerla "bajar"
utilizando propiedades.

Si queremos modificar esa información desde algún componente, tendremos que
emitir un evento, hacerlo llegar hasta el componente que almacena la
información, y actualizarla.

Si esto parece engorroso, debemos considerar que si multiples componentes
intentan modificar y utilizar la información de otro componente puede ocurrir un
problema.

Para solucionar esto existe Vuex, que nos permite crear un almacen centralizado
de datos, conocido como "single source of truth", al cual todos los componentes
pueden acceder.

## Uso

Para crear un almacenamiento centralizado de datos mediante Vuex, primero
debemos agregar a Vuex como plugin desde el CLI.

Luego tenemos que crear un almacenamiento de Vuex y enlazarlo a la instancia de
Vue, de la siguiente manera:

``` js
import Vue from 'vue';
import App from './App.vue';

const store = new Vuex.Store({
  state: {
    // Nuestros datos van aquí...
  }
});

new Vue({
  store: store,
  el: '#app',
  render: h => h(App)
});
```

Ahora podemos acceder a esa información desde cualquier componente desde
`this.$store.state.laInformacionQueGuarde`. Podemos utilizar una propiedad
computada para acceder a ella por medio de un nombre más elegante.

Para simplificar el proceso de crear propiedades computadas para acceder a
propiedades definidas en algún almacenamiento de Vuex podemos utilizar
"mapState". Este se encarga de definir las propiedades computadas por nosotros.

``` vue
<script>
import mapState from 'vuex'

export default {
  ...
  computed: {
    // Puedo definir propiedades computadas normales.
    // Mediante mapState puedo definir las propiedades computadas pasandole un
    // objeto o un arreglo. El primero nos permite dar a la propiedad un nombre
    // diferente al que tiene en Vuex, mientras que el segundo conserva el mismo
    // nombre.
    ...mapState: {
      activeTools: 'activeTools',
      brushSize: state => state.brushSettings.size
    }
  }
}
</script>
```

## Getters

Aún utilizando Vuex tendremos problemas al momento de procesar la información.
Si queremos transformar una serie de datos sin modificar los datos originales,
podemos recurrir a las propiedades computadas. El problema es que si necesitamos
utilizar esa propiedad en multiples componentes tendremos que redefinirla, y al
momento de tener que hacer un cambio, tendremos que hacerlo en cada uno de los
componentes en donde esté definido el método.

Para solucionar esto en Vuex existen los "getters", los cuales debemos definir
en la instancia de Vuex y llamar desde cada componente (nuevamente, deberiamos
utilizar una propiedad computada para que el código quede más vistoso).

``` js
const store = new Vuex.Store({
  state: {
    products: [
      {
        product: 'Producto 1',
        price: 100
      },
      {
        product: 'Producto 2',
        price: 150
      }
      ...
    ]
  },
  getters: {
    saleProducts (state){
      return state.products.map(product => {
        return {
          name: '**' + product.name + '**',
          price: product.price * .75
        }
      });
    }
  }
});
```

``` vue
<template>
  <ul>
    <li v-for="product in products"></li>
  </ul>
</template>

<script>
export default {
  computed: {
    products () {
      return this.$store.state.products;
    },
    saleProducts () {
      return this.$store.getters.saleProducts;
    }
  }
}
</script>
```

Nuevamente, así como podíamos utilizar "mapState", existe "mapGetters" para
simplificar la creación de propiedades computadas para acceder a los getters, y
su uso es análogo.

## Mutations

Las mutaciones nos permiten modificar los estados. El primer parámetro de una
mutación es siempre "state", que es un atajo a "this.$store.state".

Al igual que existen mapState y mapGetters, también está disponible
mapMutations.

## Actions

Las acciones tienen el mismo propósito que las mutaciones, con la diferencia de
que las acciones funcionan de forma asíncrona.

...

---

# [Nuxt JS Crash Course - Traversy Media](https://www.youtube.com/watch?v=ltzlhAxJr74)
# [](https://medium.freecodecamp.org/what-exactly-is-client-side-rendering-and-hows-it-different-from-server-side-rendering-bd5c786b340d)

## Client side rendering y server side rendering

Si creamos un sitio web a la antigua, las páginas de nuestro sitio tendrán links
para conectarse entre sí. Al hacer click en alguno de esos links, el navegador
le solicitará al servidor la página a la que ese link hace referencia, a lo que
el servidor responderá enviando la página al navegador.
Esta forma de cargar páginas se llama _server side rendering_, y tiene sus
ventajas:

- El contenido está presente antes de que lo solicitemos (cada una de las
páginas está guardada en el servidor en su propio archivo .html), de modo que
los motores de búsqueda pueden indexar y rastrear las páginas sin problemas.

y desventajas:

- En la actualidad, muchos sitios web son más bien aplicaciones web pretendiendo
ser sitios web. En estos casos, esta forma de renderizar el contenido no es
apropiada, ya que debemos separar el contenido en diferentes archivos y esperar
a qué el navegador solicite, descargue, y renderice el sitio antes de poder
usarlo.
- Aún si el contenido de dos páginas es el mismo, salvo por algún que otro
elemento, el navegador renderizará toda la página, y no sólo el nuevo contenido.

Otra forma de renderizar contenido en el navegador es mediante JavaScript. Un
archivo .html contiene un boilerplate sobre el que un framework puede trabajar,
y javascript se encarga de insertar contenido en el de forma dinámica. Esto se
llama _client side rendering_, y se hizo popular cuando librerías como Vue y
React comenzaron a incorporarlo.
Al igual que el _server side rendering_, este método tiene sus ventajas:

- Los elementos se cargan a medida que son necesarios, ya no necesitamos volver
a cargar toda una página sólo por un par de elementos. En consecuencia, nuestros
sitios o aplicaciones son más rápidas, y sólo necesitamos hacer una solicitud
al servidor.

y desventajas:

- Ya que el contenido se renderiza sobre la marcha, los motores de búsqueda
tienen problemas para trabajar.
- Ya que el sitio web se genera a partir de JavaScript, no podemos utilizar el
sitio web hasta que este no finalizo de descargar. Esto puede ser un problema
para usuarios con una conexión a internet lenta.

## Propósito

Las aplicaciones web creadas con Vue emplean client side rendering, por lo que
si queremos realizar un sitio web tendremos problemas con el SEO.
Aquí es donde entra Nuxt, Nuxt es Vue y un conjunto de plugins preconfigurados,
y nos brinda los siguientes beneficios:

- Nos permite utilizar server side rendering en nuestras aplicaciones web
creadas con Vue.
- Optimiza el SEO.
- Nos permite controlar el head de cada página.
- Incorpora routing.

Además, Nuxt facilita el desarrollo con Vue y nos permite incluir algunas cosas
extra en conjunto a todo lo que ya incluye de por sí, como un framework de
backend y uno de UI.

## Uso

Un proyecto se crea mediante `npx create-nuxt-app nombre-del-proyecto`, y se
ejecuta a través de `npm run dev`.

## Estructura de carpetas

- store: aquí debemos utilizar Vuex.
- static: aquí van archivos tales como "robots.txt", "sitemap.xml" y "CNAME".
Se puede acceder a estos archivos como "mi-sitio-web.com/robots.txt".
- pages: aquí van nuestras páginas.
- layouts: aquí se encuentra los distintos layouts de nuestro sitio o aplicación
web. Por defecto se encuentra un archivo "default.vue", esto contiene el
layout de nuestro sitio web. Dentro del elemento "nuxt" se cargan las páginas a
través del router.
- components: aquí van nuestros componentes.
- assets: aquí van las imágenes y los archivos que requieran ser compilados,
como los archivos .less y .scss.

## Modificando el head de cada página

En el apartado script de las páginas podemos agregar la propiedad "head", que
como su nombre indica, nos permite modificar el head de cada página, es decir,
nos permite modificar el título y agregar metas.

```
<script>
export default {
  head () {
    return {
      title: 'Sobre la organización',
      meta [
        {
          hid: 'description',
          name: 'description',
          content: '...'
        }
      ]
    }
  }
}
</script>
```

## Router

Enlazar páginas en Nuxt es muy simple, sólo debemos utilizar el componente
"nuxt-link", de la siguiente manera:

``` vue
<template>
  <nuxt-link to="/">Home</nuxt-link>
</template>
```
