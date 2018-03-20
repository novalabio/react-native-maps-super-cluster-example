#/bin/bash

rm ../node_modules/react-native/local-cli/core/__fixtures__/files/package.json &> /dev/null

RN_MAPS_VERSION=$(cat node_modules/react-native-maps/package.json | grep "version" | head -1 | awk -F: '{ print $2 }' | sed 's/[",]//g')
echo ""

if [ $RN_MAPS_VERSION == "0.20.1" ]; then
  echo "Patching react-native-maps@0.20.1"
  rm ./node_modules/react-native-maps/index.js | cp ./postinstall/MapView-index.js ./node_modules/react-native-maps/index.js
fi