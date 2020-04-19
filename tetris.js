Object.prototype.isEmpty = function() {
    for(var key in this) {
        if(this.hasOwnProperty(key))
            return false;
    }
    return true;
};



var tetrisDom = document.querySelector("#tetris");
var nextTetrisDom = document.querySelector("#next-table");
var tetris = [];
var targetBlock = {};
var targetShape = [];
var nextTargetBlock = {};
var nextTargetShape = [];
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
let int = setInterval(oneSpaceDown, 500);

function initialize() {
    initWrapFrame();
    blockWarmUp();
    blockGenerate();
}

function blockFactory() {
    var targetBlock = JSON.parse(JSON.stringify(blocks[Math.floor(Math.random() * blocks.length)]));
    var targetShape = JSON.parse(JSON.stringify(targetBlock['shape'][Math.floor(Math.random() * targetBlock['shape'].length)]));
    return { targetBlock: targetBlock, targetShape: targetShape }
}

function blockWarmUp() {

      if(!nextTargetBlock.isEmpty() && nextTargetShape.length  > 0) { // 그 다음시
          targetBlock = JSON.parse(JSON.stringify(nextTargetBlock));
          targetShape = JSON.parse(JSON.stringify(nextTargetShape));

          blockGenerate();
      } else { // 초기시
          var target = blockFactory();
          targetBlock = target['targetBlock'];
          targetShape = target['targetShape'];
      }

  //  if(nextTargetBlock.length > 0 || nextTargetShape.isEmpty()) {
        var nextTarget = blockFactory();
        nextTargetBlock = nextTarget['targetBlock'];
        nextTargetShape = nextTarget['targetShape'];
        nextBlockGenerate();

 //   }



/*    targetBlock = (nextTargetBlock.length > 0) ? nextTargetBlock : JSON.parse(JSON.stringify(blocks[Math.floor(Math.random() * blocks.length)]));
    targetShape = (nextTargetShape.isEmpty()) ? nextTargetShape : JSON.parse(JSON.stringify(targetBlock['shape'][Math.floor(Math.random() * targetBlock['shape'].length)]));*/
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

function nextBlockGenerate() {
    var coordinateInjectedBlock = coordinateInjection(nextTargetShape, targetBlock['color'], exitCoordinates['x'], exitCoordinates['y']);

    (coordinateInjectedBlock || []).forEach((col, i) => {
        col.forEach((row, j) => {
            nextTargetShape[i].splice(row['y'], 1, { ...roomInject((row['value'] === 0) ? 'black' : row['color'], row['value']), ...{ control: true } });
        });
    });

    nextDraw();
}

function blockGenerate() {
   // tetrisRemove();

   // targetBlock = blocks[2];
   // targetShape = targetBlock['shape'][0];
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

function coordinateInjection(shape, color, x, y) {
    var coordinateInjectedBlock = (shape || []).map((col, i) => {
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

function nextTetrisRemove() {
    var len = nextTetrisDom.children.length;
    for(let i = 0;  i < len; i++) {
        nextTetrisDom.children[0].remove();
    }
}

function nextDraw() {
    nextTetrisRemove();
    let fragment = document.createDocumentFragment();
    nextTargetShape.forEach((col, i) => {

        let tr = document.createElement('tr');
        fragment.appendChild(tr);
        col.forEach((row, j) => {
            let td = document.createElement('td');
            td.className = (row['value']) ? row.color : 'black';

            tr.appendChild(td);
        });
    });

    console.log("??fragment", fragment)
    nextTetrisDom.appendChild(fragment);
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


    let i = 0;
    let reverseCloneTetrisColLen = reverseCloneTetris.length;
    for(; i < reverseCloneTetrisColLen ; i++) {
        if(checkTheBottom(reverseCloneTetris[i]) && i === 0) {
            console.log("밑바닥 확인");

            removeControllerInitData(reverseCloneTetris);
            tetris = reverseCloneTetris.reverse();
            clearInterval(int);
            blockWarmUp();
            break;
        }

        let j = 0;
        let reverseCloneTetrisRowLen = reverseCloneTetris[i].length;
        for (; j < reverseCloneTetrisRowLen; j++) {
            if (reverseCloneTetris[i][j]['control']) {
                if (i - 1 >= 0) {
                    reverseCloneTetris[i - 1].splice(j, 1, reverseCloneTetris[i][j]);
                    reverseCloneTetris[i].splice(j, 1, {...roomInject("black", 0)});
                }
            }
        }
    }

    console.log("reverseCloneTetris", reverseCloneTetris)
    tetris = reverseCloneTetris.reverse();

    draw();
}

function checkTheBottom(checkArray) {
    return (checkArray || []).some((data) => {
        return data.value === 1
    })
}

function removeControllerInitData(reverseCloneTetris) {
    (reverseCloneTetris || []).forEach((col, i) => {
        col.forEach((row, j) => {
            reverseCloneTetris[i][j] = { ...roomInject(row.color, row.value) };
        });
    });
}

function roomInject(color, value) {
    return { color: color, value: value };
}
