exports.getQuery = function(queryData, searchOption, populateFields, dateFields) {
  var query = [];
  
  // console.log(queryData);
  if (searchOption === 'and') {
    Object.keys(queryData).map((keyName) => {
      if (queryData[keyName][0] && !dateFields.includes(keyName)){
        if (populateFields.includes(keyName)){
          queryData[keyName].map((el) => {
            query.push({[keyName]: el})
          })  
        }
        else {
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
        if (populateFields.includes(keyName)) {
          queryData[keyName].map((el) => {
            pushData.push({[keyName]: el})
          })
        }
        else{
          queryData[keyName].map((el) => {
            pushData.push({[keyName]: {$regex: el}})
          })
        }
        query.push({$or: pushData});
      }
    })
  }

  dateFields.map((keyName) => {
    var minDate = queryData[keyName][0] ? queryData[keyName][0] : 0;
    var maxDate = queryData[keyName][1] ? queryData[keyName][1] : 2000000000000;
    query.push({[keyName]: {$lt: maxDate, $gt: minDate}});
  })

  return query;
}