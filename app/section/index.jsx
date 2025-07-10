import AddNoteModal from '@/component/AddNoteModal';
import { useAuth } from '@/contexts/AuthContext';
import noteService from '@/services/noteService';
import { useRouter } from 'expo-router';
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SectionList } from 'react-native-web';
import sectionService from '../../services/sectionService';

const SectionScreen = () => {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();

    const [sections, setSections] = useState([]);
    const [newSection, setNewSection] = useState('');
    const [loading, setLoading] =  useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
      if (!authLoading && !user) {
        router.replace('/auth');
      }
    }, [user, authLoading]);

    useEffect(() => {
      if (user) {
        fetchSection();
      }
    }, [user]);

        // fetch sections
        const fetchSection = async () => {
          setLoading(true);
          const response = await sectionService.getSections(user.$id);
    
          if (response.error) {
            setError(response.error);
            Alert.alert('Error', response.error);
          } else {
            setSections(response.data);
            setError(null);
          }
    
          setLoading(false);
        };

        // adds new note
        const addSection = async () => {
          if(newNote.trim() === '') return;
    
          const response = await sectionService.addSection(user.$id, newSection); // section
    
          if (response.error) {
            Alert.alert('Error: ', response.error);
          } else {
            setSections([...sections, response.data]);
          }
    
          setNewSection('');
          setModalVisible(false);
        }

        // edits section
        const editSection = async (id, newText) => {
          if (!newText.trim()) {
            Alert.alert('Error: ', 'Section title cannot be empty');
            return;
          }
          const response = await noteService.updateNote(id, newText);
          if (response.error) {
            Alert.alert('Error: ', response.error);
          } else {
            setSections((prevSection) => prevSection.map((section) => section.$id === id ? 
          { ...section, text: response.data.text } : section
          ));
          }
          
        };
        
        // deletes section
        const deleteNote = async (id) => {
            Alert.alert('Delete section', 'Are you sure you want to delete this section?', 
              [{
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Delete',
                style: 'destructive',
                onPress: async () => {
                  const response = await sectionService.deleteSection(id);
                  if (response.error) {
                    Alert.alert('Error: ', response.error);
                  } else {
                    setSections(sections.filter((note) => note.$id != id));
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
              { sections.length === 0 
              ? (<Text style={ styles.noSectionText }>No sections yet</Text>) 
              : (<SectionList sections={sections} onEdit={editSection} onDelete={deleteSection} />) }

            </>
          ) }
    
            <TouchableOpacity style={ styles.button } onPress={ () => setModalVisible(true) }>
                <Text style= { styles.buttonText }>Add Note</Text> 
            </TouchableOpacity>
    
            { /*Modal*/ }
            <AddNoteModal 
              modalVisible={ modalVisible }
              setModalVisible={ setModalVisible }
              newSection={ newSection }
              setNewSection={ setNewSection }
              addSection={ addSection }
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
    noSectionText: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#BBBBBB',
        marginTop: 10,
  },
})

export default SectionScreen;