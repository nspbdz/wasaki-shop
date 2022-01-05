$(document).ready(function() {
    showAllData();
});

/* FUNGSI MENAMPILKAN SEMUA DATA */
function showAllData() {
    $('#main-table-user').DataTable({
        ajax: "/user/get",
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
                data: 'username',
                name: 'username',
                orderable: true,
                searchable: true
            },
            {
                data: 'nama',
                name: 'nama',
                orderable: true,
                searchable: true
            },
            {
                data: 'email',
                name: 'email',
                orderable: true,
                searchable: true
            }
        ]
    });
}

/* FUNGSI PENCARIAN DATA */
function searchUser(e) {
    e.preventDefault();
    var mainTable = $('#main-table-user');
    mainTable.DataTable().clear().destroy();

    mainTable.DataTable({
        ajax: {
            type: 'post',
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            url: '/user/search',
            data: function (d) {
                d.username   = $('#user_username').val();
                d.nama       = $('#user_nama').val();
                d.email      = $('#user_email').val();
                d.status     = $('#user_status').val();
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
                data: 'username',
                name: 'username',
                orderable: true,
                searchable: true
            },
            {
                data: 'nama',
                name: 'nama',
                orderable: true,
                searchable: true
            },
            {
                data: 'email',
                name: 'email',
                orderable: true,
                searchable: true
            }
        ]
    });
}

$('body').on('click', '.active-button', function () {
    var id = $(this).data('value');
    var url = $(this).data('url');
    var token = $("meta[name='csrf-token']").attr("content");
    var table = $('#main-table-user').DataTable();

    Swal.fire({
        title: "Confirmation",
        text: 'Apakah anda yakin akan mengaktifkan data ini ?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Active',
        confirmButtonClass: 'btn btn-danger',
        cancelButtonClass: 'btn btn-primary ml-1',
        buttonsStyling: false
    }).then(function (result) {
        if (result.value) {
            loadingScreen('Loading ...');
            $.ajax({
                url: url,
                type: 'POST',
                data: {
                    _token: token,
                    id: id
                },
                success: function (response) {
                    $.unblockUI();
                    if (response.status == 200) {
                        Swal.fire({
                            icon: "success",
                            title: response.header,
                            text: response.message,
                            confirmButtonClass: 'btn btn-success'
                        }).then(function (result) {
                            if (result.value) {
                                table.draw();
                            }
                        });
                    } else {
                        Swal.fire({
                            icon: "warning",
                            title: response.header,
                            text: response.message,
                            confirmButtonClass: 'btn btn-success'
                        });
                        table.draw();
                    }
                }
            });
        }
    });
});

$('body').on('click', '.inactive-button', function () {
    var id = $(this).data('value');
    var url = $(this).data('url');
    var token = $("meta[name='csrf-token']").attr("content");
    var table = $('#main-table-user').DataTable();

    Swal.fire({
        title: "Confirmation",
        text: 'Apakah anda yakin akan mengaktifkan data ini ?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Inactive',
        confirmButtonClass: 'btn btn-danger',
        cancelButtonClass: 'btn btn-primary ml-1',
        buttonsStyling: false
    }).then(function (result) {
        if (result.value) {
            loadingScreen('Loading ...');
            $.ajax({
                url: url,
                type: 'POST',
                data: {
                    _token: token,
                    id: id
                },
                success: function (response) {
                    $.unblockUI();
                    if (response.status == 200) {
                        Swal.fire({
                            icon: "success",
                            title: response.header,
                            text: response.message,
                            confirmButtonClass: 'btn btn-success'
                        }).then(function (result) {
                            if (result.value) {
                                table.draw();
                            }
                        });
                    } else {
                        Swal.fire({
                            icon: "warning",
                            title: response.header,
                            text: response.message,
                            confirmButtonClass: 'btn btn-success'
                        });
                        table.draw();
                    }
                }
            });
        }
    });
});

$('body').on('click', '.lock-button', function () {
    var id = $(this).data('value');
    var url = $(this).data('url');
    var token = $("meta[name='csrf-token']").attr("content");
    var table = $('#main-table-user').DataTable();

    Swal.fire({
        title: "Confirmation",
        text: 'Apakah anda yakin akan mengunci data ini ?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Lock',
        confirmButtonClass: 'btn btn-danger',
        cancelButtonClass: 'btn btn-primary ml-1',
        buttonsStyling: false
    }).then(function (result) {
        if (result.value) {
            loadingScreen('Loading ...');
            $.ajax({
                url: url,
                type: 'POST',
                data: {
                    _token: token,
                    id: id
                },
                success: function (response) {
                    $.unblockUI();
                    if (response.status == 200) {
                        Swal.fire({
                            icon: "success",
                            title: response.header,
                            text: response.message,
                            confirmButtonClass: 'btn btn-success'
                        }).then(function (result) {
                            if (result.value) {
                                table.draw();
                            }
                        });
                    } else {
                        Swal.fire({
                            icon: "warning",
                            title: response.header,
                            text: response.message,
                            confirmButtonClass: 'btn btn-success'
                        });
                        table.draw();
                    }
                }
            });
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