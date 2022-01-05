// ############################################################ form submit ################################################################
$('#form-add-area').on('submit', function (e) {
    e.preventDefault();

    // validatation 
    var emptyVal = false;

    $(this).find('input[class!="form-control descArea"]').each(function () {
        if (!$(this).val()) { emptyVal = true; return false; }
    });

    if (emptyVal) {
        $('#toast').toast({
            delay: 3000,
        });
        $('.message-fail-area').text("Pastikan form terisi semua");
        $('#toast').toast('show');
    } else {
        var form = $('#form-add-area').serialize();
        var action = $('#form-add-area').prop('action');
        $.ajax({
            type: 'post',
            url: action,
            data: form,
            dataType: 'json',
            beforeSend: function () {
                var loader = '<div class="spinner-border" role="status" style="width: 1rem; height: 1rem;">' +
                    '<span class="sr-only">Loading...</span>' +
                    '</div>';
                $('.btn-add-area').html(loader);
                $('.btn-cancel-add-area').prop('disabled', true);
                $('.btn-add-area').prop('disabled', true);
            },
            success: function (response) {
                $('.btn-cancel-add-area').prop('disabled', false);
                $('.btn-add-area').prop('disabled', false);
                $('.btn-add-area').html('Simpan');
                if (response.message == 'success') {
                    //clear modal and form
                    $('.modal-add-area').modal('hide');
                    document.getElementById('form-add-area').reset();

                    var table = $('#table-area').DataTable();
                    table.destroy();

                    showAllData();

                    Swal.fire({
                        title: 'Sukses',
                        text: 'Area ' + response.data + ' berhasil di simpan',
                        icon: 'success',
                    });
                } else if (response.message == 'duplicate') {
                    Swal.fire({
                        title: 'Duplikat',
                        text: response.data + ' sudah ada di database',
                        icon: 'error'
                    });
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: 'Error saat menyimpan ke databaase',
                        icon: 'warning'
                    });
                }
            }
        })
    }

});

$('#form-check-area').submit(function (e) {
    e.preventDefault();

    var data = new FormData($(this)[0]);

    $.ajax({
        type: 'post',
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        url: "/area/checkvalidate",
        contentType: false,
        processData: false,
        data: data,
        beforeSend: function () {
            var loader = '<div class="text-center">' +
                '<div class="spinner-border text-secondary" role="status" style="width: 1rem; height: 1rem;">' +
                '<span class="visually-hidden"></span>' +
                '</div>' +
                '</div>';

            $('.btn-add-area').html(loader);
            $('.btn-add-area').prop('disabled', true);
        },
        success: function (response) {
            $('.btn-add-area').html('Simpan');
            $('.modal-add-area').modal('hide');
            $('.row-preview-area').show();
            $('.row-preview-area').html(response);
            $('.row-main-area').hide();
            $('.modal-import-area').modal('hide');
            $('.btn-add-area').removeAttr('disabled');
        }
    })
});

$("body").on("click", ".switchStatusArea", function (e) {
    e.preventDefault();

    var active = $(this).data('toogle');
    var buttonText, successText, confirmText;

    if (active == "active") {
        buttonText = "Non-Aktifkan";
        successText = "Data berhasil di nonaktifkan";
        confirmText = "Yakin ingin menonaktifkan data ini?";
    } else {
        buttonText = "Aktifkan";
        successText = "Data berhasil di aktifkan";
        confirmText = "Yakin ingin mengaktifkan data ini?";
    }

    Swal.fire({
        title: "Change Data Status",
        text: confirmText,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: buttonText
    }).then((result) => {
        if (result.isConfirmed) {
            var id = $(this).data('id');

            $.ajax({
                type: 'post',
                headers: {
                    "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
                },
                url: "/area/changeStatus",
                data: {
                    id: id,
                    target: active
                },
                beforeSend: function () {
                    loadingGetData();
                },
                success: function (response) {
                    var dump = '<i class="bx bx-trash" aria-hidden="true" id="deleteProv"></i>';
                    $('#nonactive-area-btn' + id).html(dump);
                    if (response == 'success') {
                        $.unblockUI();
                        loadingRedirecting();
                        var table = $('#table-area').DataTable();
                        table.destroy();

                        showAllData();

                        Swal.fire({
                            title: 'Sukses',
                            text: successText,
                            icon: 'success',
                        });
                    } else {
                        Swal.fire({
                            title: 'Gagal',
                            text: 'Gagal menonaktifkan data',
                            icon: 'error',
                        });
                    }
                }
            })
        }
    });
})

