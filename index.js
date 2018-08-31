/* global $$ webix showContextMenu showAdvancesPopup */
/* eslint-disable no-unused-vars, no-global-assign */

var blockNumber = 0

var form1 = [
  {
    type: 'header',
    template: function () {
      return "<div class='header-container'><div>OCR Helper</div><div> <input type='button' id='logButton' onclick='showHideLog()' value='Show Log' class='logButton'' /></div></div>"
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
        on: {
          'onItemClick': function (id, e, node) {
            var item = this.getItem(id)
            //   webix.message(id.column)
            var stage = item.stages.find(function (element) {
              return element.name === id.column
            })
            switch (id.column) {
              case 'name':
                showContextMenu(node)

                break
              case 'DocumentsDownloaded':
                standartLog(stage.stageStatus)
                showLog()
                break
              case 'FilesAttached':
                standartLog(stage.stageStatus)
                break
              case 'Integrity validated':
                standartLog(stage.stageStatus)
                if (stage.stageStatus.statusStr === 'Error') {
                  webix.message('Please, open Capture and fix some problems')
                }
                break
              case 'AdvancesChecked':
                //  standartLog(stage.stageStatus);
                showAdvancesPopup()
                break
              case 'CBC pulled':
                standartLog(stage.stageStatus)
                break
              case 'Completed':
                standartLog(stage.stageStatus)
                if (stage.stageStatus.statusStr === 'Error') {
                  webix.message('Please, try to export the statement again')
                }
                break
            }
          }
        }

      },
      { view: 'resizer' },
      {
        id: 'log',
        view: 'textarea',
        hidden: true,
        css: 'logSpace',
        value: 'Here is log',
        width: 300

      }] }]

webix.ui({
  view: 'form',
  margin: 0,
  id: 'my_form',
  css: 'form',
  elements: form1
})

webix.ajax().get('http://localhost:8080/status', function (t, d) {
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
        } else return '<a href="#" class="button button-circle"></a>'
      }
    }
  })

  $$('dtable').config.columns = staticColumns.concat(columns)

  $$('dtable').refreshColumns()
  $$('dtable').parse(result.oppos)
})

function showHideLog () {
  var logButton = document.getElementById('logButton')
  if (!$$('log').isVisible()) {
    logButton.value = 'Hide Log'
    $$('log').show()
  } else {
    logButton.value = 'Show Log'
    $$('log').hide()
  }
}

function showLog () {
  var logButton = document.getElementById('logButton')
  if (!$$('log').isVisible()) {
    logButton.value = 'Hide Log'
    $$('log').show()
  }
}

function standartLog (stage) {
  switch (stage.statusStr) {
    case 'CompletedStStatus':
      $$('log').setValue(stage.log)
      break
    case 'Error':
      $$('log').setValue(stage.log + '\n' + '\n' + '\n' + 'Errors:\n' + stage.errors)
      break
    case 'In Process':
      $$('log').setValue(stage.log)
  }
  // $$("Current Advances").hide();
}
