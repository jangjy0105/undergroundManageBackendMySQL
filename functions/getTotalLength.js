const { getQuery } = require("./getQuery");

exports.getTotalLength = function(schema, req, res, objFields, objFieldDatas) {
  if(req.queryData) {
    const query = getQuery(req.queryData, req.searchOption, objFields, objFieldDatas);
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