import { FlatList, SafeAreaView } from "react-native";
import { Avatar, Card, Text, useTheme } from "react-native-paper";
import ExSettings from "./ExSettings";
import { useContext } from "react";
import Styles from "../styles/Style";



export default function ExListPage() {
    const theme = useTheme();
    const { workout } = useContext(ExSettings);

    return (
        <SafeAreaView style={Styles.container}>
            <Text variant="headlineLarge" style={[Styles.header, { color: theme.colors.primary }]}>Exercises list</Text>
            <FlatList
                data={workout}
                renderItem={Item}
                keyExtractor={item => item.date + ":" + item.distance }
            />
        </SafeAreaView>
    );
}

function Item({ item }) {   
    return (
        <Card style={Styles.card}>
            <Card.Title 
                titleVariant="titleMedium"  
                title={item.distance + ' (' + item.date + ')' }
                left={props => <Avatar.Icon icon={item.category} size={40}/>}
            />
            <Card.Content>
                <Text>{item.duration}</Text>
            </Card.Content>
        </Card>
    );

}