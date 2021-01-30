module.exports = {
    loadPage: (req, res) => {
        res.render('index.ejs', { // Pass data to front end
            title: "Restoring Division",
            steps: false
        });
    },
    calculate: (req,res) => {
      console.log(req.body)
  
      // console.log("dividend: " + dividend)
      // console.log("divisor: " + divisor)
  
      // console.log("hello")
      var steps = restoringdivision(req.body.dividend, req.body.divisor);
      console.log(steps);

    //   if(req.body.textFileOutput){
        console.log("download txt file");
        var fileContent = generateFileContent(steps);

        res.render('index.ejs', { // Pass data to front end
        title: "Restoring Division",
        steps: steps,
        viewOption: req.body.viewOption,
        fileContent: fileContent
        });
    //   }
    //   else{
    //     res.render('index.ejs', { // Pass data to front end
    //         title: "Restoring Division",
    //         steps: steps,
    //         viewOption: req.body.viewOption
    //     });
    //   }
  
      
    }
  }

// function binary(dec){
//     var bits_list = [];
//     var num, b;
//     while(dec>0){
//         num =dec;
// 		b = num%2;
//         bits_list.push(b);
//         num = (num - num % b) / b;
// 		dec = dec/2;
// 		dec.toString()
// 		dec = parseInt(dec);
//     }
//     bits_list.reverse();
//     return bits_list;
// }


function padM(x,b){
    //if M < Q, pad
    var arr = []
    if(x.length <= b.length){
        var diff = b.length - x.length
        for(var i = 0; i<=diff; i++){
            arr.push(0);
        }
    }
   //concat
   for(i = 0; i<x.length;i++){
       arr.push(x[i])
   }
    return arr;
}

function padQ(q,m){
    var arr = [];
    arr = [...q];
    while(arr.length<m.length){
        arr.unshift(0);
    }
    return arr;
}



function compliment(value){
    var onecomp = [];
    var twocomp = [];
    for(var i = 0; i<value.length; i++){
        if(value[i] == 0){
            onecomp.push(1);
        }
        else if(value[i] == 1){
            onecomp.push(0);
        }
    }
    var carry = 1;
    for(j = value.length-1; j>=0; j--)
    {
        if(onecomp[j]==0 && carry==1){
            twocomp.push(1);
            carry =0;
        }
        else if(onecomp[j]==1 && carry==1){
            twocomp.push(0);
            carry =1;
        }
        else if (onecomp[j] ==0 && carry ==0){
            twocomp.push(0);
            carry = 0;
        }
        else if (onecomp[j] ==1 && carry ==0){
            twocomp.push(1);
            carry = 0;
        }
    }
    twocomp.reverse();
    return twocomp;
    
}

 function add(valA, valM){
     var add =[];
     var ad = valA;
     var carry =0;
     for (var i = ad.length-1; i>=0; i--){
         if(valA[i]==0 && valM[i] == 0 && carry== 0){
             add.push(0);
             carry =0;
         }
         else if(valA[i]==0 && valM[i] == 0 && carry== 1){
            add.push(1);
            carry =0;
        }
        else if(valA[i]==0 && valM[i] == 1 && carry== 0){
            add.push(1);
            carry =0;
        }
        else if(valA[i]==0 && valM[i] == 1 && carry== 1){
            add.push(0);
            carry =1;
        }
        else if(valA[i]==1 && valM[i] == 0 && carry== 0){
            add.push(1);
            carry =0;
        }
        else if(valA[i]==1 && valM[i] == 0 && carry== 1){
            add.push(0);
            carry =1;
        }
        else if(valA[i]==1 && valM[i] == 1 && carry== 0){
            add.push(0);
            carry =1;
        }
        else if(valA[i]==1 && valM[i] == 1 && carry== 1){
            add.push(1);
            carry =1;
        }
     }
     add.reverse();
     return add;
 }

 function shiftLeftA(a,q){
    //Remove the 1st element of A
    //add the first element of Q
    var first = q[0];
    a.shift();
    arr = [...a];
    arr.push(first);

    return arr;
 }

