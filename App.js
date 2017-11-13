
// @flow
 

import React, { Component } from 'react'
import {
  Text,
  View,
  Platform,
  StyleSheet,
  TouchableHighlight,
} from 'react-native'
import Marker from 'react-native-maps'
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

  componentWillMount() {
    this.reload()
  }

  reload = () => {
    const newPins = generateRandomPoint({latitude: italyCenterLatitude, longitude: italyCenterLongitude}, radius, 50)
    this.setState({
      pins: newPins
    })
  }

  loadMore = () => {
    let actualPins = this.state.pins
    const newPins = generateRandomPoint({latitude: italyCenterLatitude, longitude: italyCenterLongitude}, radius, 50)
    actualPins = actualPins.concat(newPins)

    this.setState({
      pins: newPins
    })
  }

  renderMarker = (pin) => {
    return (
      <Marker key={`${Math.rando()}-pins`} coordinate={pin} />
    )
  }

  render() {
    return (
      <View style={styles.container} style={{flex: 1}}>
        
        {/* Header - Control Test Bar */}
        <View style={styles.controlBar}>
          <TouchableHighlight onPress={this.reload}>
            <Text>Ricarica</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.loadMore}>
            <Text>Carica Ancora</Text>
          </TouchableHighlight>
        </View>

        {/* Cluster Map Example */}
        <ClusteredMapView
          data={this.state.pins}
          style={{flex: 1}}
          textStyle={{ color: '#65bc46' }}
          initialRegion={{latitude: italyCenterLatitude, longitude: italyCenterLongitude, latitudeDelta: 12, longitudeDelta: 12 }}
          containerStyle={{backgroundColor: 'white', borderColor: '#65bc46'}}
          renderMarker={this.renderMarker}>
        </ClusteredMapView>
      </View>
    );
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
    top: 20,
    flexDirection: 'row',
    position: 'absolute',
    alignItems: 'center',
    backgroundColor: 'transparent',
    justifyContent: 'space-around',
  }
});
