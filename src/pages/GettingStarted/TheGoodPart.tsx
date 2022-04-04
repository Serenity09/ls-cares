import { useUserContext } from "../../user/UserContext";
import { getMedicaidData } from "../../services/medicaidDataService";

import { DataGrid } from "@mui/x-data-grid";
import { useMemo } from "react";

export default function TheGoodPart() {
  const { user } = useUserContext();
  const medicaidData = getMedicaidData();

  //TODO
  //add more metadata to scrape service for columns, indicating (isAge, ageLowerBound, ageUpperBound), (isPregnant), (isIndividual)
  //use flow chart to determine text generation and variations for individual
  //repeat for family

  //TODO remove
  //datagrid placeholder -- in final product the table will only be available as a reference. part of the goal is to present the table as a full paragraph, made relevant to the user
  const columns = useMemo(
    () =>
      medicaidData.medicaidTableJson.columnNames.map((column, columnID) => {
        return {
          field: `column${columnID}`,
          headerName: column.parsedString,
          flex: 1,
        };
      }),
    [medicaidData]
  );
  const rows = useMemo(
    () =>
      medicaidData.medicaidTableJson.data.map((data, rowID) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const row: any = { id: rowID };

        columns.forEach((column, columnID) => {
          row[column.field] = data[columnID].parsedString;
        });

        return row;
      }),
    [medicaidData, columns]
  );

  const medicaidData2 = getMedicaidData(
    user.usState,
    user.age,
    user.isPregnant,
    user.familySize
  );
  console.log("filtered data", medicaidData2);

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

      <DataGrid columns={columns} rows={rows} autoHeight={true} />
    </>
  );
}