$('body').on('click', '.btn-edit-area', function (e) {
    e.preventDefault();

    // validatation 
    var emptyVal = false;

    $(this).find('input[class!="form-control descArea"]').each(function () {
        if (!$(this).val()) { emptyVal = true; return false; }
    });

    if (emptyVal) {
        $('#toast').toast({
            delay: 3000,
        });
        $('.message-fail-area').text("Pastikan form terisi semua");
        $('#toast').toast('show');
    } else {
        var form = $('#form-edit-area').serialize();

        $.ajax({
            type: 'post',
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
            url: "/area/postEdit",
            data: form,
            beforeSend: function () {
                var loader = '<div class="text-center">' +
                    '<div class="spinner-border text-secondary" role="status" style="width: 1rem; height: 1rem;">' +
                    '<span class="visually-hidden"></span>' +
                    '</div>' +
                    '</div>';

                $('.btn-edit-area').html(loader);
                $('.btn-cancel-edit-area').prop('disabled', true);
                $('.btn-edit-area').prop('disabled', true);
            },
            success: function (response) {
                $('.btn-cancel-edit-area').prop('disabled', false);
                $('.btn-edit-area').prop('disabled', false);
                $('.btn-edit-area').html('Simpan');
                if (response == 'success') {

                    var table = $('#table-area').DataTable();
                    table.destroy();

                    showAllData();

                    $('.modal-edit-area').modal('hide');

                    Swal.fire({
                        title: 'Sukses',
                        text: 'Data berhasil di edit',
                        icon: 'success',
                    });

                    getDetailArea();
                } else if (response == 'duplicate') {
                    Swal.fire({
                        title: 'Gagal',
                        text: 'Data sudah ada di dalam database',
                        icon: 'warning',
                    });
                } else {
                    Swal.fire({
                        title: 'Gagal',
                        text: 'Gagal edit data',
                        icon: 'error',
                    });
                }
            }
        })
    }

})

$("body").on("click", ".delete-area-btn", function (e) {
    e.preventDefault();

    Swal.fire({
        title: 'Hapus data',
        text: "Anda yakin ingin menghapus data ini?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            var id = $(this).data('id');

            $.ajax({
                type: 'post',
                headers: {
                    "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
                },
                url: "/area/delete",
                data: {
                    id: id
                },
                beforeSend: function () {
                    var loader = '<div class="text-center">' +
                        '<div class="spinner-border text-secondary" role="status" style="width: 1rem; height: 1rem;">' +
                        '<span class="visually-hidden"></span>' +
                        '</div>' +
                        '</div>';

                    $('#delete-area-btn' + id).html(loader);
                },
                success: function (response) {
                    var dump = '<i class="bx bx-trash" aria-hidden="true" id="deleteArea"></i>';
                    $('#delete-area-btn' + id).html(dump);
                    if (response == 'success') {

                        var table = $('#table-area').DataTable();
                        table.destroy();

                        showAllData();

                        Swal.fire({
                            title: 'Sukses',
                            text: 'Data berhasil di hapus',
                            icon: 'success',
                        });
                    } else {
                        Swal.fire({
                            title: 'Gagal',
                            text: 'Gagal hapus data',
                            icon: 'error',
                        });
                    }
                }
            })
        }
    });
})

// $("body").on("click", ".nonactive-area-btn", function (e) {
//     e.preventDefault();

//     Swal.fire({
//         title: 'Apakah Anda yakin akan menonaktifkan data ini?',
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#3085d6',
//         cancelButtonColor: '#d33',
//         confirmButtonText: 'Ya',
//         cancelButtonText: 'Tidak'
//     }).then((result) => {
//         if (result.isConfirmed) {
//             var id = $(this).data('id');

//             $.ajax({
//                 type: 'post',
//                 headers: {
//                     "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
//                 },
//                 url: "/area/nonactive",
//                 data: {
//                     id: id
//                 },
//                 beforeSend: function () {
//                     var loader = '<div class="text-center">' +
//                         '<div class="spinner-border text-secondary" role="status" style="width: 1rem; height: 1rem;">' +
//                         '<span class="visually-hidden"></span>' +
//                         '</div>' +
//                         '</div>';

//                     $('#nonactive-area-btn' + id).html(loader);
//                 },
//                 success: function (response) {
//                     var dump = '<i class="bx bx-trash" aria-hidden="true" id="nonactiveAreaTrash"></i>';
//                     $('#nonactive-area-btn' + id).html(dump);
//                     if (response == 'success') {

