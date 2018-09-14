/* global $$ webix showTable */

/* eslint-disable no-unused-vars, no-global-assign */

var jsonStr = []
var accountId = ''

function showFilesAttached (id) {
  accountId = id
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
                if (item.markCheckbox === 0) {
                  var index = jsonStr.indexOf(item.title)
                  if (index > -1) {
                    jsonStr.splice(index, 1)
                  }
                } else if (item.markCheckbox === 1) {
                  jsonStr.push(item.title)
                }
              }
            }
          },
          { view: 'resizer' },
          {
            id: 'log',
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

function sendFilesAttached () {
  window.fetch('http://localhost:8080/files/' + accountId, {
    method: 'POST',
    body: JSON.stringify({
      'files': [
        jsonStr[0],
        jsonStr[1],
        jsonStr[2]
      ]
    })
  }).then(function (response) {
    if (response.status !== 200) {
      window.alert('not 200' + 'status is: ' + response.status + ' ' + response.statusText)
    }
    console.log(response.status)
    console.log(response.statusText)
  }).catch(window.alert).then(function () {
    showTable()
  })
  $$('log').setValue('Sent Files: \n' + jsonStr)
}
