import Vuetify from "vuetify";
import TodoItem from "@/components/todo-item";
import { mount, createLocalVue, shallowMount } from "@vue/test-utils";
import Vue from "vue";
import categories from "../../src/assets/categories.json";

Vue.use(Vuetify);
const localVue = createLocalVue();
let vuetify;
let wrapper;
describe("TodoItem", () => {
  describe("Selectors", () => {
    beforeAll(() => {
      vuetify = new Vuetify();
      wrapper = mount(TodoItem, {
        localVue,
        vuetify,
        propsData: {
          todo: {
            title: "My test todo",
            completed: false,
            catId: 2,
            priorityId: 3
          }
        }
      });
    });

    it("should render priority checkbox and not checked", () => {
      const checkbox = wrapper.find('input[type="checkbox"]');
      expect(checkbox.exists()).toBe(true);
      const completed = wrapper.props().todo.completed;
      expect(checkbox.attributes("aria-checked")).toMatch(completed.toString());
    });

    it(`should render todo Div and match todo text`, () => {
      const todoDiv = wrapper.find(".v-list-item__title");
      expect(todoDiv.exists()).toBe(true);
      const text = wrapper.props().todo.title;
      expect(todoDiv.text()).toMatch(text);
    });

    it(`should render hidden fieldset`, () => {
      const fieldset = wrapper.find("fieldset");
      expect(fieldset.exists()).toBe(true);
      expect(fieldset.attributes("aria-hidden")).toMatch("true");
    });

    it(`should render category Div and match todo text`, () => {
      const catDiv = wrapper.find(".v-list-item__subtitle");
      expect(catDiv.exists()).toBe(true);
      const catId = wrapper.props().todo.catId;
      const catName = TodoItem.methods.getCategoryName(catId);
      expect(catDiv.text()).toMatch(catName);
    });

    it("should render hidden edit button", () => {
      // Look for icon in button
      const editBtn = wrapper.find(".fa-edit");
      expect(editBtn.exists()).toBe(true);
      expect(editBtn.attributes("aria-hidden")).toMatch("true");
    });

    it("should render hidden delete button", () => {
      // Look for icon in button
      const deleteBtn = wrapper.find(".fa-trash-alt");
      expect(deleteBtn.exists()).toBe(true);
      expect(deleteBtn.attributes("aria-hidden")).toMatch("true");
    });
  });

  describe("Events", () => {
    const todo = { todo: { completed: true } };
    beforeEach(() => {
      const DummyComp = localVue.component("DummyComp", {
        components: { TodoItem },
        props: todo,
        template: `
        <div data-app>
          <TodoItem :todo="todo"/>
        </div>
      `
      });

      vuetify = new Vuetify();
      wrapper = mount(DummyComp, {
        localVue,
        vuetify,
        attachToDocument: true,
        propsData: {
          todo: {
            title: "My test todo",
            completed: false,
            catId: 2,
            priorityId: 3
          }
        }
      });
    });

    it(`should show input field to edit todo on double clicking on todo label`, async () => {
      // console.log("props", wrapper.props());
      const todoDiv = wrapper.find(".v-list-item__title");
      expect(todoDiv.exists()).toBe(true);
      const editInputField = wrapper.find(".input-edit-todo");
      expect(editInputField.attributes("style")).toMatch("display: none;");
      todoDiv.trigger("dblclick");
      await wrapper.vm.$nextTick();
      expect(editInputField.attributes("style")).toMatch("");
    });

    it(`should show input field to edit todo on clicking edit button`, async () => {
      const todoDiv = wrapper.find(".fa-edit");
      expect(todoDiv.exists()).toBe(true);
      const editInputField = wrapper.find(".input-edit-todo");
      expect(editInputField.attributes("style")).toMatch("display: none;");
      todoDiv.trigger("click");
      await wrapper.vm.$nextTick();
      expect(editInputField.attributes("style")).toMatch("");
    });
  });

  // Can add more but we get the idea
});
