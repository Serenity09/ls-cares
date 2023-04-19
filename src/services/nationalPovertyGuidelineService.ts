const POVERTY_LEVEL_STANDARD_BASE = 12880;
const POVERTY_LEVEL_STANDARD_RATE = 4540;

const POVERTY_LEVEL_ALASKA_BASE = 16090;
const POVERTY_LEVEL_ALASKA_RATE = 5680;

const POVERTY_LEVEL_HAWAII_BASE = 14820;
const POVERTY_LEVEL_HAWAII_RATE = 5220;

export default function getPovertyLevel(
  stateAbbreviation: string,
  familySize: number
) {
  if (stateAbbreviation === "AK")
    return (
      POVERTY_LEVEL_ALASKA_BASE + POVERTY_LEVEL_ALASKA_RATE * (familySize - 1)
    );
  if (stateAbbreviation === "HI")
    return (
      POVERTY_LEVEL_HAWAII_BASE + POVERTY_LEVEL_HAWAII_RATE * (familySize - 1)
    );

  return (
    POVERTY_LEVEL_STANDARD_BASE + POVERTY_LEVEL_STANDARD_RATE * (familySize - 1)
  );
}