//                         var table = $('#table-area').DataTable();
//                         table.destroy();

//                         showAllData();

//                         Swal.fire({
//                             title: 'Sukses',
//                             text: 'Data berhasil di nonaktifkan',
//                             icon: 'success',
//                         });
//                     } else {
//                         Swal.fire({
//                             title: 'Gagal',
//                             text: 'Gagal menonaktifkan data',
//                             icon: 'error',
//                         });
//                     }
//                 }
//             })
//         }
//     });
// })

// $("body").on("click", ".reactive-area-btn", function (e) {
//     e.preventDefault();

//     Swal.fire({
//         title: 'Apakah Anda yakin akan mengaktifkan kembali data ini?',
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#3085d6',
//         cancelButtonColor: '#d33',
//         confirmButtonText: 'Ya',
//         cancelButtonText: 'Tidak'
//     }).then((result) => {
//         if (result.isConfirmed) {
//             var id = $(this).data('id');

//             $.ajax({
//                 type: 'post',
//                 headers: {
//                     "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
//                 },
//                 url: "/area/reactive",
//                 data: {
//                     id: id
//                 },
//                 beforeSend: function () {
//                     var loader = '<div class="text-center">' +
//                         '<div class="spinner-border text-secondary" role="status" style="width: 1rem; height: 1rem;">' +
//                         '<span class="visually-hidden"></span>' +
//                         '</div>' +
//                         '</div>';

//                     $('#reactive-area-btn' + id).html(loader);
//                 },
//                 success: function (response) {
//                     var dump = '<i class="bx bx-trash" aria-hidden="true" id="reactiveAreaTrash"></i>';
//                     $('#reactive-area-btn' + id).html(dump);
//                     if (response == 'success') {

//                         var table = $('#table-area').DataTable();
//                         table.destroy();

//                         showAllData();

//                         Swal.fire({
//                             title: 'Sukses',
//                             text: 'Data berhasil di aktifkan',
//                             icon: 'success',
//                         });
//                     } else {
//                         Swal.fire({
//                             title: 'Gagal',
//                             text: 'Gagal mengaktifkan data',
//                             icon: 'error',
//                         });
//                     }
//                 }
//             })
//         }
//     });
// })

// e######################################################### event ################################################################

$("body").on("click", ".edit-area-btn", function (e) {
    e.preventDefault();

    var id = $(this).data('id');

    $.ajax({
        type: 'post',
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        data: {
            id: id
        },
        url: '/area/edit',
        beforeSend: function () {
            loadingGetData();
        },
        success: function (response) {
            $.unblockUI();
            $('#modalLoader').modal('hide');
            $('#modalEditArea').html(response);
            $('#modalEditArea').modal('show');
        }
    })
})

$('#modalAddArea').on('show.bs.modal', function (e) {
    document.getElementById('form-add-area').reset();
});

$('#modalImportArea').on('show.bs.modal', function (e) {
    document.getElementById('form-check-area').reset();
});

$(document).ready(function () {
    showAllData();
})

function validateArea(event) {
    event.preventDefault();
    var code = $('.prev-code-area').map(function () {
        return $(this).val();
    }).toArray();

    var name = $('.prev-name-area').map(function () {
        return $(this).val();
    }).toArray();

    var alias = $('.prev-alias-area').map(function () {
        return $(this).val();
    }).toArray();

    var desc = $('.prev-desc-area').map(function () {
        return $(this).val();
    }).toArray();

    $.ajax({
        type: 'post',
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        data: {
            code: code,
            name: name,
            alias: alias,
            desc: desc
        },
        url: '/area/validate',
        dataType: 'json',
        beforeSend: function () {
            var loader = '<div class="text-center">' +
                '<div class="spinner-border text-secondary" role="status" style="width: 1rem; height: 1rem;">' +
                '<span class="visually-hidden"></span>' +
                '</div>' +
                '</div>';

            $('.validate-btn-area').html(loader);
        },
        success: function (response) {
            console.log(response);
            $('.validate-btn-area').html('Validasi');
            var validate = '';
            for (var i = 0; i < response.length; i++) {
                if (response[i] == '0') {
                    $('#kA' + i).html('TRUE');
                    $('#vcodeA' + i).addClass('vcodeA');
                    $('#vnameA' + i).addClass('vnameA');
                    $('#valiasA' + i).addClass('valiasA');
                    $('#vdescA' + i).addClass('vdescA');
                    $('#vstatusA' + i).addClass('vstatusA');
                } else if (response[i] == '1') {
                    $('#kA' + i).html('Data ditemukan');
                }
            }

            $('.import-btn-area').removeAttr('disabled');
            $('.validate-btn-area').prop('disabled', true);
        }
    })
}

