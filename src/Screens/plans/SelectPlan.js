import React from 'react'
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native'

const SelectPlan = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <Button  
                style={styles.button}
                onPress={() => navigation.navigate('CardDetails', {
                    'planType': 'basic'
                })}  
                title="Basic Plan"  
                color="#841584"
            />
            <Button  
                style={styles.button}
                onPress={() => navigation.navigate('CardDetails', {
                    'planType': 'advanced'
                })}  
                title="Advanced Plan"  
                color="#841584"
            />
        </SafeAreaView>
    )
}

export default SelectPlan

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    button: {
        margin: 50,
    }
})