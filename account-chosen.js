/* global $$ webix */

/* eslint-disable no-unused-vars, no-global-assign */

function showAccountChosenPopup() {
  var accountNumber = ''

  webix.ajax().get('accounts.json', function (t, d) {
    console.log(d.json())
    $$('accounts-list').parse(d.json())
  })

  webix.ui({
    view: 'popup',
    position: 'center',
    id: 'accounts-popup',
    body: {
      id: 'advances',
      view: 'toolbar',
      hidden: true,
      elements: [{
        rows: [
          {
            view: 'list',
            height: 100,
            select: true,
            id: 'accounts-list',
            template: '#accountNumber#',
            on: {
              'onItemClick': function (id) {
                var item = this.getItem(id)
                accountNumber = item.accountNumber
              }
            }
          },
          {
            height: 5
          },
          {
            id: 'send',
            view: 'button',
            value: 'Send',
            on: {
              'onItemClick': function () {
                webix.message('Sent -> ' + accountNumber)
              }
            }
          }
        ]
      }]
    }

  }).show()
}
