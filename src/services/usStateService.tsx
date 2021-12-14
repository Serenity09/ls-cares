import usStates from '../data/us-states.json';

export function getUSStates() {
    return usStates;
}

export function getUSStateByName(stateName: string | null) {
    return usStates.find((usState) => usState.name === stateName);
}
export function getUSStateByAbbreviation(stateAbbreviation: string | null) {
    return usStates.find((usState) => usState.abbreviation === stateAbbreviation);
}