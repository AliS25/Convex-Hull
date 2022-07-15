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
    
    // Create an svg cicle element that corresponds to the above node
        const nodeCircle=document.createElementNS("http://www.w3.org/2000/svg", "circle");
    // Give it a radius, color, position, and an id
        nodeCircle.setAttribute('r','10')
        nodeCircle.setAttribute('fill','lime')
        nodeCircle.setAttribute('cx',xPosition)
    nodeCircle.setAttribute('cy',yPosition)
    nodeCircle.setAttribute('id',counter)
//    Add the first graph node to the nodes array
            if(graphList.length==0)graphList.push(dummyNode);
            //for the remaining nodes
else{
    //iterate through the nodes array
for(let i=0;i<graphList.length;i++){
    // console.log(2)
//position the new node based on its x-position in the nodes array
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
//list containing the upper hull
let listUpper=[graphList[0],graphList[1]];
for(let i=2;i<graphList.length;i++){
    listUpper.push(graphList[i])        
//if the last three nodes don't make a right turn remove the middle one
    while(listUpper.length>2 &&(listUpper[listUpper.length-2].position[1]>listUpper[listUpper.length-3].position[1]&listUpper[listUpper.length-1].position[1]<listUpper[listUpper.length-2].position[1])){
        // console.log(listUpper[1])

listUpper[listUpper.length-2]=listUpper.pop();
// console.log(listUpper[1])
    }
console.log(listUpper)
}
//list containing the lower hull
let listLower=[graphList[graphList.length-1],graphList[graphList.length-2]];
for(let i=graphList.length-3;i>=0;i--){
    listLower.push(graphList[i])        
//if the last three nodes don't make a right turn remove the middle one
    while(listLower.length>2 &&(listLower[listLower.length-2].position[1]<listLower[listLower.length-3].position[1]&listLower[listLower.length-1].position[1]>listLower[listLower.length-2].position[1])){
        // console.log(listLower[1])

listLower[listLower.length-2]=listLower.pop();
// console.log(listLower[1])
    }
console.log(listLower)
}
//remove the first and last element of the lower hull to avoid duplicate nodes
listLower.pop();
listLower.shift();
//combine the two lists into one
let listComplete=listUpper;
for(let i=0;i<listLower.length;i++){
    listComplete.push(listLower[i])

}

console.log(listComplete)



//everytime a node is added remove all the previous edges
if(listUpper[1]!=null){
    let lineEdges=document.querySelectorAll(".lines");
    lineEdges.forEach(element => {
        element.remove();
    });
    //iterate through the completed convex hull
for(let i=0;i<listComplete.length;i++){
                  //Create an svg line element 
                    const drawLine=document.createElementNS("http://www.w3.org/2000/svg", "line");
                    //Give it the two centers of the nodes to create an edge between them. Give the line a stroke color, width, and a class.
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
                    drawLine.setAttribute('stroke-width','3')
                    drawLine.setAttribute('class','lines')

    
                    //Add the line to the panel
                    document.querySelector('.edges').appendChild(drawLine)
}
}               
           
    
    // Add the circle to the panel
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
        //Add the g element as the first element in svg which will contain the edges 
        let edgegroup=document.createElementNS("http://www.w3.org/2000/svg","g")
        edgegroup.setAttribute("class","edges")
        document.querySelector('svg').appendChild(edgegroup)

    });
 