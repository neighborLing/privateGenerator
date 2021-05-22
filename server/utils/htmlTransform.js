function tablehandle({
  value
}) {
  const tables = value.match(/<table.+?\/table>/g);

  tables && tables.forEach((item) => {
    console.log('item: ', item);
    value = value.replace(item, singleTableHandler(item));
  })
  
  return value;
}

function singleTableHandler(value) {
  value = value.replace(/<table>/g, '<table width="100%">')

  return value;
}

module.exports = {
  tablehandle
}