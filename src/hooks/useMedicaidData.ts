import { useEffect, useState } from "react";
import medicaidData from "../data/medicaid-data.json";

type MedicaidColumn = {
  parsedString: string;
  footnoteID: string | null;

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
  footnoteID: string | null;

  column: MedicaidColumn;
};

export function useMedicaidData() {
  const [columns, setColumns] = useState<MedicaidColumn[]>([]);
  const [rows, setRows] = useState<MedicaidRow[]>([]);

  //process columns and rows into a more queryable form, and link corresponding columns to each cell
  useEffect(() => {
    const columns: MedicaidColumn[] = medicaidData.table.columns.map(
      (rawColumn) => {
        const column: MedicaidColumn = {
          parsedString: rawColumn.parsedString,
          footnoteID: rawColumn.footnoteID,

          isState: false,
          ageMinimum: 0,
          ageMaximum: null,
          isForPregnantWomen: false,
          isFamily: false,
        };

        column.isState = column.parsedString.toLowerCase().includes("state");

        column.ageMinimum = 19;
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
        } else if (column.parsedString.toLowerCase().includes("chip")) {
          column.ageMinimum = 0;

          if (!column.parsedString.toLowerCase().includes("pregnant")) {
            column.ageMaximum = 19;
          }
        }

        column.isForPregnantWomen = column.parsedString
          .toLowerCase()
          .includes("pregnant");

        column.isFamily =
          column.parsedString.toLowerCase().includes("parent") ||
          column.parsedString.toLowerCase().includes("caregiver");

        return column;
      }
    );

    setColumns(columns);
  }, [medicaidData.table.columns]);
  useEffect(() => {
    if (columns.length === 0) return;

    const stateColumnId = columns.findIndex((column) => column.isState);
    if (stateColumnId != 0) throw "State must be first item in json array";

    const rows: MedicaidRow[] = medicaidData.table.data.map((rawRow) => {
      return {
        state: rawRow[stateColumnId].parsedString,
        data: rawRow.slice(stateColumnId + 1).map((rawCell, iColumn) => {
          return {
            parsedString: rawCell.parsedString,
            parsedPercent: rawCell.parsedPercent,
            footnoteID: rawCell.footnoteID,

            column: columns[iColumn],
          };
        }),
      };
    });

    setRows(rows);
  }, [medicaidData.table.data, columns]);

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
    return medicaidData.footnotes;
  };

  return {
    getColumns,
    getRows,
    getFootnotes,
  };
}
