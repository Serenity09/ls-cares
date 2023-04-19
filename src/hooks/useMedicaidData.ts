import { useEffect, useState } from "react";
import medicaidData from "../data/medicaid-data.json";

type MedicaidColumn = {
  parsedString: string;
  superScript: string | null;

  isState: boolean;
  ageMinimum: number;
  ageMaximum: number | null;
  isForPregnantWomen: boolean;
  isFamily: boolean;
};

type MedicaidRow = {
  state: string;
  data: MedicaidCell[];
};
type MedicaidCell = {
  parsedString: string;
  parsedPercent: number | null;
  superScript: string | null;

  column: MedicaidColumn;
};

export function useMedicaidData() {
  const [columns, setColumns] = useState<MedicaidColumn[]>([]);
  const [rows, setRows] = useState<MedicaidRow[]>([]);

  //process columns and rows into a more queryable form, and link corresponding columns to each cell
  useEffect(() => {
    const columns: MedicaidColumn[] =
      medicaidData.medicaidTableJson.columnNames.map((rawColumn) => {
        const column: MedicaidColumn = {
          parsedString: rawColumn.parsedString,
          superScript: rawColumn.superScript,

          isState: rawColumn.parsedString.toLowerCase().includes("state"),
          ageMinimum: 19,
          ageMaximum: null,
          isForPregnantWomen: rawColumn.parsedString
            .toLowerCase()
            .includes("pregnant"),
          isFamily: false,
        };

        // Determine age range
        if (column.parsedString.toLowerCase().includes("ages")) {
          const splitColumnName = column.parsedString.split(" ");
          const strAgeRange = splitColumnName.filter(
            (strSplitName) => strSplitName.indexOf("-") >= 0
          );

          if (strAgeRange.length != 1)
            throw "Invalid age range: multiple elements containing -";
          const splitAgeRange = strAgeRange[0].split("-");
          if (splitAgeRange.length != 2)
            throw "Invalid age range: does not contain a min and max";

          column.ageMinimum = parseInt(splitAgeRange[0]);
          column.ageMaximum = parseInt(splitAgeRange[1]);
        }

        // Check for isFamily
        column.isFamily =
          column.parsedString.toLowerCase().includes("parent") ||
          column.parsedString.toLowerCase().includes("caregiver");

        return column;
      });

    setColumns(columns);
  }, [medicaidData.medicaidTableJson.columnNames]);
  useEffect(() => {
    if (columns.length === 0) return;

    const stateColumnId = columns.findIndex((column) => column.isState);
    if (stateColumnId != 0) throw "State must be first item in json array";

    const rows: MedicaidRow[] = medicaidData.medicaidTableJson.data.map(
      (rawRow) => {
        return {
          state: rawRow[stateColumnId].parsedString,
          data: rawRow.slice(stateColumnId + 1).map((rawCell, iColumn) => {
            return {
              parsedString: rawCell.parsedString,
              parsedPercent: rawCell.parsedPercent,
              superScript: rawCell.superScript,

              column: columns[iColumn],
            };
          }),
        };
      }
    );

    setRows(rows);
  }, [medicaidData.medicaidTableJson.data, columns]);

  const getColumns = (
    age?: number | null,
    isPregnant?: boolean,
    familySize?: number | null
  ): MedicaidColumn[] => {
    const filters: ((column: MedicaidColumn) => boolean)[] = [];

    if (age)
      filters.push(
        (column) =>
          column.isState ||
          (column.ageMinimum <= age &&
            (column.ageMaximum == null || column.ageMaximum >= age))
      );

    if (familySize && familySize == 1)
      filters.push((column) => column.isState || !column.isFamily);

    if (familySize && familySize > 1)
      filters.push((column) => column.isState || column.isFamily);
    else if (isPregnant)
      filters.push(
        (column) => column.isState || column.isForPregnantWomen == isPregnant
      );

    return columns.filter((column) => {
      let inFilter = true,
        iFilter = 0;

      while (iFilter < filters.length && inFilter) {
        if (!filters[iFilter](column)) inFilter = false;

        iFilter++;
      }

      return inFilter;
    });
  };
  const getRows = (
    usState?: string | null,
    filteredColumns?: MedicaidColumn[]
  ): MedicaidRow[] => {
    let filteredRows = rows;
    if (usState)
      filteredRows = filteredRows.filter((row) => row.state === usState);

    if (filteredColumns && columns.length != filteredColumns.length) {
      filteredRows = filteredRows.map((filteredRow) => {
        return {
          state: filteredRow.state,
          data: filteredRow.data.filter(
            (cell) =>
              filteredColumns.findIndex(
                (filteredColumn) =>
                  filteredColumn.parsedString == cell.column.parsedString
              ) >= 0
          ),
        };
      });
    }

    return filteredRows;
  };
  const getFootnotes = (): string[] => {
    return medicaidData.footnotesJson;
  };

  return {
    getColumns,
    getRows,
    getFootnotes,
  };
}
