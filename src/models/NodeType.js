export default {
    INPUT: {
        inputs: 0,
        outputs: 1,
        name: 'INPUT',
        hasSwitch: true,
        transform: (inputs, switchEnabled) => switchEnabled
    },
    NOT_GATE: {
        inputs: 1,
        outputs: 1,
        name: 'NOT-GATE',
        hasSwitch: false,
        transform: (inputs, _) => !inputs[0]
    },
    AND_GATE: {
        inputs: 2,
        outputs: 1,
        name: 'AND-GATE',
        hasSwitch: false,
        transform: (inputs, _) => inputs[0] && inputs[1]
    },
};
