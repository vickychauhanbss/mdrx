import React, { useState, useEffect} from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Input } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import axios from 'axios'
import { data } from '../results';

const GoogleSearch = ({ location, setSearchResults, setProcessing }) => {

    const [searchText, setSearchText] = useState('')
    const [searchLocationId, setSearchLocationId] = useState('')
    const [searchPlaceLatLong, setSearchPlaceLatLong] = useState('')


    useEffect(() => {
        getPlaceLatLong()
    }, [searchLocationId])

    useEffect(() => {
        searchCarDealers()
    }, [searchPlaceLatLong])
    

    useEffect(() => {
        console.log('started')
        console.log(location, 'location')
        const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=2000&type=car_dealer&key=AIzaSyCxcQJKqvMrd7WVOOaSCm_YTJ2EKXZKhy4`
        var config = {
            method: 'get',
            url: url,
            headers: {}
        };
        
        axios(config)
        .then(function (response) {
            console.log(response.data.results)
            setSearchResults(response.data.results)
            setProcessing(false)
        })
        .catch(function (error) {
            console.log(error);
        });
        // setSearchResults(data.results)
        // setProcessing(false)
    }, [location])


    const searchCarDealers = () => {
        const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${searchPlaceLatLong}&radius=2000&type=car_dealer&key=AIzaSyCxcQJKqvMrd7WVOOaSCm_YTJ2EKXZKhy4`
        // location=-33.8670522%2C151.1957362&
        var config = {
            method: 'get',
            url: url,
            headers: {}
        };
        
        axios(config)
        .then(function (response) {
            console.log(response)
            setSearchResults(response.data.results)
            setProcessing(false)
        })
        .catch(function (error) {
            console.log(error);
        });
    }


    const getPlaceLatLong = () => {
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${searchLocationId}&key=AIzaSyCxcQJKqvMrd7WVOOaSCm_YTJ2EKXZKhy4`
        var config = {
            method: 'get',
            url: url,
            headers: {}
        };
        
        axios(config)
        .then(function (response) {
            console.log(response.data)
            setSearchPlaceLatLong(`${response.data.result.geometry.location.lat}%2C${response.data.result.geometry.location.lng}`)
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    const onPress = () => {

        if(searchText.length < 1){
            return
        }

        setProcessing(true)

        const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${searchText}&inputtype=textquery&key=AIzaSyCxcQJKqvMrd7WVOOaSCm_YTJ2EKXZKhy4`
        var config = {
            method: 'get',
            url: url,
            headers: {}
        };
        
        axios(config)
        .then(function (response) {
            console.log(response.data)
            setSearchLocationId(response.data.candidates[0].place_id)
        })
        .catch(function (error) {
            console.log(error);
        });

    }

    return (
        <View>
            <Input 
                placeholder='Search'  
                rightIcon={
                    <TouchableOpacity
                        onPress={onPress}
                    >
                        <Feather name="search" size={24} color="black" />
                    </TouchableOpacity>
                }
                onChangeText={setSearchText}
            />
        </View>
    )
}

export default GoogleSearch

const styles = StyleSheet.create({})
