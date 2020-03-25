import { connect } from 'react-redux'
import TodoList from '../../Components/TodoList'
import {toggleTodo} from '../Actions'

const mapStateToProps = state => ({
    todos: state.todos
})

const mapDispatchToProps = dispatch => ({
    toggleTodo: id => dispatch(toggleTodo(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)