// Ali Sbeih - 7/13/22 - Convex Hull Project



// A class for the nodes
class graphNode {
    // Nodes have the following properties
        name;
        position=new Array();
    //   A node constructor that initializes its name and position
        constructor(name,position) {
          this.name = name;
          this.position=position; 
        }
      }
      
    
    // Panel representing the graph drawing area
    const panel=document.getElementById('main');
    // An array of the nodes
    let graphList=[];
    // An array of the edges
    let edgeList=[];
    // A counter used for naming
    let counter=0;
    
    // Add an event listener that listens for a click and calls the following function 
    panel.addEventListener('click',createCircle)
    
    // -------------------------------------------------------------------CREATE CIRCLE FUNCTION-----------------------------------------------------------------------------
    function createCircle(e){
        // Get the x and y values of the click
            var xPosition = e.clientX - document.body.clientWidth*0.5;
            var yPosition = e.clientY;
    //If the new click overlaps with a previous click don't do anything
    if(checkOverLap(xPosition,yPosition)==true)return;
    
    // Create a new graph node
            let dummyNode=new graphNode(counter,[xPosition,yPosition])
            // Add it to the nodes array
    
    // Create an svg cicle element that corresponds to the above node
        const nodeCircle=document.createElementNS("http://www.w3.org/2000/svg", "circle");
    // Give it a radius, color, position, and an id
        nodeCircle.setAttribute('r','10')
        nodeCircle.setAttribute('fill','lime')
        nodeCircle.setAttribute('cx',xPosition)
    nodeCircle.setAttribute('cy',yPosition)
    nodeCircle.setAttribute('id',counter)
   
            if(graphList.length==0)graphList.push(dummyNode);
else{
for(let i=0;i<graphList.length;i++){
    // console.log(2)

    if(xPosition<graphList[i].position[0]){
        // console.log(3)

        let sub=graphList.splice(0,i)
        sub.push(dummyNode)
        for(let j=0;j<graphList.length;j++){
            // console.log(4)

            sub.push(graphList[j])
        }
        graphList=sub;
        break;
    }
    else{
        // console.log(5)
        if(i==counter-1)graphList.push(dummyNode)
    }
}
}
// console.log(graphList);

// let listUpper=[graphList[0],graphList[1]];
// for(let i=2;i<graphList.length;i++){
//     listUpper.push(graphList[i])
//     while(listUpper.length>2 &!((graphList[1].position[1]>graphList[0].position[1]&graphList[2].position[1]>graphList[1].position[1])||(graphList[1].position[1]<graphList[0].position[1]&graphList[2].position[1]<graphList[1].position[1]))){
// listUpper[1]=listUpper.pop();
//     }
// }
// console.log(listUpper)
let listUpper=[graphList[0],graphList[1]];
for(let i=2;i<graphList.length;i++){
    // if(graphList[i].position[1]<graphList[0].position[1]){
    listUpper.push(graphList[i])        

    while(listUpper.length>2 &&(listUpper[listUpper.length-2].position[1]>listUpper[listUpper.length-3].position[1]&listUpper[listUpper.length-1].position[1]<listUpper[listUpper.length-2].position[1])){
        // console.log(listUpper[1])

listUpper[listUpper.length-2]=listUpper.pop();
// console.log(listUpper[1])
    }
// }
console.log(listUpper)
}

let listLower=[graphList[graphList.length-1],graphList[graphList.length-2]];
for(let i=graphList.length-3;i>=0;i--){
    // if(graphList[i].position[1]>graphList[graphList.length-1].position[1]){
    listLower.push(graphList[i])        

    while(listLower.length>2 &&(listLower[listLower.length-2].position[1]<listLower[listLower.length-3].position[1]&listLower[listLower.length-1].position[1]>listLower[listLower.length-2].position[1])){
        // console.log(listLower[1])

listLower[listLower.length-2]=listLower.pop();
// console.log(listLower[1])
    }
// }
console.log(listLower)
}
listLower.pop();
listLower.shift();
let listComplete=listUpper;
for(let i=0;i<listLower.length;i++){
    listComplete.push(listLower[i])

}

console.log(listComplete)




if(listUpper[1]!=null){
    let lineEdges=document.querySelectorAll(".lines");
    lineEdges.forEach(element => {
        element.remove();
    });
for(let i=0;i<listComplete.length;i++){
                  //Create an svg line element 
                    const drawLine=document.createElementNS("http://www.w3.org/2000/svg", "line");
                    //Give it the two centers of the nodes to create an edge between them. Give the line a stroke color, type, and width
                    drawLine.setAttribute('x1',listComplete[i].position[0])
                    drawLine.setAttribute('y1',listComplete[i].position[1])
                    if(i==listComplete.length-1){
                        drawLine.setAttribute('x2',listComplete[0].position[0])
                        drawLine.setAttribute('y2',listComplete[0].position[1])
                    }
                    else{
                    drawLine.setAttribute('x2',listComplete[i+1].position[0])
                    drawLine.setAttribute('y2',listComplete[i+1].position[1])
                    }
                    drawLine.setAttribute('stroke','red');
                    // drawLine.setAttribute('stroke-dasharray','10 5');
                    drawLine.setAttribute('stroke-width','3')
                    drawLine.setAttribute('class','lines')

                    //Name the edge as a combination of the names of the two nodes, which are numbers. Name it starting with the smaller number
                    // if(Number(graphList[i].name)<Number(nodeCircle.id))drawLine.setAttribute('name',graphList[i].name+''+nodeCircle.id)
                    // else drawLine.setAttribute('name',nodeCircle.id+''+graphList[i].name)
                    //Add the edge to the edge list
                    // edgeList.push(drawLine); 
    
                    //Add the line to the panel
                    document.querySelector('.edges').appendChild(drawLine)
}
}               
           
    
    // Add the circle and the number to the panel
    panel.appendChild(nodeCircle);
    // increment the counter
    counter++;
    }
    
    // -------------------------------------------------------------------OVERLAP FUNCTION----------------------------------------------------------------------------------
    //Function that checks for overlap
    function checkOverLap(xPosition,yPosition){
        //iterate through the graph list
        for(let i=0;i<graphList.length;i++){
            if(xPosition-30<graphList[i].position[0]+30&&xPosition+30>graphList[i].position[0]-30){
                if(yPosition-30<graphList[i].position[1]+30&&yPosition+30>graphList[i].position[1]-30){
        return true;
            }
        }
        }
    return false;
    }
    
   
    // -------------------------------------------------------------------RESET Panel BUTTON--------------------------------------------------------------------------------
    //The variable resetPage refers to the reset button
    const resetPage=document.getElementById('reset');
    //Add an event listener that listens for a  click and calls the following function
    resetPage.addEventListener('click',function(){
        //remove all the elements inside the panel
        while(panel.firstChild!=null){
            panel.removeChild(panel.firstChild);
        }
        //empty the graph list
        graphList=[];
        //empty the edge list
        edgeList=[];
        //reset the counter
        counter=0;
        let edgegroup=document.createElementNS("http://www.w3.org/2000/svg","g")
        edgegroup.setAttribute("class","edges")
        document.querySelector('svg').appendChild(edgegroup)

    });
 