# Application Table with editing info
Application for viewing messages and comments based on jsonplaceholder service data
- [posts](https://jsonplaceholder.typicode.com/posts)
- [comments](https://jsonplaceholder.typicode.com/comments)
- [users](https://jsonplaceholder.typicode.com/users)

The application includes a message table and an edit form.
- Message table:
  - Grouped by authors.
  - Groups are interactively hidden and revealed.
  - The group shows user data: id, username, name, company.name, website
  - For a posts, showed `id`, `title`, `body`, `words`, `chars` . The last two parameters are calculated when displayed
- The edit form contains:
    - Message ID
    - Fields for editing title, body
    - List of comments, for each: email, name, body
## Project Setup

```sh
yarn install
```

### Compile and Hot-Reload for Development

```sh
yarn dev
```

### Compile and Minify for Production

```sh
yarn build
```

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).
