import React, { Component } from "react";
import {
    Animated,
    Dimensions,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    View
} from "react-native";
import { ListItem, Icon } from "react-native-elements";
import { SwipeListView } from "react-native-swipe-list-view";
import db from "../config";

export default class SwipeableFlatList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allNotifications: this.props.allNotifications
        };
    }

    updateMarkAsread = notification => {
        db.collection("allNotifications")
            .doc(notification.doc_id)
            .update({
                notificationStatus: "read"
            });
    };
    closeRow = (item, key) => {
        if (item[key]) {
            item[key].closeRow();
        }
    };

    deleteRow = (item, key) => {
        var allNotifications = this.state.allNotifications;
        this.closeRow(item, key);
        const newData = [...allNotifications];
        const prevIndex = allNotifications.findIndex((item) => item.key === key);
        this.updateMarkAsread(allNotifications[prevIndex]);
        newData.splice(prevIndex, 1);
        this.setState({ allNotifications: newData });
    };

    onRowDidOpen = (key) => {
        console.log('This row opened', key);
    };

    // onSwipeValueChange = swipeData => {
    //     var allNotifications = this.state.allNotifications;
    //     const { key, value } = swipeData;
    //     if (value < -Dimensions.get("window").width) {
    //         const newData = [...allNotifications];
    //         this.updateMarkAsread(allNotifications[key]);
    //         newData.splice(key, 1);
    //         this.setState({ allNotifications: newData });
    //     }
    // };

    renderItem = data => (
        <Animated.View>
            <ListItem
                leftElement={<Icon name="book" type="font-awesome" color="#696969" />}
                title={data.item.bookName}
                titleStyle={{ color: "black", fontWeight: "bold" }}
                subtitle={data.item.message}
                bottomDivider
            />
        </Animated.View>
    );

    renderHiddenItem = (data, item) => (
        <View style={styles.rowBack}>
            <Text>Left</Text>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnLeft]}
                onPress={() => this.closeRow(item, data.item.key)}>
                <Text style={styles.backTextWhite}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnRight]}
                onPress={() => this.deleteRow(item, data.item.key)}>
                <Text style={styles.backTextWhite}>Mark as Read</Text>
            </TouchableOpacity>
        </View>
    );

    // renderHiddenItem = () => (
    //     <View style={styles.rowBack}>
    //         <View style={[styles.backRightBtn, styles.backRightBtnRight]}>
    //             <Text style={styles.backTextWhite}>Mark as read</Text>
    //         </View>
    //     </View>
    // );

    // render() {
    //     return (
    //         <View style={styles.container}>
    //             <SwipeListView
    //                 disableRightSwipe
    //                 data={this.state.allNotifications}
    //                 renderItem={this.renderItem}
    //                 renderHiddenItem={this.renderHiddenItem}
    //                 rightOpenValue={-Dimensions.get("window").width}
    //                 previewRowKey={"0"}
    //                 previewOpenValue={-40}
    //                 previewOpenDelay={3000}
    //                 onSwipeValueChange={this.onSwipeValueChange}
    //                 keyExtractor={(item, index) => index.toString()}
    //             />
    //         </View>
    //     );
    // }
    render() {
        return (
            <View style={styles.container}>
                <SwipeListView
                    data={this.state.allNotifications}
                    renderItem={this.renderItem}
                    renderHiddenItem={this.renderHiddenItem}
                    leftOpenValue={75}
                    rightOpenValue={-150}
                    previewkey={'0'}
                    previewOpenValue={-40}
                    previewOpenDelay={3000}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1
    },
    backTextWhite: {
        color: "white",
        fontWeight: "bold",
        fontSize: 15,
        textAlign: "center",
        alignSelf: "flex-start"
    },
    rowBack: {
        alignItems: "center",
        backgroundColor: "#29b6f6",
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: 15
    },
    backRightBtn: {
        alignItems: "center",
        bottom: 0,
        justifyContent: "center",
        position: "absolute",
        top: 0,
        width: 100
    },
    backRightBtnRight: {
        backgroundColor: "#29b6f6",
        right: 0
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
    },
    backRightBtnLeft: {
        backgroundColor: 'blue',
        right: 75,
    },
});