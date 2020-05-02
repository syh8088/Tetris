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
var targetShapeNumber = 0;
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

let int;
initialize();
int = setInterval(oneSpaceDown, 500);

function initialize() {
    initWrapFrame();
    blockWarmUp();
    blockGenerate();
}

function blockFactory() {
    var targetBlock = JSON.parse(JSON.stringify(blocks[Math.floor(Math.random() * blocks.length)]));
    targetShapeNumber = Math.floor(Math.random() * targetBlock['shape'].length);
    var targetShape = JSON.parse(JSON.stringify(targetBlock['shape'][targetShapeNumber]));
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



   // console.log("tetris", tetris)
   // console.log("tetrisDom", tetrisDom)
}

function nextBlockGenerate() {
    var nextTargetShape1 = JSON.parse(JSON.stringify(nextTargetShape));
    var coordinateInjectedBlock = coordinateInjection(nextTargetShape1, nextTargetBlock['color'], exitCoordinates['x'], exitCoordinates['y']);

    (coordinateInjectedBlock || []).forEach((col, i) => {
        col.forEach((row, j) => {
            //nextTargetShape[i].splice(row['y'], 1, { ...roomInject((row['value'] === 0) ? 'black' : row['color'], row['value']), ...{ control: true } });
            nextTargetShape1[i].splice(row['y'], 1, { ...roomInject((row['value'] === 0) ? 'black' : row['color'], row['value']) });
        });
    });

    nextDraw(nextTargetShape1);
}

function blockGenerate() {
   // tetrisRemove();

   // targetBlock = blocks[2];
   // targetShape = targetBlock['shape'][0];
   // console.log("blockGenerate > targetBlock", targetBlock)
   // console.log("blockGenerate > targetShape", targetShape)


    var coordinateInjectedBlock = coordinateInjection(targetShape, targetBlock['color'], exitCoordinates['x'], exitCoordinates['y']);
    console.log("blockGenerate > coordinateInjectedBlock", coordinateInjectedBlock);
    (coordinateInjectedBlock || []).forEach((col, i) => {
        col.forEach((row, j) => {
            // TODO control
           // tetris[i].splice(row['y'], 1, { ...roomInject((row['value'] === 0) ? 'black' : row['color'], row['value']), ...(row['value'] === 0) ? {} : { control: true } });
            tetris[i].splice(row['y'], 1, { ...roomInject((row['value'] === 0) ? 'black' : row['color'], row['value']), ...{ control: true } });
        });
    });

   // console.log("result targetShape >>> ", targetShape)
    console.log("result tetris >>> ", tetris);

    draw();
}

