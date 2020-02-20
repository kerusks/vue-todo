import Vuetify from "vuetify";
import TodoAdd from "@/components/todo-add";
import { mount, createLocalVue, shallowMount } from "@vue/test-utils";
import Vue from "vue";
import priorities from "../../src/assets/priorities.json";
import categories from "../../src/assets/categories.json";

const todoInputId = "#input-add-todo";
const priorityBtnId = "#btn-priority";
const categoryBtnId = "#btn-category";
const customMessageClass = ".custom-message";
const listPriorityItem = ".list-priority-item";

Vue.use(Vuetify);
const localVue = createLocalVue();
let vuetify;

describe("TodoAdd", () => {
  let wrapper;
  describe("Selectors", () => {
    beforeAll(() => {
      vuetify = new Vuetify();
      wrapper = mount(TodoAdd, {
        localVue,
        vuetify
      });
    });

    it("should render an input element to add a new todo", () => {
      expect(wrapper.find(todoInputId).exists()).toBe(true);
    });

    it("should render an button element to select priority", () => {
      expect(wrapper.find(priorityBtnId).exists()).toBe(true);
    });

    it("should render an button element to select category", () => {
      expect(wrapper.find(categoryBtnId).exists()).toBe(true);
    });

    it("should render custom message element to hint priority and category selection", () => {
      expect(wrapper.find(customMessageClass).exists()).toBe(true);
    });
  });

  describe("Events", () => {
    beforeAll(() => {
      // Added DummyComp to circumvent the '[data-app] unable to locate target' error
      // It's Vuetify thing more than Vue
      const DummyComp = localVue.component("DummyComp", {
        components: { TodoAdd },
        template: `
        <div data-app>
          <TodoAdd />
        </div>
      `
      });

      vuetify = new Vuetify();
      wrapper = mount(DummyComp, {
        localVue,
        vuetify,
        attachToDocument: true
      });
    });

    it("shoud click priority button and render priority dropdown list", async () => {
      const button = wrapper.find(priorityBtnId);
      button.trigger("click");
      await wrapper.vm.$nextTick();
      expect(wrapper.find("#list-priority-dropdown").exists()).toBe(true);
    });

    const priorityIdx = 1; // Low
    const selectedPriorityItem = priorities[priorityIdx].name;
    it(`shoud select priority item '${selectedPriorityItem}'`, async () => {
      let allPriorities = wrapper.findAll(listPriorityItem);
      allPriorities.at(priorityIdx).trigger("click");
      await wrapper.vm.$nextTick();
      const priorityMessage = wrapper.find(".priority-message");
      expect(priorityMessage.text()).toMatch(selectedPriorityItem);
    });

    it("shoud click category button and render category dropdown list", async () => {
      const button = wrapper.find("#btn-category");
      button.trigger("click");
      await wrapper.vm.$nextTick();
      expect(wrapper.find("#list-category-dropdown").exists()).toBe(true);
    });

    const categoryIdx = 2; // Life changing
    const selectedCategoryItem = categories[categoryIdx].name;
    it(`shoud select priority item '${selectedCategoryItem}'`, async () => {
      let allCategories = wrapper.findAll(".list-category-item");
      allCategories.at(categoryIdx).trigger("click");
      await wrapper.vm.$nextTick();
      const categoryMessage = wrapper.find(".category-message");
      expect(categoryMessage.text()).toMatch(selectedCategoryItem);
    });

    const todoText = "My new todo";
    it(`should contain todo '${todoText}' text and save`, async () => {
      const newTodo = wrapper.find(todoInputId);
      newTodo.setValue(todoText);
      expect(newTodo.element.value).toBe(todoText);
      wrapper.find("form").trigger("submit.prevent");
      await wrapper.vm.$nextTick();
    });

    // Enough for this
  });
});
