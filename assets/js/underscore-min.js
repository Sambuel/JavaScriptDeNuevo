// Subrayado.js 1.9.1
// http://underscorejs.org
// (c) 2009-2018 Jeremy Ashkenas, DocumentCloud y periodistas y editores de investigación
// Underscore se puede distribuir libremente bajo la licencia MIT.

(función() {

    // Configuración de referencia
    // --------------
  
    // Establece el objeto raíz, `window` (`self`) en el navegador, `global`
    // en el servidor, o `this` en algunas máquinas virtuales. Usamos "yo"
    // en lugar de `ventana` para compatibilidad con `WebWorker`.
    var raíz = typeof self == 'objeto' && self.self === self && self ||
              tipo de global == 'objeto' && global.global === global && global ||
              esto ||
              {};
  
    // Guarda el valor anterior de la variable `_`.
    var anteriorUnderscore = root._;
  
    // Guarda bytes en la versión minimizada (pero no comprimida):
    var ArrayProto = Array.prototype, ObjProto = Object.prototype;
    var SymbolProto = tipo de símbolo! == 'indefinido'? Símbolo.prototipo: nulo;
  
    // Cree variables de referencia rápida para acelerar el acceso a los prototipos principales.
    var empujar = ArrayProto.push,
        sector = ArrayProto.slice,
        toString = ObjProto.toString,
        tieneOwnProperty = ObjProto.hasOwnProperty;
  
    // Todas las implementaciones de funciones nativas de **ECMAScript 5** que esperamos utilizar
    // se declaran aquí.
    var nativoIsArray = Array.isArray,
        NativeKeys = Objeto.claves,
        nativoCreate = Objeto.create;
  
    // Referencia de función desnuda para intercambio de prototipos sustitutos.
    var Ctor = función(){};
  
    // Crea una referencia segura al objeto Subrayado para usar a continuación.
    var _ = función (obj) {
      si (obj instancia de _) devuelve obj;
      if (!(esta instancia de _)) devuelve nuevo _(obj);
      this._wrapped = obj;
    };
  
    // Exporta el objeto Subrayado para **Node.js**, con
    // compatibilidad con versiones anteriores de su antiguo módulo API. si estamos en
    // el navegador, agrega `_` como objeto global.
    // (`nodeType` está marcado para garantizar que `module`
    // y `exportaciones` no son elementos HTML).
    if (tipo de exportaciones! = 'indefinido' &&! exportaciones.tipodenodo) {
      if (tipo de módulo! = 'indefinido' &&! module.nodeType && module.exports) {
        exportaciones = módulo.exportaciones = _;
      }
      exportaciones._ = _;
    } demás {
      raíz._ = _;
    }
  
    // Versión actual.
    _.VERSIÓN = '1.9.1';
  
    // Función interna que devuelve una versión eficiente (para motores actuales)
    // de la devolución de llamada pasada, que se aplicará repetidamente en otro guión bajo
    // funciones.
    var optimizarCb = función(func, contexto, argCount) {
      si (contexto === void 0) función de retorno;
      cambiar (argCount == nulo? 3: argCount) {
        caso 1: función de retorno (valor) {
          devolver func.call (contexto, valor);
        };
        // El caso de 2 argumentos se omite porque no lo estamos usando.
        caso 3: función de retorno (valor, índice, colección) {
          return func.call(contexto, valor, índice, colección);
        };
        caso 4: función de retorno (acumulador, valor, índice, colección) {
          return func.call(contexto, acumulador, valor, índice, colección);
        };
      }
      función de retorno() {
        return func.apply(contexto, argumentos);
      };
    };
  
    var incorporadoIteratee;
  
    // Una función interna para generar devoluciones de llamada que se pueden aplicar a cada uno
    // elemento de una colección, que devuelve el resultado deseado: ya sea `identidad`,
    // una devolución de llamada arbitraria, un comparador de propiedades o un descriptor de acceso a propiedades.
    var cb = función (valor, contexto, argCount) {
      if (_.iteratee! == buildinIteratee) devuelve _.iteratee(valor, contexto);
      si (valor == nulo) devuelve _.identidad;
      si (_.isFunction(valor)) devuelve optimizarCb(valor, contexto, argCount);
      if (_.isObject(valor) &&!_.isArray(valor)) return _.matcher(valor);
      devolver _.propiedad(valor);
    };
  
    // Envoltorio externo para nuestro generador de devolución de llamada. Los usuarios pueden personalizar
    // `_.iteratee` si quieren estilos abreviados de predicado/iteratee adicionales.
    // Esta abstracción oculta el argumento argCount solo interno.
    _.iteratee = buildinIteratee = función (valor, contexto) {
      devolver cb(valor, contexto, Infinito);
    };
  
    // Algunas funciones toman un número variable de argumentos, o algunos esperados
    // argumentos al principio y luego un número variable de valores para operar
    // en. Este ayudante acumula todos los argumentos restantes más allá del valor de la función.
    // longitud del argumento (o un `startIndex` explícito), en una matriz que se convierte en
    // el último argumento. Similar al "parámetro de descanso" de ES6.
    var restoArgumentos = function(func, startIndex) {
      índiceInicio = índiceInicio == nulo? func.length - 1: +startIndex;
      función de retorno() {
        longitud var = Math.max(argumentos.longitud - startIndex, 0),
            resto = Matriz (longitud),
            índice = 0;
        para (; índice < longitud; índice ++) {
          resto[índice] = argumentos[índice + índiceinicio];
        }
        cambiar (índice de inicio) {
          caso 0: return func.call(this, rest);
          caso 1: retorno func.call(this, argumentos[0], resto);
          caso 2: return func.call(this, argumentos[0], argumentos[1], resto);
        }
        var args = Matriz(índice de inicio + 1);
        para (índice = 0; índice < índiceinicio; índice++) {
          argumentos[índice] = argumentos[índice];
        }
        args[startIndex] = resto;
        return func.apply(this, args);
      };
    };
  
    // Una función interna para crear un nuevo objeto que hereda de otro.
    var baseCreate = función (prototipo) {
      if (!_.isObject(prototipo)) devuelve {};
      si (nativeCreate) devuelve NativeCreate(prototipo);
      Ctor.prototipo = prototipo;
      resultado var = nuevo Ctor;
      Ctor.prototipo = nulo;
      resultado de devolución;
    };
  
    var propiedad superficial = función (clave) {
      función de retorno (obj) {
        devolver objeto == nulo? vacío 0: obj[clave];
      };
    };
  
    var tiene = función (obj, ruta) {
      return obj! = null && hasOwnProperty.call(obj, ruta);
    }
  
    var deepGet = función (obj, ruta) {
      var longitud = ruta.longitud;
      para (var i = 0; i < longitud; i++) {
        si (obj == null) devuelve void 0;
        obj = obj[ruta[i]];
      }
      longitud de retorno? obj: nulo 0;
    };
  
    // Ayudante de métodos de colección para determinar si una colección
    // debe iterarse como una matriz o como un objeto.
    // Relacionado: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
    // Evita un error JIT de iOS 8 muy desagradable en ARM-64. #2094
    var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
    var getLength = superficialProperty('longitud');
    var isArrayLike = función (colección) {
      var longitud = getLength(colección);
      tipo de retorno de longitud == 'número' && longitud >= 0 && longitud <= MAX_ARRAY_INDEX;
    };
  
    // Funciones de colección
    // --------------------
  
    // La piedra angular, una implementación `each`, también conocida como `forEach`.
    // Maneja objetos sin formato además de tipos de matrices. Trata a todos
    // tipos de matrices dispersas como si fueran densas.
    _.each = _.forEach = función(obj, iterado, contexto) {
      iterar = optimizarCb(iterar, contexto);
      var i, longitud;
      si (isArrayLike(obj)) {
        for (i = 0, longitud = longitud obj.; i < longitud; i++) {
          iterar(obj[i], i, obj);
        }
      } demás {
        var claves = _.keys(obj);
        for (i = 0, longitud = claves.longitud; i < longitud; i++) {
          iteratee(obj[claves[i]], claves[i], obj);
        }
      }
      objeto de retorno;
    };
  
    // Devuelve los resultados de aplicar el iterado a cada elemento.
    _.map = _.collect = función(obj, iterado, contexto) {
      iterado = cb(iterado, contexto);
      var claves =!isArrayLike(obj) && _.keys(obj),
          longitud = (claves || obj).longitud,
          resultados = Matriz(longitud);
      for (var índice = 0; índice < longitud; índice ++) {
        var currentKey = claves? claves[índice] : índice;
        resultados[índice] = iterar(obj[currentKey], currentKey, obj);
      }
      devolver resultados;
    };
  
    // Crea una función reductora que itera hacia la izquierda o hacia la derecha.
    var crearReduce = función(dir) {
      // Ajusta el código que reasigna las variables de argumento en una función separada de la
      // el que accede a `arguments.length` para evitar un impacto de rendimiento. (#1991)
      var reductor = función (obj, iterado, memo, inicial) {
        var claves =!isArrayLike(obj) && _.keys(obj),
            longitud = (claves || obj).longitud,
            índice = directorio > 0? 0: longitud - 1;
        si (!inicial) {
          memo = obj[claves? claves[índice] : índice];
          índice += directorio;
        }
        for (; índice >= 0 && índice < longitud; índice += dir) {
          var currentKey = claves? claves[índice] : índice;
          memo = iteratee(memo, obj[currentKey], currentKey, obj);
        }
        devolver nota;
      };
  
      función de retorno (obj, iterado, memo, contexto) {
        var inicial = argumentos.longitud >= 3;
        reductor de retorno (obj, optimizarCb (iteratee, contexto, 4), memo, inicial);
      };
    };
  
    // **Reduce** genera un único resultado a partir de una lista de valores, también conocido como `inject`,
    // o `foldl`.
    _.reduce = _.foldl = _.inject = createReduce(1);
  
    // La versión asociativa por la derecha de reduce, también conocida como `foldr`.
    _.reduceRight = _.foldr = createReduce(-1);
  
    // Devuelve el primer valor que pasa una prueba de verdad. Aliado como "detectar".
    _.find = _.detect = función(obj, predicado, contexto) {
      var keyFinder = isArrayLike(obj)? _.findIndex : _.findKey;
      var clave = keyFinder(obj, predicado, contexto);
      if (clave! == void 0 && clave! == -1) return obj[clave];
    };
  
    // Devuelve todos los elementos que pasan una prueba de verdad.
    // Aliasado como `select`.
    _.filtro = _.select = función(obj, predicado, contexto) {
      var resultados = [];
      predicado = cb(predicado, contexto);
      _.cada uno(obj, función(valor, índice, lista) {
        if (predicado(valor, índice, lista)) resultados.push(valor);
      });
      devolver resultados;
    };
  
    // Devuelve todos los elementos para los cuales falla una prueba de verdad.
    _.rechazar = función (obj, predicado, contexto) {
      return _.filter(obj, _.negate(cb(predicado)), contexto);
    };
  
    // Determinar si todos los elementos coinciden con una prueba de verdad.
    // Aliasado como `todos`.
    _.cada = _.todos = función(obj, predicado, contexto) {
      predicado = cb(predicado, contexto);
      var claves =!isArrayLike(obj) && _.keys(obj),
          longitud = (claves || obj).longitud;
      for (var índice = 0; índice < longitud; índice ++) {
        var currentKey = claves? claves[índice] : índice;
        if (!predicate(obj[currentKey], currentKey, obj)) devuelve falso;
      }
      devolver verdadero;
    };
  
    // Determinar si al menos un elemento del objeto coincide con una prueba de verdad.
    // Aliasado como `cualquiera`.
    _.algunos = _.cualquiera = función(obj, predicado, contexto) {
      predicado = cb(predicado, contexto);
      var claves =!isArrayLike(obj) && _.keys(obj),
          longitud = (claves || obj).longitud;
      for (var índice = 0; índice < longitud; índice ++) {
        var currentKey = claves? claves[índice] : índice;
        if (predicado(obj[currentKey], currentKey, obj)) devuelve verdadero;
      }
      falso retorno;
    };
  
    // Determina si la matriz u objeto contiene un elemento determinado (usando `===`).
    // Aliasado como `incluye` e `incluye`.
    _.contiene = _.incluye = _.incluye = función(obj, elemento, fromIndex, guardia) {
      if (!isArrayLike(obj)) obj = _.values(obj);
      if (typeof fromIndex! = 'número' || guardia) fromIndex = 0;
      return _.indexOf(obj, item, fromIndex) >= 0;
    };
  
    // Invoca un método (con argumentos) en cada elemento de una colección.
    _.invoke = restArguments(función(obj, ruta, argumentos) {
      var rutaContexto, func;
      si (_.isFunction(ruta)) {
        func = ruta;
      } más si (_.isArray(ruta)) {
        contextPath = ruta.slice(0, -1);
        ruta = ruta[ruta.longitud - 1];
      }
      retorno _.map(obj, función(contexto) {
        método var = func;
        si (!método) {
          if (rutacontexto && rutacontexto.longitud) {
            contexto = deepGet(contexto, rutacontexto);
          }
          si (contexto == nulo) devuelve void 0;
          método = contexto[ruta];
        }
        método de retorno == nulo? método: método.apply(contexto, argumentos);
      });
    });
  
    // Versión práctica de un caso de uso común de `map`: recuperar una propiedad.
    _.pluck = función (obj, clave) {
      return _.map(obj, _.property(clave));
    };
  
    // Versión conveniente de un caso de uso común de `filtro`: seleccionar solo objetos
    // que contiene pares `clave:valor` específicos.
    _.dónde = función(obj, atributos) {
      return _.filter(obj, _.matcher(attrs));
    };
  
    // Versión conveniente de un caso de uso común de `buscar`: obtener el primer objeto
    // que contiene pares `clave:valor` específicos.
    _.findDónde = función(obj, atributos) {
      return _.find(obj, _.matcher(atributos));
    };
  
    // Devuelve el elemento máximo (o cálculo basado en elementos).
    _.max = función (obj, iterado, contexto) {
      resultado var = -Infinito, últimoComputado = -Infinito,
          valor, calculado;
      if (iteratee == null || tipo de iteratee == 'número' && tipo de obj[0] != 'objeto' && obj != nulo) {
        obj = esArrayLike(obj)? obj: _.valores(obj);
        for (var i = 0, longitud = longitud obj; i < longitud; i++) {
          valor = objeto[i];
          if (valor! = nulo && valor > resultado) {
            resultado = valor;
          }
        }
      } demás {
        iterado = cb(iterado, contexto);
        _.cada uno (obj, función (v, índice, lista) {
          calculado = iterado(v, índice, lista);
          if (calculado > últimoComputado || calculado === -Infinito && resultado === -Infinito) {
            resultado =v;
            últimoComputado = calculado;
          }
        });
      }
      resultado de devolución;
    };
  
    // Devuelve el elemento mínimo (o cálculo basado en elementos).
    _.min = función (obj, iterado, contexto) {
      var resultado = Infinito, últimoComputado = Infinito,
          valor, calculado;
      if (iteratee == null || tipo de iteratee == 'número' && tipo de obj[0] != 'objeto' && obj != nulo) {
        obj = esArrayLike(obj)? obj: _.valores(obj);
        for (var i = 0, longitud = longitud obj; i < longitud; i++) {
          valor = objeto[i];
          if (valor! = nulo && valor <resultado) {
            resultado = valor;
          }
        }
      } demás {
        iterado = cb(iterado, contexto);
        _.cada uno (obj, función (v, índice, lista) {
          calculado = iterado(v, índice, lista);
          if (calculado <últimoComputado || calculado === Infinito && resultado === Infinito) {
            resultado =v;
            últimoComputado = calculado;
          }
        });
      }
      resultado de devolución;
    };
  
    // Mezclar una colección.
    _.shuffle = función(obj) {
      devolver _.sample(obj, Infinito);
    };
  
    // Muestra **n** valores aleatorios de una colección usando la versión moderna de
    // [Barajado de Fisher-Yates](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
    // Si no se especifica **n**, devuelve un único elemento aleatorio.
    // El argumento interno `guard` le permite trabajar con `map`.
    _.muestra = función(obj, n, guardia) {
      si (n == nulo || guardia) {
        if (!isArrayLike(obj)) obj = _.values(obj);
        devolver obj[_.random(obj.length - 1)];
      }
      var muestra = isArrayLike(obj)? _.clon(obj): _.values(obj);
      var longitud = getLength(muestra);
      n = Math.max(Math.min(n, longitud), 0);
      var último = longitud - 1;
      para (var índice = 0; índice < n; índice ++) {
        var rand = _.random(índice, último);
        var temp = muestra[índice];
        muestra[índice] = muestra[rand];
        muestra[rand] = temp;
      }
      devolver muestra.slice(0, n);
    };
  
    // Ordena los valores del objeto según un criterio producido por un iterado.
    _.sortBy = función (obj, iterado, contexto) {
      índice var = 0;
      iterado = cb(iterado, contexto);
      return _.pluck(_.map(obj, función(valor, clave, lista) {
        devolver {
          valor: valor,
          índice: índice ++,
          criterios: iterar(valor, clave, lista)
        };
      }).sort(función(izquierda, derecha) {
        var a = izquierda.criterios;
        var b = derecho.criterios;
        si (a! == b) {
          si (a > b || a === void 0) devuelve 1;
          si (a < b || b === void 0) devuelve -1;
        }
        devolver índice.izquierdo - índice.derecho;
      }), 'valor');
    };
  
    // Una función interna utilizada para operaciones agregadas de "agrupar por".
    var grupo = función (comportamiento, partición) {
      función de retorno (obj, iterado, contexto) {
        var resultado = partición? [[], []] : {};
        iterado = cb(iterado, contexto);
        _.cada uno(obj, función(valor, índice) {
          var clave = iterar(valor, índice, obj);
          comportamiento (resultado, valor, clave);
        });
        resultado de devolución;
      };
    };
  
    // Agrupa los valores del objeto según un criterio. Pasar un atributo de cadena
    // para agrupar por, o una función que devuelve el criterio.
    _.groupBy = grupo(función(resultado, valor, clave) {
      if (tiene(resultado, clave)) resultado[clave].push(valor); de lo contrario resultado[clave] = [valor];
    });
  
    // Indexa los valores del objeto según un criterio, similar a `groupBy`, pero para
    // cuando sepas que los valores de tu índice serán únicos.
    _.indexBy = grupo(función(resultado, valor, clave) {
      resultado[clave] = valor;
    });
  
    // Cuenta instancias de un objeto que se agrupan según un determinado criterio. Aprobar
    // ya sea un atributo de cadena para contar o una función que devuelve el
    // criterio.
    _.countBy = grupo(función(resultado, valor, clave) {
      if (tiene(resultado, clave)) resultado[clave]++; de lo contrario resultado[clave] = 1;
    });
  
    var reStrSymbol = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;
    // Crea de forma segura una matriz real y en vivo a partir de cualquier elemento iterable.
    _.toArray = función(obj) {
      si (!obj) devuelve [];
      si (_.isArray(obj)) devuelve slice.call(obj);
      si (_.isString(obj)) {
        // Mantener juntos los personajes del par sustituto
        devolver obj.match(reStrSymbol);
      }
      si (isArrayLike(obj)) devuelve _.map(obj, _.identity);
      devolver _.values(obj);
    };
  
    // Devuelve el número de elementos de un objeto.
    _.tamaño = función(obj) {
      si (obj == nulo) devuelve 0;
      devolver esArrayLike(obj)? obj.longitud: _.keys(obj).longitud;
    };
  
    // Dividir una colección en dos matrices: una cuyos elementos satisfacen todos los requisitos dados
    // predicado, y uno cuyos elementos no satisfacen el predicado.
    _.partición = grupo(función(resultado, valor, paso) {
      resultado[pasar? 0: 1].push(valor);
    }, verdadero);
  
    // Funciones de matriz
    // ---------------
  
    // Obtiene el primer elemento de una matriz. Pasar **n** devolverá la primera N
    // valores en la matriz. Aliados como "cabeza" y "tomar". El control de **guardia**
    // le permite trabajar con `_.map`.
    _.first = _.head = _.take = function(matriz, n, guardia) {
      si (matriz == nulo || matriz.longitud < 1) devuelve n == nulo? vacío 0: [];
      if (n == null || guard) devolver matriz[0];
      return _.initial(matriz, matriz.longitud - n);
    };
  
    // Devuelve todo menos la última entrada de la matriz. Especialmente útil en
    // el objeto de argumentos. Pasar **n** devolverá todos los valores en
    // la matriz, excluyendo la última N.
    _.inicial = función(matriz, n, guardia) {
      return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
    };
  
    // Obtiene el último elemento de una matriz. Pasar **n** devolverá la última N
    // valores en la matriz.
    _.último = función (matriz, n, guardia) {
      si (matriz == nulo || matriz.longitud < 1) devuelve n == nulo? vacío 0: [];
      if (n == null || guard) return matriz[array.length - 1];
      return _.rest(array, Math.max(0, array.length - n));
    };
  
    // Devuelve todo menos la primera entrada de la matriz. Con alias "cola" y "soltar".
    // Especialmente útil en el objeto de argumentos. Pasando un **n** volverá
    // el resto N valores en la matriz.
    _.rest = _.tail = _.drop = función(matriz, n, guardia) {
      return slice.call(array, n == null || guard ? 1 : n);
    };
  
    // Elimina todos los valores falsos de una matriz.
    _.compact = función (matriz) {
      return _.filter(matriz, booleano);
    };
  
    // Implementación interna de una función recursiva `aplanar`.
    var aplanar = función (entrada, superficial, estricta, salida) {
      salida = salida || [];
      var idx = salida.longitud;
      for (var i = 0, longitud = getLength(entrada); i < longitud; i++) {
        valor var = entrada[i];
        if (isArrayLike(valor) && (_.isArray(valor) || _.isArguments(valor))) {
          // Aplana el nivel actual de la matriz o del objeto de argumentos.
          si (superficial) {
            var j = 0, len = valor.longitud;
            while (j < len) salida[idx++] = valor[j++];
          } demás {
            aplanar (valor, superficial, estricto, salida);
            idx = salida.longitud;
          }
        } si no (!estricto) {
          salida[idx++] = valor;
        }
      }
      salida de retorno;
    };
  
    // Aplana una matriz, ya sea de forma recursiva (por defecto) o solo un nivel.
    _.aplanar = función (matriz, poco profunda) {
      retorno aplanar (matriz, superficial, falso);
    };
  
    // Devuelve una versión de la matriz que no contiene los valores especificados.
    _.sin = restoArgumentos(función(matriz, otrasArrays) {
      return _.difference(matriz, otrasArrays);
    });
  
    // Producir una versión libre de duplicados de la matriz. Si la matriz ya tiene
    // ordenado, tienes la opción de utilizar un algoritmo más rápido.
    // El algoritmo más rápido no funcionará con un iterado si el iterado
    // no es una función uno a uno, por lo que proporcionar un iterado deshabilitará
    // el algoritmo más rápido.
    // Aliasado como "único".
    _.uniq = _.unique = función (matriz, está ordenada, iterada, contexto) {
      if (!_.isBoolean(estáOrdenado)) {
        contexto = iterado;
        iterar = está ordenado;
        está ordenado = falso;
      }
      if (iterado! = nulo) iterado = cb(iterado, contexto);
      resultado var = [];
      var visto = [];
      for (var i = 0, longitud = getLength(matriz); i < longitud; i++) {
        valor var = matriz [i],
            calculado = iterado? iterar(valor, i, matriz): valor;
        si (está ordenado &&! iterado) {
          if (!i || visto!== calculado) resultado.push(valor);
          visto = calculado;
        } más si (iterado) {
          if (!_.contains(visto, calculado)) {
            visto.push(calculado);
            resultado.push(valor);
          }
        } else if (!_.contains(resultado, valor)) {
          resultado.push(valor);
        }
      }
      resultado de devolución;
    };
  
    // Producir una matriz que contenga la unión: cada elemento distinto de todos
    // las matrices pasadas.
    _.union = restoArgumentos(función(matrices) {
      return _.uniq(aplanar(matrices, verdadero, verdadero));
    });
  
    // Produce una matriz que contiene cada elemento compartido entre todos los
    // matrices pasadas.
    _.intersección = función (matriz) {
      resultado var = [];
      var argsLength = argumentos.longitud;
      for (var i = 0, longitud = getLength(matriz); i < longitud; i++) {
        var elemento = matriz[i];
        if (_.contains(resultado, elemento)) continuar;
        varj;
        para (j = 1; j < argsLength; j++) {
          if (!_.contains(argumentos[j], elemento)) break;
        }
        if (j === argsLength) resultado.push(elemento);
      }
      resultado de devolución;
    };
  
    // Tome la diferencia entre una matriz y varias otras matrices.
    // Solo permanecerán los elementos presentes en la primera matriz.
    _.diferencia = restoArgumentos(función(matriz, resto) {
      resto = aplanar (descanso, verdadero, verdadero);
      retorno _.filtro(matriz, función(valor){
        return !_.contains(resto, valor);
      });
    });
  
    // Complemento de _.zip. Descomprimir acepta una variedad de matrices y grupos
    // los elementos de cada matriz en índices compartidos.
    _.descomprimir = función (matriz) {
      var longitud = matriz && _.max(matriz, getLength).longitud || 0;
      resultado var = Matriz(longitud);
  
      for (var índice = 0; índice < longitud; índice ++) {
        resultado[índice] = _.pluck(matriz, índice);
      }
      resultado de devolución;
    };
  
    // Comprime varias listas en una sola matriz: elementos que se comparten
    // un índice van juntos.
    _.zip = restArguments(_.unzip);
  
    // Convierte listas en objetos. Pase una única matriz de `[clave, valor]`
    // pares, o dos matrices paralelas de la misma longitud: una de claves y otra de
    // los valores correspondientes. Pasar por parejas es lo inverso a _.pares.
    _.objeto = función(lista, valores) {
      resultado var = {};
      for (var i = 0, longitud = getLength(lista); i < longitud; i++) {
        si (valores) {
          resultado[lista[i]] = valores[i];
        } demás {
          resultado[lista[i][0]] = lista[i][1];
        }
      }
      resultado de devolución;
    };
  
    // Función generadora para crear las funciones findIndex y findLastIndex.
    var createPredicateIndexFinder = función(dir) {
      función de retorno (matriz, predicado, contexto) {
        predicado = cb(predicado, contexto);
        var longitud = getLength(matriz);
        índice var = directorio > 0? 0: longitud - 1;
        for (; índice >= 0 && índice < longitud; índice += dir) {
          if (predicado(matriz[índice], índice, matriz)) índice de retorno;
        }
        devolver -1;
      };
    };
  
    // Devuelve el primer índice de una matriz que pasa una prueba de predicado.
    _.findIndex = createPredicateIndexFinder(1);
    _.findLastIndex = createPredicateIndexFinder(-1);
  
    // Usa una función de comparación para encontrar el índice más pequeño en el que
    // se debe insertar un objeto para mantener el orden. Utiliza búsqueda binaria.
    _.sortedIndex = función (matriz, obj, iterado, contexto) {
      iterar = cb(iterar, contexto, 1);
      valor var = iterar(obj);
      var baja = 0, alta = getLength(matriz);
      mientras (bajo <alto) {
        var mid = Math.floor((bajo + alto) / 2);
        if (iteratee(matriz[mid]) <valor) bajo = mid + 1; de lo contrario alto = medio;
      }
      retorno bajo;
    };
  
    // Función generadora para crear las funciones indexOf y lastIndexOf.
    var createIndexFinder = function(dir, predicateFind, sortedIndex) {
      función de retorno (matriz, elemento, idx) {
        var i = 0, longitud = getLength(matriz);
        if (tipo de idx == 'número') {
          si (dir > 0) {
            yo = idx >= 0 ? idx: Math.max(idx + longitud, i);
          } demás {
            longitud = idx >= 0 ? Math.min(idx + 1, longitud): idx + longitud + 1;
          }
        } else if (índice ordenado && idx && longitud) {
          idx = índice ordenado (matriz, elemento);
          devolver matriz [idx] === elemento? identificaciónx: -1;
        }
        si (artículo! == artículo) {
          idx = predicateFind(slice.call(array, i, length), _.isNaN);
          devolver idx>= 0? idx + i : -1;
        }
        for (idx = dir > 0 ? i : longitud - 1; idx >= 0 && idx < longitud; idx += dir) {
          if (matriz[idx] === elemento) devuelve idx;
        }
        devolver -1;
      };
    };
  
    // Devuelve la posición de la primera aparición de un elemento en una matriz,
    // o -1 si el elemento no está incluido en la matriz.
    // Si la matriz es grande y ya está en orden de clasificación, pasa "verdadero"
    // para que **isSorted** utilice la búsqueda binaria.
    _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
    _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);
  
    // Genera una matriz de números enteros que contiene una progresión aritmética. un puerto de
    // la función nativa `range()` de Python. Ver
    // [la documentación de Python](http://docs.python.org/library/functions.html#range).
    _.range = función(inicio, parada, paso) {
      si (detener == nulo) {
        detener = iniciar || 0;
        inicio = 0;
      }
      si (!paso) {
        paso = detener <iniciar? -1: 1;
      }
  
      var longitud = Math.max(Math.ceil((detener - iniciar) / paso), 0);
      rango var = Matriz(longitud);
  
      for (var idx = 0; idx < longitud; idx++, inicio += paso) {
        rango[idx] = inicio;
      }
  
      rango de retorno;
    };
  
    // Dividir una única matriz en varias matrices, cada una de las cuales contenga `count` o menos
    // elementos.
    _.chunk = función (matriz, recuento) {
      if (recuento == nulo || recuento < 1) return [];
      resultado var = [];
      var i = 0, longitud = matriz.longitud;
      mientras (i < longitud) {
        resultado.push(slice.call(array, i, i += count));
      }
      resultado de devolución;
    };
  
    // Función (ejem) Funciones
    // ------------------
  
    // Determina si se ejecuta una función como constructor
    // o una función normal con los argumentos proporcionados.
    var ejecutarBound = función(sourceFunc,boundFunc, contexto, callContext, args) {
      if (!(callingContext instancia deboundFunc)) devuelve sourceFunc.apply(context, args);
      var self = baseCreate(sourceFunc.prototype);
      resultado var = sourceFunc.apply(self, args);
      if (_.isObject(resultado)) devuelve resultado;
      regresar a uno mismo;
    };
  
    // Crea una función vinculada a un objeto dado (asignando `this` y argumentos,
    // opcionalmente). Delega al `Function.bind` nativo de **ECMAScript 5** si
    // disponible.
    _.bind = restArguments(función(func, contexto, argumentos) {
      if (!_.isFunction(func)) throw new TypeError('Se debe llamar a Bind en una función');
      var enlazado = restoArgumentos(función(callArgs) {
        retorno ejecutarBound(func, enlazado, contexto, esto, args.concat(callArgs));
      });
      regresar con destino;
    });
  
    // Aplicar parcialmente una función creando una versión que ha tenido algunos de sus
    // argumentos precargados, sin cambiar su contexto dinámico "este". _ actos
    // como marcador de posición por defecto, permitiendo cualquier combinación de argumentos
    // precargado. Establezca `_.partial.placeholder` para un argumento de marcador de posición personalizado.
    _.partial = restoArgumentos(función(func, argumentos enlazados) {
      var marcador de posición = _.partial.placeholder;
      var enlazado = función() {
        var posición = 0, longitud =boundArgs.length;
        var args = Matriz(longitud);
        para (var i = 0; i < longitud; i++) {
          args[i] =boundArgs[i] === marcador de posición? argumentos[posición++] : argumentos enlazados[i];
        }
        while (posición <argumentos.longitud) args.push(argumentos[posición++]);
        return ejecutarBound(func,bound,this,this,args);
      };
      regresar con destino;
    });
  
    _.partial.placeholder = _;
  
    // Vincula varios métodos de un objeto a ese objeto. Argumentos restantes
    // son los nombres de los métodos que se vincularán. Útil para garantizar que todas las devoluciones de llamada
    // definido en un objeto le pertenece.
    _.bindAll = restArguments(función(obj, claves) {
      claves = aplanar (claves, falso, falso);
      var índice = claves.longitud;
      si (índice <1) arroja un nuevo error ('bindAll debe pasarse los nombres de las funciones');
      mientras (índice--) {
        var clave = claves[índice];
        obj[clave] = _.bind(obj[clave], obj);
      }
    });
  
    // Memoriza una función costosa almacenando sus resultados.
    _.memoize = función(func, hasher) {
      var memorizar = función (tecla) {
        var caché = memoize.cache;
        var dirección = '' + (hasher? hasher.apply(esto, argumentos): clave);
        if (!has(caché, dirección)) caché[dirección] = func.apply(this, argumentos);
        devolver caché[dirección];
      };
      memoize.cache = {};
      volver memorizar;
    };
  
    // Retrasa una función durante el número dado de milisegundos y luego llama
    // con los argumentos proporcionados.
    _.delay = restArguments(función(func, espera, argumentos) {
      devolver setTimeout(función() {
        return func.apply(nulo, argumentos);
      }, esperar);
    });
  
    // Aplaza una función, programándola para que se ejecute después de que se haya completado la pila de llamadas actual
    // despejado.
    _.diferir = _.partial(_.retraso, _, 1);
  
    // Devuelve una función que, cuando se invoca, sólo se activará como máximo una vez
    // durante un período de tiempo determinado. Normalmente, la función acelerada se ejecutará
    // tanto como pueda, sin pasar más de una vez por duración de "espera";
    // pero si deseas deshabilitar la ejecución en el borde de ataque, pasa
    // `{principal: falso}`. Para deshabilitar la ejecución en el borde de salida, lo mismo.
    _.throttle = función(función, espera, opciones) {
      var tiempo de espera, contexto, argumentos, resultado;
      var anterior = 0;
      si (!opciones) opciones = {};
  
      var más tarde = función() {
        anterior = opciones.principal === falso? 0: _.ahora();
        tiempo de espera = nulo;
        resultado = func.apply(contexto, argumentos);
        si (! tiempo de espera) contexto = args = nulo;
      };
  
      var estrangulado = función() {
        var ahora = _.now();
        if (!previous && options.leading === false) anterior = ahora;
        var restante = esperar - (ahora - anterior);
        contexto = esto;
        argumentos = argumentos;
        if (restante <= 0 || restante > espera) {
          si (tiempo de espera) {
            clearTimeout(tiempo de espera);
            tiempo de espera = nulo;
          }
          anterior = ahora;
          resultado = func.apply(contexto, argumentos);
          si (! tiempo de espera) contexto = args = nulo;
        } else if (!timeout && opciones.trailing !== false) {
          timeout = setTimeout(más tarde, restante);
        }
        resultado de devolución;
      };
  
      estrangulado.cancelar = función() {
        clearTimeout(tiempo de espera);
        anterior = 0;
        tiempo de espera = contexto = argumentos = nulo;
      };
  
      retorno estrangulado;
    };
  
    // Devuelve una función que, mientras se siga invocando, no
    // ser activado. La función se llamará después de que deje de ser llamada.
    // N milisegundos. Si se pasa "inmediato", active la función en el
    // borde de ataque, en lugar del borde de salida.
    _.debounce = función(función, espera, inmediato) {
      tiempo de espera de var, resultado;
  
      var más tarde = función (contexto, argumentos) {
        tiempo de espera = nulo;
        si (argumentos) resultado = func.apply(contexto, argumentos);
      };
  
      var rebotado = restoArgumentos(función(argumentos) {
        if (tiempo de espera) clearTimeout(tiempo de espera);
        si (inmediato) {
          var callNow = !tiempo de espera;
          timeout = setTimeout(más tarde, espera);
          if (callNow) resultado = func.apply(this, args);
        } demás {
          timeout = _.delay(más tarde, espera, esto, args);
        }
  
        resultado de devolución;
      });
  
      cancelado.cancelar = función() {
        clearTimeout(tiempo de espera);
        tiempo de espera = nulo;
      };
  
      devolución rebotada;
    };
  
    // Devuelve la primera función pasada como argumento a la segunda,
    // permitiéndole ajustar argumentos, ejecutar código antes y después, y
    // ejecuta condicionalmente la función original.
    _.wrap = función(func, contenedor) {
      return _.partial(envoltorio, func);
    };
  
    // Devuelve una versión negada del predicado pasado.
    _.negar = función (predicado) {
      función de retorno() {
        return !predicate.apply(esto, argumentos);
      };
    };
  
    // Devuelve una función que es la composición de una lista de funciones, cada una
    // consumiendo el valor de retorno de la función siguiente.
    _.componer = función() {
      var argumentos = argumentos;
      var inicio = args.length - 1;
      función de retorno() {
        var i = inicio;
        var resultado = args[inicio].apply(esto, argumentos);
        mientras (i--) resultado = args[i].call(este, resultado);
        resultado de devolución;
      };
    };
  
    // Devuelve una función que solo se ejecutará en y después de la enésima llamada.
    _.después = función(veces, func) {
      función de retorno() {
        si (--veces < 1) {
          return func.apply(esto, argumentos);
        }
      };
    };
  
    // Devuelve una función que solo se ejecutará hasta (pero sin incluir) la enésima llamada.
    _.antes = función(veces, func) {
      nota var;
      función de retorno() {
        si (--veces > 0) {
          memo = func.apply(esto, argumentos);
        }
        si (veces <= 1) func = null;
        devolver nota;
      };
    };
  
    // Devuelve una función que se ejecutará como máximo una vez, sin importar cuánto
    // a menudo lo llamas. Útil para la inicialización diferida.
    _.una vez = _.partial(_.antes, 2);
  
    _.restArguments = restoArgumentos;
  
    // Funciones de objeto
    // ----------------
  
    // Claves en IE < 9 que no serán iteradas por `for key in...` y, por lo tanto, se perderán.
    var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
    var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
      'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];
  
    var recolectarNonEnumProps = función (obj, claves) {
      var nonEnumIdx = nonEnumerableProps.length;
      var constructor = obj.constructor;
      var proto = _.isFunction(constructor) && constructor.prototipo || ObjProto;
  
      // El constructor es un caso especial.
      var prop = 'constructor';
      if (has(obj, prop) && !_.contains(keys, prop)) llaves.push(prop);
  
      mientras (nonEnumIdx--) {
        prop = nonEnumerableProps[nonEnumIdx];
        if (prop en obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
          teclas.push(prop);
        }
      }
    };
  
    // Recupera los nombres de las propiedades propias de un objeto.
    // Delega a `Object.keys` nativo de **ECMAScript 5**.
    _.teclas = función(obj) {
      si (!_.isObject(obj)) devuelve [];
      si (nativeKeys) devuelven NativeKeys (obj);
      claves var = [];
      para (var clave en obj) if (has(obj, clave)) llaves.push(clave);
      // Ejem, es decir < 9.
      si (hasEnumBug) recopilaNonEnumProps(obj, claves);
      llaves de retorno;
    };
  
    // Recupera todos los nombres de propiedades de un objeto.
    _.allKeys = función(obj) {
      si (!_.isObject(obj)) devuelve [];
      claves var = [];
      para (clave var en obj) llaves.push(clave);
      // Ejem, es decir < 9.
      si (hasEnumBug) recopilaNonEnumProps(obj, claves);
      llaves de retorno;
    };
  
    // Recupera los valores de las propiedades de un objeto.
    _.valores = función(obj) {
      var claves = _.keys(obj);
      var longitud = claves.longitud;
      valores var = Matriz(longitud);
      para (var i = 0; i < longitud; i++) {
        valores[i] = obj[claves[i]];
      }
      valores de retorno;
    };
  
    // Devuelve los resultados de aplicar el iterado a cada elemento del objeto.
    // A diferencia de _.map, devuelve un objeto.
    _.mapObject = función (obj, iterado, contexto) {
      iterado = cb(iterado, contexto);
      var claves = _.claves (obj),
          longitud = claves.longitud,
          resultados = {};
      for (var índice = 0; índice < longitud; índice ++) {
        var currentKey = claves[índice];
        resultados[claveactual] = iterar(obj[claveactual], claveactual, obj);
      }
      devolver resultados;
    };
  
    // Convierte un objeto en una lista de pares `[clave, valor]`.
    // Lo opuesto a _.object.
    _.pares = función(obj) {
      var claves = _.keys(obj);
      var longitud = claves.longitud;
      pares var = Matriz(longitud);
      para (var i = 0; i < longitud; i++) {
        pares[i] = [claves[i], obj[claves[i]]];
      }
      pares de retorno;
    };
  
    // Invertir las claves y valores de un objeto. Los valores deben ser serializables.
    _.invertir = función(obj) {
      resultado var = {};
      var claves = _.keys(obj);
      for (var i = 0, longitud = claves.longitud; i < longitud; i++) {
        resultado[obj[claves[i]]] = claves[i];
      }
      resultado de devolución;
    };
  
    // Devuelve una lista ordenada de los nombres de funciones disponibles en el objeto.
    // Aliasado como `métodos`.
    _.funciones = _.métodos = función(obj) {
      nombres var = [];
      para (clave var en obj) {
        if (_.isFunction(obj[clave])) nombres.push(clave);
      }
      devolver nombres.sort();
    };
  
    // Una función interna para crear funciones de asignador.
    var createAssigner = function(keysFunc, valores predeterminados) {
      función de retorno (obj) {
        var longitud = argumentos.longitud;
        si (predeterminado) obj = Objeto(obj);
        si (longitud <2 || obj == null) return obj;
        for (var índice = 1; índice < longitud; índice ++) {
          var fuente = argumentos[índice],
              teclas = teclasFunc(fuente),
              l = claves.longitud;
          para (var i = 0; i < l; i++) {
            var clave = claves[i];
            if (!defaults || obj[clave] === void 0) obj[clave] = fuente[clave];
          }
        }
        objeto de retorno;
      };
    };
  
    // Ampliar un objeto determinado con todas las propiedades de los objetos pasados.
    _.extend = createAssigner(_.allKeys);
  
    // Asigna un objeto determinado con todas las propiedades propias de los objetos pasados.
    // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
    _.extendOwn = _.assign = createAssigner(_.keys);
  
    // Devuelve la primera clave de un objeto que pasa una prueba de predicado.
    _.findKey = función (obj, predicado, contexto) {
      predicado = cb(predicado, contexto);
      var claves = _.keys(obj), clave;
      for (var i = 0, longitud = claves.longitud; i < longitud; i++) {
        clave = claves[i];
        if (predicado(obj[clave], clave, obj)) clave de retorno;
      }
    };
  
    // Función auxiliar de selección interna para determinar si `obj` tiene la clave `key`.
    var keyInObj = función (valor, clave, obj) {
      clave de retorno en obj;
    };
  
    // Devuelve una copia del objeto que solo contiene las propiedades incluidas en la lista blanca.
    _.pick = restoArgumentos(función(obj, claves) {
      resultado var = {}, iterar = claves[0];
      if (obj == null) devuelve resultado;
      if (_.isFunction(iteratee)) {
        if (claves.longitud > 1) iterar = optimizarCb(iterar, claves[1]);
        claves = _.allKeys(obj);
      } demás {
        iterar = keyInObj;
        claves = aplanar (claves, falso, falso);
        obj = Objeto(obj);
      }
      for (var i = 0, longitud = claves.longitud; i < longitud; i++) {
        var clave = claves[i];
        valor var = obj[clave];
        if (iteratee(valor, clave, obj)) resultado[clave] = valor;
      }
      resultado de devolución;
    });
  
    // Devuelve una copia del objeto sin las propiedades de la lista negra.
    _.omitir = restoArgumentos(función(obj, claves) {
      var iteratee = claves[0], contexto;
      if (_.isFunction(iteratee)) {
        iterar = _.negar(iterar);
        if (claves.longitud > 1) contexto = claves[1];
      } demás {
        claves = _.map(aplanar(claves, falso, falso), Cadena);
        iterar = función (valor, clave) {
          return !_.contains(claves, clave);
        };
      }
      return _.pick(obj, iterado, contexto);
    });
  
    // Complete un objeto determinado con propiedades predeterminadas.
    _.defaults = createAssigner(_.allKeys, verdadero);
  
    // Crea un objeto que hereda del objeto prototipo dado.
    // Si se proporcionan propiedades adicionales, se agregarán al
    // objeto creado.
    _.create = función (prototipo, accesorios) {
      resultado var = baseCreate(prototipo);
      if (props) _.extendOwn(resultado, props);
      resultado de devolución;
    };
  
    // Crea un duplicado (clonado superficial) de un objeto.
    _.clon = función(obj) {
      si (!_.isObject(obj)) devuelve obj;
      devolver _.isArray(obj)? obj.slice() : _.extend({}, obj);
    };
  
    // Invoca el interceptor con obj y luego devuelve obj.
    // El propósito principal de este método es "aprovechar" una cadena de métodos, en
    // orden para realizar operaciones sobre resultados intermedios dentro de la cadena.
    _.tap = función (obj, interceptor) {
      interceptor(obj);
      objeto de retorno;
    };
  
    // Devuelve si un objeto tiene un conjunto determinado de pares `clave:valor`.
    _.isMatch = función (objeto, atributos) {
      var claves = _.claves(atributos), longitud = claves.longitud;
      si (objeto == nulo) devuelve! Longitud;
      var obj = Objeto(objeto);
      para (var i = 0; i < longitud; i++) {
        var clave = claves[i];
        if (attrs[clave]!== obj[clave] ||!(clave en obj)) devuelve falso;
      }
      devolver verdadero;
    };
  
  
    // Función de comparación recursiva interna para `isEqual`.
    var eq, profundidad Eq;
    eq = función (a, b, aPila, bPila) {
      // Los objetos idénticos son iguales. `0 === -0`, pero no son idénticos.
      // Ver la [propuesta de Harmony `egal`](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
      si (a === b) devuelve a !== 0 || 1/a === 1/b;
      // `null` o `indefinido` solo es igual a sí mismo (comparación estricta).
      si (a == nulo || b == nulo) devuelve falso;
      // Los `NaN`s son equivalentes, pero no reflexivos.
      si (a! == a) devuelve b! == b;
      // Agotar comprobaciones primitivas
      tipo var = tipo de a;
      if (escriba! == 'función' && escriba! == 'objeto' && tipo de b! = 'objeto') devuelve falso;
      devolver deepEq(a, b, aStack, bStack);
    };
  
    // Función de comparación recursiva interna para `isEqual`.
    deepEq = función (a, b, aStack, bStack) {
      // Desenvuelve los objetos envueltos.
      if (una instancia de _) a = a._wrapped;
      si (b instancia de _) b = b._wrapped;
      // Compara nombres `[[Clase]]`.
      var nombredeclase = toString.call(a);
      si (className! == toString.call(b)) devuelve falso;
      cambiar (nombre de clase) {
        // Las cadenas, números, expresiones regulares, fechas y valores booleanos se comparan por valor.
        caso '[objeto RegExp]':
        // Las expresiones regulares se convierten en cadenas para compararlas (Nota: '' + /a/i === '/a/i')
        caso '[cadena de objeto]':
          // Las primitivas y sus correspondientes envoltorios de objetos son equivalentes; por lo tanto, `"5"` es
          // equivalente a `nueva cadena("5")`.
          devolver '' + a === '' + b;
        caso '[Número de objeto]':
          // Los `NaN`s son equivalentes, pero no reflexivos.
          // Objeto (NaN) es equivalente a NaN.
          si (+a!== +a) devuelve +b!== +b;
          // Se realiza una comparación `egal` para otros valores numéricos.
          devolver +a === 0 ? 1 / +a === 1 / b : +a === +b;
        caso '[fecha del objeto]':
        caso '[objeto booleano]':
          // Convierte fechas y valores booleanos a valores primitivos numéricos. Las fechas se comparan por su
          // representaciones de milisegundos. Tenga en cuenta que las fechas no válidas con representaciones de milisegundos
          // de `NaN` no son equivalentes.
          devolver +a === +b;
        caso '[símbolo de objeto]':
          return SymbolProto.valueOf.call(a) === SymbolProto.valueOf.call(b);
      }
  
      var areArrays = className === '[matriz de objetos]';
      si (!areArrays) {
        si (tipo de a! = 'objeto' || tipo de b! = 'objeto') devuelve falso;
  
        // Los objetos con diferentes constructores no son equivalentes, sino `Objetos o `Array`s
        // de diferentes marcos son.
        var aCtor = a.constructor, bCtor = b.constructor;
        if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instancia de aCtor &&
                                 _.isFunction(bCtor) && bCtor instancia de bCtor)
                            && ('constructor' en a && 'constructor' en b)) {
          falso retorno;
        }
      }
      // Supongamos igualdad para estructuras cíclicas. El algoritmo para detectar cíclicos.
      // estructuras está adaptada de ES 5.1 sección 15.12.3, operación abstracta `JO`.
  
      // Inicializando pila de objetos atravesados.
      // Se hace aquí ya que solo los necesitamos para comparar objetos y matrices.
      unaPila = unaPila || [];
      bPila = bPila || [];
      var longitud = aStack.length;
      mientras (longitud--) {
        // Búsqueda lineal. El rendimiento es inversamente proporcional al número de
        // estructuras anidadas únicas.
        if (aStack[longitud] === a) return bStack[longitud] === b;
      }
  
      // Agrega el primer objeto a la pila de objetos atravesados.
      aStack.push(a);
      bStack.push(b);
  
      // Compara recursivamente objetos y matrices.
      si (sonArrays) {
        // Compara las longitudes de las matrices para determinar si es necesaria una comparación profunda.
        longitud = a.longitud;
        si (longitud! == b.longitud) devuelve falso;
        // Compara en profundidad el contenido, ignorando las propiedades no numéricas.
        mientras (longitud--) {
          if (!eq(a[longitud], b[longitud], aStack, bStack)) devuelve falso;
        }
      } demás {
        // Comparación profunda de objetos.
        var claves = _.keys(a), clave;
        longitud = claves.longitud;
        // Asegúrese de que ambos objetos contengan la misma cantidad de propiedades antes de comparar una igualdad profunda.
        si (_.keys(b).length!== length) devuelve falso;
        mientras (longitud--) {
          // Compara en profundidad cada miembro
          clave = claves[longitud];
          if (!(has(b, key) && eq(a[key], b[key], aStack, bStack))) devuelve falso;
        }
      }
      // Elimina el primer objeto de la pila de objetos atravesados.
      aStack.pop();
      bStack.pop();
      devolver verdadero;
    };
  
    // Realiza una comparación profunda para comprobar si dos objetos son iguales.
    _.isEqual = función(a, b) {
      devolver ecuación (a, b);
    };
  
    // ¿Está vacía una matriz, cadena u objeto determinado?
    // Un objeto "vacío" no tiene propiedades propias enumerables.
    _.isEmpty = función(obj) {
      si (obj == nulo) devuelve verdadero;
      if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
      return _.keys(obj).length === 0;
    };
  
    // ¿Un valor dado es un elemento DOM?
    _.isElement = función(obj) {
      retorno!!(obj && obj.nodeType === 1);
    };
  
    // ¿Un valor dado es una matriz?
    // Delega al Array.isArray nativo de ECMA5
    _.isArray = nativoIsArray || función(obj) {
      return toString.call(obj) === '[matriz de objetos]';
    };
  
    // ¿Es una variable dada un objeto?
    _.isObject = función(obj) {
      tipo var = tipo de obj;
      tipo de retorno === 'función' || escriba === 'objeto' && !!obj;
    };
  
    // Agregue algunos métodos isType: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError, isMap, isWeakMap, isSet, isWeakSet.
    _.each(['Argumentos', 'Función', 'Cadena', 'Número', 'Fecha', 'ExpReg', 'Error', 'Símbolo', 'Mapa', 'Mapa débil', 'Establecer', ' Conjunto Débil'], función(nombre) {
      _['es' + nombre] = función(obj) {
        return toString.call(obj) === '[objeto ' + nombre + ']';
      };
    });
  
    // Definir una versión alternativa del método en los navegadores (ejem, IE < 9), donde
    // no hay ningún tipo de "Argumentos" inspeccionable.
    if (!_.isArguments(argumentos)) {
      _.isArguments = función(obj) {
        return tiene (obj, 'llamado');
      };
    }
  
    // Optimice `isFunction` si corresponde. Solucionar algunos tipos de errores en la versión 8 anterior,
    // IE 11 (n.° 1621), Safari 8 (n.° 1929) y PhantomJS (n.° 2236).
    var nodelist = root.document && root.document.childNodes;
    if (tipo de /./ != 'función' && tipo de Int8Array != 'objeto' && tipo de lista de nodos != 'función') {
      _.isFunction = función(obj) {
        tipo de retorno de obj == 'función' || FALSO;
      };
    }
  
    // ¿Es un objeto dado un número finito?
    _.isFinito = función(obj) {
      return !_.isSymbol(obj) && isFinite(obj) && !isNaN(parseFloat(obj));
    };
  
    // ¿El valor dado es `NaN`?
    _.isNaN = función(obj) {
      return _.isNumber(obj) && isNaN(obj);
    };
  
    // ¿Un valor dado es booleano?
    _.isBoolean = función(obj) {
      devolver obj === verdadero || objeto === falso || toString.call(obj) === '[objeto booleano]';
    };
  
    // ¿Un valor dado es igual a nulo?
    _.isNull = función(obj) {
      devolver objeto === nulo;
    };
  
    // ¿Una variable determinada no está definida?
    _.isUndefinido = función(obj) {
      devolver obj === vacío 0;
    };
  
    // Función de acceso directo para comprobar si un objeto tiene una propiedad determinada directamente
    // sobre sí mismo (en otras palabras, no sobre un prototipo).
    _.has = función(obj, ruta) {
      si (!_.isArray(ruta)) {
        return tiene (obj, ruta);
      }
      var longitud = ruta.longitud;
      para (var i = 0; i < longitud; i++) {
        clave var = ruta[i];
        if (obj == nulo || !hasOwnProperty.call(obj, clave)) {
          falso retorno;
        }
        obj = obj[clave];
      }
      retorno !!longitud;
    };
  
    // Funciones de utilidad
    // -----------------
  
    // Ejecuta Underscore.js en modo *noConflict*, devolviendo la variable `_` a su
    // dueño anterior. Devuelve una referencia al objeto Subrayado.
    _.noConflicto = función() {
      root._ = subrayado anterior;
      devolver esto;
    };
  
    // Mantenga la función de identidad para los iterados predeterminados.
    _.identidad = función(valor) {
      valor de retorno;
    };
  
    // Funciones generadoras de predicados. A menudo es útil fuera del guión bajo.
    _.constante = función(valor) {
      función de retorno() {
        valor de retorno;
      };
    };
  
    _.noop = función(){};
  
    // Crea una función que, cuando se le pasa un objeto, atravesará el recorrido de ese objeto.
    // propiedades en la `ruta` dada, especificada como una matriz de claves o índices.
    _.propiedad = función (ruta) {
      si (!_.isArray(ruta)) {
        devolver propiedad superficial (ruta);
      }
      función de retorno (obj) {
        devolver deepGet(obj, ruta);
      };
    };
  
    // Genera una función para un objeto determinado que devuelve una propiedad determinada.
    _.propertyOf = función(obj) {
      si (obj == nulo) {
        función de retorno(){};
      }
      función de retorno (ruta) {
        devolver!_.isArray(ruta)? obj[ruta] : deepGet(obj, ruta);
      };
    };
  
    // Devuelve un predicado para comprobar si un objeto tiene un conjunto determinado de
    // pares `clave:valor`.
    _.matcher = _.matches = función(atributos) {
      atributos = _.extendOwn({}, atributos);
      función de retorno (obj) {
        return _.isMatch(obj, atributos);
      };
    };
  
    // Ejecuta una función **n** veces.
    _.times = función(n, iterado, contexto) {
      var acumulado = Array(Math.max(0, n));
      iterar = optimizarCb(iterar, contexto, 1);
      for (var i = 0; i < n; i++) accum[i] = iteratee(i);
      retorno acumulado;
    };
  
    // Devuelve un número entero aleatorio entre mínimo y máximo (inclusive).
    _.aleatorio = función(mín, máx) {
      si (max == nulo) {
        máximo = mínimo;
        mín = 0;
      }
      return min + Math.floor(Math.random() * (max - min + 1));
    };
  
    // Una forma (posiblemente más rápida) de obtener la marca de tiempo actual como un número entero.
    _.ahora = Fecha.ahora || función() {
      devolver nueva Fecha().getTime();
    };
  
    // Lista de entidades HTML para escapar.
    var mapa de escape = {
      '&': '&',
      '<': '<',
      '>': '>',
      '"': '"',
      "'": ''',
      '`': '`'
    };
    var unescapeMap = _.invert(escapeMap);
  
    // Funciones para escapar y cancelar el escape de cadenas hacia/desde la interpolación HTML.
    var createEscaper = función(mapa) {
      var escaper = función (coincidencia) {
        devolver mapa[coincidencia];
      };
      // Regexes para identificar una clave que necesita escape.
      var fuente = '(?:' + _.keys(mapa).join('|') + ')';
      var testRegexp = RegExp(fuente);
      var reemplazarRegexp = RegExp(fuente, 'g');
      función de retorno (cadena) {
        cadena = cadena == nulo? '' : '' + cadena;
        devolver testRegexp.test(cadena)? string.replace(replaceRegexp, escaper): cadena;
      };
    };
    _.escape = createEscaper(escapeMap);
    _.unescape = createEscaper(unescapeMap);
  
    // Atraviesa los hijos de `obj` a lo largo de `path`. Si un niño es una función,
    // se invoca con su padre como contexto. Devuelve el valor del final.
    // hijo, o `alternativo` si algún hijo no está definido.
    _.resultado = función(obj, ruta, respaldo) {
      if (!_.isArray(ruta)) ruta = [ruta];
      var longitud = ruta.longitud;
      si (! longitud) {
        devolver _.isFunction(alternativa)? fallback.call(obj): respaldo;
      }
      para (var i = 0; i < longitud; i++) {
        var prop = obj == nulo? vacío 0: obj[ruta[i]];
        si (prop === vacío 0) {
          prop = respaldo;
          yo = longitud; // Asegurarnos de no continuar iterando.
        }
        obj = _.isFunction(prop)? prop.call(obj): prop;
      }
      objeto de retorno;
    };
  
    // Genera una identificación entera única (única dentro de toda la sesión del cliente).
    // Útil para identificadores DOM temporales.
    var idContador = 0;
    _.uniqueId = función(prefijo) {
      var id = ++idContador + '';
      prefijo de retorno? prefijo + identificación: identificación;
    };
  
    // De forma predeterminada, Underscore usa delimitadores de plantilla estilo ERB, cambie el
    // siguiendo la configuración de la plantilla para usar delimitadores alternativos.
    _.templateSettings = {
      evaluar: /<%([\s\S]+?)%>/g,
      interpolar: /<%=([\s\S]+?)%>/g,
      escape: /<%-([\s\S]+?)%>/g
    };
  
    // Al personalizar `templateSettings`, si no deseas definir un
    // interpolación, evaluación o expresión regular de escape, necesitamos una que sea
    // garantizado que no coincidirá.
    var noMatch = /(.)^/;
  
    // Es necesario escapar ciertos caracteres para poder ponerlos en un
    // cadena literal.
    var escapa = {
      "'": "'",
      '\\': '\\',
      '\r': 'r',
      '\n': 'n',
      '\u2028': 'u2028',
      '\u2029': 'u2029'
    };
  
    var escapeRegExp = /\\|'|\r|\n|\u2028|\u2029/g;
  
    var escapeChar = función(coincidencia) {
      return '\\' + escapes[coincidencia];
    };
  
    // Microplantillas de JavaScript, similar a la implementación de John Resig.
    // Las plantillas de subrayado manejan delimitadores arbitrarios, conservan los espacios en blanco,
    // y escapa correctamente de las comillas dentro del código interpolado.
    // NB: `oldSettings` solo existe por compatibilidad con versiones anteriores.
    _.template = función (texto, configuración, configuración anterior) {
      if (!settings && oldSettings) settings = oldSettings;
      configuración = _.defaults({}, configuración, _.templateSettings);
  
      // Combina delimitadores en una expresión regular mediante alternancia.
      var comparador = RegExp([
        (configuración.escape || noMatch).fuente,
        (configuración.interpolar || noMatch).fuente,
        (configuración.evaluar || noMatch).fuente
      ].join('|') + '|$', 'g');
  
      // Compile la fuente de la plantilla, escapando adecuadamente los literales de cadena.
      índice var = 0;
      var fuente = "__p+='";
      text.replace(matcher, function(coincidir, escapar, interpolar, evaluar, compensar) {
        fuente += text.slice(index, offset).replace(escapeRegExp, escapeChar);
        índice = desplazamiento + coincidencia.longitud;
  
        si (escapar) {
          fuente += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
        } más si (interpolar) {
          fuente += "'+\n((__t=(" + interpolar + "))==nulo?'':__t)+\n'";
        } más si (evaluar) {
          fuente += "';\n" + evaluar + "\n__p+='";
        }
  
        // Las máquinas virtuales de Adobe necesitan que se devuelva la coincidencia para producir el desplazamiento correcto.
        partido de vuelta;
      });
      fuente += "';\n";
  
      // Si no se especifica una variable, coloque los valores de los datos en el ámbito local.
      if (!settings.variable) fuente = 'with(obj||{}){\n' + fuente + '}\n';
  
      fuente = "var __t,__p='',__j=Array.prototype.join," +
        "imprimir=función(){__p+=__j.call(argumentos,'');};\n" +
        fuente + 'retorno __p;\n';
  
      var renderizar;
      intentar {
        render = nueva función (configuración.variable || 'obj', '_', fuente);
      } atrapar (e) {
        e.fuente = fuente;
        tirar e;
      }
  
      plantilla var = función (datos) {
        devolver render.call(esto, datos, _);
      };
  
      // Proporcionar la fuente compilada para facilitar la precompilación.
      argumento var = configuración.variable || 'objeto';
      plantilla.fuente = 'función(' + argumento + '){\n' + fuente + '}';
  
      plantilla de devolución;
    };
  
    // Agrega una función de "cadena". Comience a encadenar un objeto de subrayado envuelto.
    _.cadena = función(obj) {
      var instancia = _(obj);
      instancia._chain = verdadero;
      instancia de devolución;
    };
  
    // POO
    // ---------------
    // Si se llama a Underscore como función, devuelve un objeto envuelto que
    // se puede utilizar estilo OO. Este contenedor contiene versiones alteradas de todos los
    // funciones de subrayado. Los objetos envueltos pueden estar encadenados.
  
    // Función auxiliar para seguir encadenando resultados intermedios.
    var resultadocadena = función(instancia, obj) {
      devolver instancia._chain? _(obj).cadena() : obj;
    };
  
    // Agregue sus propias funciones personalizadas al objeto Subrayado.
    _.mixin = función(obj) {
      _.each(_.functions(obj), función(nombre) {
        var func = _[nombre] = obj[nombre];
        _.prototipo[nombre] = función() {
          var args = [this._wrapped];
          push.apply(argumentos, argumentos);
          devolver chainResult(this, func.apply(_, args));
        };
      });
      devolver _;
    };
  
    // Agrega todas las funciones de subrayado al objeto contenedor.
    _.mixin(_);
  
    // Agrega todas las funciones de matriz mutator al contenedor.
    _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(nombre) {
      método var = ArrayProto[nombre];
      _.prototipo[nombre] = función() {
        var obj = this._wrapped;
        método.apply(obj, argumentos);
        if ((nombre === 'shift' || nombre === 'empalme') && obj.length === 0) eliminar obj[0];
        devolver resultadocadena(esto, obj);
      };
    });
  
    // Agrega todas las funciones de matriz de acceso al contenedor.
    _.each(['concat', 'unir', 'slice'], función(nombre) {
      método var = ArrayProto[nombre];
      _.prototipo[nombre] = función() {
        return chainResult(this, método.apply(this._wrapped, argumentos));
      };
    });
  
    // Extrae el resultado de un objeto envuelto y encadenado.
    _.prototipo.valor = función() {
      devolver esto._wrapped;
    };
  
    // Proporcionar proxy de desenvolvimiento para algunos métodos utilizados en las operaciones del motor
    // como aritmética y cadena JSON.
    _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;
  
    _.prototype.toString = función() {
      return Cadena (this._wrapped);
    };
  
    // El registro de AMD ocurre al final por compatibilidad con los cargadores AMD
    // eso puede no imponer la semántica del siguiente turno en los módulos. aunque generales
    // la práctica para el registro de AMD es ser anónimo, subrayar los registros
    // como un módulo con nombre porque, al igual que jQuery, es una biblioteca base que
    // lo suficientemente popular como para incluirse en una biblioteca de terceros, pero no ser parte de
    // una solicitud de carga de AMD. Esos casos podrían generar un error cuando un
    // se llama a define() anónimo fuera de una solicitud de cargador.
    if (tipo de definir == 'función' && definir.amd) {
      definir('guión bajo', [], función() {
        devolver _;
      });
    }
  }());