/* global $$ webix showTable sendAccount */

/* eslint-disable no-unused-vars, no-global-assign */
var accountToSend = ''

// webix.ui()
function showAccountChosenPopup (accId) {
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
      hidden: true,
      elements: [{
        rows: [
          {
            view: 'list',
            height: 100,
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
            height: 5
          },
          {
            id: 'send',
            view: 'button',
            value: 'Send',
            on: {
              'onItemClick': function () {
                sendAccount(accountToSend)
                $$('accounts-popup').hide()
                //  webix.message('Sent -> ' + accountToSend)
              }
            }
          }
        ]
      }]
    }

  }).show()

  function sendAccount (account) {
    window.fetch('http://localhost:8080/accounts', {
      method: 'POST',
      //  mode: 'no-cors',
      body: JSON.stringify({
        'oppoId': accId,
        'accountId': account
      })
    }).then(function (response) {
      if (response.status !== 200) {
        window.alert('not 200')
      }
      console.log(response.statusText)
    }).catch(window.alert).then(function () {
      showTable()
    })
  }
}
