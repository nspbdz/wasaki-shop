<div class="modal fade" id="basicModal" tabindex="-1" role="dialog" aria-labelledby="basicModal" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="myModalLabel">Basic Modal</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                    <form action="{{ route('transaksi.update' $itemproduk->id) }}"
                                    method='post' enctype="multipart/form-data">
                                    @csrf
                                    {{ method_field('patch') }}
                         <div class="form-group">
                            <label for="attachment">Attachment</label>
                            <input type="file" name="attachment" id="attachment">
                           <button type="submit" class="btn btn-primary">Save changes</button>
                         </div>
                    </form>
                        <h3>Modal Body</h3>
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary">Save changes</button>
                    </div>
                    </div>
                </div>
                </div>