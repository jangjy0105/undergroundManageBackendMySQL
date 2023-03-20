exports.idToData = async function(data, idFieldName, fieldName) {
  var copyData = data;
  for (let i=0; i<data.length; i++){
    var dataArray = [];
    if (data[i]) {
      for(let j=0; j<data[i][idFieldName].length; j++) {
        dataArray.push(data[i][idFieldName][j].tagName);
      }
      // console.log(dataArray);
      copyData[i].tags = dataArray;
    }
    console.log(copyData[5]);
  }
  return data;
}
