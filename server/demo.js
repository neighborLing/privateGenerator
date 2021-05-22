const fs = require('fs');
const path = require('path');

const testHtml = path.join(__dirname, '../demoFile/隐私协议 (6).js');

const htmlString = fs.readFileSync(testHtml, 'utf8');

const { styleToClass } = require('./htmlTransform.js');

const classes = styleToClass(htmlString);

// 导出css
function exportCssFile(classes) {
  const keys = Object.keys(classes);

  const content = keys.reduce((r, item) => {
    r += `.${item} {${classes[item]}};\n`;
    
    return r;
  }, '')
  
  const fileName = 'index.css';

  fs.writeFileSync(path.join(__dirname, fileName), content);
}
// 替换htmlString中的style
function htmlStyleToClass(htmlString, classes) {
  // 清除所有style=“”
  htmlString = htmlString.replace(/ style=“”/g, '');
  // 把style替换为class

  for (let key in classes) {
    const style = classes[key];

    htmlString = htmlString.replace(new RegExp(`style="${style}"`, 'g'), `class="${key}"`);
  }

  // return htmlString;
  const fileName = 'main.js';
  const content = `var content = ${htmlString}`;

  r = fs.writeFileSync(path.join(__dirname, fileName), content);
  console.log('r: ', r);
}

exportCssFile(classes);
htmlStyleToClass(htmlString, classes);
console.log(3)