function importArea(event) {
    event.preventDefault();

    var code = $('.vcodeA').map(function () {
        return $(this).val();
    }).toArray();

    var name = $('.vnameA').map(function () {
        return $(this).val();
    }).toArray();

    var alias = $('.valiasA').map(function () {
        return $(this).val();
    }).toArray();

    var desc = $('.vdescA').map(function () {
        return $(this).val();
    }).toArray();

    var status = $('.vstatusA').map(function () {
        return $(this).val();
    }).toArray();

    $.ajax({
        type: 'post',
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        url: '/area/import',
        data: {
            code: code,
            name: name,
            alias: alias,
            desc: desc,
            status: status
        },
        beforeSend: function () {
            var loader = '<div class="text-center">' +
                '<div class="spinner-border text-secondary" role="status" style="width: 1rem; height: 1rem;">' +
                '<span class="visually-hidden"></span>' +
                '</div>' +
                '</div>';

            $('.import-btn-area').html(loader);
        },
        success: function (response) {
            $('.import-btn-area').html('Import');
            if (response == 'success') {
                Swal.fire({
                    title: 'Sukses',
                    text: 'Import data berhasil',
                    icon: 'success',
                });
                setTimeout(function () {
                    var page = '/area/';
                    window.location = page;
                }, 1000);
            } else {
                Swal.fire({
                    title: 'Gagal',
                    text: 'Import data tidak dapat dilakukan, secara otomatis anda akan di arahkan ke halaman awal',
                    icon: 'error',
                });

                setTimeout(function () {
                    var page = '/area/';
                    window.location = page;
                }, 1500);
            }

        }
    })

}

function showAllData() {
    $('#table-area').DataTable({
        ajax: "/area/get",
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
            searchPlaceholder: "Cari",
            sUrl: "",
            oPaginate: {
                sFirst: "pertama",
                sPrevious: "sebelumnya",
                sNext: "selanjutnya",
                sLast: "terakhir",
            },
        },
        columns: [
            {
                data: "DT_RowIndex",
                name: "DT_RowIndex",
                orderable: false,
                searchable: false,
            },
            {
                data: 'action',
                name: 'action',
                orderable: false,
                searchable: false,
            },
            {
                data: 'status',
                name: 'status',
                orderable: true,
                searchable: true,
            },
            {
                data: 'kode_area',
                name: 'kode_area',
                orderable: true,
                searchable: true,
            },
            {
                data: 'nama_area',
                name: 'nama_area',
                orderable: true,
                searchable: true,
            }
        ]
    });
}

function searchArea(event) {
    event.preventDefault();
    var table = $('#table-area').DataTable();
    table.destroy();

    $('#table-area').DataTable({
        ajax: {
            type: 'post',
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
            url: '/area/search',
            data: function (d) {
                d.name = $('#area_name_search').val();
                d.code = $('#area_code_search').val();
                d.status = $('#area_status_search').val();
            },
        },
        bFilter: false,
        processing: true,
        serverSide: true,
        columns: [
            {
                data: 'action',
                name: 'action'
            },
            {
                data: 'kode_area',
                name: 'kode_area'
            },
            {
                data: 'nama_area',
                name: 'nama_area'
            },
            {
                data: 'status',
                name: 'status'
            }
        ]
    });

}

function resetTable(event) {
    event.preventDefault();

    var table = $('#table-area').DataTable();
    table.destroy();

    document.getElementById('search-area').reset();

    showAllData();
}

function loadingGetData() {
    var src = $("#logo_kai").attr('src');
    $.blockUI({
        message: '<img src="' + src + '" style="height: 80px; width: auto"> <hr> <h3>Mohon Tunggu ...</h3>',
        timeout: 2500, //unblock after 5 seconds
        overlayCSS: {
            backgroundColor: '#fff',
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

function loadingRedirecting() {
    var src = $("#logo_kai").attr('src');
    $.blockUI({
        message: '<img src="' + src + '" style="height: 80px; width: auto"> <hr> <h3>Redirecting ...</h3>',
        timeout: 2500, //unblock after 5 seconds
        overlayCSS: {
            backgroundColor: '#fff',
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