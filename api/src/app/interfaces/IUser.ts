export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  document: string;
  role: Enumerator;
}

export interface IStudent {
  enrollment: string
}
