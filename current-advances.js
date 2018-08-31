

function showAdvancesPopup() {
    webix.ajax().get('adv.json', function (t, d) {
        $$('advTable').parse(d.json().blocks[blockNumber]);
    })

    function getAdvancesData (elem) {
        $$('advTable').clearAll();
        webix.ajax().get('adv.json', function (t, d) {

            $$('advTable').parse(d.json().blocks[elem]);
        })
    }

    webix.ui({
        view:"popup",
        position: "center",
        id:"advancespopup",
        body:{
            id: "advances",
            view: "toolbar",
            hidden: true,
            height: 250,
            elements: [
                {
                    view: "datatable",
                    scroll: true,
                    width: 800,
                    id: "advTable",
                    resizeColumn: true,
                    columns: [
                        {id: "date", header: "Date"},
                        {id: "descr", header: "Description", fillspace: true},
                        {id: "amount", header: "Amount"},
                        {id: "tags", header: "Tags", width: 180}
                    ],
                    on: {
                        'onItemClick': function (id, e, node) {

                            var obj = this.getItem(id);

                            $$("AdvanceEditor").setValue(obj.descr)
                        }}
                },
                {
                    width: 400,
                    rows: [
                        {
                            cols: [
                                {
                                    id: "next-block",
                                    view: "button",
                                    value: "Next Block",
                                    on: {
                                        "onItemClick": function () {
                                            getAdvancesData(blockNumber + 1)
                                            blockNumber += 1
                                        }
                                    }
                                },
                                {
                                    id: "ignore-block",
                                    view: "button",
                                    value: "Ignore Block",
                                    on: {
                                        "onItemClick": function () {
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            cols: [
                                {
                                    id: "prev-block",
                                    view: "button",
                                    value: "Previous Block",
                                    on: {
                                        "onItemClick": function () {
                                            getAdvancesData(blockNumber - 1)
                                            blockNumber -= 1
                                        }
                                    }
                                },
                                {
                                    id: "remove-block",
                                    view: "button",
                                    value: "Remove Block",
                                    on: {
                                        "onItemClick": function () {
                                            removeBlock(blockNumber)
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            id: "AdvanceEditor",
                            view: "textarea",
                            placeholder: "Write down new MCI"
                        },
                        {
                            id: "dropDown",
                            view: "select",
                            options: [
                                "Placeholder #1",
                                "Placeholder #2",
                                "Placeholder #1",
                                "Placeholder #2",
                                "Placeholder #1",
                                "Placeholder #2",
                                "Placeholder #1",
                                "Placeholder #2",
                                "Placeholder #1",
                                "Placeholder #2",
                                "Placeholder #3"
                            ]
                        },
                        {
                            id: "fixed-block",
                            view: "button",
                            value: "Mark As Fixed Block",
                            on: {
                                "onItemClick": function () {
                                }
                            }
                        }
                    ]
                }
            ]
        }
    }).show();
}