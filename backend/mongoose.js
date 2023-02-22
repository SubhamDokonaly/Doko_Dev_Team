/**All mongoose queryfunction and normal function added here */
/**findOneAndUpdate
 * find
 * find and select
 * findOne
 * insertMany
 * insertOne
 * updateOne
 * findByIdAndUpdate
 * distinct
 * deleteOne
 * deleteMany
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

const { ObjectId } = require('mongodb');

async function findByIdAndUpdate(collection, id, update) {
    try {
        const filter = { _id: new ObjectId(id) };
        const result = await collection.updateOne(filter, update);
        return result;
    } catch (error) {
        console.error("Error finding and updating document by ID: ", error);
        throw error;
    }
}

async function getDistinctValues(collection, field) {
    try {
        const result = await collection.distinct(field)
        return result;
    } catch (error) {
        console.error("Error : in get distinct data", error);
        throw error;
    }
}
//   async function main() {
//     const distinctValues = await getDistinctValues(collection, 'myField');
//     console.log(distinctValues);
//   }

async function deleteOneDocument(collection, filter, options) {
    try {
        const result = await collection.deleteOne(filter, options)
        return result;   //return true/false
    } catch (error) {
        console.error("Error : in deleteOne doc", error);
        throw error;
    }
}

async function deleteManyDocument(collection, filter, options) {
    try {
        const result = await collection.deleteMany(filter, options)
        return result;   //return true/false
    } catch (error) {
        console.error("Error : in deletemany doc", error);
        throw error;
    }
}

export {
    updateDocument,
    findDocuments,
    findAndSelect,
    findSingleDocument,
    insertManyDocuments,
    insertSingleDocument,
    updateOneDocument,
    findByIdAndUpdate,
    getDistinctValues,
    deleteOneDocument,
    deleteManyDocument
}






