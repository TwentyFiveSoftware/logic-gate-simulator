export default {
    INPUT: {
        inputs: 0,
        outputs: 1,
        name: 'INPUT',
        hasSwitch: true,
        transform: (inputs, switchEnabled) => switchEnabled,
        key: 'i'
    },
    OUTPUT: {
        inputs: 1,
        outputs: 0,
        name: 'OUTPUT',
        hasSwitch: false,
        transform: (inputs, __) => inputs[0],
        key: 'o'
    },
    NOT_GATE: {
        inputs: 1,
        outputs: 1,
        name: 'NOT-GATE',
        hasSwitch: false,
        transform: (inputs, _) => !inputs[0],
        key: 'n'
    },
    AND_GATE: {
        inputs: 2,
        outputs: 1,
        name: 'AND-GATE',
        hasSwitch: false,
        transform: (inputs, _) => inputs[0] && inputs[1],
        key: 'a'
    },
    OR_GATE: {
        inputs: 2,
        outputs: 1,
        name: 'OR-GATE',
        hasSwitch: false,
        transform: (inputs, _) => inputs[0] || inputs[1],
        key: 'o'
    },
    NAND_GATE: {
        inputs: 2,
        outputs: 1,
        name: 'NAND-GATE',
        hasSwitch: false,
        transform: (inputs, _) => !(inputs[0] && inputs[1]),
        key: 'A'
    },
};
