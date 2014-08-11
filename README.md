#luvy
===

Plataforma de información y analisis de contaminantes presentes en las principales ciudades.

**Plataforma:** web

**Plataforma de Desarrollo:** Ruby & Rails

**Lenguaje de Programación:** ruby version 2.1.1

**SGBD** Postgres

**Dependencias:**

* Ver gemfile

## Instalación

1.- Descargar el proyecto desde la terminal
	
	$ git clone https://github.com/chirakiru/lucy.git
 
2.- Instalar la version de ruby que ocupa la app.

3.- Instalar postgresql

Mac OS.

Usando [homebrew](http://brew.sh/).

```
$ brew install postgresql
```

Linux distro ubuntu.

```
$ apt-get install postgresql-9.3 
```

windows

```
$ suerte ^_^
```
[http://www.postgresql.org/download/windows/](http://www.postgresql.org/download/windows/)

4.- Crear BD y correr migraciones.
 
    $ rake db:create
    $ rake db:migrate
 
5.- Arrancar el servicio.

- Desplegar desarollo.

	```
$ rails s - 3000 -e development
$ sidekiq -e development &
	```
	
6.- Para el desarollo del front-end se utiliza [guard-livereload](https://github.com/guard/guard-livereload) para automatizar la recarga en los navegadores. Para arrancar utilizar el siguiente comando en la raiz del proyecto:

```
$ guard
```

### Contribuir

1.- Crea un fork del proyecto
2.- Cree su rama de la característica (git checkout -b mi-nueva-función)
3.- Dale commit a tus cambios (git commit -am 'Añadir alguna característica')
4.- Empuja para crear el nuevo branch(git push origin mi-nueva-función).
5.- Crear un pull request

