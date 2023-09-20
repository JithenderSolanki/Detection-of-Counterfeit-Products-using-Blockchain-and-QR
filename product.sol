 // SPDX-License-Identifier: MIT 
pragma solidity ^0.8.0;

contract ProductVerification {
    struct Product {
        string company;
        string branch;
        string name;
        string id;
        string type1;
        string date1;
    }

    mapping(bytes32 => Product) products;

    function addProduct(bytes32 productHash, string memory company, string memory branch, string memory name, string memory id, string memory type1, 
    string memory date1) public {
        products[productHash] = Product(company, branch, name, id, type1, date1);
    } 
    
    function isProductVerified(bytes32 productHash) public view returns (bool) {
        return bytes(products[productHash].id).length != 0;
    }

    function getProductInfo(bytes32 productHash) public view returns (string memory, string memory, string memory, string memory, string memory, 
    string memory) {
        Product memory prod = products[productHash];
        require(bytes(prod.id).length != 0, "Product not found");
        return (prod.company, prod.branch, prod.name, prod.id, prod.type1, prod.date1);
    }
}
