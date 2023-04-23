import { getUSStates } from "./usStateService";

const POVERTY_LEVEL_STANDARD_BASE = 12880;
const POVERTY_LEVEL_STANDARD_RATE = 4540;

const POVERTY_LEVEL_ALASKA_BASE = 16090;
const POVERTY_LEVEL_ALASKA_RATE = 5680;

const POVERTY_LEVEL_HAWAII_BASE = 14820;
const POVERTY_LEVEL_HAWAII_RATE = 5220;

export function getPovertyLevels(familySize: number) {
  const usStates = getUSStates();
  const usStateFPLs = new Map<number, string[]>();

  for (const usState of usStates) {
    const usStateFPL = getPovertyLevel(usState.name, familySize);

    usStateFPLs.set(usStateFPL, [
      ...(usStateFPLs.get(usStateFPL) ?? []),
      usState.name,
    ]);
  }

  return usStateFPLs;
}

export function getPovertyLevel(stateName: string, familySize: number) {
  if (stateName === "Alaska")
    return (
      POVERTY_LEVEL_ALASKA_BASE + POVERTY_LEVEL_ALASKA_RATE * (familySize - 1)
    );
  if (stateName === "Hawaii")
    return (
      POVERTY_LEVEL_HAWAII_BASE + POVERTY_LEVEL_HAWAII_RATE * (familySize - 1)
    );

  return (
    POVERTY_LEVEL_STANDARD_BASE + POVERTY_LEVEL_STANDARD_RATE * (familySize - 1)
  );
}
