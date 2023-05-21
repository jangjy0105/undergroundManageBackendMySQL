
exports.upload = async function(schema, data, refSchemas=[]) {

  let saveData = new schema(data);
  const schemaName = schema.collection.name;
  // var refs = [];
  
  if (refSchemas.length) {
    for (let refSchema of refSchemas) {
      await refSchema.updateMany({ _id: {$in: saveData[refSchema.collection.name]} }, { $push: {[schemaName]: saveData } });
    }
  }
      
  await saveData.save();
  
}