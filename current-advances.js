/* global $$ webix blockNumber removeBlock */
/* eslint-disable no-unused-vars, no-global-assign */
function showAdvancesPopup () {
  var block = ''
  webix.ajax().get('adv.json', function (t, d) {
    $$('advTable').parse(d.json().blocks[blockNumber])
    block = d.json()
   // console.log(block)
  })

  function getAdvancesData (elem) {
    $$('advTable').clearAll()
    webix.ajax().get('adv.json', function (t, d) {
      $$('advTable').parse(block.blocks[elem])
    })
  }

  function changeAdvancesData (description) {
    $$('advTable').clearAll()
    webix.ajax().get('adv.json', function () {
      block.blocks[blockNumber].forEach(function (item, i, arr) {
        console.log(arr[i].descr)
        arr[i].descr = description
      })
      $$('advTable').parse(block.blocks[blockNumber])
    })
  }

  webix.ui({
    view: 'popup',
    position: 'center',
    id: 'advancespopup',
    body: {
      id: 'advances',
      view: 'toolbar',
      hidden: true,
      height: 500,
      elements: [
        {
          rows: [
            {
              cols: [
                {
                  id: 'prev-block',
                  view: 'button',
                  value: 'Previous Block',
                  on: {
                    'onItemClick': function () {
                      getAdvancesData(blockNumber - 1)
                      blockNumber -= 1
                    }
                  }
                },
                {
                  id: 'next-block',
                  view: 'button',
                  value: 'Next Block',
                  on: {
                    'onItemClick': function () {
                      getAdvancesData(blockNumber + 1)
                      blockNumber += 1
                    }
                  }
                },
                {
                  id: 'ignore-block',
                  view: 'button',
                  value: 'Ignore Block',
                  on: {
                    'onItemClick': function () {
                    }
                  }
                },
                {
                  id: 'remove-block',
                  view: 'button',
                  value: 'Remove Block',
                  on: {
                    'onItemClick': function () {
                      removeBlock(blockNumber)
                    }
                  }
                },
                {
                  id: 'fixed-block',
                  view: 'button',
                  value: 'Mark As Fixed Block',
                  on: {
                    'onItemClick': function () {
                      var description = $$('AdvanceEditor').getValue(0)
                      console.log(description)
                      changeAdvancesData(description)
                    }
                  }
                }
              ]
            },
            { height: 7 },
            {
              view: 'datatable',
              scroll: true,
              width: 800,
              id: 'advTable',
              resizeColumn: true,
              columns: [
                { id: 'date', header: 'Date' },
                { id: 'descr', header: 'Description', fillspace: true },
                { id: 'amount', header: 'Amount' },
                { id: 'tags', header: 'Tags', width: 180 }
              ],
              on: {
                'onItemClick': function (id, e, node) {
                  var obj = this.getItem(id)

                  $$('AdvanceEditor').setValue(obj.descr)
                }
              }
            },
            {
              cols: [
                {
                  id: 'AdvanceEditor',
                  view: 'textarea',
                  placeholder: 'Write down new MCI'
                },
                {
                  id: 'dropDown',
                  width: '200',
                  view: 'select',
                  options: [
                    'Placeholder #1',
                    'Placeholder #2',
                    'Placeholder #1',
                    'Placeholder #2',
                    'Placeholder #1',
                    'Placeholder #2',
                    'Placeholder #1',
                    'Placeholder #2',
                    'Placeholder #1',
                    'Placeholder #2',
                    'Placeholder #3'
                  ]

                }
              ]
            }
          ]
        }
      ]

    }
  }).show()
}
