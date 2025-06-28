import { FlatList, View } from "react-native";
import NoteItem from "./NoteItem";

const NoteList = ({ notes, onEdit, onDelete }) => {
    return ( <View>
        <FlatList 
            data={notes}
            keyExtractor={ (item) => item.$id } // unique key for each note
            renderItem={({ item }) => <NoteItem note={ item } onEdit={onEdit} onDelete={onDelete}/>} // render jsx to display
        />
    </View> );
}

export default NoteList;