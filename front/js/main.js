function getUrl(link) {
    var url = location.protocol + "//" + document.domain + "/" 
          + location.pathname.split('/')[1] + "/" + link;
    location.href = url;
}

// JS FOR SETTINGS PAGE START
function clickLeftMenu(element){
    var left_menu = document.getElementById("left_menu").children;
    var i;

    // for (i = 0; i < left_menu.length; i++) {
        // left_menu[i].className = "item button light_gray_15_font";
    // }

    // element.className = "item button active";

    displayRightBlock(element.id);
}

function displayRightBlock(id){
    var deals_block = document.getElementById("center_block").children;
    var i;

    for (i = 1; i < deals_block.length; i++) {
        deals_block[i].style.display = "none";
    }

    if (id == "deals_item"){
        document.getElementById("deals_block").style.display = "block";
    } else if (id == "deals_map_item"){
        document.getElementById("deals_map_block").style.display = "block";
    } else if (id == "info_item"){
        document.getElementById("user_info_block").style.display = "block";
    } else if (id == "create_deals_item"){
        document.getElementById("create_deal_block").style.display = "block";
    } else if (id == "deal_details_block "){
        document.getElementById("create_deal_block").style.display = "block";
    }
}

function displayDealDetailsBlock() {
    window.location.replace("/settings_form.html");
}

function clickUserInfoTab(element){
    var user_info_tabs = document.getElementById("user_info_tabs").children;
    var i;

    for (i = 0; i < user_info_tabs.length; i++) {

        user_info_tabs[i].className = "item button top_tab_gray_font";
    }

    element.className = "item button active top_tab_font_act";

    displayUserInfoTabBlock(element.id);
}

function displayUserInfoTabBlock(id){
    var deals_block = document.getElementById("user_info_content_block").children;
    var i;

    for (i = 0; i < deals_block.length; i++) {
        deals_block[i].style.display = "none";
    }

    if (id == "deals_history_item"){
        document.getElementById("deals_history_block").style.display = "block";
    } else if (id == "card_item"){
        document.getElementById("card_block").style.display = "block";
    } else if (id == "settings_item"){
        document.getElementById("settings_block").style.display = "block";
    }
}

function openCompletionDeal() {
    closeAlert();

    document.getElementById("body_settings").style.overflow = "hidden";
    document.getElementById("completion_deal_alert").style.display = "block";
}

function openCreateDeal() {
    closeAlert();

    document.getElementById("body_settings").style.overflow = "hidden";
    document.getElementById("create_deal_alert").style.display = "block";
}

function openAddCard() {
    closeAlert();

    document.getElementById("body_settings").style.overflow = "hidden";
    document.getElementById("add_card_alert").style.display = "block";
}

function closeAlert() {
    document.getElementById("body_settings").style.overflow = "auto";

    var alert_containers = document.getElementsByClassName("alert_container");
    var i;

    for (i = 0; i < alert_containers.length; i++) {
        alert_containers[i].style.display = "none";
    }
}

// Load json
function loadJSON(callback) {   
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', './src/data/dealsBlockJSON.json', true);
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
}

function loadHistoryJSON(callback) {   
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', './src/data/dealsHistoryJSON.json', true);
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
}

// Include html on page
$('#header').load("./templates/header.html")
$('#footer').load("./templates/footer.html")

// Create table with custom cell

