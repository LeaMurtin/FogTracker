export type ReactSetter<T> = React.Dispatch<React.SetStateAction<T>>;

export interface SettingListType {
  [key: string]: {
    displayName: string;
    mode: Array<'shuffle' | 'crawl'>;
  };
}
