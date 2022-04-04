import medicaidData from "../data/medicaid-data.json";

type MedicaidData = {
  medicaidTableJson: {
    columnNames: MedicaidRow;
    data: MedicaidRow[];
  };
  footnotesJson: string[];
};
type MedicaidRow = MedicaidParsedCell[];
type MedicaidParsedCell = {
  parsedString: string;
  parsedPercent: number | null;
  superScript: string | null;
};

export function getMedicaidData(
  usState?: string | null,
  age?: number | null,
  isPregnant?: boolean,
  familySize?: number | null
): MedicaidData {
  const data = JSON.parse(JSON.stringify(medicaidData)) as MedicaidData;

  const filters: ((row: MedicaidRow) => boolean)[] = [];

  if (usState)
    filters.push((row: MedicaidRow) => row[0].parsedString === usState);

  //TODO
  // if (age)
  //   filters.push((row: MedicaidDataRow[]) => )

  //TODO
  // if (isPregnant)
  //   filters.push(
  //     (row: MedicaidDataRow[]) =>
  //   )

  data.medicaidTableJson.data = data.medicaidTableJson.data.filter(
    (row: MedicaidRow) => {
      let inFilter = true,
        iFilter = 0;

      while (iFilter < filters.length && inFilter) {
        if (!filters[iFilter](row)) inFilter = false;

        iFilter++;
      }

      return inFilter;
    }
  );

  return data;
}
