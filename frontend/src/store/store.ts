import { reactive } from "vue";

export const store = reactive({
  navTitle: "",
  userInfo: {
    id: 0,
    name: "",
    avatar: "",
  },
  stuffInfo: {
    id: 0,
    des: "",
    tags: [],
    img: [],
  },
});
