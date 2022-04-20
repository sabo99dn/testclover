import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  NativeModules,
  NativeEventEmitter,
  Alert,
} from 'react-native';
import React from 'react';

export default function App() {
  const {CloverNetModule} = NativeModules;
  const eventEmitter = new NativeEventEmitter(NativeModules.CloverNetModule);

  React.useEffect(() => {
    eventEmitter.addListener('onPairingCode', event => {
      console.log('Pairing Code: ', event.onPairingCode);
    });

    eventEmitter.addListener('onDeviceReady', event => {
      console.log('Is Device Ready: ', event.onDeviceReady);
    });
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity
        onPress={() => {
          CloverNetModule.initializePaymentConnector('123');
          Alert.alert('Success', 'Change Clover info successful');
        }}
        style={{
          padding: 10,
          backgroundColor: 'red',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 10,
        }}>
        <Text>CONNECT</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          const eventEmitter = new NativeEventEmitter(
            NativeModules.CloverNetModule,
          );
          return new Promise((resolve, reject) => {
            CloverNetModule.onSaleRequest()
              .then(
                eventEmitter.addListener('onSaleResponse', event => {
                  console.log('=======hihi con cho======', event);
                }),
                // console.log('===========anh yeu em=========='),
              )
              .catch(error => reject(error));
          });
        }}
        style={{
          padding: 10,
          backgroundColor: 'red',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 10,
        }}>
        <Text>SALE</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
