var tetrisDom = document.querySelector("#tetris");
var tetris = [];
var targetShape = [];
var targetBlock = {};
var exitCoordinates = { x: 0, y: 3 };
var blocks = [
    {
        code: 'I',
        color: 'white',
        shape: [
            [
                [0, 0, 0, 0],
                [1, 1, 1, 1],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ],
            [
                [0, 0, 1, 0],
                [0, 0, 1, 0],
                [0, 0, 1, 0],
                [0, 0, 1, 0]
            ]
        ]
    },
    {
        code: 'J',
        color: 'blue',
        shape: [
            [
                [0, 0, 0, 0],
                [1, 0, 0, 0],
                [1, 1, 1, 0],
                [0, 0, 0, 0]
            ],
            [
                [0, 0, 0, 0],
                [1, 1, 0, 0],
                [1, 0, 0, 0],
                [1, 0, 0, 0]
            ],
            [
                [0, 0, 0, 0],
                [1, 1, 1, 0],
                [0, 0, 1, 0],
                [0, 0, 0, 0]
            ],
            [
                [0, 0, 1, 0],
                [0, 0, 1, 0],
                [0, 1, 1, 0],
                [0, 0, 0, 0]
            ]
        ]
    },
    {
        code: 'L',
        color: 'orange',
        shape: [
            [
                [0, 0, 1, 0],
                [1, 1, 1, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ],
            [
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 1, 0],
                [0, 0, 0, 0]
            ],
            [
                [0, 0, 0, 0],
                [0, 1, 1, 1],
                [0, 1, 0, 0],
                [0, 0, 0, 0]
            ],
            [
                [0, 0, 0, 0],
                [0, 1, 1, 0],
                [0, 0, 1, 0],
                [0, 0, 1, 0]
            ]
        ]
    },
    {
        code: 'O',
        color: 'yellow',
        shape: [
            [
                [0, 0, 0, 0],
                [0, 1, 1, 0],
                [0, 1, 1, 0],
                [0, 0, 0, 0]
            ]
        ]
    },
    {
        code: 'S',
        color: 'green',
        shape: [
            [
                [0, 0, 0, 0],
                [0, 0, 1, 1],
                [0, 1, 1, 0],
                [0, 0, 0, 0]
            ],
            [
                [0, 1, 0, 0],
                [0, 1, 1, 0],
                [0, 0, 1, 0],
                [0, 0, 0, 0]
            ],
            [
                [0, 0, 0, 0],
                [0, 1, 1, 0],
                [1, 1, 0, 0],
                [0, 0, 0, 0]
            ],
            [
                [0, 1, 0, 0],
                [0, 1, 1, 0],
                [0, 0, 1, 0],
                [0, 0, 0, 0]
            ]
        ]
    },
    {
        code: 'T',
        color: 'violet',
        shape: [
            [
                [0, 0, 0, 0],
                [0, 1, 0, 0],
                [1, 1, 1, 0],
                [0, 0, 0, 0]
            ],
            [
                [0, 1, 0, 0],
                [0, 1, 1, 0],
                [0, 1, 0, 0],
                [0, 0, 0, 0]
            ],
            [
                [0, 0, 0, 0],
                [1, 1, 1, 0],
                [0, 1, 0, 0],
                [0, 0, 0, 0]
            ],
            [
                [0, 1, 0, 0],
                [1, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 0, 0, 0]
            ]
        ]
    },
    {
        code: 'Z',
        color: 'red',
        shape: [
            [
                [0, 0, 0, 0],
                [1, 1, 0, 0],
                [0, 1, 1, 0],
                [0, 0, 0, 0]
            ],
            [
                [0, 0, 1, 0],
                [0, 1, 1, 0],
                [0, 1, 0, 0],
                [0, 0, 0, 0]
            ],
            [
                [0, 0, 0, 0],
                [0, 1, 1, 0],
                [0, 0, 1, 1],
                [0, 0, 0, 0]
            ],
            [
                [0, 0, 0, 0],
                [0, 0, 1, 0],
                [0, 1, 1, 0],
                [0, 1, 0, 0]
            ]
        ]
    },

];


initialize();
let int = setInterval(oneSpaceDown, 2000);

function initialize() {
    initWrapFrame();
    blockGenerate();
}

function initWrapFrame() {
    const fragment = document.createDocumentFragment();
    [...Array(20).keys()].forEach((col, i) => {
        const tr = document.createElement('tr');
        fragment.appendChild(tr);
        [...Array(10).keys()].forEach((row, j) => {
            const td = document.createElement('td');
            tr.appendChild(td);
        });
        const column = Array(10).fill(0);
        tetris.push(column.map(d => {
            return roomInject('black', d);
        }));
    });
    tetrisDom.appendChild(fragment);



    console.log("tetris", tetris)
    console.log("tetrisDom", tetrisDom)
}

function blockGenerate() {
   // tetrisRemove();

    targetBlock = blocks[2];
    targetShape = targetBlock['shape'][0];
    console.log("targetBlock", targetBlock)
    console.log("targetShape", targetShape)

    var coordinateInjectedBlock = coordinateInjection(targetShape, targetBlock['color'], exitCoordinates['x'], exitCoordinates['y']);

    (coordinateInjectedBlock || []).forEach((col, i) => {
        col.forEach((row, j) => {
            tetris[i].splice(row['y'], 1, { ...roomInject((row['value'] === 0) ? 'black' : row['color'], row['value']), ...{ control: true } });
        });
    });

    console.log("result targetShape >>> ", targetShape)
    console.log("result tetris >>> ", tetris)

    draw();

}

function coordinateInjection(block, color, x, y) {
    var coordinateInjectedBlock = (block || []).map((col, i) => {
        return col.map((row, j) => {
            var coordinate = { x: i + x, y: j + y };
            return { ...coordinate, ...roomInject((row) ? color : 'black', row) };
        });
    });


    console.log("coordinateInjectedBlock", coordinateInjectedBlock)
    return coordinateInjectedBlock;
}

function tetrisRemove() {
    var len = tetrisDom.children.length;
    for(let i = 0;  i < len; i++) {
        tetrisDom.children[0].remove();
    }
}

function draw() {
    tetrisRemove();
    let fragment = document.createDocumentFragment();
    tetris.forEach((col, i) => {

        let tr = document.createElement('tr');
        fragment.appendChild(tr);
        col.forEach((row, j) => {
            let td = document.createElement('td');
            td.className = (row['value']) ? row.color : 'black';

            tr.appendChild(td);
        });
    });

    console.log("??fragment", fragment)
    tetrisDom.appendChild(fragment);
}

function oneSpaceDown() {
    console.log(" oneSpaceDown ")
    var cloneTetris = JSON.parse(JSON.stringify(tetris));
    var reverseCloneTetris = cloneTetris.reverse();
    console.log("reverseCloneTetris", reverseCloneTetris)

    tetris.forEach((col, i) => {

   //     if()

        //tetris[i]
        col.forEach((row, j) => {
            if(row['control']) {
              //  tetris[i + 1];
            }
        });
    });
}

function roomInject(color, value) {
    return { color: color, value: value };
}
