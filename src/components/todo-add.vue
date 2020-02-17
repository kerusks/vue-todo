<template>
  <div>
    <v-card-text>
      <v-form @submit="addTodo">
        <v-text-field
          ref="addTodoForm"
          v-model="title"
          solo
          label="Add Todo and press Enter to save"
          filled
          outlined
          clearable="clearable"
          hide-details=""
          class="text-add"
          dense
          autofocus
        >
          <template v-slot:append>
            <v-menu offset-y>
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                  <v-icon small color="grey darken-1">
                    fas fa-exclamation
                  </v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-subheader>Priority</v-subheader>
                <v-divider />
                <v-list-item-group
                  v-model="priorityId"
                  active-class="blue--text"
                >
                  <v-list-item
                    v-for="priority in priorities"
                    :key="priority.id"
                  >
                    <v-list-item-title
                      @click="setFocus"
                      v-text="priority.name"
                    />
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-menu>
            <v-menu offset-y>
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                  <v-icon small color="grey darken-1">
                    fas fa-folder
                  </v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-subheader>Category</v-subheader>
                <v-divider />
                <v-list-item-group v-model="catId" active-class="blue--text">
                  <v-list-item v-for="cat in categories" :key="cat.id">
                    <v-list-item-title @click="setFocus" v-text="cat.name" />
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-menu>
          </template>
        </v-text-field>
        <template>
          <div class="text-right custom-message">
            <v-sheet>
              <v-icon small dense>
                fas fa-exclamation
              </v-icon>
              <span class="first">{{ getPriorityName }}</span>
              <v-icon x-small>
                fas fa-folder
              </v-icon>
              <span>{{ getCategoryName }}</span>
            </v-sheet>
          </div>
        </template>
      </v-form>
    </v-card-text>
  </div>
</template>

<script>
import uuid from "uuid";
import categories from "../assets/categories.json";
import priorities from "../assets/priorities.json";
export default {
  name: "TodoAdd",
  data() {
    return {
      categories,
      priorities,
      title: "",
      catId: 0,
      priorityId: 0,
      notifications: [
        { id: 1, title: "Click Me" },
        { id: 2, title: "Click Me" },
        { id: 3, title: "Click Me" },
        { id: 4, title: "Click Me 2" }
      ],
      todoTextFocused: false
    };
  },
  computed: {
    getPriorityName() {
      return this.priorities.find(x => x.id === this.priorityId).name;
    },
    getCategoryName() {
      return this.categories.find(x => x.id === this.catId).name;
    }
  },
  methods: {
    addTodo(e) {
      e.preventDefault();
      const newTodoObj = {
        id: uuid.v4(),
        title: this.title,
        catId: this.catId,
        priorityId: this.priorityId,
        dateCreated: Date.now(),
        completed: false
      };

      if (this.title.trim().length) {
        this.$emit("add-todo", newTodoObj);
      }

      this.title = "";
      this.priorityId = 0;
      this.catId = 0;
    },
    setFocus() {
      this.$refs.addTodoForm.focus();
    }
  }
};
</script>
<style scoped lang="scss">
.custom-message {
  line-height: 12px;
  word-break: break-word;
  overflow-wrap: break-word;
  word-wrap: break-word;
  -webkit-hyphens: auto;
  -ms-hyphens: auto;
  hyphens: auto;
  font-size: 11px;
  opacity: 0.7;
  margin-top: 10px;
  .v-icon {
    padding-right: 5px;
    font-size: 10px !important;
    opacity: 0.5;
  }
  span.first {
    padding-right: 15px;
  }
}
</style>
