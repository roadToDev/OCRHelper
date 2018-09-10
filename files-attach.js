/* global $$ webix */

/* eslint-disable no-unused-vars, no-global-assign */

function showFilesAttached () {
  webix.ajax().get('http://localhost:8080/files', function (t, d) {
    console.log(d.json().files)
    $$('files-attached-list').parse(d.json().files.map(function (item, index) {
      return { id: index, title: item }
    }))
  })

  webix.ui({
    view: 'popup',
    position: 'center',
    id: 'files-attached',
    body: {
      id: 'files-toolbar',
      view: 'toolbar',
      width: 1000,
      height: 600,
      hidden: true,
      elements: [{
        rows: [{
          type: 'header',
          template: function () {
            return "<div class='header-container'><div> <input type='button' id='send-files-attached' onclick='sendFilesAttached()' value='Send Files Attached' class='logButton'' /></div><div>Files Attached</div></div>"
          }
        },
        {
          cols: [{
            view: 'list',
            width: 500,
            type: {
              markCheckbox: function (obj) {
                return '<span class="check webix_icon fa-' + (obj.markCheckbox ? 'check-' : '') + 'square-o"></span>'
              }
            },
            template: '{common.markCheckbox()} #title#',
            id: 'files-attached-list',
            // template: '#accountNumber#',
            on: {
              'onItemClick': function (id) {
              }
            },
            onClick: {
              'check': function (e, id) {
                var item = this.getItem(id)
                item.markCheckbox = item.markCheckbox ? 0 : 1
                this.updateItem(id, item)
              }
            }
          },
          { view: 'resizer' },
          {
            id: 'log2',
            view: 'textarea',
            css: 'logSpace',
            value: 'Here is log'
          }
          ]
        }]
      }
      ]
    }
  }).show()
}

function attachLog (stage) {
  switch (stage.statusStr) {
    case 'CompletedStStatus':
      $$('log2').setValue(stage.log)
      break
    case 'ErrorStStatus':
      $$('log2').setValue(stage.log + '\n' + '\n' + '\n' + 'Errors:\n' + stage.errors)
      break
    case 'In Process':
      $$('log2').setValue(stage.log)
  }
}
