// app/_layout.js
import React from 'react';
import { View, Text } from 'react-native';

const Layout = ({ children }) => {
  return (
    <View style={{ flex: 1 }}>
      <Text>CrecheSpots</Text>
      {children}
    </View>
  );
};

export default Layout;
