import AddNoteModal from '@/component/AddNoteModal';
import NoteList from '@/component/NoteList';
import noteService from '@/services/noteService';
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const NoteScreen = () => {
    const [notes, setNotes] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [newNote, setNewNote] = useState('');
    const [loading, setLoading] =  useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
      setLoading(true);
      const response = await noteService.getNotes();

      if (response.error) {
        setError(response.error);
        Alert.alert('Error', response.error);
      } else {
        setNotes(response.data);
        setError(null);
      }

      setLoading(false);
    };

    // adds new note
    const addNote = async () => {
      if(newNote.trim() === '') return;

      const response = await noteService.addNote(newNote);

      if (response.error) {
        Alert.alert('Error: ', response.error);
      } else {
        setNotes([...notes, response.data]);
      }

      setNewNote('');
      setModalVisible(false);
    }

    return (<View style={ styles.container }>

      { loading ? (
        <ActivityIndicator size='large' color='#007bff' />
      ) : (
        <>
          { error && <Text style={ styles.errorText }>{error}</Text> }
          <NoteList notes={notes} />
        </>
      ) }

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
      margin: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 18,
  },
});

export default NoteScreen;