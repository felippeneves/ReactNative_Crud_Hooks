import React, { useContext } from 'react'
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native'
import { ListItem, Avatar, Button, Icon  } from 'react-native-elements'
import UsersContext from '../context/UsersContext'

export default props => {

    const { state, dispatch } = useContext(UsersContext)

    function confirmUserDeletion(user) {
        Alert.alert('Excluir Usuário', 'Deseja excluir o usuário?', [
            {
                text: 'Sim',
                onPress() {
                    dispatch({
                        type: 'deleteUser',
                        payload: user.id
                    })
                }
            },
            {
                text: 'Não'
            },
        ])
    }

    function getActions(user) {
        return (
            <>
                <Button
                    onPress={() => props.navigation.navigate('UserForm', user)}
                    type='clear'
                    icon={<Icon name='edit' size={25} color='orange' />}
                    />
                <Button
                    onPress={() => confirmUserDeletion(user)}
                    type='clear'
                    icon={<Icon name='delete' size={25} color='red' />}
                    />
            </>
        )
    }

    function getUserItem({ item: user }) {
        return(
            <ListItem key={user.id} bottomDivider
                onPress={() => props.navigation.navigate('UserForm', user)}>
                <Avatar source={{uri: user.avatarUrl}} />
                <ListItem.Content>
                    <ListItem.Title>{user.name}</ListItem.Title>
                    <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Content style={styles.container}>
                    {getActions(user)}
                </ListItem.Content>
            </ListItem>
        )
    }

    return (
        <View>
            <FlatList
                keyExtractor={user => user.id.toString()}
                data={state.users}
                renderItem={getUserItem}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
})