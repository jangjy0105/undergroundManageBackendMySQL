const { getQuery } = require("./getQuery");

exports.getList = async function(schema, req, objFields, objFieldDatas, sortField) {
  
  const skipNum = (req.page - 1) * req.listNum;
  const limitNum = req.listNum;
  const queryData = req.queryData;

  const sortQuery = req.sortOption==='최신순' ?  { "date": -1 }: req.sortOption==='오래된순' ? { "date": 1 } : { [sortField]: 1 };

  var data;

  if(queryData) {
    const query = getQuery(queryData, objFields, objFieldDatas); 
    data = await schema.find({$and: query}).sort(sortQuery).skip(skipNum).limit(limitNum)
  }

  else data = await schema.find().sort(sortQuery).skip(skipNum).limit(limitNum);

  return data;
}