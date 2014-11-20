# Willikins

A Node web framework.

Currently used for a personal project, and still in development.

## Directories

Willikins is opiniated, and expects a particular file structure for your application to work correctly.

| Name             | Description                                                    |
| ---------------- | -------------------------------------------------------------- |
| vendors          | ES6 modules available from your application using `vendors/*`. |
| sources/commands | Custom command line commands.                                  |
| sources/models   | Application model definitions.                                 |
| sources/tests    | Application tests.                                             |

## Commands

### `willikins run`

Run the local webserver.

### `willikins syncdb`

Setup the database. Iterates on each model, and creates the table if it doesn't exists.

### `willikins exec <path>`

Execute a remote script inside the local willikins context. Think of it as a way to execute commands without having to put them into the `commands` directory, that's exactly what it is.

## Custom commands

Willikins allows you to create custom CLI commands by adding ES6 modules into the `commands` directory of your application. These modules have to export three symbols:

  - *help* is used to display an help message in the Usage
  - *options* is an array where every element is an option descriptor (see below)
  - *command* is an asynchronous function (returning a promise) which will be runned when the command will be called. It can takes a parameter, which will contain the options used to call the command.

Each command can have multiple options. Every option has to be defined into the `options` array of the command. Each entry is an object with the following fields:

  - *definition* is a string formatted as such: `-o,--option VALUE`. It specifies both the short and large versions of a command (both are optional, but you have to specify at least one). You can suffix the string with an ellipsis (`...`), in which case the option will be an array containing all following, up to the next option begin.
  - *required* marks if the option is required or no. If true, the command won't be run if the option is missing.
  - *minValueCount* asks for at least N values to run the command. Similarly, *maxValueCount* asks for at most N values.

Here is a map of the default values of minValueCount and maxValueCount according to the definition formats.

| Definition             | minValueCount | maxValueCount |
| ---------------------- | ------------- | ------------- |
| `-o,--option`          | 0             | 0             |
| `-o,--option VALUE`    | 1             | 1             |
| `-o,--option VALUE...` | 0             | +∞            |

Note that every command located into the `commands` directory will be available from willikins by using its file name (ie. `willikins my-custom-command`), but that you can also use the `exec` method to launch commands from a different directory. If you do this, due to the way the option parsing works, you should use the `--` to tell willikins which are the custom command options. For example:

    $> willikins exec /home/mael/downloads/super-command.js -- --hello --world

Omitting the `--` wouldn't work, because the 'hello' and 'world' options would then be applied to the `exec` command rather than `my-super-command`.