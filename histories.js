import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text } from 'react-native';
// import { storeHistories } from './services/histories_service';
import { getHistories } from './services/histories_service';
import { Searchbar } from 'react-native-paper';



const Item = ({ title, navigation }) => (
    <View style={styles.item} >
        <Text
            onPress={async () => {
                let arr = title.split(" ");
                navigation.navigate('Computer', {
                    value: arr[arr.length - 1]
                });

            }
            }
            style={styles.value}
        >
            {title}
        </Text>
    </View>
);
const Histories = ({ navigation }) => {

    const renderItem = ({ item }) => (
        <Item title={item} navigation={navigation} />
    );
    const [history, setHistory] = useState([]);
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => {
        let filteredName = history.filter((item) => {
            return item.toLowerCase().match(query)
        })
        console.log(filteredName)
        setSearchQuery(filteredName)
    };
    useEffect(() => {
        async function fetchData() {
            let tmp = await getHistories('@storage_Key');
            setHistory(tmp);
            setSearchQuery([...history]);
        }
        const unsubscribe = navigation.addListener('focus', (e) => {
            fetchData();
        });

        return unsubscribe;
    },
        [navigation]  // useEffect chay lai khi co su thay doi trong cac bien nay
    );

    return (

        <SafeAreaView style={styles.container}>
            <Searchbar
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
                style={styles.searchbar}
            />
            <FlatList
                data={searchQuery}
                renderItem={renderItem}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#202020",
        justifyContent: "flex-end",
        flex: 1,
    },
    item: {
        backgroundColor: '#a6a6a6',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10
    },
    title: {
        fontSize: 32,

    },
    searchbar: {
        borderRadius: 20,
    },
    value: {
        color: "#000",
        fontSize: 25,
        textAlign: "right",
        marginRight: 20,
        marginBottom: 10,
    },
});

export default Histories;