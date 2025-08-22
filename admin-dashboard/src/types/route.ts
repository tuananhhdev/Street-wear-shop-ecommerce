import type { ReactNode } from 'react';

export interface IAppRoute {
  path?: string;
  element?: ReactNode;
  index?: boolean;
  title?: string;
  children?: IAppRoute[];
}