function shiftLeftQ(q){
    var arr =[];
    q.shift();
    arr = [...q]
    return arr;
}

function initializeA(q){
    var arr = [];
    for(var i = 0; i<=q.length; i++){
        arr.push(0);
    }
    return arr;
}

function decimal(bin){
    bin.reverse();
    var dec = 0;
    for(i = 0; i<bin.length; i++){
        if(bin[i] ==1){
            dec = dec +(bin[i] *(2**i));
        }
    }
    bin.reverse();
    return dec;

}
function checkifBinary(inputString){
    if (inputString.match("^[01]+$")) {
        return 1;
    }
    return 0;
}

function convert(val){
    //if it is a decimal
    var y;
    var arr =[];
   
    //
    if(checkifBinary(val) ==1){
        val = val.replace(/^0+/, '');
        for(var i = 0; i<val.length; i++){
            y = parseInt(val[i])
            arr.push(y);
        }
    }
    return arr;
}

/*Restoring Division Algorithm
1.)initialize A,Q,M
2.) Set -M
- LOOP Q TIMES
3.) Shift Left
4.) A + (-M) = A-M
5.) Check MSB if 1, Restore else, dont
*/


function restoringdivision(dividend,divisor){
    var q = dividend;
    var m = divisor;
    var newA, newQ, sum, l;
    q = convert(q);
    q = padQ(q,m);
    console.log("Q: "+ q);
    var count = q.length;
    m = convert(m);
    m = padM(m,q);
    console.log("M: "+ m);
    negM = compliment(m);
    var a = initializeA(q);

    var steps = [];
    
    console.log("          "+ "    |   "+ "   A    "+ "    |    "+"   Q  "+"    |    ")
    console.log("--------------------------------------------------------")
    for(var i = 0; i<count; i++){
        l = i+1
        newA = shiftLeftA(a,q);
        newQ = shiftLeftQ(q);
        console.log("New A: " + newA);
        console.log("New Q: " + newQ);
        sum = add(newA, negM);
        console.log("sum: " +sum);
        console.log("\n");
        console.log("Step : "+ l+ "    |    "+ sum+ "    |    "+ newQ+ "  |  ")
        console.log("--------------------------------------------------")
        q = [...newQ];
        if(sum[0]==0){
            a = [...sum]
            q.push(1);
        }
        else{
            a = [...newA]
            q.push(0);
        }
        
        console.log("After   "+ "    |    "+ a+ "    |    "+ q+ "  |  ")
        console.log("--------------------------------------------------")

        var step = {
            stepNum: i+1,
            beforeA: sum,
            beforeQ: newQ,
            afterA: a,
            afterQ: q
        };

        var currentStep = JSON.parse(JSON.stringify(step));
        currentStep.beforeA = formatValue(currentStep.beforeA);
        currentStep.beforeQ = formatValue(currentStep.beforeQ) + "_";

        currentStep.afterA = formatValue(currentStep.afterA);
        currentStep.afterQ = formatValue(currentStep.afterQ);

        steps.push(currentStep);

    }
    console.log("Quotient:  ->  " + decimal(q));
    console.log("Remainder:  ->  " + decimal(a));
    
    return steps;
}

function formatValue(value){
    return value.toString().replace(/,/g, '');
}

function generateFileContent(steps){
    var content = "";
    content += "        "+ "    |   "+ "   A    "+ "    |    "+"   Q  "+"    |    N";
    content += "--------------------------------------------------------N";
    steps.forEach(step => {
        content += "Step : "+ step.stepNum+ "    |    "+ step.beforeA+ "    |    "+ step.beforeQ+ "  |  N";
        content += "--------------------------------------------------N";
        content += "After   "+ "    |    "+ step.afterA+ "    |    "+ step.afterQ+ "  |  N";
        content += "--------------------------------------------------N";
    })
    // console.log("txt file content")
    // console.log(content)
    return content;
}

// console.log("Restoring Division Using Decimal Values");
// restoringdivision("12","5");
// console.log("\n");
// console.log("\n");
// console.log("Restoring Division Using Binary Values");
// restoringdivision("111","11");
