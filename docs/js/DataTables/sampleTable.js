const SampleTable = function(tableSelector){
    this.Table = $(tableSelector);
};

SampleTable.prototype.resetChildren = function(){
    this.Table.children().remove();
    this.Table.append(`<thead></thead><tbody></tbody>`)

    return this;
};

SampleTable.prototype.setHeader = function(columnLength, noColIndex = 0){
    this.ColumnLength = columnLength
    this.NoColIndex = noColIndex;

    this.Table.find('thead').append(`<tr></tr>`);

    for(var i=0; i<this.ColumnLength; i++){
        var thClass = "lz-width-md";
        var thTxt = "";

        if(i == this.NoColIndex){
            thClass = "lz-width-xs";
            thTxt = "No";
        }

        this.Table.find('thead tr').append(`
            <th class="align-middle border border-bottom-0 ` + thClass + `">` + thTxt + `</td>
        `);
    }

    return this;
};

SampleTable.prototype.setData = function(rowLength){
    this.RowLength = rowLength;

    for(var i=0; i<this.RowLength; i++){
        this.Table.find('tbody').append(`<tr></tr>`);

        for(var j=0; j<this.ColumnLength; j++){
            var tdClass = "";
            var tdTxt = "";

            if(j == this.NoColIndex){
                tdClass = "text-end";
                tdTxt = Number(i+1);
            }

            this.Table.find('tbody tr:last-child').append(`
               <td class="align-middle border ` + tdClass + `">` + tdTxt + `</td>
            `);
         }
    }

    return this;
};

SampleTable.prototype.initDatatable = function(){
    this.Table.DataTable({
      paging: false,
      searching: false,
      ordering: false,
      processing: true,
      info: true,

      scrollY: 200,
      scrollX: true,

      initComplete: function(){

      },
    });

    return this;
};

SampleTable.prototype.initJsonDatatable = function(){
    var $table = this.Table;

    $.getJSON(BASE_URL + "/json/DataTables/Sample/sampleColumnDef.json", (cols) => {
        this.Column = cols;

        $.getJSON(BASE_URL + "/json/DataTables/Sample/sampleData.json", (data) => {
            this.Data = data;
    
            this.Table.DataTable({
                paging: false,
                searching: false,
                order: [],
                processing: true,
                info: true,
          
                columnDefs: this.Column,
                data: this.Data,
          
                scrollY: 200,
                scrollX: true,
        
                initComplete: function(){
                    $table.on( 'order.dt', function () {
                        $.each($(this).DataTable().columns('No:name').nodes()[0], function(i, no){
                            $(no).html(i+1);
                        });
                    } );
                },
              });          
        
            return this;
        });
    });
};