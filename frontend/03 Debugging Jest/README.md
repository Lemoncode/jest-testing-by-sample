# 03 Debugging Jest

In this sample we are going to configure VS Code for debugging Jest specs.

We will start from sample _02 Plain Vanilla_.

Summary steps:
 - Adding `launch.json` in VS Code.
 - Update `launch.json` to work with Jest.

# Steps to build it

- `npm install` to install previous sample packages:

```bash
npm install
```

## Debugging Jest

Jest is running over node, so we could use VS Code for debugging jest specs:

### Using VS Code

As we know, VS Code provides by default a [node debugger](https://code.visualstudio.com/Docs/editor/debugging):

- Adding debug `launch.json` in VS Code:

 ![Debug VS Code](../99%20Readme%20Resources/03%20Debugging%20Jest/01%20Add%20launch.json%20file.png)

> IMPORTANT: `.vscode/launch.json` file is created on root path.

 - Configuring launch.json to single and watchAll runs:

### ./.vscode/launch.json

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Jest single run",
      "program": "${workspaceRoot}/node_modules/jest/bin/jest.js",
      "args": [
        "-c",
        "./config/test/jest.json",
        "--verbose",
        "-i",
        "--no-cache"
      ],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}

```

- Now we could run specs in debugging mode.

 ![Debugging in VS Code](../99%20Readme%20Resources/03%20Debugging%20Jest/02%20debugging_in_vscode.gif)

- We can add the `watch` mode configuration too. It's like previous configuration but adding the `--watchAll` flag:

### ./.vscode/launch.json

```diff
{
  "version": "0.2.0",
  "configurations": [
    {
      ...
-   }
+   },
+   {
+     "type": "node",
+     "request": "launch",
+     "name": "Jest watch run",
+     "program": "${workspaceRoot}/node_modules/jest/bin/jest.js",
+     "args": [
+       "-c",
+       "./config/test/jest.json",
+       "--verbose",
+       "-i",
+       "--no-cache",
+       "--watchAll"
+     ],
+     "console": "integratedTerminal",
+     "internalConsoleOptions": "neverOpen"
+   }
  ]
}

```

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
