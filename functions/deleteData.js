const { upload } = require("./upload");

exports.deleteData = async function(deleteSchema, saveSchema, deleteIds, deleteReferenceSchemas, saveReferenceSchemas) {
  for (const id of deleteIds) {
    // 다른 스키마에서 참조하는 필드의 레코드 삭제
    if (deleteReferenceSchemas.length) {
      for (const refSchema of deleteReferenceSchemas) {
        const deleteField = deleteSchema.collection.name;
        await refSchema.updateMany({[deleteField]: id}, { $pull: { [deleteField]: id } });
      }
    }

    let document = await deleteSchema.findByIdAndDelete(id);
    let { _id, ...rest } = document.toObject();

    // 문서의 복사본을 만들어 다른 컬렉션에 저장
    if(saveSchema) upload(saveSchema, rest, saveReferenceSchemas);
  }
}