import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import { useDemoData } from "@mui/x-data-grid-generator";
const VISIBLE_FIELDS = ["name", "rating", "country", "dateCreated", "isAdmin"];

const DataTable = ({ rows, columns }) => {
    const { data } = useDemoData({
        dataSet: "Employee",
        visibleFields: VISIBLE_FIELDS,
        rowLength: 100,
    });

    // Otherwise filter will be applied on fields such as the hidden column id

    return (
        <DataGrid
            className="data_table"
            getRowId={(row) => row._id}
            rows={rows}
            columns={columns}
            autoHeight
            pageSize={10}
            disableSelectionOnClick
            components={{ Toolbar: GridToolbar }}
            componentsProps={{
                toolbar: {
                    showQuickFilter: true,
                    quickFilterProps: { debounceMs: 500 },
                },
            }}
        />
    );
};

export default DataTable;
