 
     
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
	    var hashHex='';
		 

        function calculateSHA256() 
		{

		    var vcompany=document.getElementById('company').value;
            var vbranch =document.getElementById('branch').value;
			var vname=document.getElementById('name').value;
			var vid=document.getElementById('id').value;
			var vtype1=document.getElementById('type1').value;
			var vdate1=document.getElementById('date1').value;
			
			
	         
            var inputString= vcompany+vbranch+vname+vid+vtype1+vdate1 
			console.log(inputString);
            var encoder = new TextEncoder();
            var data1 = encoder.encode(inputString);
            console.log(data1);
            crypto.subtle.digest('SHA-256', data1).then(hashBuffer => {
            const hashArray = Array.from(new Uint8Array(hashBuffer));
			hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
			hashHex = '0x'+ hashHex;
			console.log(hashHex);
			document.getElementById('hash').innerHTML="<h4>Generated Hash:</h4>"+hashHex
			//console.log(vcompany+branch+vname+id+type1+date1);
			const gasLimit = 800000;
			contract.methods.addProduct(hashHex, vcompany,vbranch, vname, vid, vtype1, vdate1).send({from:"{{account['from']}}",gas: gasLimit});
			document.getElementById('company').value=vcompany;
		    document.getElementById('branch').value=vbranch;
			document.getElementById('name').value=vname;
			document.getElementById('id').value=vid;
			document.getElementById('type1').value=vtype1;
			document.getElementById('date1').value=vdate1;

			}).catch(ex => console.error(ex));
		}
 