# CakePHP Scoring Server Application

## Introduction

A small server implementation using the CakePHP framework, providing the following:
- a simple REST API to store and retrieve game session data.
- loading of the generated client files

## Installation

1. Download [Composer](https://getcomposer.org/doc/00-intro.md) or update `composer self-update`.

If Composer is installed globally, run

```bash
composer install
```

Create a database using the [doc/schema.sql](doc/schema.sql) file.

Copy `config/app_local.example.php` to `config/app_local.php` or `config/app_local_production.php`
and set up security sensitive data like the `'Datasources'` and any other configuration relevant
for your application.

Other settings can be changed in `config/app.php`.

If needed, rename `public_html` to the folder name the server uses as the webroot. If the folder is
renamed, update [config/paths.php](config/paths.php) and replace `public_html` with the new folder
name.

You can now either use your machine's webserver to view the default home page, or start
up the built-in webserver with:

```bash
bin/cake server -p 8765
```

Then visit `http://localhost:8765`

## Configuration

The code will load `app_local.php` if there is no domain (running tests from the command line) or
the domain does not contain a `.` (like `localhost`). Else the code will load
`app_local_production.php`. Update the [config/bootstrap.php](config/bootstrap.php) to change
this behavior.

## Cleanup

To remove old unused game sessions from the database, create a CRON job and call
`/game-sessions/cleanup` once a day. The cleanup will remove all game sessions that have not
been updated for 1 month.
