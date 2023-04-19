import medicaidData from "../data/medicaid-data.json";

/**
 * Responsible for typing the json struct. TODO once data is consumed from a microservice this type can be defined/depended on as part of the api
 */
type MedicaidData = {
  table: {
    columns: MedicaidColumn[];
    data: MedicaidCell[][];
  };
  footnotes: string[];
  scrapedOn: string;
};

type MedicaidCell = {
  parsedString: string;
  parsedPercent: number | null;
  footnoteID: string | null;
};

type MedicaidColumn = {
  parsedString: string;
  footnoteID: string | null;
};

export function getMedicaidData(): MedicaidData {
  return medicaidData;
}
