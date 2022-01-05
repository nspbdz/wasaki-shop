$(document).ready(function() {
    showAllData();
});

/* FUNGSI MENAMPILKAN SEMUA DATA */
function showAllData() {
    $('#main-table-permission').DataTable({
        ajax: "/permission/get",
        bFilter: false,
        processing: true,
        serverSide: true,
        language: {
            sEmptyTable: "Tidak ada data yang tersedia pada tabel ini",
            sProcessing: "Sedang memproses...",
            sLengthMenu: "Tampilkan data _MENU_",
            sZeroRecords: "Tidak ditemukan data yang sesuai",
            sInfo: "_START_ - _END_ dari _TOTAL_",
            sInfoEmpty: "0 - 0 dari 0",
            sInfoFiltered: "(disaring dari _MAX_ data keseluruhan)",
            sInfoPostFix: "",
            sSearch: "",
            searchPlaceholder: "Cari ...",
            sUrl: "",
            oPaginate: {
                sFirst: "pertama",
                sPrevious: "sebelumnya",
                sNext: "selanjutnya",
                sLast: "terakhir"
            }
        },
        columns: [
            {
                data: "DT_RowIndex",
                name: "DT_RowIndex",
                orderable: false,
                searchable: false
            },
            {
                data: 'action',
                name: 'action',
                orderable: false,
                searchable: false
            },
            {
                data: 'status',
                name: 'status',
                orderable: true,
                searchable: true
            },
            {
                data: 'menu',
                name: 'menu',
                orderable: true,
                searchable: true
            },
            {
                data: 'name',
                name: 'name',
                title: 'Fitur',
                orderable: true,
                searchable: true
            },
            {
                data: 'guard_name',
                name: 'guard_name',
                orderable: true,
                searchable: true
            },
            {
                data: 'alias',
                name: 'alias',
                orderable: true,
                searchable: true
            }
        ]
    });
}

function searchPermission(event) {
    event.preventDefault();
    var mainTable = $('#main-table-permission');
    mainTable.DataTable().clear().destroy();

    mainTable.DataTable({
        ajax: {
            type: 'post',
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            url: '/permission/search',
            data: function (d) {
                d.menu = $('#permission_menu').val();
                d.fitur = $('#permission_fitur').val();
                d.status = $('#permission_status').val();
            }
        },
        bFilter: false,
        processing: true,
        serverSide: true,
        language: {
            sEmptyTable: "Tidak ada data yang tersedia pada tabel ini",
            sProcessing: "Sedang memproses...",
            sLengthMenu: "Tampilkan data _MENU_",
            sZeroRecords: "Tidak ditemukan data yang sesuai",
            sInfo: "_START_ - _END_ dari _TOTAL_",
            sInfoEmpty: "0 - 0 dari 0",
            sInfoFiltered: "(disaring dari _MAX_ data keseluruhan)",
            sInfoPostFix: "",
            sSearch: "",
            searchPlaceholder: "Cari ...",
            sUrl: "",
            oPaginate: {
                sFirst: "pertama",
                sPrevious: "sebelumnya",
                sNext: "selanjutnya",
                sLast: "terakhir"
            }
        },
        columns: [
            {
                data: "DT_RowIndex",
                name: "DT_RowIndex",
                orderable: false,
                searchable: false
            },
            {
                data: 'action',
                name: 'action',
                orderable: false,
                searchable: false
            },
            {
                data: 'status',
                name: 'status',
                orderable: true,
                searchable: true
            },
            {
                data: 'menu',
                name: 'menu',
                orderable: true,
                searchable: true
            },
            {
                data: 'name',
                name: 'name',
                title: 'Fitur',
                orderable: true,
                searchable: true
            },
            {
                data: 'guard_name',
                name: 'guard_name',
                orderable: true,
                searchable: true
            },
            {
                data: 'alias',
                name: 'alias',
                orderable: true,
                searchable: true
            }
        ]
    });
}

function resetTable(event) {
    event.preventDefault();
    var mainTable = $('#main-table-permission');
    mainTable.DataTable().clear().destroy();
    document.getElementById('search-permission').reset();
    showAllData();
}

$("body").on("click", ".switchStatus", function () {
    var id    = $(this).data("id");
    var check = $("#switchFitur" + id).is(":checked");
    var table = $('#main-table-permission').DataTable();
    var token = $("meta[name='csrf-token']").attr("content");

    var warningMessage = "";
    var buttonName = "";

    if (check === false) {
        warningMessage = 'Apakah anda akan menonaktifkan data ini?';
        buttonName = "Non-Aktifkan";
    } else {
        warningMessage = 'Apakah anda akan mengaktifkan data ini?';
        buttonName = "Aktifkan";
    }

    Swal.fire({
        title: "Change Data Status",
        text: warningMessage,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: buttonName
    }).then(function (result) {
        if (result.value) {
            loadingScreen('Dalam Proses ...');
            $.ajax({
                url: '/permission/status',
                type: 'POST',
                data: {
                    _token: token,
                    id: id
                },
                success: function (response) {
                    if (response.status == 200) {
                        $.unblockUI();
                        Swal.fire({
                            icon: "success",
                            title: response.header,
                            text: response.message,
                            confirmButtonClass: 'btn btn-success',
                        }).then(function (result) {
                            if (result.value) {
                                table.draw();
                            }
                        });
                    } else {
                        $.unblockUI();
                        Swal.fire({
                            icon: "warning",
                            title: response.header,
                            text: response.message,
                            confirmButtonClass: 'btn btn-success',
                        }).then(function (result) {
                            if (result.value) {
                                table.draw();
                            }
                        });
                    }
                }
            });
        } else {
            table.draw();
        }
    });
});

function loadingScreen(msg) {
    var $white = '#fff';
    var src = $("#logo_kai").attr('src');
    $.blockUI({
        message: '<img src="' + src + '" style="height: 80px; width: auto"> <hr> <h3>' + msg + '</h3>',
        timeout: 5000, //unblock after 5 seconds
        overlayCSS: {
            backgroundColor: $white,
            opacity: 0.8,
            cursor: 'wait'
        },
        css: {
            border: 0,
            padding: 0,
            backgroundColor: 'transparent'
        }
    });
}