import { database } from "./appwrite";

const databaseService = {
    // List documents
    async listDocuments(dbId, colId) {
        try {
            const response = await database.listDocuments(dbId, colId); // part of SDK of db object
            return response.documents || [];
        } catch (error) {
            console.error('Error fetching documents: ', error.message);
            return { error: error.message };
        }
    },
    // Create documents
    async createDoument(dbId, colId, data, id = null) {
        try {
            return await database.createDocument(dbId, colId, id || undefined, data);
        } catch (error) {
            console.error('Error creating document: ', error.message);
            return { error: error.message };
        }
    },
};

export default databaseService;