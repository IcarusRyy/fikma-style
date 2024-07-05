/// <reference path="@figma/plugin-typings/plugin-api.d.ts" />

declare global {
  interface Window {
    fikma_figma: PluginAPI
  }
}

export {};
