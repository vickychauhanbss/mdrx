import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Card } from 'react-native-elements';
import { Rating } from 'react-native-ratings';

const CustomCard = ({ item }) => {

    return (
        <Card elevation={7}>

            <Text style={[styles.title, styles.row]} >{item.name}</Text>
            <View style={styles.ratings}>
                <Text>{`${item.rating}  `}</Text>
                <Rating
                    startingValue={item.rating}
                    ratingCount={5}
                    imageSize={15}
                    readonly
                />
                <Text>{`  (${item.user_ratings_total})`}</Text>
            </View>
            <Text style={styles.row}>{item.types[0]} : {item.vicinity}</Text>
            {item.opening_hours && 
                (item.opening_hours.open_now ? <Text>Open</Text> : <Text style={[styles.row, {color: 'red'}]} >Closed</Text>)
            }
        </Card>
    )
}

export default CustomCard

const styles = StyleSheet.create({
    title: { 
        fontWeight: 'bold',
        fontSize: 18,
    },
    row:{
        marginBottom: 5
    },
    ratings: { 
        flexDirection: 'row',
    },
})
