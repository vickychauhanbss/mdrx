import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {SliderBox} from 'react-native-image-slider-box';
// import { assets } from '../Assets';

export default class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [
        // 'https://source.unsplash.com/1024x768/?nature',
        // 'https://source.unsplash.com/1024x768/?water',
        // 'https://source.unsplash.com/1024x768/?girl',
        // 'https://source.unsplash.com/1024x768/?tree',
        require('../Assets/images/MdrxA.jpeg'),
        require('../Assets/images/MdrxB.jpeg'),
        require('../Assets/images/MdrxC.jpeg'),
      ],
    };
  }

  render() {
    return (
      <View style={styles.container}>
       <SliderBox
  // ImageComponent={FastImage}
  images={this.state.images}
  sliderBoxHeight={500}
  onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
  dotColor="#0EA1D8"
  inactiveDotColor="#90A4AE"
  paginationBoxVerticalPadding={10}
  margin={10}

  // circleLoop
  resizeMethod={'resize'}
  resizeMode={'contain'}
  paginationBoxStyle={{
    position: "absolute",
    bottom: -5,
    padding: 0,
  
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    // paddingVertical: '15%'
    paddinTop:'5%'
  }}
  dotStyle={{
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 0,
    padding: 0,
    margin: 0,
    backgroundColor: "rgba(128, 128, 128, 0.92)"
  }}
//   ImageComponentStyle={{borderRadius: 0, width: '97%', marginTop: 5, height:'100%'}}
  imageLoadingColor="#2196F3"
/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderRadius: 30,
  },
});
