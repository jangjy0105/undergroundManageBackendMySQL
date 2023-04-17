const { upload } = require("./upload");

exports.deleteData = async function(deleteSchema, saveSchema, deleteIds, deleteReferenceSchemas, saveReferenceSchemas) {
  for (const id of deleteIds) {
    let document = await deleteSchema.findById(id);
    let { _id, ...rest } = document.toObject();

    // 다른 스키마에서 참조하는 필드의 레코드 삭제
    if (deleteReferenceSchemas[0]){
      for (const refSchema of deleteReferenceSchemas) {
        const refField = refSchema.collection.name;
        for (const refId of rest[refField]) {
          await refSchema.updateOne({ _id: refId }, { $pull: { refField: id } });
        }
      }
    }

    // 문서의 복사본을 만들어 다른 컬렉션에 저장
    if(saveSchema) upload(saveSchema, rest, saveReferenceSchemas);

    // 문서를 원래 컬렉션에서 삭제
    await deleteSchema.findByIdAndDelete(id);
  }
}
