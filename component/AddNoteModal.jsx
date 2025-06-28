import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const AddNoteModal = ({ modalVisible, setModalVisible, newNote, setNewNote, addNote }) => {
    return ( 
        <Modal
            visible= {modalVisible}
            animationType= 'slide'
            transparent
            onRequestClose={ () => setModalVisible(false) } 
        >
            <View style={ styles.modalOverlay }>
                <View style={ styles.modalContent }>
                    <Text style={ styles.modalTitle }>New Note</Text>
                    <TextInput
                        style={ styles.input }
                        placeholder='Enter note..'
                        placeholderTextColor='#aaa'
                        value={newNote}
                        onChangeText={setNewNote} 
                    />
                    <View style={ styles.modalButton }>
                        <TouchableOpacity 
                            style={ styles.cancelButton } 
                            onPress={ () => setModalVisible(false) }>
                                <Text style={ styles.cancelButtonText }>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={ styles.saveButton } 
                            onPress={addNote}>
                                <Text style={ styles.buttonText }>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
     );
}

const styles = StyleSheet.create({    
    cancelButton: {
        backgroundColor: '#ccc',
        padding: 8,
        borderRadius: 5,
        flex: 1,
        marginRight: 10,
        alignItems: 'center',
    },
    cancelButtonText: {
        fontSize: 18,
        color: '#333',
    },
    saveButton: {
        backgroundColor: '#0e28b6',
        padding: 8,
        borderRadius: 5,
        flex: 1,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: '#rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalButton: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        fontSize: 18,
        marginBottom: 15,
    },
});

export default AddNoteModal;