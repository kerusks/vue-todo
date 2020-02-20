<template>
  <v-list-item :class="{ complete: todo.completed }">
    <v-list-item-action v-show="!editing">
      <v-checkbox
        v-model="todo.completed"
        class="priority-checkbox"
        :class="cbPriorityClassName"
      />
    </v-list-item-action>
    <v-list-item-content>
      <v-list-item-title
        v-show="!editing"
        class="todo-text"
        @dblclick="editTodo"
      >
        {{ todo.title }}
      </v-list-item-title>
      <v-text-field
        v-show="editing"
        v-model="todo.title"
        outlined
        autofocus
        @blur="onBlur"
        @keyup.enter="onBlur"
        class="input-edit-todo"
      />
      <v-list-item-subtitle v-show="!editing">
        {{ getCategoryName(todo.catId) }}
      </v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action v-show="!editing">
      <v-btn icon @click="editTodo" class="btn-edit-item">
        <v-icon small color="grey darken-1">
          far fa-edit
        </v-icon>
      </v-btn>
    </v-list-item-action>
    <v-list-item-action v-show="!editing">
      <v-btn icon @click="deleteTodo(todo)" class="btn-delete-item">
        <v-icon small color="grey darken-1">
          far fa-trash-alt
        </v-icon>
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>
<script>
import categories from "../assets/categories.json";
export default {
  name: "TodoItem",
  props: ["todo"],
  data() {
    return {
      editing: false
    };
  },
  computed: {
    cbPriorityClassName() {
      const CLASS_PRIORITY = [
        `cb-priority--none`,
        `cb-priority--low`,
        `cb-priority--medium`,
        `cb-priority--high`
      ];
      return this.todo.priorityId
        ? CLASS_PRIORITY[this.todo.priorityId]
        : "cb-priority-undefined";
    }
  },
  methods: {
    editTodo() {
      this.editing = true;
    },
    onBlur() {
      this.editing = false;
    },
    getCategoryName(catId) {
      return categories.find(c => c.id === catId).name;
    },
    deleteTodo(todo) {
      this.$emit("delete-todo", todo);
    }
  }
};
</script>
<style lang="scss">
.v-list-item {
  &.complete {
    .todo-text {
      text-decoration: line-through;
    }
  }

  .v-btn {
    opacity: 0;
  }
  .v-list-item__action {
    .v-input--checkbox {
      &.cb-priority--none {
        .v-icon {
          color: rgba(103, 96, 96, 0.54) !important;
        }
      }
      &.cb-priority--low {
        .v-icon {
          color: rgba(33, 173, 64, 0.54) !important;
        }
      }
      &.cb-priority--medium {
        .v-icon {
          color: rgba(235, 151, 8, 0.54) !important;
        }
      }
      &.cb-priority--high {
        .v-icon {
          color: rgba(255, 0, 0, 0.54) !important;
        }
      }
    }
  }
  &:hover {
    .v-btn {
      opacity: 1;
    }
  }
}
</style>
