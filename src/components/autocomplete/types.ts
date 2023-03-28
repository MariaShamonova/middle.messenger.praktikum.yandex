export interface AutocompletePropsType {
  id: string;
  getData: (value: string) => unknown;
}

export enum AutocompleteBlockType {
  'fit' = 'fit',
  'fill' = 'fill',
}
