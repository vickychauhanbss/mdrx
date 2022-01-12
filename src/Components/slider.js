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
        require('../Assets/Group_9.png'),
        require('../Assets/Group_15.png'),
        require('../Assets/Group_23.png'),
      ],
    };
  }

  render() {
    return (
      <View style={styles.container}>
       <SliderBox
          // ImageComponent={FastImage}
          width='100%'
          images={this.state.images}
          sliderBoxHeight={220}
          onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
          dotColor="#0EA1D8"
          inactiveDotColor="#90A4AE"
          // paginationBoxVerticalPadding={10}
          // margin={10}
          autoplay={true}
          circleLoop
          resizeMethod={'resize'}
          resizeMode={'contain'}
          paginationBoxStyle={{
            position: "absolute",
            bottom: 0,
            padding: 0,
            alignItems: "center",
            alignSelf: "center",
            justifyContent: "center",
            paddingVertical: 10,
            marginTop:0
          }}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 0,
            padding: 0,
            margin: 0,
            // bottom:-20,
            backgroundColor: "rgba(128, 128, 128, 0.92)"
          }}
          ImageComponentStyle={{ width: '100%', marginTop: 5}}
          imageLoadingColor="#2196F3"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius:100,
    marginRight:20,
    // marginTop:'1%'
    // borderRadius: 30,
  },
});
