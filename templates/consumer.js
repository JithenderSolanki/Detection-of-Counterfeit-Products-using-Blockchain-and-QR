 
    	const urlParams = new URLSearchParams(window.location.search);	
        const metadata1 = urlParams.get("metadata");
		console.log(metadata1);
		const decoded_metadata = atob(metadata1);
		console.log(decoded_metadata)
        calculateSHA256(decoded_metadata);
        var hashHex='';
        function calculateSHA256(inputString) 
		{
			const encoder = new TextEncoder();
			const data = encoder.encode(inputString);
			crypto.subtle.digest('SHA-256', data).then(hashBuffer => {
			const hashArray = Array.from(new Uint8Array(hashBuffer));
			hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
			hashHex = '0x' + hashHex;
			console.log(hashHex);
            }).catch(ex => console.error(ex));
        }
        let web3= new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));  
        var abi =[
		{
			"inputs": [
				{
					"internalType": "bytes32",
					"name": "ProductHash",
					"type": "bytes32"
				},
				{
					"internalType": "string",
					"name": "Pcompany",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "Pbranch",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "Pname",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "Pid",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "Ptype1",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "Pdate1",
					"type": "string"
				}
			],
			"name": "addProduct",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "bytes32",
					"name": "ProductHash",
					"type": "bytes32"
				}
			],
			"name": "getProductInfo",
			"outputs": [
				{
					"internalType": "string",
					"name": "",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "",
					"type": "string"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "bytes32",
					"name": "ProductHash",
					"type": "bytes32"
				}
			],
			"name": "isProductVerified",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "bytes32",
					"name": "",
					"type": "bytes32"
				}
			],
			"name": "Products",
			"outputs": [
				{
					"internalType": "bytes32",
					"name": "hash",
					"type": "bytes32"
				},
				{
					"internalType": "string",
					"name": "company",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "branch",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "name",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "id",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "type1",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "date1",
					"type": "string"
				}
			],
			"stateMutability": "view",
			"type": "function"
		}
	];
	    var add="{{account['add']}}";
	    let contract= new web3.eth.Contract(abi,add);
        function verifyDoc()
		{
			contract.methods.isProductVerified(hashHex).call().then(function(result) 
			{
				var isVerified = result;
				if (result)
					 document.getElementById('status').innerHTML="<H3>Product is Authentic</H3>";
				else
					document.getElementById('status').innerHTML="Invalid  ";
					console.log(isVerified);
			})
        .catch(function(error)
			{
			document.getElementById('status').innerHTML="Invalid";
			console.log(error);
			});

        ProductInfo(hashHex);  
		}
    	function ProductInfo(hashHex)
		{
        	contract.methods.getProductInfo(hashHex).call().then(function(result) 
		    {
				console.log(result);
				var company = result[0];
				var branch= result[1];
				var name= result[2];
				var id= result[3];
				var type1= result[4];
				var date1= result[5];

				 

			    var $varDiv = $("#info");
				$varDiv.append("<p><strong>Company:</strong> " + company + "</p>");
				$varDiv.append("<p><strong>Branch:</strong> " + branch+ "</p>");
				$varDiv.append("<p><strong>Name:</strong> " + name + "</p>");
				$varDiv.append("<p><strong>Id:</strong> " + id + "</p>");
				$varDiv.append("<p><strong>Type:</strong> " + type1+ "</p>");
				$varDiv.append("<p><strong>Manufacture date:</strong> " + date1+ "</p>");

				//  document.getElementById('details').innerHTML=docname;
				//document.getElementById('details').innerHTML=idnumber; 
				$varDiv.css("border", "2px solid blue");
      		})
      		.catch(function(error) 
			{
        	document.getElementById('status').innerHTML="Product not recognized. Please contact the manufacturer for assistance.";
        	console.log(error);
      		});
    
   		 }
      
     
