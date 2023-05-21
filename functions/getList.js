const { getQuery } = require("./getQuery");

exports.getList = async function(schema, req, populateOptions, dateFields, sortField, res) {
  
  const { page, listNum, queryData, searchOption, sortOption } = req;
  const skipNum = (page - 1) * listNum;
  const limitNum = listNum;

  if(queryData && populateOptions.length) {
    const queries = populateOptions
    .filter(opt => queryData[opt.field] && queryData[opt.field].length)
    .map(async (opt) => {
      const regex = new RegExp(queryData[opt.field].join("|"), "i");
      queryData[opt.field] = await opt.schema.find({ [opt.data]: regex });
    });
    await Promise.all(queries);
  }
  
  const sortQuery = sortOption==='최신순' ?  { "date": -1 }: sortOption==='오래된순' ? { "date": 1 } : { [sortField]: 1 };

  let data;

  if(queryData) {
    const query = getQuery(queryData, searchOption, populateOptions.map(opt => opt.field), dateFields); 
    schema.find({$and: query}).sort(sortQuery).skip(skipNum).limit(limitNum).populate(populateOptions.map(opt => ({ path: opt.field }))).exec()
    .then(data => res.json(data))
    .catch(err => {throw err})
  }
  else schema.find().sort(sortQuery).skip(skipNum).limit(limitNum).populate(populateOptions.map(opt => ({ path: opt.field }))).exec()
    .then(data => res.json(data))
    .catch(err => {throw err})
}