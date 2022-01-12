import React, {
    Component,
    useContext,
    useRef,
    useState,
    useEffect,
    useLayoutEffect,
  } from 'react';
import { View, Text, TouchableOpacity, Button , Image, Dimensions, StyleSheet} from 'react-native'
import { Card } from 'react-native-elements'
import { moderateScale, scale } from 'react-native-size-matters';
import {AuthContext} from '../Utils/AuthContext';
import { fontFamily } from '../Utils/fonts';

const PaymentDetails = ({ planType, durationType, planPrice, loading, openPaymentSheet, navigation }) => {
    const {user, token} = useContext(AuthContext);
    const {height, width} = Dimensions.get('window');
    return (
        <View style={{flex: 1, backgroundColor: '#fff'}}>

            <View  style={{
                width: width,
                height: height * 0.06,
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
                backgroundColor:'#FFF',
                marginTop:'8%',
                paddingBottom:20,
                borderBottomWidth: 1,
                borderBottomColor: '#D0D0D0',
              }}>
              <TouchableOpacity  style ={{ left:10, height:25,width:20}} onPress={() => navigation.goBack(null)}>
                <Image source={require('../Assets/back.png')}  style={{height: scale(20), width: scale(20)}} />
              </TouchableOpacity>
          
                <View
                  style={{
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    flexDirection: 'row',
                    // marginLeft: '30%',
                  }}>
                  <TouchableOpacity onPress={() => navigation.navigate('AddProfile')}>
                    <Image
                        source={require('../Assets/dummy.png')}
                        style={{height: 28, width: 28, borderRadius: 30 / 2,backgroundColor:'#000'}}
                      />
                  </TouchableOpacity>
                  <Text style={{ fontSize: moderateScale(16), marginHorizontal: 20,  fontFamily:fontFamily.Bold , color:'#000',}}>
                    {user.fname} {user.lname}
                  </Text>
              
                  <View style={{marginLeft: '5%'}}>
                  </View>
                </View>

                <View
                  style={{
                    marginRight: '1%',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <View style={{marginRight: 10}}>
                    <Image
                        source={require('../Assets/menu.png')}
                        style={{height: scale(30), width: scale(25)}}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>


        <View style={{padding:20}}>
            <Text style={styles.titleText}>
                Payment
            </Text>
            <Text style={styles.normalText}>
                Start your {planType} PRO membership. You can cancel at any time.
            </Text>
            <View
                style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                }}
            />

            <View style={styles.innerRow} >
                <Text style={styles.normalText}>{planType} Plan</Text>
                <Text style={styles.normalText}>{planPrice} / {durationType}</Text>
            </View>

            <View style={styles.innerRow} >
                <Text style={styles.normalText}>Subtotal</Text>
                <Text style={styles.normalText}>{planPrice}</Text>
            </View>

            <View
                style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                }}
            />

            <View style={[styles.innerRow, {marginBottom: 5}]} >
                <Text style={styles.normalText}>Total</Text>
                <Text style={styles.normalText}>{planPrice}</Text>
            </View>


            <Button
                variant="primary"
                disabled={!loading}
                title="Checkout"
                onPress={openPaymentSheet}
            />
</View>


        </View>
    )
}

export default PaymentDetails

const styles = StyleSheet.create({
    titleText: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 2
    },
    normalText: {
        marginBottom: 2
    },
    innerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 2,
    }
})
