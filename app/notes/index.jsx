import AddNoteModal from '@/component/AddNoteModal';
import NoteList from '@/component/NoteList';
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const NoteScreen = () => {
    const [notes, setNotes] = useState([
        { id: '1', text: 'Note 1' },
        { id: '2', text: 'Note 2' },
        { id: '3', text: 'Note 3' },
        { id: '4', text: 'Note 4' },
    ]);
    const [modalVisible, setModalVisible] = useState(false);
    const [newNote, setNewNote] = useState('');

    // adds new note
    const addNote = () => {
        if(newNote.trim() === '') return;

        setNotes((prevNotes) => [
            ...prevNotes,
            { id: Date.now.toString(), text: newNote }
        ]);

        setNewNote('');
        setModalVisible(false);
    }

    return (<View style={ styles.container }>
        <NoteList notes={ notes }/>

        <TouchableOpacity style={ styles.button } onPress={ () => setModalVisible(true) }>
            <Text style= { styles.buttonText }>Add Note</Text>
        </TouchableOpacity>

        { /*Modal*/ }
        <AddNoteModal 
          modalVisible={ modalVisible }
          setModalVisible={ setModalVisible }
          newNote={ newNote }
          setNewNote={ setNewNote }
          addNote={ addNote }
        />
        
    </View>);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    button: {
    backgroundColor: '#0e28b6',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
    },
    buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default NoteScreen;