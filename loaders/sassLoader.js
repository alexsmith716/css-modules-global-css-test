const sass = require('node-sass');
const path = require('path');

// https://github.com/webpack-contrib/sass-loader
// https://github.com/sass/node-sass
// You can also pass options directly to node-sass by specifying an options property

const includePaths = path.resolve(__dirname, 'node_modules').toString();

console.log('>>>>>>>>>>>> sassLoader > includePaths: ', includePaths);
console.log('>>>>>>>>>>>> sassLoader > typeof includePaths: ', typeof includePaths);

module.exports = (data, file) => {

  try {
    const s = sass.renderSync({data, file}).css.toString('utf8');
    // return sass.renderSync({data, file}).css.toString('utf8');
    //console.log('>>>>>>>>>>>>> sassLoader > SCSS: ', s);
    return s;
  } catch (e) {
    console.log('>>>>>>>>>>>>> sassLoader > ERROR: ', e);
    console.error(e);
  }

};
