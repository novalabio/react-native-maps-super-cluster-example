
// @flow
'use-strict'

import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  Platform,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import { Marker, Callout } from 'react-native-maps'
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
    this.renderCluster = this.renderCluster.bind(this)
  }

  componentDidMount() {
    this.reload()
  }

  reload = () => {
    const pins = generateRandomPoints({latitude: italyCenterLatitude, longitude: italyCenterLongitude}, radius, 50, this.state.pins.length)
    this.setState({ pins: pins})
  }

  loadMore = () => {
    const pins = generateRandomPoints({latitude: italyCenterLatitude, longitude: italyCenterLongitude}, radius, 50, this.state.pins.length)
    this.setState({ pins: this.state.pins.concat(pins) })
  }

  renderMarker = (pin) => {
    return (
      <Marker key={pin.id || Math.random()} coordinate={pin.location} /> )
    }
  
  renderCluster = (cluster, onPress) => {

    const pointCount = cluster.pointCount,
          coordinate = cluster.coordinate,
          clusterId = cluster.clusterId

    const clusterEngine = this.map.getClusteringEngine(),
          clusteredPoints = clusterEngine.getLeaves(clusterId, 100)

    return (
      <Marker onPress={onPress} coordinate={coordinate} key={cluster.clusterId}>
      
        <View style={styles.clusterContainer}>
          <Text style={styles.counterText}>{pointCount}</Text>
        </View>

        {/* 
        // For view the callout correctly, disable the preserveClusterPressBehavior
        <Callout tooltip style={styles.calloutStyle}>
          <ScrollView>
            {
              clusteredPoints.map(p => {
                return (
                  <Text style={{color: '#65bc46'}} key={p.properties.item.id}>{p.properties.item.id}</Text>
                )
              })
            }
          </ScrollView>
        </Callout>
        */}
        
      </Marker> )
    }

  render() {
    return (
      <View style={styles.container} style={{flex: 1}}>
        
        {/* Cluster Map Example */}      
        <ClusteredMapView
          style={{flex: 1}}
          data={this.state.pins}
          ref={r => this.map = r}
          textStyle={{ color: '#65bc46' }}
          renderMarker={this.renderMarker}
          renderCluster={this.renderCluster}
          preserveClusterPressBehavior={true}
          edgePadding={{top: 32, left: 10, right: 64, bottom: 64}}
          initialRegion={{latitude: italyCenterLatitude, longitude: italyCenterLongitude, latitudeDelta: 12, longitudeDelta: 12 }} >
        </ClusteredMapView>

        {/* Header - Control Test Bar */}
        <View style={styles.controlBar}>
          <TouchableOpacity
            style={styles.button}
            onPress={this.reload}>
            <Text style={styles.text}>Reload</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={this.loadMore}>
            <Text style={styles.text}>Load more</Text>
          </TouchableOpacity>
        </View>
        <Image
          resizeMode='contain'
          source={require('./simbol.png')}
          style={{position: 'absolute', bottom: 8, right: 8, width: 64, height: 64}}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  controlBar: {
    top: 24,
    left: 25,
    right: 25,
    height: 40,
    borderRadius: 4,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white',
    justifyContent: 'space-between', 
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  novaLabLogo: {
    right: 8,
    bottom: 8,
    width: 64,
    height: 64,
    position: 'absolute',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  clusterContainer: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderRadius: 12,
    alignItems: 'center',
    borderColor: '#65bc46',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  counterText: {
    fontSize: 14,
    color: '#65bc46',
    fontWeight: '400'
  },
  calloutStyle: {
    width: 64,
    height: 64,
    padding: 8,
    borderRadius: 8,
    borderColor: '#65bc46',
    backgroundColor: 'white', 
  },
})