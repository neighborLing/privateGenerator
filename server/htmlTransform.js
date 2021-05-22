/** 
 * 提取字符串中的所有table
*/
function tablehandle({
  value
}) {
  const tables = value.match(/<table.+?\/table>/g);

  tables.forEach((item) => {
    value = value.replace(item, singleTableHandler(item));
  })
  
  return value;
}
/** 
 * 把table宽度设置为100%;
*/
function singleTableHandler(value) {
  value = value.replace(/<table>/g, '<table width="100%">')

  return value;
}

/** 
 * 提取出所有的行内样式, 并提取成类
*/
function styleToClass(htmlString) {
  const styles = htmlString.match(/style=".*?"/g);
  const styleArr = [];
  
  styles.forEach(item => {
    const styleString = item.replace(/(^style=")|("$)/g, '');
    
    if (!(styleArr.indexOf(styleString) > -1) && styleString) {
      styleArr.push(styleString);
    }
  });
  
  return styleArr.reduce((r, item, index) => {
    r[`_${index}`] = item;

    return r;
  }, {})

}

// 导出css
function exportCssFile(classes, outputPath) {
  const keys = Object.keys(classes);
  const content = keys.reduce((r, item) => {
    r += `.${item} {${classes[item]}};\n`;
    
    return r;
  }, '')

  outputPath = outputPath || path.join(__dirname, '../output');
  const filePath = `${outputPath}/index.css`;

  fs.writeFileSync(filePath, content);

  return filePath;
}

// 替换htmlString中的style
function exportJsFile(htmlString, classes, outputPath) {
  // 清除所有style=“”
  htmlString = htmlString.replace(/ style=“”/g, '');
  // 把style替换为class

  for (let key in classes) {
    const style = classes[key];

    htmlString = htmlString.replace(new RegExp(`style="${style}"`, 'g'), `class="${key}"`);
  }

  // return htmlString;
  const content = `var content = ${htmlString}`;
  outputPath = outputPath || path.join(__dirname, '../output');
  const filePath = `${outputPath}/index.js`;

  fs.writeFileSync(filePath, content);

  return filePath;
}

module.exports = {
  tablehandle,
  styleToClass,
  exportCssFile,
  exportJsFile
}