const { getQuery } = require("./getQuery");

exports.getList = async function(schema, req, populateOptions, dateFields, sortField) {
  
  const skipNum = (req.page - 1) * req.listNum;
  const limitNum = req.listNum;
  const queryData = req.queryData;

  if(queryData && populateOptions[0]) {
    for (let populateOption of populateOptions) {
      if (queryData[populateOption.field][0]){
        let regex = new RegExp(queryData[populateOption.field].join("|"), "i");
        queryData[populateOption.field] = await populateOption.schema.find({ [populateOption.data]: regex });
      }
    }
  }
  
  const sortQuery = req.sortOption==='최신순' ?  { "date": -1 }: req.sortOption==='오래된순' ? { "date": 1 } : { [sortField]: 1 };

   let data;

  if(queryData) {
    const query = getQuery(queryData, req.searchOption, populateOptions.map(opt => opt.field), dateFields); 
    data = await schema.find({$and: query}).sort(sortQuery).skip(skipNum).limit(limitNum).exec();
  }
  else data = await schema.find().sort(sortQuery).skip(skipNum).limit(limitNum).exec();

  for (let populateOption of populateOptions) {
    await schema.populate(data, {path: populateOption.field});
  }

  return data;
}