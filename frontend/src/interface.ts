export const User = {
  username: String,
  password: String,
};

export interface StuffInfo {
  id: number;
  img: string;
  des: string;
  tags: Array<string>;
}

export interface UserCardInfo {
  id: Number;
  name: string;
  avatar: string;
  lastMsg: string;
  lastDate: string;
}
