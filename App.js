import React, { useState, useEffect } from 'react';
import { TouchableOpacity,StyleSheet, Text, View, FlatList, SafeAreaView, ActivityIndicator, Image } from 'react-native';

const movieURL = "https://s3.amazonaws.com/technical-challenge/v3/contacts.json";

export default function App() {

  const [isLoading, setLoading] = useState(true);
  const [contacts, setContatcs] = useState([]);

  useEffect(() => {
    fetch(movieURL)
      .then((response) => response.json())
      .then((json) => setContatcs(json))
      .catch((error) => alert(error))
      .finally(setLoading(false));
  }, []);


  const Item = ({ title, company, imageURL }) => (
    <View style={styles.itemContainer}>
      <View style={styles.item}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: imageURL,
          }}
        />
      </View>
      <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.title}>{company}</Text>
      </View>
    </View>
  );

  const renderItem = ({ item }) => {
    return (
      <Item title={item.name} company={item.companyName} imageURL={item.smallImageURL}/>
    )
  };

  const renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE",
        }}
      />
    );
  };

  return (
    <SafeAreaView >
      <FlatList
        data={contacts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={renderSeparator}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 0,
  },
  itemContainer: {
    flexDirection: 'row'
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
});
