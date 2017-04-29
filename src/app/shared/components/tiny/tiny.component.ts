import { Component, AfterViewInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { HiliteProfile } from '../../models/common';

// https://www.tinymce.com/docs/integrations/angular2/

@Component({
  selector: 'app-tiny',
  templateUrl: './tiny.component.html',
  styleUrls: ['./tiny.component.css']
})
export class TinyComponent implements AfterViewInit, OnDestroy {
  private _editor;
  private _html: string;
  private _initializing: boolean;

  public busy: boolean;

  @Input() elementId: String;
  @Input()
  public get html(): string {
    return this._html;
  }
  public set html(value: string) {
    this._html = value;
    if (this._editor) {
      this._editor.setContent(value);
    }
  }
  @Output() onEditorKeyup: EventEmitter<string>;

  constructor() {
      this.onEditorKeyup = new EventEmitter<string>();
  }

  private initEditor(hilites: HiliteProfile[]) {
    // prepare formats
    const styleFormats = [];
    const colorMap = {};
    for (const h of hilites) {
      styleFormats.push({
        title: h.name + (h.shortcutKey ? ` (${h.shortcutKey})` : ''),
        inline: 'span',
        styles: {
          color: '#' + h.color
        }
      });
      colorMap[h.color] = h;
    }

    const that = this;

    // initialize TinyMCE
    tinymce.init({
      selector: '#' + this.elementId,
      plugins: ['fullscreen'],
      external_plugins: {
        'format-display': '/assets/plugins/format-display/plugin.js'
      },
      // pass colors-to-hilites mapping to the plugin
      vsm_color_map: colorMap,
      menu: {
        edit: { title: 'Edit', items: 'undo redo | cut copy pastetext | selectall' },
        view: { title: 'View', items: 'visualaid' },
        format: { title: 'Format', items: 'bold italic underline | formats | removeformat' },
      },
      schema: 'html5',
      // https://www.tinymce.com/docs/configure/content-formatting/#style_formats
      style_formats: styleFormats,
      toolbar: 'bold italic underline | undo redo',
      skin_url: 'assets/skins/lightgray',
      setup: editor => {
        that._editor = editor;

        editor.on('keyup', () => {
          const content = editor.getContent();
          if (content !== that._html) {
            that._html = content;
            that.onEditorKeyup.emit(content);
          }
        });
        editor.on('change', () => {
          const content = editor.getContent();
          if (content !== that._html) {
            that._html = content;
            that.onEditorKeyup.emit(content);
          }
        });

        // http://archive.tinymce.com/wiki.php/API3:method.tinymce.Editor.addShortcut
        for (const h of hilites) {
          if (h.shortcutKey) {
            editor.addShortcut(h.shortcutKey, h.name, () => {
              editor.execCommand('ForeColor', false, '#' + h.color);
            });
          }
        }
      },
    });
  }

  private initComponent() {
    this.busy = true;
    this._initializing = true;

    // in real world, here we call a service to get hilites
    const hilites: HiliteProfile[] = [
      {
        name: 'alpha',
        color: 'f02020',
        tag: 'tag-a'
      },
      {
        name: 'beta',
        color: '20f020',
        tag: 'tag-b'
      },
      {
        name: 'gamma',
        color: '2020f0',
        tag: 'tag-g'
      }
    ];
    this.initEditor(hilites);
  }

  ngAfterViewInit() {
    this.initComponent();
  }

  ngOnDestroy() {
    tinymce.remove(this._editor);
  }
}
