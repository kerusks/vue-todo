<template>
  <v-list-item-group id="list-todo">
    <div v-for="todo in todoList" :key="todo.id">
      <TodoItem
        :todo="todo"
        @delete-todo="deleteTodo"
        @complete-todo="completeTodo"
      />
    </div>
  </v-list-item-group>
</template>
<script>
import TodoItem from "./todo-item";
export default {
  name: "TodoList",
  components: {
    TodoItem
  },
  props: ["todoList"],
  methods: {
    deleteTodo(todo) {
      const todoIndex = this.todoList.indexOf(todo);
      this.todoList.splice(todoIndex, 1);
    },
    completeTodo(todo) {
      const todoIndex = this.todoList.indexOf(todo);
      if (todoIndex > -1) {
        this.$set(this.todoList, todoIndex, todo);
      }
    }
  }
};
</script>
