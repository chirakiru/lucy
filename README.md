# Lucy

Information and analysis platform of contaminants in the major cities.

Platform  | Language     | DBMS
----------|--------------|-----
Web - RoR | Ruby (2.1.1) | PostgreSQL

## Requirements

### Ruby
Lucy uses Ruby 2.1.1, if you use [RVM](http://rvm.io) you can install it with:

```
$ rvm install 2.1
```

### PostgreSQL

#### OS X
You can install it using [Homebrew](http://brew.sh/):

```
$ brew install postgresql
```

#### Ubuntu
In Ubuntu you would run:

```
$ apt-get install postgresql-9.3
```

#### Windows
And for Windows there's a graphic installer, you cand download it from
[here](http://www.postgresql.org/download/windows/)

## Development
To start developing Lucy, follow the next steps:

### Start PostgreSQL server

```
$ initdb /usr/local/var/postgres
$ cp /usr/local/Cellar/postgresql/9.*.*/homebrew.mxcl.postgresql.plist ~/Library/LaunchAgents/
$ launchctl load -w ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist
$ pg_ctl -D /usr/local/var/postgres -l /usr/local/var/postgres/server.log start
```

### Create the DB and run the migrations

```
$ rake db:create
$ rake db:migrate
```

### Start the app in development enviroment

```
$ rails s - 3000 -e development
$ sidekiq -e development &
```

### Note
The front-end development uses [guard-livereload](https://github.com/guard/guard-livereload) to automatically refresh the web browser. To start it use the following command in the project's root:

```
$ guard
```

## Contributing

- [Fork the project](https://github.com/chirakiru/lucy/fork)
- Clone down your fork ( ```git clone git@github.com:<username>/lucy.git``` ).
- Create a topic branch to contain your change ( ```git checkout -b my-awesome-feature``` ).
- Make sure everything still works.
- Push the branch up ( ```git push origin my-awesome-feature``` ).
- Create a pull request and describe what your change does and the why you think it should be merged.