$(document).ready( function () {
    // For left menu
    new ResizeSensor(jQuery('#left_menu'), function(){ 
    });

    function init(type) {
        if(type === "deals") {
            loadJSON(function(response) {

            // Parse JSON string into object
            var dealsBlockJSON = JSON.parse(response);
            // console.log("dealsBlockJSON ", dealsBlockJSON)

                // Initial table
                $('#dealsTable').dataTable( {
                    data: dealsBlockJSON,
                    className: "table-cell-edit",
                    language: {
                        "lengthMenu":     "Show _MENU_ entries",
                        paginate: {
                          next: '&#x3e;', // or '→'
                          previous: '&#x3c;' // or '←' 
                        },
                        "info": " _START_ - _END_ of _TOTAL_",
                    },
                    columns: [
                        {   
                            title: "Seller", // Custom cell
                            data: null,
                            className: "center, content wd30p",
                            render: function ( data, type, row ) {
                                return `
                                    <div class="item seller gray_12_font">
                                        ` + data.seller + `
                                    </div>
                                `
                        }},
                        {   
                            title: "Coin",
                            data: null,
                            className: "center, content wd5p",
                            render: function ( data, type, row ) {
                                return `
                                <div class="item coint gray_12_font">
                                ` + data.coin + `
                                </div>
                                `
                        }},
                        {   
                            title: "Amount",
                            data: null,
                            className: "center, content wd5p",
                            render: function ( data, type, row ) {
                                return `
                                    <div class="item amount gray_12_font">
                                    ` + data.amount + `
                                    </div>
                                `
                        }},
                        {   
                            title: "Price",
                            data: null,
                            className: "center, content wd10p",
                            render: function ( data, type, row ) {
                                return `
                                    <div class="item price gray_12_font">
                                        <b>
                                        ` + data.price + `
                                        </b>
                                    </div>
                                `
                        }},
                        {   
                            title: "Payment method",
                            data: null,
                            className: "center, content wd35p",
                            render: function ( data, type, row ) {
                                return `
                                    <div class="item payment_method gray_12_font">
                                        <b>` + data.payment_method.transfer + `</b> ` + data.payment_method.bank + `
                                    </div>
                                `
                        }},
                        {   
                            title: "Location",
                            data: null,
                            className: "center, content wd5p",
                            render: function ( data, type, row ) {
                                return `
                                    <div class="item location gray_12_font">
                                    ` + data.location + `
                                    </div>
                                `
                        }},
                        {   
                            title: "Guarantee",
                            data: null,
                            className: "center, content wd5p",
                            render: function ( data, type, row ) {
                                if(data.guarantee) {
                                    return `
                                        <div class="item guarantee">
                                            <div class="h_list">
                                                <div class="image"></div>
                                                <div class="text green_12_font">On</div>
                                            </div>
                                        </div>
                                    `
                                } else {
                                    return `
                                        <div class="item guarantee gray_12_font">
                                            Off
                                        </div>
                                    `
                                }
                                
                        }},
                        {   
                            title: null ,
                            data: null,
                            className: "center, content wd5p",
                            render: function ( data, type, row ) {
                                if(data.guarantee) {
                                    return `
                                        <div class="item button">
                                        <button class="button black_bold_12_font" onclick="location.href='/Mulla/settings_forms.html'">
                                            BUY
                                        </button>
                                    </div>`
                                } else {
                                    return `
                                        <div class="item button">
                                        <button class="button black_bold_12_font" onclick="location.href='/Mulla/settings_forms.html'">
                                            SELL
                                        </button>
                                    </div>`
                                }
                                
                            }
                        }
                    ]
                });
            });
        } else {
            loadHistoryJSON(function(response) {
                // Parse JSON string into object
                var dealsHistoryJSON = JSON.parse(response);
                // console.log("dealsHistoryJSON ", dealsHistoryJSON)
    
                    // Initial table
                    $('#dealsHistoryTable').dataTable( {
                        data: dealsHistoryJSON,
                        className: "table-cell-edit",
                        language: {
                            paginate: {
                              next: '&#x3e;', // or '→'
                              previous: '&#x3c;' // or '←' 
                            },
                            "info": " _START_ - _END_ of _TOTAL_",
                        },
                        columns: [
                            {   
                                title: "Amount",
                                data: null,
                                render: function ( data, type, row ) {
                                    return `
                                        <div class="item h_list amount">
                                            <div class="item icon_coin"></div>
                                            <div class="item gray_12_font text">
                                                ` + data.amount + `
                                            </div>
                                            <div class="item icon_swap"></div>
                                        </div>
                                    `
                            }},
                            {   
                                title: "Price",
                                data: null,
                                render: function ( data, type, row ) {
                                    return `<div class="item h_list price_history">
                                        <img src="` + data.bank_image + `" class="item icon_sber"/>
                                        <div class="item gray_12_font text">
                                            <b>` + data.price.price + `</b><br/> ` + data.price.bank + `
                                        </div>
                                    </div>`
                            }},
                            {   
                                title: "Aplication number",
                                data: null,
                                render: function ( data, type, row ) {
                                    return `
                                        <div class="item h_list application_number gray_12_font">
                                            <b>Application ` + data.aplication_number.number + `</b><br/> Create ` + data.aplication_number.created_at + `
                                        </div>
                                    `
                            }},
                            {   
                                title: "Status",
                                data: null,
                                render: function ( data, type, row ) {
                                    if(data.status === "procesing") {
                                        return `
                                            <div class="item h_list status processing">
                                                <div class="item icon_status"><div></div></div>
                                                <div class="item BTC_ALT_gray_font">
                                                    <div>The deal is processing</div>
                                                </div>
                                            </div>
                                        `
                                    } else if(data.status === "executed") {
                                        return `<div class="item h_list status executed">
                                            <div class="item icon_status"><div></div></div>
                                            <div class="item BTC_ALT_gray_font">
                                                The deal is executed
                                            </div>
                                        </div>
                                        `
                                    } else {
                                        return `
                                        <div class="item h_list status failed">
                                            <div class="item icon_status"><div></div></div>
                                            <div class="item BTC_ALT_gray_font">
                                                The deal is failed
                                            </div>
                                        </div>
                                        `
                                    }
                                    
                            }},
                            {   
                                title: null,
                                data: null,
                                render: function ( data, type, row ) {
                                    return `
                                        <div class="item more price gray_12_font empty_item">
                                            подробнее...
                                        </div>
                                    `
                            }},
                        ]
                    });
                });
        }
    }
    init("deals")
    init("deals_history")

    $('#info_item').on('click', function() {
        // init("deals_history")
    })
    
 } );

// JS FOR SETTINGS PAGE END