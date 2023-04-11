const { getQuery } = require("./getQuery");

exports.getTotalLength = async function(schema, req, res, populateOptions, dateFields) {
  
  var queryData = req.queryData;

  if(queryData && populateSchams[0]) {
    for (let populateOption of populateOptions) {
      queryData[populateOption.field] = await populateOption.schema.find({ [populateOption.data]: queryData[populateOption.field] });
    }
  }
 
  if(queryData) {
    const query = getQuery(queryData, req.searchOption, populateOptions.map(opt => opt.field), dateFields);
    schema.count({$and: query}, (error, count) => {
      if(error) throw error;
      res.json(count);
    }) 
  }
  else {
    schema.count({}, (error, count) => {
      if(error) throw error;
      res.json(count);
    })
  }
}