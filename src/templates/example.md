---
layout: post
title: Un titulo chirris chirris
date:   2015-10-07
tags: 
  - Programación
  - Otro Tag
description: Una descripción chirris chirris
author: El Autor
image: mty_pollutant_1.jpg
---

Todo esto es markdown.

Hola, en esta ocasión les traigo un tutorial de como crear una api REST usando [Phoenix framework](http://www.phoenixframework.org/).

Al momento de escribir esto, las versiones actuales de nuestras aplicaciones son:

- **Elixir:** v1.1.0
- **Phoenix:** v1.0.3
- **Ecto:** v1.0.4

Si estás leyendo esto y no son las últimas versiones, comentalo y voy a actualizar este tutorial.

### Instalar phoenix

Las mejores instrucciones para instalar phoenix, pueden ser encontradas en su [pagina web](http://www.phoenixframework.org/docs/installation).

### Primer paso: crear nuestro proyecto.

Primero les dejo una excelente presentación con una explicación de como diseñar un API REST creada por [Brian Mulloy](https://twitter.com/landlessness), pueden ver la presentación [aquí](../assets/tarballs/restful-api-design--mulloy-2ed.pdf).

Continuando con lo que les quiero mostrar, Phoenix nos facilita la creación de una API REST, quitandonos de encima html inescesarios para poder crear el proyecto lo hacemos de esta manera:

```bash
$ mix phoenix.new api_json --no-html
```