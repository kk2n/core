const execSync = require('child_process').execSync

const exec = (command, extraEnv) =>
  execSync(command, {
    stdio: 'inherit',
    env: Object.assign({}, process.env, extraEnv)
  })

// console.log('Building CommonJS modules ...');
// exec('babel src -d . --ignore *.test.js', {
//   BABEL_ENV: 'cjs',
// });

exec('babel src -d . --ignore *.test.js,src/lib/*', {
  BABEL_ENV: 'es',
  NODE_ENV: 'production'
})

// exec('rollup -c', {
//   input: './src/lib/Bn/index.js',
//   output: 'lib/Bn/index.js',
//   cssOutput: 'lib/Bn/index.css',
//   BABEL_ENV: 'es',
//   NODE_ENV: 'production'
// })
// console.log('\nBuilding UMD ...');
//
// exec('rollup -c -f umd -o dist/reactions-component.js', {
//   BABEL_ENV: 'umd',
//   NODE_ENV: 'development',
// });
//
// console.log('\nBuilding UMD min.js ...');

// exec('rollup src/useModel -c -f umd -o dist/useModel.js --name useModel', {
//   BABEL_ENV: 'umd',
//   NODE_ENV: 'production',
// });

// const size = gzipSize.sync(fs.readFileSync('dist/index.js'));

// console.log('\ngzipped, the UMD build is %s');
