const svg_to_ico = require('svg-to-ico');
const path = require('path');

svg_to_ico({
  input_name: path.join(__dirname, '..', 'logo.svg'),
  output_name: path.join(__dirname, '..', 'favicon.ico'),
  sizes: [16, 32, 48]
}).then(() => {
  console.log('favicon.ico generated');
}).catch(err => {
  console.error(err);
  process.exit(1);
});
