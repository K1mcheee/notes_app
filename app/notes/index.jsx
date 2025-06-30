import AddNoteModal from '@/component/AddNoteModal';
import NoteList from '@/component/NoteList';
import { useAuth } from '@/contexts/AuthContext';
import noteService from '@/services/noteService';
import { useRouter } from 'expo-router';
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const NoteScreen = () => {
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();

    const [notes, setNotes] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [newNote, setNewNote] = useState('');
    const [loading, setLoading] =  useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      if (!authLoading && !user) {
        router.replace('/auth');
      }
    }, [user, authLoading]);

    useEffect(() => {
      if (user) {
        fetchNotes();
      }
    }, [user]);

    const fetchNotes = async () => {
      setLoading(true);
      const response = await noteService.getNotes(user.$id);

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

      const response = await noteService.addNote(user.$id, newNote);

      if (response.error) {
        Alert.alert('Error: ', response.error);
      } else {
        setNotes([...notes, response.data]);
      }

      setNewNote('');
      setModalVisible(false);
    }

    // edits note
    const editNote = async (id, newText) => {
      if (!newText.trim()) {
        Alert.alert('Error: ', 'Note text cannot be empty');
        return;
      }
      const response = await noteService.updateNote(id, newText);
      if (response.error) {
        Alert.alert('Error: ', response.error);
      } else {
        setNotes((prevNotes) => prevNotes.map((note) => note.$id === id ? 
      { ...note, text: response.data.text } : note
      ));
      }
      
    };

    // deletes note
    const deleteNote = async (id) => {
      Alert.alert('Delete note', 'Are you sure you want to delete this note?', 
        [{
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const response = await noteService.deleteNote(id);
            if (response.error) {
              Alert.alert('Error: ', response.error);
            } else {
              setNotes(notes.filter((note) => note.$id != id));
            }
          },
        },
      ]);
    }; 



    return (<View style={ styles.container }>

      { loading ? (
        <ActivityIndicator size='large' color='#007bff' />
      ) : (
        <>
          { error && <Text style={ styles.errorText }>{error}</Text> }

          { notes.length === 0 
          ? (<Text style={ styles.noNotesText }>You have no notes</Text>) 
          : (<NoteList notes={notes} onEdit={editNote} onDelete={deleteNote} />) }

          
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
  noNotesText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#BBBBBB',
    marginTop: 10,
  },
});

export default NoteScreen;