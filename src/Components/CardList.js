import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import CustomCard from './CustomCard'

const CardList = ({ searchResults }) => {

    return (
        <FlatList
            data={searchResults}
            renderItem={CustomCard}
            keyExtractor={(item, index) => index}
            ListEmptyComponent={
                (
                    <Text style={{padding: 10}}>No results found</Text>
                )
            }
        />
    )
}

export default CardList

const styles = StyleSheet.create({})
