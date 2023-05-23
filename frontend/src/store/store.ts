import { reactive } from "vue";

export const store = reactive({
  navTitle: "",
  userInfo: {
    id: 0,
    name: "",
    avatar: "",
  },
});
