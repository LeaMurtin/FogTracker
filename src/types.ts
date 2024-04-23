export type ReactSetter<T> = React.Dispatch<React.SetStateAction<T>>;

export interface SettingListType {
  [key: string]: {
    displayName: string;
    mode: Array<'shuffle' | 'crawl'>;
  };
}

export interface NodeArea {
  name: string;
  connections: { [gate: string]: NodeArea };
  prev: NodeArea | null;
  next: NodeArea | null;
}
