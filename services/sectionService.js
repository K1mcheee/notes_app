import { ID, Query } from "react-native-appwrite";
import databaseService from "./databaseService";

// Appwrite database and collection id
const dbId = process.env.EXPO_PUBLIC_APPWRITE_DB_ID;
const colId = process.env.EXPO_PUBLIC_APPWRITE_COL_SECTION_ID;

const sectionService = {
    // Get Notes
    async getSections(userId) {
        if (!userId) {
            console.error('Error: Missing user ID in getNotes()');
            return { data: [], error: 'User Id is missing.' };
        }

        try {
            const response = await databaseService.listSections(dbId, colId, [Query.equal('user_id', userId)]);
            return response;
        } catch (error) {
            console.log('Error fetching sections: ', error.message);
            return { data: [], error: error.message };
        }

    },
    // Add new note
    async addSection(user_id, colId, text) { //section
        if (!text) {
            return { error: 'Section name cannot be empty' };
        }
        const data = {
            Title: text,
            user_id: user_id,
        }

        const response = await databaseService.createSection(
            dbId, 
            colId,
            data,
            ID.unique()
        );

        if (response?.error) {
            return { error: response.error};
        }
        return { data: response };
    },
    // Update Section
    async updateSection(id, text) {
        const response = await databaseService.updateSection(dbId, colId, id, 
            {
                text
            });

        if (response?.error) {
            return { error: response.error };
        }
        return { data: response };
    },
    // Delete Note
    async deleteSection(id) {
        const response = await databaseService.deleteSection(dbId, colId, id);
        if (response?.error) {
            return { error: response.error };
        }
        return { success: true };
    },

};

export default sectionService;