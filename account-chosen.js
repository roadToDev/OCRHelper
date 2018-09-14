/* global $$ webix showTable sendAccount */

/* eslint-disable no-unused-vars, no-global-assign */
var accountToSend = ''

var accountId = ''

// webix.ui()
function showAccountChosenPopup (accId) {
  accountId = accId
  webix.ajax().get('http://localhost:8080/accounts/' + accId, function (t, d) {
    // console.log(d.json().accounts)
    $$('accounts-list').parse(d.json().accounts)
  })

  webix.ui({
    view: 'popup',
    position: 'center',
    id: 'accounts-popup',
    body: {
      id: 'advances',
      view: 'toolbar',
      width: 1000,
      height: 600,
      hidden: true,
      elements: [{
        rows: [ {

          type: 'header',
          template: function () {
            return "<div class='header-container'><div> <input type='button' id='send-account' onclick='sendAccount(accountToSend)' value='Send Account Number' class='logButton'' /></div><div>Accounts</div></div>"
          }

        }, { cols: [
          {
            view: 'list',
            width: 300,
            select: true,
            id: 'accounts-list',
            // template: '#accountNumber#',
            on: {
              'onItemClick': function (id) {
                var item = this.getItem(id)
                accountToSend = item.value
              }
            }
          },
          {
            id: 'log',
            view: 'textarea',
            css: 'logSpace',
            value: 'Here is log'
          }]
        }
        ]
      }]
    }

  }).show()
}

function sendAccount (account) {
  window.fetch('http://localhost:8080/accounts', {
    method: 'POST',
    body: JSON.stringify({
      'oppoId': accountId,
      'accountId': account
    })
  }).then(function (response) {
    if (response.status !== 200) {
      window.alert('not 200' + 'status is: ' + response.status + ' ' + response.statusText)
    }
    console.log(response.statusText)
  }).catch(window.alert).then(function () {
    showTable()
  })
  $$('log').setValue('Sent -> Account Number: ' + account)
}
