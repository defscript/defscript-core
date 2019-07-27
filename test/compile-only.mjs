
// compile only tests

export default [
    {
        title: "Basic named imports",
        code: `import {a, b} from 'module-name'`,
        run(api) {

        }
    },
    {
        title: "Aliased named imports",
        code: `import {a as c, b} from 'module-name'`,
        run(api) {

        }
    }
]