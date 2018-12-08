import Users from './data/users';
import Todos from './data/todos';
import find from 'lodash/find';
import filter from 'lodash/filter';
import sumBy from 'lodash/sumBy';
import uuidv4 from 'uuid/v4';
import {
GraphQLInt,
        GraphQLBoolean,
        GraphQLString,
        GraphQLList,
        GraphQLObjectType,
        GraphQLNonNull,
        GraphQLSchema,
} from 'graphql';

const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'Users in company',
    fields: () => ({
            id: {type: new GraphQLNonNull(GraphQLInt)},
            first_name: {type: new GraphQLNonNull(GraphQLString)},
            last_name: {type: new GraphQLNonNull(GraphQLString)},
            email: {type: GraphQLString},
            gender: {type: GraphQLString},
            department: {type: new GraphQLNonNull(GraphQLString)},
            country: {type: new GraphQLNonNull(GraphQLString)},
            todo_count: {
                type: GraphQLInt,
                resolve: (user) => {
                    return sumBy(Todos, todo => todo.userId === user.id ? 1:0);
                }
            },
            todos: {
                type: new GraphQLList(TodoType),
                resolve: (user, args)    => {
                    return filter(Todos, todo => todo.userId === user.id);
                }
            }
        })
});

const TodoType = new GraphQLObjectType({
    name: 'Todo',
    description: 'Task for user',
    fields: () => ({
            id: {type: new GraphQLNonNull(GraphQLString)},
            title: {type: GraphQLString},
            completed: {type: new GraphQLNonNull(GraphQLBoolean)},
            user: {
                type: UserType,
                resolve: (todo, args) => {
                    return find(Users, user => user.id === todo.userId);
                }
            }
        })
});

const TodoQueryRootType = new GraphQLObjectType({
    name: 'TodoAppSchema',
    description: 'Root Todo App Schema',
    fields: () => ({
            users: {
                args: {
                    first_name: {type: GraphQLString},
                    last_name: {type: GraphQLString},
                    department: {type: GraphQLString},
                    country: {type: GraphQLString},
                },
                type: new GraphQLList(UserType),
                description: 'List of Users',
                resolve: (parent, args) => {
                    if (Object.keys(args).length) {
                        return filter(Users, args);
                    }
                    return Users;
                }
            },
            todos: {
                args: {
                    userId: {type: GraphQLInt},
                    completed: {type: GraphQLBoolean},
                },
                type: new GraphQLList(TodoType),
                description: 'List of Todos',
                resolve: (parent, args) => {
                    if (Object.keys(args).length) {
                        return filter(Todos, args);
                    }
                    return Todos;
                }
            }
        })
});

const TodoRootMutation = new GraphQLObjectType({
    name: 'TodoRootMutation',
    fields: () => ({
        createTodo: {
            type: TodoType,
            args: {
                userId: { type: new GraphQLNonNull(GraphQLInt)},
                title: {type: GraphQLString}
            },
            resolve: (value, { userId, title }) => {        
                let todo = {
                    id: uuidv4(),
                    title: title,
                    completed: false,
                    userId: userId
                }
                console.log(userId);
                Todos.push(todo);
                return todo;
            }
        },
        updateTodo: {
            type: TodoType,
            args: {
                userId: { type: new GraphQLNonNull(GraphQLInt)},
                title: { type: GraphQLString },
                completed: {type: new GraphQLNonNull(GraphQLBoolean)},
                id: { type: new GraphQLNonNull(GraphQLString)}
            },
            resolve: (value, { userId, title, completed, id}) => {
                let updatedTodo = {
                    id: id,
                    title: title,
                    completed: completed,
                    userId: userId
                }
                console.log(id);
                for (var i = 0, len = Todos.length; i < len; i++) {
                    if (Todos[i].id == id) {
                        console.log(Todos[i]);
                        Todos[i] = updatedTodo;
                    }
                }
                return updatedTodo;
            }
        },
        deleteTodo: {
            type: TodoType,
            args: {
                userId: { type: new GraphQLNonNull(GraphQLInt)},
                id: { type: new GraphQLNonNull(GraphQLString)}
            },
            resolve: (value, { userId, id }) => {
                for (var i = 0, len = Todos.length; i < len; i++) {
                    if (Todos[i].id == id) {
                        Todos.splice(i, 1);
                    }
                }
            }
        }
    })
});

const schema = new GraphQLSchema({
    query: TodoQueryRootType,
    mutation: TodoRootMutation
});

export default schema;