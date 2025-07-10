import { FlatList, View } from "react-native";
import SectionItem from "./SectionItem";

const SectionList = ({ sections, onEdit, onDelete }) => {
    return ( <View>
        <FlatList 
            data={sections}
            keyExtractor={ (item) => item.$id } // unique key for each note
            renderItem={({ item }) => <SectionItem note={ item } onEdit={onEdit} onDelete={onDelete}/>} // render jsx to display
        />
    </View> );
}

export default SectionList;