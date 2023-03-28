export interface ComponentType {

}

export type Indexed<T = unknown> = {
  [key in string]: T;
};
