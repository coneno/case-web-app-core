

import {ReactNode} from 'react';
import { PageItem } from '../types/pagesConfig';

export type componentBuilderFunc = (item : PageItem, language: string)=> ReactNode

export interface ExtensionConfig {
    componentBuilder?: componentBuilderFunc;
}

export interface ExtensionComponentConfig {
    type: 'extension'
}
  