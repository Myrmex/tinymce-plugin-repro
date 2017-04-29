# Tinyrepro

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0.

## Overview

This is a simple Angular CLI app to repro an issue with importing external plugins into TinyMCE.

I have developed my own plugin, named format-display, for the specific purpose of showing the color of the text under the cursor, mapped to some underlying meaning (e.g. red means something, green something else, etc.). This plugin simply reads the color under the cursor and displays it with its mapping, if any. It gets these mappings from a custom property of the editor, set when initializing it.

The mapped colors are found under the `Formats` menu in the editor. You can type something, then pick one of the mapped colors, type something else, and move the cursor around. When moving the cursor around, the plugin should display the color and its mapping in the status bar, next to the element path. This works fine in the plugin build environment.

The core component is under `src/app/shared/components/tiny`: this wraps a TinyMCE editor and initializes it. The app page just contains this editor, with no other functionality: it should just load the plugin.

This being a custom plugin (not packed in the TinyMCE package), I must add it to the editor using `external_plugins` rather than `plugins` when initializing it, and copy the dist folder (`dist/format-display`) under `assets/plugins` (or elsewhere, always under `assets`). As for any 3rd party non-NPM like library, I then add the plugin source code in `angular-cli.json` under `scripts`.

**The issue**: the plugin manager seems to correctly register my external plugin. I can see it in `tinymce.pluginmanager` during debug. Yet, the editor does not seem to load my registered plugin: no part of its code ever gets called.

Also, inspecting my sources during debug I find two instances of my plugin.js:

- webpack:///./src/assets/plugins/format-display/plugin.js
- localhost:4200/assets/plugins/format-display/plugin.js

I assume the first comes from including the plugin code in `angular-cli.json` under `scripts`, and the second from the `external_plugins` property when the editor is initialized. Yet, if I remove the reference from angular-cli nothing seems to change, and the plugin still does not get loaded.

### TinyMCE

Here are the steps I followed to install TinyMCE in Angular CLI:

- <https://www.tinymce.com/docs/integrations/angular2/>
- <https://www.ephox.com/blog/angular-2-and-tinymce/?_ga=1.117951882.2068174515.1491150296>

1.`npm install --save tinymce`
2.add the required modules to `angular-cli.json` property `scripts`.
3.add `declare var tinymce: any;` to `typings.d.ts`.
4.copy the `skins` directory from TinyMCE to the `src/assets` directory.

See `TinyComponent` for more.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