function coordinateInjection(shape, color, x, y) {
    var coordinateInjectedBlock = (shape || []).map((col, i) => {
        return col.map((row, j) => {
            var coordinate = { x: i + x, y: j + y };
            return { ...coordinate, ...roomInject((row) ? color : 'black', row) };
        });
    });


    //console.log("coordinateInjectedBlock", coordinateInjectedBlock)
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

function nextDraw(nextTargetShape) {
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

   // console.log("??fragment", fragment)
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

    //console.log("??fragment", fragment)
    tetrisDom.appendChild(fragment);
}

function oneSpaceDown() {
    var cloneTetris = JSON.parse(JSON.stringify(tetris));
    var reverseCloneTetris = cloneTetris.reverse();


    let i = 0;
    let reverseCloneTetrisColLen = reverseCloneTetris.length;
    for(; i < reverseCloneTetrisColLen ; i++) {
        if(checkTheBottom(reverseCloneTetris, reverseCloneTetris[i], i)) {
            console.log("===============밑바닥 확인===============");

            removeControllerInitData(reverseCloneTetris);
            tetris = reverseCloneTetris.reverse();
            //clearInterval(int);
            blockWarmUp();
            //int = setInterval(oneSpaceDown, 500);
            return false;
        }

        let j = 0;
        let reverseCloneTetrisRowLen = reverseCloneTetris[i].length;
        for (; j < reverseCloneTetrisRowLen; j++) {
            if (reverseCloneTetris[i][j]['control']) {
                if (i - 1 >= 0) {
                    if(reverseCloneTetris[i - 1][j]['value'] === 0) {
                        reverseCloneTetris[i - 1].splice(j, 1, reverseCloneTetris[i][j]);
                    } else {

                    }

                   // reverseCloneTetris[i].splice(j, 1, {...roomInject("black", 0)});
                    reverseCloneTetris[i].splice(j, 1, {...roomInject("black", 0) });
                }
            } /*else {
                reverseCloneTetris[i].splice(j, 1, {...roomInject("black", 0) });
            }*/
        }
    }

   //console.log("reverseCloneTetris", reverseCloneTetris)
    tetris = reverseCloneTetris.reverse();
    draw();
}

function checkTheBottom(reverseCloneTetris, checkArray, index) {
    //return (checkArray || []).some((col, i) => {
       // return col.some((row, j) => {
        return checkArray.some((row, j) => {
            //return (row['control'] === true && row.value === 1 && i > 0 && checkArray[i - 1][j]['value'] === 1 && checkArray[i - 1][j]['control'] !== true) || (i === 0 && row['control'] === true && row.value === 1);
            return (row['control'] === true && row.value === 1 && index > 0 && reverseCloneTetris[index - 1][j]['value'] === 1 && reverseCloneTetris[index - 1][j]['control'] !== true) || (index === 0 && row['control'] === true && row.value === 1);
        });
  //  })
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

window.addEventListener("keydown", function(e) {

    switch (e.code) {
        case 'ArrowLeft': { // 왼쪽
            console.log("ArrowLeft");
            console.log("isMovable", isMovable('left'));
            if(isMovable('left')) {
                blockMove('left');
            }
            break;
        }

        case 'ArrowRight': { // 오른쪽
            console.log("ArrowRight");
            console.log("isMovable", isMovable('right'));
            if(isMovable('right')) {
                blockMove('right');
            }
            break;
        }
    }
});

window.addEventListener('keyup', (e) => {
    switch (e.code) {
        case 'ArrowUp': { // 방향 전환
            console.log("ArrowUp");
            blockChangeDirection();

        }
    }
});

function getTargetBlockCoordinates(cloneTetris) {

    var coordinates = {};

    let i = 0;
    let cloneTetrisColLen = cloneTetris.length;
    for(; i < cloneTetrisColLen ; i++) {
        let j = 0;
        let cloneTetrisColLenRowLen = cloneTetris[i].length;
        for (; j < cloneTetrisColLenRowLen; j++) {
            if(cloneTetris[i][j]['control']) {
                return coordinates = { x: i, y: j };
            }
        }
    }
}

// 블럭 방향 전환
function blockChangeDirection() {
    console.log("targetBlock", targetBlock);
    console.log("targetShape", targetShape);
    console.log("targetShapeNumber", targetShapeNumber);

    targetShapeNumber = (targetBlock.shape.length - 1 <= targetShapeNumber) ? 0 : targetShapeNumber + 1;
    targetShape = targetBlock['shape'][targetShapeNumber];
    console.log("targetShape1", targetShape);

   // var cloneTetris = JSON.parse(JSON.stringify(tetris));
    var coordinates = getTargetBlockCoordinates(tetris);

    //var reverseCloneTetris = cloneTetris.reverse();
    var coordinateInjectedBlock = coordinateInjection(targetShape, targetBlock['color'], coordinates['x'], coordinates['y']);
    (tetris || []).forEach((col, i) => {
        col.forEach((row, j) => {
            if(tetris[i][j]['value'] !== 1 || tetris[i][j]['control'] === true) tetris[i][j] = { ...roomInject('black', 0) };
        });
    });

    (coordinateInjectedBlock || []).forEach((col, i) => {
        col.forEach((row, j) => {
            tetris[row['x']].splice(row['y'], 1, { ...roomInject((row['value'] === 0) ? 'black' : row['color'], row['value']), ...{ control: true } });
        });
    });



    console.log("coordinateInjectedBlock", coordinateInjectedBlock);


    //var selectedBlock = (blocks || []).find(data => data['code'] === targetBlock['code']);

   // console.log("selectedBlock", selectedBlock);


  //  tetris = cloneTetris;
    draw();
}

// 블럭 좌우 이동
function blockMove(direction) {
    var cloneTetris = JSON.parse(JSON.stringify(tetris));
    (cloneTetris || []).forEach((col, i) => {
        if(direction === 'right') {
            col.reverse();
        }
        col.forEach((row, j) => {
            if(row['control'] === true) {
                cloneTetris[i].splice(j - 1, 1, cloneTetris[i][j]);
                cloneTetris[i].splice(j, 1, {...roomInject("black", 0)});
            }
        });
        if(direction === 'right') {
            col.reverse();
        }
    });
    tetris = cloneTetris;
    draw();
}

function isMovable(direction) {
    console.log("tetris", tetris)
    return (tetris || []).every((col, i) => {
         return col.every((row, j) => {
             return !(row['control'] === true && j === ((direction === 'left') ? 0 : 9));
         });
    });
}
