/**All mongoose queryfunction and normal function added here */
/**findOneAndUpdate
 * find
 * find and select
 * findOne
 * insertMany
 * insertOne
 * updateOne
 * 
 * 
 */
function updateDocument(collection, filter, update, options) {
    return collection.findOneAndUpdate(filter, update, options);
}

function findDocuments(collection, filter, options) {
    return collection.find(filter, options);
}

function findAndSelect(collection, filter, projection, options) {
    return collection.find(filter, options).select(projection);
}

function findSingleDocument(collection, filter, projection) {
    return collection.findOne(filter, projection);
}

async function insertManyDocuments(collection, documents) {
    try {
        const result = await collection.insertMany(documents);
        return result;
    } catch (error) {
        console.error("Error inserting documents: ", error);
        throw error;
    }
}

async function insertSingleDocument(collection, document) {
    try {
        const result = await collection.insertOne(document);
        return result;
    } catch (error) {
        console.error("Error inserting document: ", error);
        throw error;
    }
}

async function updateOneDocument(collection, filter, update) {
    try {
      const result = await collection.updateOne(filter, update);
      return result;
    } catch (error) {
      console.error("Error updating document: ", error);
      throw error;
    }
  }
  






