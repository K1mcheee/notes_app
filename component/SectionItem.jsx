import { useRef, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";


const SectionItem = ({ section, onEdit, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(section.text);
    const inputRef = useRef(null);

    const handleSave = () => {
        if (editedText.trim() === '') return;
        onEdit(section.$id, editedText);
        setIsEditing(false);
    };

    return (
        <View style={ styles.sectionItem }>
            { isEditing ? (
                <TextInput
                ref={ inputRef }
                style={ styles.input }
                value={ editedText }
                onChangeText={ setEditedText }
                autoFocus
                onSubmitEditing={ handleSave }
                returnKeyType='done'
                />
            ) : (
                <Text style={ styles.sectionText }>{ section.text }</Text>
            ) }
            <View style={styles.actions}>
                { isEditing ? (
                    <TouchableOpacity onPress={ () => { handleSave(); inputRef.current?.blur(); } }>
                        <Text style={ styles.edit }>💾</Text>
                    </TouchableOpacity>
                ) : (                   
                    <TouchableOpacity onPress={ () => setIsEditing(true) }>
                        <Text style={ styles.edit }>✏️</Text>
                    </TouchableOpacity>
                ) }

                <TouchableOpacity onPress={ () => onDelete(section.$id) }>
                    <Text style={ styles.delete }>🗑️</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    sectionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#f5f5f5',
        padding: 15,
        borderRadius: 5,
        marginVertical: 5,
    },
    sectionText: {
        fontSize: 20,
    },
    delete: {
        fontSize: 16,
        color: 'red',
    },
    actions: {
        flexDirection: 'row',
    },
    edit: {
        fontSize: 18,
        marginRight: 10,
        color: 'blue',
    },
});

export default SectionItem;