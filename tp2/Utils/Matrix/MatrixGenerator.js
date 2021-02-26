const translateMatrix = (x,y,z) => 
    [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        x, y, z, 1,
    ]

const rotateZMatrix = (degree) => 
    [
        Math.cos(degree), Math.sin(degree), 0, 0,
        -Math.sin(degree), Math.cos(degree), 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ];

const mirrorYZ = () => 
    [
        -1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1,
    ];

export { 
    translateMatrix,
    rotateZMatrix,
    mirrorYZ
};