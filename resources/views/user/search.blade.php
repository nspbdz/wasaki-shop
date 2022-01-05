<section class="card" style="border: solid 1px #5A8DEE; margin-bottom: 10px;">
    <div class="card-header" style="background-color: #5A8DEE;">
        <h4 class="card-title" style="color: white !important;">Pencarian</h4>
    </div>
    <div class="card-body">
        <br>
        <form id="search-role">
            <div class="row">
                <div class="col-md-6">
                    <label for="username">Role</label>
                    <input type="text" class="form-control" id="role_search" name="role_search" value="">
                </div>
                <div class="col-md-6">
                    <label for="status">Status</label>
                    <select class="select2 form-control" id="role_status_search" name="role_status_search">
                        <option value="3">[ -- Pilih -- ]</option>
                        <option value="1">Aktif</option>
                        <option value="2">Inactive</option>
                    </select>
                </div>
            </div>

            <div class="d-flex justify-content-end" style="margin-top: 15px;">
                <button type="button" class="btn btn-primary" style="border-top-right-radius: 0; border-bottom-right-radius: 0;" onclick="searchRole(event)"> <i class="bx bx-search"></i> Cari </button>
                <button class="btn btn-warning" style="border-top-left-radius: 0; border-bottom-left-radius: 0;" onclick="resetTable(event)"> <i class="bx bx-reset"></i> Reset </button>
            </div>
        </form>
    </div>
</section>