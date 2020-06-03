import React from 'react';
import GC from '@grapecity/spread-sheets';
import { SpreadSheets, Worksheet } from '@grapecity/spread-sheets-react';

// Import ExcelIO module
import * as spreadExcel from '@grapecity/spread-excelio';

// Import file-saver module
import saveAs from 'file-saver';

var SpreadJSKey = "xxx";
GC.Spread.Sheets.LicenseKey = SpreadJSKey;

 

// You need to license the ExcelIO module separately using the same license key
spreadExcel.LicenseKey = SpreadJSKey;

class SpreadIoHome extends React.Component {
    constructor(props) {
        super(props);
        this.hostStyle =
            {
                width: '1100px',
                height: '800px'
            };
    }


// Handling workbook initialized event
    workbookInit = (spread) => {
        this.setState({
            spread: spread
        });
    }

// Import Excel
    importFile = () => {
        var excelFile = document.getElementById("fileDemo").files[0];

        // Get an instance of IO class
        let excelIO = new spreadExcel.IO();
        excelIO.open(excelFile, (json) => {
            this.state.spread.fromJSON(json);
        }, (e) => {
            console.log(e);
        });
    }

// Export Excel

    exportFile = () => {

        // Get an instance of IO class
        let excelIO = new spreadExcel.IO();
        let fileName = document.getElementById("exportFileName").value;
        if (fileName.substr(-5, 5) !== '.xlsx') {
            fileName += '.xlsx';
        }
        var json = JSON.stringify(this.state.spread.toJSON());
        excelIO.save(json, (blob) => {
            saveAs(blob, fileName);
        }, (e) => {
            console.log(e);
        });

    }
    render() {
        return (
            <div>
                <input type="file" name="files[]" id="fileDemo" accept=".xlsx,.xls" />
                <input type="button" id="loadExcel" value="Import" onClick={this.importFile} />
                <input type="button" id="saveExcel" value="Export" onClick={this.exportFile} />
                <input type="text" id="exportFileName" placeholder="Export file name" value="export.xlsx" />
                <SpreadSheets backColor={this.spreadBackColor} hostStyle={this.hostStyle} workbookInitialized={this.workbookInit}>
                    <Worksheet>
                    </Worksheet>
                </SpreadSheets>
            </div>
        )
    }
}
export default SpreadIoHome; 