export const User = {
  username: String,
  password: String,
};

export interface StuffInfo {
  img: String;
  des: String;
  tags: Array<String>;
}

export interface UserCardInfo {
  id: Number;
  name: String;
  avatar: String;
  lastMsg: String;
  lastDate: String;
}
