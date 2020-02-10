
# async-env
## Description
async-env is an executable node.js script to Load async config as environment variables.
## Motivation
The main motive for this tool is situations when config is centralized by being stored on a server(s) and this config needs to be fetched and used in simple shell scripts or task runners,
this is when this simple tool comes in handy for keeping your scripts or code decoupled from your config source, as the execution of your command will be delayed until the async process has finished and the config is loaded as environment variables.
## Install
NPM
```bash
> npm i -g async-env
```
## Usage
```bash
> async-env [flags] command
```
- async-env looks by default for a file named `async-env.js` in the working directory, it expects this file to export an async function which when executed returns an object.
- this object's keys and values are then loaded as environment variables.
- The passed command is then executed with the loaded environment variables

### the `async-env.js` file
This file is where you define a javascript function to load your configuration and return it as an object.
Example:
```javascript
//async-env.js
module.exports = () => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({
      DB_USER: 'User',
      DB_PASSWORD: 'secret_pass'
    })
  }
  //simulate request latency
  , 1000)
});
```
This js file will be used by `async-env` to load environment variables `DB_USER` and `DB_PASSWORD`.
### Flags
<table>
  <thead>
    <tr>
      <th width="25%">Flag</th>
      <th width="15%">Short Flag</th>
      <th width="15%">Default</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
	  <tr>
	  <td>--path</td>
	  <td>-p</td>
	  <td>async-env.js</td>
	  <td>Path of the js file to load and return the config</td>
	  </tr>
  </tbody>
</table>

## License
MIT