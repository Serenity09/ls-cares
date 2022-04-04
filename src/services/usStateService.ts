import usStates from "../data/us-states.json";

export type USState = {
  name: string;
  abbreviation: string;
};

export function getUSStates(): USState[] {
  return usStates;
}

export function getUSStateByName(
  stateName: string | null
): USState | undefined {
  return usStates.find((usState) => usState.name === stateName);
}
export function getUSStateByAbbreviation(
  stateAbbreviation: string | null
): USState | undefined {
  return usStates.find((usState) => usState.abbreviation === stateAbbreviation);
}
