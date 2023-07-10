import React, { useState } from "react";
import { read, utils, /* writeFile */ } from 'xlsx';

const ImportExcel = () => {
    const [movies, setMovies] = useState(['']);
    //const [columns, setColumns] = useState(['']);
    const handleImport = ($event) => {
        const files = $event.target.files;
        if (files.length) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                const wb = read(event.target.result);
                const sheets = wb.SheetNames;

                if (sheets.length) {
                    const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
                    setMovies(rows)
                }
            }

            reader.readAsArrayBuffer(file);

        }

    }

    /* const handleExport = () => {
        const headings = [[
            'ID',
            'Type',            
        ]];
        const wb = utils.book_new();
        const ws = utils.json_to_sheet([]);
        utils.sheet_add_aoa(ws, headings);
        utils.sheet_add_json(ws, movies, { origin: 'A2', skipHeader: true });
        utils.book_append_sheet(wb, ws, 'Report');
        writeFile(wb, 'Movie Report.xlsx');
    } */

    return (
        <>
            <div className="row mb-2 mt-5">
                <div className="col-sm-6 offset-3">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="input-group">
                                <div className="custom-file">
                                    <input type="file" name="file" className="custom-file-input" id="inputGroupFile" required onChange={handleImport}
                                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
                                    {/* <label className="custom-file-label" htmlFor="inputGroupFile">Dosya Seçiniz</label> */}
                                </div>
                            </div>
                        </div>                      
                    </div>
                </div>
            </div>
            <div /* className="row" */>
                <div /* className="col-sm-6 offset-3" */>
                    <table /* className="table" */>
                        <thead>
                            {/*  <tr> 
                                                       
                                {console.log("başlık-keys:", Object.keys(movies[0]))}     
                                {
                                    Object.keys(movies[0]).map((column)=>(
                                        <th scope="col" align="left">{column}</th>
                                    ))
                                }                          
                                {/* <th scope="col" align="left">ID</th>
                                <th scope="col" align="left">TYPE</th>  

                        </tr> */}
                        </thead>
                        <tbody>
                            <tr>

                                {console.log("başlık-keys:", Object.keys(movies[0]))}
                                {
                                    Object.keys(movies[0]).map((column) => (
                                        <th scope="col" align="left">{column}</th>
                                    ))
                                }
                                {/* <th scope="col" align="left">ID</th>
                                                       <th scope="col" align="left">TYPE</th>  */}

                            </tr>
                            {
                                movies.length
                                    ?
                                    movies.map((movie, index) => (
                                        <tr key={index}>
                                            {/* <th scope="row">{ index + 1 }</th> */}
                                            {/* <td align="left">{ movie.Id }</td> */}
                                            {/* <td align="left">{ movie.type }</td>          */}
                                            <th align="left">
                                                {
                                                    Object.values(movies[index])
                                                }
                                            </th>
                                        </tr>
                                    ))
                                    :
                                    <tr>
                                        <td colSpan="5" className="text-center">Dosya Seçilmedi</td>
                                    </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>

    );
};

/* ImportExcel.propTypes = {
    columns: PropTypes.object, 
} */

export default ImportExcel;
