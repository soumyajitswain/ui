import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Landing from './home/landing';
import Login from './home/login';

export default function App() {
  const [props, setProps] = useState({ loggedIn: false });
  const [loggedIn, setLoggedIn] = useState(false);

  const submitLogin = () => {
    props.loggedIn = true;
    setProps(props);
    setLoggedIn(!loggedIn)
    console.log(props);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {!loggedIn ?
        <Login submitLogin={submitLogin}></Login>
        :
        <Landing props={props}></Landing>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
