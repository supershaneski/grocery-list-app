next-sandbox-app
=========

This project is for testing features and functions of the latest Next.js 13.

# Stack

* [Next 13](https://beta.nextjs.org/docs/installation#manual-installation), the React framework

    ```sh
    npm install next@latest react@latest react-dom@latest eslint-config-next@latest
    ```
* [Material UI](https://mui.com/material-ui/getting-started/overview/), a React UI components library

    ```sh
    npm install @mui/material @emotion/react @emotion/styled
    ```
* [OpenAI](https://github.com/openai/openai-node#readme), Node.js library that provides convenient access to the OpenAI API

    ```sh
    npm install openai
    ```
* [Zustand](https://github.com/pmndrs/zustand), to handle global state management, using the [persisting store data](https://docs.pmnd.rs/zustand/integrations/persisting-store-data)
    
    ```sh
    npm install zustand
    ```

# Tokens

> Reference: https://platform.openai.com/tokenizer

A helpful rule of thumb is that one token generally corresponds to ~4 characters of text for common English text. This translates to roughly ¾ of a word (so 100 tokens ~= 75 words).

# Embedding Reference

https://github.com/openai/openai-cookbook/tree/main/apps/file-q-and-a

# MongoDB

To install MongoDB driver for Node.js.

```sh
npm install mongodb
```

Then prepare the following environment variables which will be used to connect to the database.

```
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=callcenter
DB_PORT=27017
```

We will be just using a simple MongoDB shell in localhost.
