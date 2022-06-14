## Ticketpass Test (API)

This API has been created with [Laravel](https://laravel.com), since our main application uses it this will be as close
you can get working with it.

Make sure you have the following before running this application:

- MySQL (8)
- PHP 8
- [Composer](https://getcomposer.org/)
- .env file created (copy and paste the .env.example and fill in the correct details for e.g. your database connection)

When you have the above you need to install all of the required dependencies by running `composer install`.

Secondly, run the command `php artisan storage:link` once. This command makes sure we correctly serve the images.

Before you run the application, make sure to use the provided database export to import it into your test database. It contains a test user account and example events.

Run the application by `php artisan serve`. It will run the application on port 8000, use `-port 80` or any other port to change this.

## API documentation
For the login API the following parameters can be used:
- username: `test@ticketpass.org`
- password: `Ticketpass2022`
- client_id: `966c01ba-31b1-40a2-8f4c-fab8b1373bd7`
- grant_type: `password`

Remainig API documentation can be found here: https://documenter.getpostman.com/view/2093669/Uz5CNJWC

## Learning Laravel

If you wish to learn more about Laravel, their documentation is available at https://laravel.com/docs.
