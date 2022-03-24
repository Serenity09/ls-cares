import { useUserContext } from "../../user/UserContext";
import { getMedicaidData } from "../../services/medicaidDataService";

import { DataGrid } from "@mui/x-data-grid";

export default function TheGoodPart() {
  const { user } = useUserContext();
  const medicaidData = getMedicaidData();

  const columns = medicaidData.medicaidTableJson.columnNames.map(
    (column, columnID) => {
      return {
        field: `column${columnID}`,
        headerName: column.parsedString,
      };
    }
  );
  const rows = medicaidData.medicaidTableJson.data.map((data, rowID) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const row: any = { id: rowID };

    columns.forEach((column, columnID) => {
      row[column.field] = data[columnID].parsedString;
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

      <DataGrid columns={columns} rows={rows} sx={{ height: "70vw" }} />
    </>
  );
}
