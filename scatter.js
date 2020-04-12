//draw tool tip



var penguinPromise = d3.json("classData.json");

var sucessFCN = function(students){
    console.log("Data Collected", students);
    //get the grade for an assignemnt 
        var getGrade = function(quiz){
                        return (quiz.grade/quiz.max)*100;}
        //calc mean quiz
        var meanQuiz = function(student){
                        return d3.mean(student.quizes.map(getGrade)); };
    //calc mean hw
        var meanHW = function(student){
                        return d3.mean(student.homework.map(getGrade));};
    //calc mean test grade
        var meanTest = function(student){
                        return d3.mean(student.test.map(getGrade));};
    //calc final grade
        var finalGrade = function(student){
                        final= 0.20 * meanQuiz(student) +  0.15 * meanHW(student) + 0.30 * meanTest(student) + 0.35 * getGrade(student.final[0])
                        return final}
        //create title
        var setTitle = function(msg){
                        
                        d3.select("body")
                            .append("h2")
                            .text(msg);}
        //creating buttons
        var setHeading = function(msg){
                d3.select("body")
                    .append("p")
                    .attr("id",msg)
                    .attr("class","header")
                    .text(msg)
        }
        setHeading("HWvsQuiz")
        setHeading("FinalvsHW")
        setHeading("TestvsFinalGrade")
        setHeading("TestvsQuiz")
   
    //get final exam grade
        var finalExam=function(student){
            return student.final[0].grade;}
       
        
   
        
        
     
      
    var HWvsQuizQ=function(student){
        studentObject ={
        var1:meanHW(student),
        var2:meanQuiz(student),
        picture:student.picture
        };
        return studentObject}
    var HWvsQuizA=students.map(HWvsQuizQ)
    
    var finalvsHWQ=function(student){
        studentObject ={
        var1:finalExam(student),
        var2:meanHW(student),
        picture:student.picture
        };
        return studentObject}
    var finalvsHWA=students.map(finalvsHWQ)
    
    var testvsFinalGQ=function(student){
        studentObject ={
        var1:meanTest(student),
        var2:finalGrade(student),
        picture:student.picture
        };
        return studentObject}
    var testvsFinalGA=students.map(testvsFinalGQ)
    
    var testvsQuizQ=function(student){
        studentObject ={
        var1:meanTest(student),
        var2:meanQuiz(student),
        picture:student.picture
        };
        return studentObject}
    var testvsQuizA=students.map(testvsQuizQ)
  
        
             
            
 
    
//create graph fun
        var createGraph =function(Array){
            var var1Mean=d3.mean(Array.map(function(student){return student.var1;}))
            var var2Mean=d3.mean(Array.map(function(student){return student.var2;}))
            console.log("means",var1Mean,var2Mean)
            var w = 500;
            var h = 100;
            var padding = 20;
            console.log(Array)
            var xScale = d3.scaleLinear()
                        .domain([0,d3.max(Array,function(student){return student.var1;})])
                        .range([padding,w-padding])
            var yScale = d3.scaleLinear()
                        .domain([0,d3.max(Array,function(student){return student.var2;})])
                        .range([padding,h-padding])
            var svg = d3.select("body")
                .append("svg")
                .attr("width",w)
                .attr("height",h)
                .attr("id","graph")
            svg.selectAll("circle")
                .data(Array)
                .enter()
                .append("circle")
                .attr("cx", function(student){
                    return xScale(student.var1);
            })
                .attr("cy", function(student){
                    return yScale(student.var2);
            })
                .attr("r",5)
                .on("mouseover", function(student)
                    {
                        //remove the old data.
                        console.log("tooltip #data")
                        d3.select("#tooltip #data")
                            .remove();
                       
                       

                        
                        console.log("test",student.picture)
                        var xPosition = d3.event.pageX;
                        var yPosition = d3.event.pageY;
                        d3.select("#tooltip")
                            .style("left",xPosition + "px")
                            .style("top",yPosition +"px")
                            .append("img")
                            .attr("id","data")
                            .attr("src", "imgs/" + student.picture)
                            
                        d3.select("#tooltip").classed("hidden",false);
                    })
                .on("mouseout",function(){
                    d3.select("#tooltip").classed("hidden",true);}
                )
                svg.append("line")
                    .attr("x1",xScale(var1Mean))
                    .attr("x2",xScale(var1Mean))
                    .attr("y1",yScale(0))
                    .attr("y2",yScale(h))
                    .attr("stroke","red")
                svg.append("line")
                    .attr("x1",xScale(0))
                    .attr("x2",xScale(w))
                    .attr("y1",yScale(var2Mean))
                    .attr("y2",yScale(var2Mean))
                    .attr("stroke","blue")
        
        
        
        }
        //clear graph
         var clearGraph = function()
                    {
                    d3.selectAll("#graph,h2")
                        .remove();
                    }
         //initalize buttons 
        var initButtons =function(students){
            d3.select("#FinalvsHW")
                .on("click",function(){
                
                clearGraph()
                setTitle("Final Exam vs Mean Homework grade")
                createGraph(finalvsHWA)   
    
                
                
        });
          d3.select("#HWvsQuiz")
               .on("click",function(){
              
                clearGraph() 
                setTitle("Mean Homework grade vs Mean Quiz grade")
                createGraph(HWvsQuizA)
                
        });
         d3.select("#TestvsFinalGrade")
              .on("click",function(){
                
               clearGraph() 
               setTitle("Mean Test grade vs Final Grade")
               createGraph(testvsFinalGA)
               
        });
        d3.select("#TestvsQuiz")
              .on("click",function(){
                
              clearGraph() 
              setTitle("Mean Test grade vs Mean Quiz grade")
              createGraph(testvsQuizA)
              
        });
        }
        
       setTitle("Mean Homework grade vs Mean Quiz grade")
       createGraph(HWvsQuizA)
       initButtons(students) 
         
}
 var failFCN = function(errorMsg)
                {
                    console.log("Something went wrong", errorMsg);
                  
                };
penguinPromise.then(sucessFCN,failFCN);