import { Modal, Pressable, SafeAreaView, View } from "react-native";
import { Button, Text, TextInput, ToggleButton, useTheme } from "react-native-paper";
import Styles from "../styles/Style";
import { useContext, useState } from 'react';
import ExSettings from "./ExSettings";
import { Calendar } from "react-native-calendars";


const categories = ['run', 'swim', 'ski'];


export default function AddExercise() {

    const [category, setCategory] = useState(categories[0]);
    const [distance, setDistance] = useState('');
    const [duration, setDuration] = useState('');
    const theme = useTheme();
    const {workout, setWorkout} = useContext(ExSettings);
    const [visible, setVisible] = useState(false);
    const [date, setDate] = useState();
    
    function AddExercise(){
        const modified = [...workout, {category, distance, duration, date: new Date().toDateString()}];
        setWorkout(modified);
    }

    function dateSelected(day){
        setVisible(false);
        setDate(day);
    }

    return (
        <SafeAreaView style={[Styles.container, { backgroundColor: theme.colors.background }]}>
            <Text variant="headlineLarge" style={[Styles.header, { color: theme.colors.primary }]}>ADD WORKOUT</Text>
            <CategorySelection value={category} setValue={setCategory} values={categories} />
            <TextInput  keyboardType='numeric' label={'Distance'} style={Styles.textInput} mode="flat" value={distance} onChangeText={setDistance} />
            <TextInput keyboardType='numeric' label={'Duration'} style={Styles.textInput} mode="flat" multiline value={duration} onChangeText={setDuration} />
            <Modal visible={visible} transparent={true} >
                <Calendar style={{borderWidth: 2}} onDayPress={dateSelected} />
            </Modal>
            <Pressable onPress={()=>setVisible(true)} >
                <Text style={{ fontSize: 20 }}>{date ? date.dateString : 'Select Date'}</Text>
            </Pressable> 
            <Button mode="contained" style={Styles.button} onPress={AddExercise}>ADD</Button>
        </SafeAreaView>
    );
}


function CategorySelection({ value, setValue, values }) {

    const theme = useTheme();

    return (
        <View style={Styles.categories}>
            <ToggleButton.Group value={value} onValueChange={setValue} >
                {values.map(v => 
                    <ToggleButton 
                        key={v} 
                        value={v} 
                        icon={v} 
                        iconColor={v==value ? theme.colors.onPrimary : theme.colors.primary} 
                        size={30} 
                        style={{backgroundColor: v == value ? theme.colors.primary : null}}
                    />
                )}
            </ToggleButton.Group>
        </View>
    );
}