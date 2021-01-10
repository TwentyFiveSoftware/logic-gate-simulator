export default {
    INPUT: {
        inputs: 0,
        outputs: 1,
        name: 'INPUT',
        hasSwitch: true,
        transform: (inputs, switchEnabled) => switchEnabled,
        key: 'i',
        svg: null
    },
    OUTPUT: {
        inputs: 1,
        outputs: 0,
        name: 'OUTPUT',
        hasSwitch: false,
        transform: (inputs, __) => inputs[0],
        key: 'u',
        svg: null
    },
    NOT_GATE: {
        inputs: 1,
        outputs: 1,
        name: 'NOT-GATE',
        hasSwitch: false,
        transform: (inputs, _) => !inputs[0],
        key: 'n',
        svg: 'not.svg'
    },
    AND_GATE: {
        inputs: 2,
        outputs: 1,
        name: 'AND-GATE',
        hasSwitch: false,
        transform: (inputs, _) => inputs[0] && inputs[1],
        key: 'a',
        svg: 'and.svg'
    },
    NAND_GATE: {
        inputs: 2,
        outputs: 1,
        name: 'NAND-GATE',
        hasSwitch: false,
        transform: (inputs, _) => !(inputs[0] && inputs[1]),
        key: 'A',
        svg: 'nand.svg'
    },
    OR_GATE: {
        inputs: 2,
        outputs: 1,
        name: 'OR-GATE',
        hasSwitch: false,
        transform: (inputs, _) => inputs[0] || inputs[1],
        key: 'o',
        svg: 'or.svg'
    },
    NOR_GATE: {
        inputs: 2,
        outputs: 1,
        name: 'NOR-GATE',
        hasSwitch: false,
        transform: (inputs, _) => !(inputs[0] || inputs[1]),
        key: 'N',
        svg: 'nor.svg'
    },
    XOR_GATE: {
        inputs: 2,
        outputs: 1,
        name: 'XOR-GATE',
        hasSwitch: false,
        transform: (inputs, _) => inputs[0] ^ inputs[1],
        key: 'x',
        svg: 'xor.svg'
    },
    XNOR_GATE: {
        inputs: 2,
        outputs: 1,
        name: 'XNOR-GATE',
        hasSwitch: false,
        transform: (inputs, _) => !(inputs[0] ^ inputs[1]),
        key: 'X',
        svg: 'xnor.svg'
    },
};
