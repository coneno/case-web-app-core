import { ReactNode } from "react";
import { PageItem } from "../types/pagesConfig";
import { ExtensionConfig, componentBuilderFunc } from "./types";

var extension : ExtensionConfig = {}

export const installExtension = (cfg: ExtensionConfig) => {
    extension = cfg;
}

export const registerComponentBuilder = (fn: componentBuilderFunc):void => {
    extension.componentBuilder = fn;
}

export const componentBuilder = (item:PageItem, language: string) : ReactNode => {
    if(extension.componentBuilder) {
        return extension.componentBuilder(item, language);
    }
    return null;
}

