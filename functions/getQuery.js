exports.getQuery = function(queryData, searchOption, objFields, objFieldDatas) {
  var query = [];
  var cnt = 0;
  var minDate = queryData.startDate ? queryData.startDate : 0;
  var maxDate = queryData.endDate ? queryData.endDate : 2000000000000;
  if (searchOption === 'and') {
    Object.keys(queryData).map((keyName) => {
      if (queryData[keyName][0]){
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
      }
    })
  }

  else if (searchOption === 'or') {
    Object.keys(queryData).map((keyName) => {
      if (queryData[keyName][0]){
        var pushData = []; 
        if(objFields.includes(keyName)) {
          queryData[keyName].map((el) => {
            pushData.push({[keyName+'.'+objFieldDatas]: {$regex: el}})
          })
          cnt++;
          query.push({$or: pushData})
        }
        else if (Array.isArray(queryData[keyName])) {
          queryData[keyName].map((el) => {
            pushData.push({[keyName]: {$regex: el}})
          })
          query.push({$or: pushData});
        }
      }
    })
  }

  query.push({date: {$lt: maxDate, $gt: minDate}})
  return query;
}
