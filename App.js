
// @flow
 

import React, { Component } from 'react'
import {
  Text,
  View,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { Marker } from 'react-native-maps'
import ClusteredMapView from 'react-native-maps-super-cluster'
import { generateRandomPoints, generateRandomPoint } from './generator'  

const italyCenterLatitude = 41.8962667,
      italyCenterLongitude = 11.3340056,
      radius = 600000 
export default class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      pins: []
    }

    this.reload = this.reload.bind(this)
    this.loadMore = this.loadMore.bind(this)
    this.renderMarker = this.renderMarker.bind(this)
  }

  componentDidMount() {
    this.reload()
  }

  reload = () => {
    const newPins = generateRandomPoints({latitude: italyCenterLatitude, longitude: italyCenterLongitude}, radius, 50)
    this.setState({
      pins: newPins
    })
  }

  loadMore = () => {
    let actualPins = this.state.pins
    const newPins = generateRandomPoints({latitude: italyCenterLatitude, longitude: italyCenterLongitude}, radius, 50)
    actualPins = actualPins.concat(newPins)

    this.setState({
      pins: actualPins
    })
  }

  renderMarker = (pin) => {
    return (
      <Marker key={Math.random()} coordinate={pin.location} />
    )
  }

  render() {
    return (
      <View style={styles.container} style={{flex: 1}}>

        {/* Cluster Map Example */}
        <ClusteredMapView
          data={this.state.pins}
          style={{flex: 1}}
          textStyle={{ color: '#65bc46' }}
          initialRegion={{latitude: italyCenterLatitude, longitude: italyCenterLongitude, latitudeDelta: 12, longitudeDelta: 12 }}
          containerStyle={{backgroundColor: 'white', borderColor: '#65bc46'}}
          renderMarker={this.renderMarker} >
        </ClusteredMapView>

        {/* Header - Control Test Bar */}
        <View style={styles.controlBar}>
          <TouchableOpacity
            onPress={this.reload}>
            <Text style={{fontSize: 16 }}>Reload</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.loadMore}>
            <Text style={{ fontSize: 16 }}>Load more</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  controlBar: {
    left: 8,
    top: 24,
    right: 8,
    height: 40,
    borderRadius: 4,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'space-around', 
  }
});
