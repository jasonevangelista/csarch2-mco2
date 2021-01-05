function binary(a){
    var bits_list = [];
    var num, b;
    while(a>0){
        num =a;
		b = num%2;
        bits_list.push(b);
        num = (num - num % b) / b;
		a = a/2;
		a.toString()
		a = parseInt(a);
    }
    bits_list.reverse();
    return bits_list;
}

function shift(shiftA, shiftQ){
    var val = shiftA.concat(shiftQ);
    var l = val.length;
    var i = 0;
  
   for(i = 0; i<l-1; i++){
       val[i] = 0;
       val[i] = val[i+1];
   }
   val.splice(i,1);
   return val;

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


var dividend = 11;
var divisor = 3;
q=binary(dividend)
m=binary(divisor)

//SETTING THE M VALUE : i.e. len(M) should be 1 more than len(Q)
if (m.length < q.length){
	var diff = q.length - m.length
	for(var i = 0; i<diff+1; i++){
		m.splice(0,0,0)
	}
}
console.log("Q: " + q);
console.log("M: " + m);
//ASSIGNING VALUE OF A to 0
var ACC= []
for(i= 0; i< m.length; i++){
    ACC.push(0)
}
console.log("A : "+ ACC);

//VALUE OF -M
negM = compliment(m)

console.log("M: "+ negM)
console.log("\n");


console.log("          "+ "    |   "+ "   A    "+ "    |    "+"   Q  "+"    |    ")
console.log("--------------------------------------------------------")
n=1
//No of iterations
counter = q.length;
while(counter>0){
	
	//LEFT SHIFT A, Q
	a = shift(ACC,q)
    //console.log("A: "+ a);
    //console.log("\n");

	//TAKING THE "A" AND "Q" PART FROM THE "a"
    newA = a.slice(0, ACC.length);

    newQ = a.slice(ACC.length, a.length);
    console.log("New A: "+ newA);
	console.log("New Q: "+ newQ);

	//A<-A-M
	sumAM = add(newA,negM)
    //console.log("sumAM: " +sumAM);
    //console.log("\n");



	b=newQ.length+1
	if(sumAM[0]==1){//MSB(A)=1
		newQ.splice(b,0,0)
        sumAM=add(sumAM,m)
    }
	else if(sumAM[0]==0){
        newQ.splice(b,0,1)
    }

	ACC=sumAM
	q=newQ

	console.log("Step : "+ n+ "    |    "+ ACC+ "    |    "+ q+ "  |  ")

	console.log("--------------------------------------------------")
	n=n+1
    counter=counter-1
}

console.log("Quotient:  ->  " + decimal(q));
console.log("Remainder:  ->  " + decimal(ACC));




