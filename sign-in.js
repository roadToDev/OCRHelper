/* global $$ webix showTable */

/* eslint-disable no-unused-vars, no-global-assign */

var token = ''

function signIn () {
  webix.ajax().get('accounts.json', function (t, d) {
    // console.log(d.json().accounts)
    $$('sign-in-list').parse(d.json().accounts)
  })

  webix.ui({
    view: 'popup',
    position: 'center',
    body: {
      view: 'toolbar',
      width: 100,
      height: 220,
      hidden: true,
      elements: [{
        rows: [{
          type: 'header',
          template: function () {
            return "<div class='header-container'><div><div>Accounts</div></div>"
          }
        }, {
          id: 'sign-in-list',
          view: 'list',
          select: true,
          template: '#name#',
          on: {
            'onItemClick': function (id) {
              var item = this.getItem(id)
              token = item.token
              console.log(token)
            }
          }
        },
        {
          height: 5
        },
        {
          id: 'send-account',
          view: 'button',
          value: 'Sign In',
          on: {
            'onItemClick': function () {
              sendUserAccount(token)
            }
          }
        }
        ]
      }
      ]
    }
  }).show()
}

function sendUserAccount (token) {
  // window.fetch('http://localhost:8080/user/', {
  //   method: 'POST',
  //   body: JSON.stringify({
  //     'token': token
  //   })
  // }).then(function (response) {
  //   if (response.status !== 200) {
  //     window.alert('not 200' + 'status is: ' + response.status + ' ' + response.statusText)
  //   }
  //   console.log(response.status)
  //   console.log(response.statusText)
  // }).catch(window.alert).then(function () {
  //   showTable()
  // })
}
