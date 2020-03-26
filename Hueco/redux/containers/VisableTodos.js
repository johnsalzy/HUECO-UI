import { connect } from 'react-redux'
// import TodoList from '../../components/TodoList'
import {toggleTodo} from '../actions'



import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";


const mapStateToProps = state => ({
    todos: state.todos
})

const mapDispatchToProps = dispatch => ({
    toggleTodo: id => dispatch(toggleTodo(id))
})

const TodoList = ({ todos, toggleTodo }) => (
    <View style={{ padding: 20 }}>
        {todos.map(todo =>
            <TouchableOpacity key={todo.id} onPress={() => toggleTodo(todo.id)}>
                <Text style={{
                    fontSize: 24,
                    textDecorationLine: todo.completed ? 'line-through' : 'none'
                }}>{todo.id+1}. {todo.text}</Text>
            </TouchableOpacity>
        )}
    </View>
)
// export default TodoList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)