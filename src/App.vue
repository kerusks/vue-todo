<template>
  <div id="app">
    <v-app id="inspire">
      <v-card class="mx-auto" max-width="640" min-width="480">
        <v-toolbar color="indigo" dark>
          <v-toolbar-title>
            {{ title }}
          </v-toolbar-title>
        </v-toolbar>
        <TodoAdd @add-todo="addTodo" />
        <template>
          <div class="text-center">
            <v-btn class="ma-2" small outlined color="indigo" @click="sort">
              Sort by priority
            </v-btn>
            <v-btn
              class="ma-2"
              small
              outlined
              color="indigo"
              @click="clearList"
            >
              Clear All
            </v-btn>
          </div>
        </template>
        <v-divider />
        <TodoList :todoList="todoList" />
      </v-card>
    </v-app>
  </div>
</template>
<script>
import TodoList from "./components/todo-list";
import TodoAdd from "./components/todo-add";
const LS_KEY = "ravue-9Ax0e-1ikq";
export default {
  name: "App",
  components: {
    TodoList,
    TodoAdd
  },
  data() {
    return {
      title: "Todos",
      todoList: [],
      sortDirection: "desc"
    };
  },
  watch: {
    todoList: {
      deep: true,
      handler(newVal) {
        localStorage.setItem(LS_KEY, JSON.stringify(newVal));
      }
    }
  },
  created() {
    this.todoList = JSON.parse(localStorage.getItem(LS_KEY));
    this.sort(false);
  },
  methods: {
    addTodo(newTodoObj) {
      this.todoList = [...this.todoList, newTodoObj];
      this.sort(false);
    },
    clearList() {
      this.todoList = [];
    },
    fetchTodos() {
      return JSON.parse(localStorage.getItem(LS_KEY));
    },
    sort(e) {
      if (e) {
        if (this.sortDirection === "asc") {
          this.sortDesc();
          this.sortDirection = "desc";
        } else {
          this.sortAsc();
          this.sortDirection = "asc";
        }
      } else {
        if (this.sortDirection === "desc") this.sortDesc();
        else this.sortAsc();
      }
    },
    sortAsc() {
      this.todoList.sort((a, b) => a.priorityId - b.priorityId);
    },
    sortDesc() {
      this.todoList.sort((a, b) => b.priorityId - a.priorityId);
    }
  }
};
</script>
