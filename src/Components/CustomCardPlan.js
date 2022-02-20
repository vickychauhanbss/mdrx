import React, {  useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Card } from 'react-native-elements'
// import Icon from 'react-native-vector-icons/Entypo'
// import * as Progress from 'react-native-progress';
import { fontFamily } from '../Utils/fonts';


const CustomCardPlan = ({ dataUsed, dataTotal, dataUsedPercent, subscribedTo, changeScreen , final, leftData}) => {

    return (
        // <Card containerStyle={styles.container}>
        <View style={{width:'100%', marginHorizontal:20, marginTop:'5%'}}>
                
            <TouchableOpacity
                style={styles.upgradeButton}
                onPress={() => changeScreen('PlanSelectorScreen', {
                    'subscribedTo': subscribedTo
                })}>
                <Text style={{fontWeight: 'bold', fontSize: 12, color:'#fff'}}>Upgrade</Text>
            </TouchableOpacity>

            <Text style={styles.message}>{'You have '} <Text style={{textTransform: 'capitalize'}}>{leftData}</Text> {'left in your current plan.'}</Text>
        </View>
    )
}

export default CustomCardPlan

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        // flex: 1,
    },
    progress: {
        marginTop: 5,
    },
    message: {
        fontSize: 14,
        fontFamily:fontFamily.Regular ,
        marginTop: 8,
        width:'60%',
    },
    upgradeButton: {
        // alignItems: "center",
        backgroundColor: "#3CB371",
        // paddingHorizontal: 10,
        // paddingVertical: 8,
        padding:10,
        marginTop: 8,
        borderRadius: 5,
        position:'absolute',
        right:40

    }
})
