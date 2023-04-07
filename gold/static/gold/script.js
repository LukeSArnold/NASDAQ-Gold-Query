let api_key = "t9-JgrQxn2EydTsXAM_4"
let url = `https://data.nasdaq.com/api/v3/datasets/LBMA/GOLD?limit=1&api_key=${api_key}`
let currentDate = new Date();
var price = 0;
var div_order = [];

if(url){
	fetch(url)
		.then( response => response.json())
		.then ( json => {
			theData = json;
		})
		.catch( err => {
			document.getElementById("gold_price_text").textContent = 
				"There was an error while fetching the price of gold :("
		})
		.finally(() => {
			price = theData.dataset.data[0][2];
			document.getElementById("gold_price_text").textContent
				= `As of ${currentDate} the current price of gold is $${price} per Troy Ounce`;
		});
	}
function calculate(){
	let from_input = document.getElementById("menu").value;
	var weight = document.getElementById('input').value;
	var valueDict = {
		"Ounce": "oz",
		"U.S. Ton": "T",
		"Troy Ounce": "t_oz",
		"Kilogram": "kg",
		"Imperial Pound": "lb",
		"Gram": "g",
	}
	var from_var = valueDict[from_input]

	if (!isNaN(weight) && !(weight == "")){
		console.log(`The weight ${weight} is NaN ${isNaN(weight)}`)
		let url = `http://localhost:8000/unitconv/convert?from=${from_var}&to=t_oz&value=${weight}`
		fetch(url)
			.then( response => response.json())
			.then( json => {
				weight_conversion = json;
				console.log("received the weight conversion json")
			})
			.catch( err => {
				console.log(err)
			})
			.finally(() => {

				let t_oz_weight = weight_conversion.value;
				let final_price = price * t_oz_weight;
		
				let div = document.createElement('div');
				div.setAttribute('class','stuff-box');
				div.setAttribute('style','background-color: #000000');
				let p = document.createElement('p');
				p.textContent = `${weight} ${from_input}s of gold is worth $${final_price.toFixed(2)}`
				
				let currentDate = new Date();
		                let timeStamp = document.createElement('p');
                		timeStamp.textContent = Date();



				div.appendChild(p);
				div.appendChild(timeStamp);
				div.onclick = function(){
					let index = div_order.indexOf(div);
					div_order.splice(index,1);
					div.remove();
				}
				if (div_order.length == 0){
                                        div_order.push(div);
                                        document.body.appendChild(div);
                                } else {
                                        document.body.insertBefore(div,div_order[div_order.length-1]);
                                        div_order.push(div);
                                }

			})
	} else {
		let div = document.createElement('div');
                div.setAttribute('class','stuff-box');
                div.setAttribute('style','background-color: #FF0000');
                let p = document.createElement('p');
                p.textContent = "ERROR: INVALID INPUT";

		let currentDate = new Date();
		let timeStamp = document.createElement('p');
		timeStamp.textContent = Date();

		div.appendChild(p);
		div.appendChild(timeStamp);
		div.onclick = function(){
			let index = div_order.indexOf(div);
			div_order.splice(index,1);
			div.remove();
			
		}
		if (div_order.length == 0){
			div_order.push(div);
			document.body.appendChild(div);
		} else {
			document.body.insertBefore(div,div_order[div_order.length-1]);
 			div_order.push(div);
                }
   	
	}
}

