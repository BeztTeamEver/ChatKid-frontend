# Chatkid - Ask me your curious things 

An application aim for children from 3 year old can ask the curious questions.

## Features

- [ ] Simple talk with the bot by voice
- [ ] Voice to parent for giving some hard question or chatting
- [ ] An expert for filtering and answering the hardest question and answer for the bot
- [ ] Beutiful and friendly UI for not only child but also the whole family to use

## Starting with the app

### Prepare for project:

- You will need a node version `v18.x.x` or above
- Optional: docker to run as a container

### Running these scripts:

- `yarn`: install packages
- `yarn prepare`: prepare the husky pre-commit
- `yarn dev`: run on the dev environment
- `yarn build`: build the app to the `.next folder`
- `yarn start`: run the built app on production
- `yarn export`: if you are planning to run as a static html, the export command will create an `out` folder to use it

### Testing scripts

- `typecheck`: checks TypeScript types
- `lint`: runs ESLint
- `prettier:check`: checks files with Prettier
- `jest`: runs jest tests
- `jest:watch`: starts jest watch
- `test`: runs `jest`, `prettier:check`, `lint` and `typecheck` scripts

### Storybook (Not working yet)

- `storybook`: starts storybook dev server
- `storybook:build`: build production storybook bundle to `storybook-static`

## About us

From a team of FPT University.
