import { View, FlatList } from 'react-native';
import { TodoListItem } from './TodoListItem';

export const TodoList = ({ todos }) => {
    return (
        <View>
            <FlatList
                data={todos}
                renderItem={({ item, index }) => <TodoListItem index={index} todo={item} />}
            />
        </View>
    );
};
