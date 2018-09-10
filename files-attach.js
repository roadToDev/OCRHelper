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
      hidden: true,
      elements: [{
        view: 'list',
        width: 600,
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
      }]
    }
  }).show()
}
