// ############################################################ form submit ################################################################
$('#form-add-kotakab').on('submit', function (e) {
    e.preventDefault();

    var emptyVal;

    $(this).find('input[class!="form-control descKotakab"]').each(function () {
        if (!$(this).val()) { emptyVal = true; return false; }
    });

    if (emptyVal) {
        $('#toastKotakab').toast({
            delay: 3000,
        });
        $('.message-fail-kotakab').text("Pastikan form terisi semua");
        $('#toastKotakab').toast('show');
    } else {
        var form = $('#form-add-kotakab').serialize();
        var action = $('#form-add-kotakab').prop('action');
        $.ajax({
            type: 'post',
            url: action,
            data: form,
            dataType: 'json',
            beforeSend: function () {
                var loader = '<div class="spinner-border" role="status" style="width: 1rem; height: 1rem;">' +
                    '<span class="sr-only">Loading...</span>' +
                    '</div>';
                $('.btn-add-kotakab').html(loader);
                $('.btn-cancel-add-kotakab').prop('disabled', true);
                $('.btn-add-kotakab').prop('disabled', true);
            },
            success: function (response) {
                $('.btn-cancel-add-kotakab').prop('disabled', false);
                $('.btn-add-kotakab').prop('disabled', false);
                $('.btn-add-kotakab').html('Simpan');
                if (response.message == 'success') {
                    //clear modal and form
                    $('.modal-add-kotakab').modal('hide');
                    document.getElementById('form-add-kotakab').reset();

                    var table = $('#table-kotakab').DataTable();
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

$('#form-check-kotakab').submit(function (e) {
    e.preventDefault();

    var data = new FormData($(this)[0]);

    $.ajax({
        type: 'post',
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        url: "/kota_kab/checkvalidate",
        contentType: false,
        processData: false,
        data: data,
        beforeSend: function () {
            var loader = '<div class="text-center">' +
                '<div class="spinner-border text-secondary" role="status" style="width: 1rem; height: 1rem;">' +
                '<span class="visually-hidden"></span>' +
                '</div>' +
                '</div>';

            $('.btn-add-kotakab').html(loader);
            $('.btn-add-kotakab').prop('disabled', true);
        },
        success: function (response) {
            $('.btn-add-kotakab').html('Simpan');
            $('.modal-add-kotakab').modal('hide');
            $('.row-preview-kotakab').html(response);
            $('.row-main-kotakab').hide();
            $('.row-preview-kotakab').show();
            $('.modal-import-kotakab').modal('hide');
            $('.btn-add-kotakab').removeAttr('disabled');
        }
    })
});

$('body').on('click', '.btn-edit-kotakab', function (e) {
    e.preventDefault();

    var emptyVal;

    $(this).find('input[class!="form-control descKotakab"]').each(function () {
        if (!$(this).val()) { emptyVal = true; return false; }
    });

    if (emptyVal) {
        $('#toastKotakab').toast({
            delay: 3000,
        });
        $('.message-fail-kotakab').text("Pastikan form terisi semua");
        $('#toastKotakab').toast('show');
    } else {
        var form = $('#form-edit-kotakab').serialize();

        $.ajax({
            type: 'post',
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
            url: "/kota_kab/postEdit",
            data: form,
            beforeSend: function () {
                var loader = '<div class="text-center">' +
                    '<div class="spinner-border text-secondary" role="status" style="width: 1rem; height: 1rem;">' +
                    '<span class="visually-hidden"></span>' +
                    '</div>' +
                    '</div>';

                $('.btn-edit-kotakab').html(loader);
                $('.btn-cancel-edit-kotakab').prop('disabled', true);
                $('.btn-edit-kotakab').prop('disabled', true);
            },
            success: function (response) {
                $('.btn-cancel-edit-kotakab').prop('disabled', false);
                $('.btn-edit-kotakab').prop('disabled', false);
                $('.btn-edit-kotakab').html('Simpan');
                if (response == 'success') {

                    var table = $('#table-kotakab').DataTable();
                    table.destroy();

                    showAllData();

                    $('.modal-edit-kotakab').modal('hide');

                    Swal.fire({
                        title: 'Sukses',
                        text: 'Data berhasil di edit',
                        icon: 'success',
                    });
                    $('.modal-edit-kotakab').modal('hide');
                    getDetailKotakab();
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

$("body").on("click", ".delete-kotakab-btn", function (e) {
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
                url: "/kota_kab/delete",
                data: {
                    id: id
                },
                beforeSend: function () {
                    var loader = '<div class="text-center">' +
                        '<div class="spinner-border text-secondary" role="status" style="width: 1rem; height: 1rem;">' +
                        '<span class="visually-hidden"></span>' +
                        '</div>' +
                        '</div>';

                    $('#delete-kotakab-btn' + id).html(loader);
                },
                success: function (response) {
                    var dump = '<i class="bx bx-trash" aria-hidden="true" id="deleteArea"></i>';
                    $('#delete-kotakab-btn' + id).html(dump);
                    if (response == 'success') {

                        var table = $('#table-kotakab').DataTable();
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

$("body").on("click", ".nonactive-kotakab-btn", function (e) {
    e.preventDefault();

    Swal.fire({
        title: 'Apakah Anda yakin akan menonaktifkan data ini?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya',
        cancelButtonText: 'Tidak'
    }).then((result) => {
        if (result.isConfirmed) {
            var id = $(this).data('id');

            $.ajax({
                type: 'post',
                headers: {
                    "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
                },
                url: "/kota_kab/nonactive",
                data: {
                    id: id
                },
                beforeSend: function () {
                    var loader = '<div class="text-center">' +
                        '<div class="spinner-border text-secondary" role="status" style="width: 1rem; height: 1rem;">' +
                        '<span class="visually-hidden"></span>' +
                        '</div>' +
                        '</div>';

                    $('#nonactive-kotakab-btn' + id).html(loader);
                },
                success: function (response) {
                    var dump = '<i class="bx bx-trash" aria-hidden="true" id="nonactiveAreaTrash"></i>';
                    $('#nonactive-kotakab-btn' + id).html(dump);
                    if (response == 'success') {

                        var table = $('#table-kotakab').DataTable();
                        table.destroy();

                        showAllData();

                        Swal.fire({
                            title: 'Sukses',
                            text: 'Data berhasil di nonaktifkan',
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

$("body").on("click", ".reactive-kotakab-btn", function (e) {
    e.preventDefault();

    Swal.fire({
        title: 'Apakah Anda yakin akan mengaktifkan kembali data ini?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya',
        cancelButtonText: 'Tidak'
    }).then((result) => {
        if (result.isConfirmed) {
            var id = $(this).data('id');

            $.ajax({
                type: 'post',
                headers: {
                    "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
                },
                url: "/kota_kab/reactive",
                data: {
                    id: id
                },
                beforeSend: function () {
                    var loader = '<div class="text-center">' +
                        '<div class="spinner-border text-secondary" role="status" style="width: 1rem; height: 1rem;">' +
                        '<span class="visually-hidden"></span>' +
                        '</div>' +
                        '</div>';

                    $('#reactive-kotakab-btn' + id).html(loader);
                },
                success: function (response) {
                    var dump = '<i class="bx bx-trash" aria-hidden="true" id="reactiveAreaTrash"></i>';
                    $('#reactive-kotakab-btn' + id).html(dump);
                    if (response == 'success') {

                        var table = $('#table-kotakab').DataTable();
                        table.destroy();

                        showAllData();

                        Swal.fire({
                            title: 'Sukses',
                            text: 'Data berhasil di aktifkan',
                            icon: 'success',
                        });
                    } else {
                        Swal.fire({
                            title: 'Gagal',
                            text: 'Gagal mengaktifkan data',
                            icon: 'error',
                        });
                    }
                }
            })
        }
    });
})

// e######################################################### event ################################################################

$("body").on("click", ".edit-kotakab-btn", function (e) {
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
        url: '/kota_kab/edit',
        beforeSend: function () {
            $('#modalLoader').modal('show');
        },
        success: function (response) {
            $('#modalLoader').modal('hide');
            $('#modalEditKotakab').html(response);
            $('#modalEditKotakab').modal('show');
        }
    })
})

$("body").on("click", ".switchStatusKotakab", function (e) {
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
                url: "/kota_kab/changeStatus",
                data: {
                    id: id,
                    target: active
                },
                beforeSend: function () {
                    var loader = '<div class="text-center">' +
                        '<div class="spinner-border text-secondary" role="status" style="width: 1rem; height: 1rem;">' +
                        '<span class="visually-hidden"></span>' +
                        '</div>' +
                        '</div>';

                    $('#nonactive-kotakab-btn' + id).html(loader);
                },
                success: function (response) {
                    var dump = '<i class="bx bx-trash" aria-hidden="true" id="deleteProv"></i>';
                    $('#nonactive-kotakab-btn' + id).html(dump);
                    if (response == 'success') {
                        var table = $('#table-kotakab').DataTable();
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

$('#modalAddKotakab').on('show.bs.modal', function (e) {
    document.getElementById('form-add-kotakab').reset();
});

$('#modalImportKotakab').on('show.bs.modal', function (e) {
    document.getElementById('form-check-kotakab').reset();
});

$(document).ready(function () {
    document.getElementById('search-kotakab').reset();
    $('.provinsi_kotakab').select2();
    showAllData();
})

function validateKotakab(event) {
    event.preventDefault();

    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
    });

    var code = $('.prev-code-kotakab').map(function () {
        return $(this).val();
    }).toArray();

    var name = $('.prev-name-kotakab').map(function () {
        return $(this).val();
    }).toArray();

    var prov = $('.prev-provinsi-kotakab').map(function () {
        return $(this).val();
    }).toArray();

    var desc = $('.prev-desc-kotakab').map(function () {
        return $(this).val();
    }).toArray();

    $.ajax({
        type: 'post',
        data: {
            code: code,
            name: name,
            prov: prov,
            desc: desc,
        },
        url: '/kota_kab/validateFile',
        dataType: 'json',
        beforeSend: function () {
            var loader = '<div class="text-center">' +
                '<div class="spinner-border text-secondary" role="status" style="width: 1rem; height: 1rem;">' +
                '<span class="visually-hidden"></span>' +
                '</div>' +
                '</div>';

            $('.validate-btn-kotakab').html(loader);
        },
        success: function (response) {
            console.log(response);
            $('.validate-btn-kotakab').html('Validasi');
            var validate = '';
            for (var i = 0; i < response.res.length; i++) {
                if (response.res[i] == '0') {
                    if (response.type[i] == 0) {
                        $('#kK' + i).html('Provinsi tidak terdaftar');
                    } else {
                        $('#kK' + i).html('TRUE');
                        $('#vcodeK' + i).addClass('vcodeK');
                        $('#vnameK' + i).addClass('vnameK');
                        $('#valiasK' + i).addClass('valiasK');
                        $('#vdescK' + i).addClass('vdescK');
                        $('#vstatusK' + i).addClass('vstatusK');
                    }

                } else if (response.res[i] == '1') {
                    $('#kK' + i).html('Data ditemukan');
                }
            }

            $('.import-btn-kotakab').removeAttr('disabled');
            $('.validate-btn-kotakab').prop('disabled', true);
        }
    })
}

function importKotakab(event) {
    event.preventDefault();

    var code = $('.vcodeK').map(function () {
        return $(this).val();
    }).toArray();

    var name = $('.vnameK').map(function () {
        return $(this).val();
    }).toArray();

    var prov = $('.valiasK').map(function () {
        return $(this).val();
    }).toArray();

    var desc = $('.vdescK').map(function () {
        return $(this).val();
    }).toArray();

    var status = $('.vstatusK').map(function () {
        return $(this).val();
    }).toArray();

    $.ajax({
        type: 'post',
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        url: '/kota_kab/import',
        data: {
            code: code,
            name: name,
            prov: prov,
            desc: desc,
            status: status
        },
        beforeSend: function () {
            var loader = '<div class="text-center">' +
                '<div class="spinner-border text-secondary" role="status" style="width: 1rem; height: 1rem;">' +
                '<span class="visually-hidden"></span>' +
                '</div>' +
                '</div>';

            $('.import-btn-kotakab').html(loader);
        },
        success: function (response) {
            $('.import-btn-kotakab').html('Import');
            if (response == 'success') {
                Swal.fire({
                    title: 'Sukses',
                    text: 'Import data berhasil',
                    icon: 'success',
                });
                setTimeout(function () {
                    var page = '/kota_kab/';
                    window.location = page;
                }, 1000);
            } else {
                Swal.fire({
                    title: 'Gagal',
                    text: 'Import data tidak dapat dilakukan, secara otomatis anda akan di arahkan ke halaman awal',
                    icon: 'error',
                });

                setTimeout(function () {
                    var page = '/kota_kab/';
                    window.location = page;
                }, 1500);
            }

        }
    })

}

function showAllData() {
    $('#table-kotakab').DataTable({
        ajax: "/kota_kab/get",
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
                orderable: false,
                searchable: false,
            },
            {
                data: 'kode_kota_kab',
                name: 'kode_kota_kab',
                orderable: true,
                searchable: true,
            },
            {
                data: 'nama_kota_kab',
                name: 'nama_kota_kab',
                orderable: true,
                searchable: true,
            },
            {
                data: 'provinsi',
                name: 'provinsi',
                orderable: true,
                searchable: true,
            },
            {
                data: 'keterangan',
                name: 'keterangan',
                orderable: true,
                searchable: true,
            },
        ]
    });
}

function searchKotaKab(event) {
    event.preventDefault();
    var table = $('#table-kotakab').DataTable();
    table.destroy();

    $('#table-kotakab').DataTable({
        ajax: {
            type: 'post',
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
            url: '/kota_kab/search',
            data: function (d) {
                d.name = $('#kotakab_name_search').val();
                d.code = $('#kotakab_code_search').val();
                d.status = $('#kotakab_status_search').val();
                d.prov = $('#kotakab_provinsi_search').val();
            },
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
                orderable: false,
                searchable: false,
            },
            {
                data: 'kode_kota_kab',
                name: 'kode_kota_kab',
                orderable: true,
                searchable: true,
            },
            {
                data: 'nama_kota_kab',
                name: 'nama_kota_kab',
                orderable: true,
                searchable: true,
            },
            {
                data: 'provinsi',
                name: 'provinsi',
                orderable: true,
                searchable: true,
            },
            {
                data: 'keterangan',
                name: 'keterangan',
                orderable: true,
                searchable: true,
            },
        ]
    });

    console.log($('#kotakab_name_search').val());

}

function resetTable(event) {
    event.preventDefault();

    var table = $('#table-kotakab').DataTable();
    table.destroy();

    document.getElementById('search-kotakab').reset();

    showAllData();
}