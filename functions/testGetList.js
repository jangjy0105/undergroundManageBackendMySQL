const { testGetQuery } = require("./testGetQuery");

exports.testGetList = async function(schema, req, populateSchams, populateFields, populateDatas, dateFields, sortField) {
  
  const skipNum = (req.page - 1) * req.listNum;
  const limitNum = req.listNum;
  const queryData = req.queryData;

  if(queryData && populateSchams[0]) {
    for (i=0; i< populateSchams.length; i++) {
      queryData[populateFields[i]] = await populateSchams[i].find({ [populateDatas[i]]: queryData[populateFields[i]] });
    }
  }

  const sortQuery = req.sortOption==='최신순' ?  { "date": -1 }: req.sortOption==='오래된순' ? { "date": 1 } : { [sortField]: 1 };

  var data;

  if(queryData) {
    const query = testGetQuery(queryData, req.searchOption, populateFields, dateFields); 
    data = await schema.find({$and: query}).sort(sortQuery).skip(skipNum).limit(limitNum).exec();
  }

  else data = await schema.find().sort(sortQuery).skip(skipNum).limit(limitNum).exec();

  for (i=0; i<populateFields.length; i++) {
    await schema.populate(data, {path: populateFields[i]});
  }

  return data;
}