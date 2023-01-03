import medicaidData from "../data/medicaid-data.json";

/**
 * Responsible for typing the json struct. TODO once data is consumed from a microservice this type can be defined/depended on as part of the api
 */
type MedicaidData = {
  medicaidTableJson: {
    columnNames: MedicaidRow;
    data: MedicaidRow[];
  };
  footnotesJson: string[];
};
type MedicaidRow = MedicaidCell[];
type MedicaidCell = {
  parsedString: string;
  parsedPercent: number | null;
  superScript: string | null;
};

export function getMedicaidData(
): MedicaidData {
  return medicaidData;
}
