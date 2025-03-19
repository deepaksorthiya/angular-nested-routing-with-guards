# Angular Nested Routing

---

### ** Angular nested routing with auth guards example **

---

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.3.

## Demo

[Check Live Demo Here](https://deepaksorthiya.github.io/angular-nested-routing-with-guards/
)

## Development server

To start a local development server, run:

```bash
ng serve
```

## Command Used to generate project

```

ng generate component dashboard --skip-tests
ng generate component profile --skip-tests
ng generate component page404 --skip-tests
ng generate component attendance --skip-tests
ng generate component work --skip-tests
ng generate component login --skip-tests


ng generate module leaves --routing
ng generate component leaves --standalone false -m leaves --skip-tests
ng generate component leaves/apply --standalone false -m leaves --skip-tests
ng generate component leaves/holiday --standalone false -m leaves --skip-tests
ng generate component leaves/page404leaves --standalone false -m leaves --skip-tests

ng generate module leaves/balance --routing
ng generate component leaves/balance --standalone false -m balance --skip-tests
ng generate component leaves/balance/casual --standalone false -m balance --skip-tests
ng generate component leaves/balance/earned --standalone false -m balance --skip-tests
ng generate component leaves/balance/page404balance --standalone false -m balance --skip-tests

ng generate service services/auth --skip-tests
ng generate service services/authguard --skip-tests

ng generate guard guards/auth --skip-tests

```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

### Deploy to GitHub Pages

```bash
ng deploy --base-href=/angular-nested-routing-with-guards/
```

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
