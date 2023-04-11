
exports.upload = async function(schema, data, refSchemas=[]) {

  let saveData = new schema(data);
    const schemaName = schema.collection.name;
    // var refs = [];
    
    if (refSchemas[0]) {
      for (let refSchema of refSchemas) {
        for (let refId of saveData[refSchema.collection.name]) {    
          await refSchema.updateOne({ _id: refId }, { $push: {[schemaName]: saveData } });
        }
      }
    }
        
    await saveData.save();
  
}