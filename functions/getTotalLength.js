const { getQuery } = require("./getQuery");

exports.getTotalLength = async function(schema, req, res, populateOptions, dateFields) {
  
  var queryData = req.queryData;

  if(queryData && populateOptions.length) {
    const queries = populateOptions
    .filter(opt => queryData[opt.field] && queryData[opt.field].length)
    .map(async (opt) => {
      const regex = new RegExp(queryData[opt.field].join("|"), "i");
      queryData[opt.field] = await opt.schema.find({ [opt.data]: regex });
    });
    await Promise.all(queries);
  }

  if (queryData) {
    const query = getQuery(queryData, req.searchOption, populateOptions.map(opt => opt.field), dateFields);
    schema.countDocuments({$and: query}).exec()
    .then(cnt => res.json(cnt))
    .catch(err => {throw err})
  } else {
    schema.countDocuments().exec()
    .then(cnt => res.json(cnt))
    .catch(err => {throw err})
  }

}