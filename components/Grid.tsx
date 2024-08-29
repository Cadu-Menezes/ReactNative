import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function Grid({ columns = 2, gap = 10, children }) {
  return (
    <View style={[styles.gridContainer, { margin: -gap / 2 }]}>
      {React.Children.map(children, (child, index) => (
        <View
          key={index}
          style={{
            width: `${100 / columns}%`,
            padding: gap / 2,
          }}
        >
          {child}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',  
    alignItems: 'center',      
    flex: 1,                   
  },
});