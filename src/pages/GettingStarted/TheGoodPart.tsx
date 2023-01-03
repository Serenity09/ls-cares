import { useUserContext } from "../../user/UserContext";
import { useMedicaidData } from "../../hooks/useMedicaidData";

import { DataGrid } from "@mui/x-data-grid";

export default function TheGoodPart() {
  const { user } = useUserContext();
  const { getColumns, getRows } = useMedicaidData();

  //TODO
  //use flow chart to determine text generation and variations for individual
  //repeat for family

  //TODO remove
  //datagrid placeholder -- in final product the table will only be available as a reference. part of the goal is to present the table as a full paragraph, made relevant to the user
  const filteredColumns = getColumns(user.age, user.isPregnant, user.familySize);
  const tableColumns = filteredColumns.map((column, columnID) => {
    return {
      field: `column${columnID}`,
      headerName: column.parsedString,
      flex: 1,
    };
  });

  const filteredRows = getRows(user.usState, filteredColumns);
  const tablerows = filteredRows.map((filteredRow, rowID) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const row: any = { id: rowID };

    row["column0"] = filteredRow.state;
    tableColumns.forEach((tableColumn, columnID) => {
      if (columnID > 0)
        row[tableColumn.field] = filteredRow.data[columnID - 1].parsedString;
    });

    return row;
  });

  return (
    <>
      <div>
        {user.usState +
          " " +
          user.age +
          " " +
          user.projectedIncome +
          " " +
          user.familySize +
          " " +
          user.isPregnant}
      </div>

      <DataGrid columns={tableColumns} rows={tablerows} autoHeight={true} />
    </>
  );
}
