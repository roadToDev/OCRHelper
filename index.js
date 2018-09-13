/* global $$ webix showContextMenu showAdvancesPopup showAccountChosenPopup accountToSend sendAccount showFilesAttached attachLog */
/* eslint-disable no-unused-vars, no-global-assign */

var blockNumber = 0
var opportunityId = ''

var form1 = [
  {
    type: 'header',
    template: function () {
      return "<div class='header-container'><div>OCR Helper &nbsp&nbsp&nbsp&nbsp&nbsp;<input type='button' id='reset-opportunity' onclick='resetOpportunity()' value='Reset Opportunity' class='logButton'' /></div></div>"
    }
  },
  {
    margin: 5,
    cols: [
      {
        view: 'datatable',
        scroll: false,
        id: 'dtable',
        css: 'my-dtable',
        dynamic: true,
        columns: [],
        on: {
          'onItemClick': function (id, e, node) {
            var item = this.getItem(id)
            var stage = item.stages.find(function (element) {
              return element.name === id.column
            })
            switch (id.column) {
              case 'name':
                opportunityId = item.id
                break
              case 'DocumentsDownloaded':
                // standartLog(stage.stageStatus)
                // showLog()
                showLogPopUp(stage.stageStatus)
                break
              case 'FilesAttached':
                showFilesAttached(item.id)
                attachLog(stage.stageStatus)

                break
              case 'IntegrityValidated':
                showLogPopUp(stage.stageStatus)
                // if (stage.stageStatus.statusStr === 'Error') {
                //   webix.message('Please, open Capture and fix some problems')
                // }
                break
              case 'AdvancesReviewed':
                //  standartLog(stage.stageStatus);
                showAdvancesPopup()
                break
              case 'SubmissionValidated':
                showLogPopUp(stage.stageStatus)
                break
              case 'ExportedToSF':
                showLogPopUp(stage.stageStatus)
                break
              case 'AccountChosen':
                showAccountChosenPopup(item.id)
                attachLog(stage.stageStatus)
                break
            }
          }
        }

      }
    ]
  }
]

webix.ui({
  view: 'form',
  margin: 0,
  id: 'my_form',
  css: 'form',
  elements: form1
})

function showTable () {
  webix.ajax().get('localhost:8080/status', function (t, d) {
    var result = d.json()
    var stagesJson = result.stages
    var opposJson = result.oppos

    var staticColumns = [
      {
        id: 'id',
        header: '#',
        adjust: 'header'
      },
      {
        id: 'name',
        header: 'Opportunity',
        adjust: 'header',
        fillspace: true
      }
    ]

    var columns = stagesJson.map(function (stage) {
      return {
        id: stage,
        header: stage,
        css: { 'text-align': 'center' },
        adjust: 'header',
        template: function (row) {
          var innerStage = row.stages.find(function (item) {
            return item.name === stage
          })

          innerStage = innerStage && innerStage.stageStatus.statusStr

          if (innerStage === 'CompletedStStatus') {
            return '<a href="#" class="button button-circle button-action"></a>'
          } else if (innerStage === 'ErrorStStatus') {
            return '<a href="#" class="button button-circle button-caution"></a>'
          } else return '<a href="#" class="button button-circle"></a>'
        }
      }
    })

    $$('dtable').config.columns = staticColumns.concat(columns)

    $$('dtable').refreshColumns()
    $$('dtable').clearAll()
    $$('dtable').parse(result.oppos)
  })
}

showTable()

// function showHideLog() {
//   var logButton = document.getElementById('logButton')
//   if (!$$('log').isVisible()) {
//     logButton.value = 'Hide Log'
//     $$('log').show()
//   } else {
//     logButton.value = 'Show Log'
//     $$('log').hide()
//   }
// }

function showLogPopUp (stage) {
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
            return "<div class='header-container'><div><div>Log</div></div>"
          }
        }, {
          id: 'logg',
          view: 'textarea',
          css: 'logSpace',
          value: 'Here is log'
        }
        ]
      }
      ]
    }
  }).show()
  switch (stage.statusStr) {
    case 'CompletedStStatus':
      $$('logg').setValue(stage.log)
      break
    case 'ErrorStStatus':
      $$('logg').setValue(stage.log + '\n' + '\n' + '\n' + 'Errors:\n' + stage.errors)
      break
    case 'In Process':
      $$('logg').setValue(stage.log)
  }
}

function attachLog (stage) {
  switch (stage.statusStr) {
    case 'CompletedStStatus':
      $$('log').setValue(stage.log)
      break
    case 'ErrorStStatus':
      $$('log').setValue(stage.log + '\n' + '\n' + '\n' + 'Errors:\n' + stage.errors)
      break
    case 'In Process':
      $$('log').setValue(stage.log)
  }
}

function resetOpportunity () {
  if (opportunityId !== '') {
    window.fetch('http://localhost:8080/reset/' + opportunityId, {
      method: 'POST',
      body: JSON.stringify({
        'id': opportunityId
      })
    }).then(function (response) {
      if (response.status !== 200) {
        window.alert('not 200')
      }
      console.log(response.status)
      console.log(response.statusText)
    }).catch(window.alert).then(function () {
      showTable()
    })
  } else webix.message('Need to choose Opportunity')
}
