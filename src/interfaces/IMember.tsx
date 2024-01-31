export interface IMember {
  id?: string | undefined;
  first_name?: string | undefined;
  last_name?: string | undefined;
  age?: string | undefined;
  gender?: string | undefined;
  avatar?: string | undefined;

  [key: string]: any;
}
