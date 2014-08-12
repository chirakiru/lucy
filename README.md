# lucy

Plataforma de información y analisis de contaminantes presentes en las principales ciudades.

Plataforma | Lenguaje | SGBD 
-----------|----------|-----
Web - RoR  | Ruby (2.1.1) | PostgreSQL

## Requerimientos

### Ruby
Instala la versión de Ruby que usa el proyecto (2.1.1)

**Nota:** [aquí](http://rvm.io/rvm/install) puedes encontrar la guía de instalación de RVM

```
$ rvm install 2.1
```

### PostgreSQL

#### OS X
Puedes instalarlo usando [Homebrew](http://brew.sh/)

```
$ brew install postgresql
```

#### Ubuntu

```
$ apt-get install postgresql-9.3 
```

#### Windows
Para Windows puede usar el instalador gráfico que se encuenta en la siguiente URL: [http://www.postgresql.org/download/windows/](http://www.postgresql.org/download/windows/)

## Desarrollo
Para iniciar el desarrollo, deberás seguir los siguientes pasos:

- Crear BD y correr migraciones.

``` 
$ rake db:create
$ rake db:migrate
``` 

- Iniciar la aplicación en el ambiente de desarrollo

```
$ rails s - 3000 -e development
$ sidekiq -e development &
```


### Nota	
Para el desarollo del front-end se utiliza [guard-livereload](https://github.com/guard/guard-livereload) para automatizar la recarga de los navegadores. Para arrancarlo utiliza el siguiente comando en la raiz del proyecto:

```
$ guard
```

### Contribuir

1. Crea un fork del proyecto
2. Crea una rama de la característica nueva ( ```git checkout -b mi-nueva-caracteristica``` )
3. Haz un commit de tus cambios ( ```git commit -am 'Añadir alguna característica'``` )
4. Sube tu branch a GitHub ( ```git push origin mi-nueva-caracteristica``` )
5. Crear un pull request y añade una descripción de tus cambios

