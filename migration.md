## Process fo database migration:-

- To create Migration file:-

    ```sh
    npx typeorm migration:create src/migration/AlterUserRole
    ```

- Write migration logic.

- Run the Migration:- 

    ```sh
    yarn run migration:run
    ```