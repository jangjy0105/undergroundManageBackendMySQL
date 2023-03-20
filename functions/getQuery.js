exports.getQuery = function(queryData, objFields, objFieldDatas) {
  var query = [];
  var cnt = 0;
  var minDate = queryData.startDate ? queryData.startDate : 0;
  var maxDate = queryData.endDate ? queryData.endDate : 2000000000000;
  Object.keys(queryData).map((keyName) => {
    if(objFields.includes(keyName)) {
      queryData[keyName].map((el) => {
        query.push({[keyName+'.'+objFieldDatas]: {$regex: el}})
      })
      cnt++;
    }
    else if (Array.isArray(queryData[keyName])) {
      queryData[keyName].map((el) => {
        query.push({[keyName]: {$regex: el}})
      })
    }
  })
  query.push({date: {$lt: maxDate, $gt: minDate}})
  return query;
}
