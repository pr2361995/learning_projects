function hasNestedKey(obj, path) {
    const keys = path.split(".");
    
    // Traverse the object for each key in the path
    return keys.every(key => {
      if (obj && key in obj) {
        obj = obj[key];  // Move deeper into the object
        return true;
      }
      return false;
    });
  }


const isThere = hasNestedKey({
    "customerId": "CUST345678",
    "firstName": "Rahul",
    "lastName": "Sharma",
    "dateOfBirth": "1995-11-10",
    "gender": "Male",
    "contactDetails": {
      "email": "rahul.sharma@example.com",
      "phone": "+91-98765-43210",
      "address": {
        "street": "789 MG Road",
        "city": "Mumbai",
        "state": "Maharashtra",
        "postalCode": "400001",
        "country": "India"
      }
    },
    "identification": {
      "idType": "Voter ID",
      "idNumber": "MH1234567"
    },
    "accountDetails": {
      "accountNumber": "112233445566",
      "accountType": "Savings",
      "branch": "Mumbai Central Branch",
      "ifscCode": "TCSB0000789",
      "balance": 15000.00,
      "currency": "INR",
      "openedDate": "2021-01-20",
      "status": "Inactive",
      "accountStatus": "Suspended"
    },
    "kycStatus": "Verified",
    "nominee": {
      "name": "Priya Sharma",
      "relationship": "Sister",
      "contact": "+91-91234-56789"
    }
  },"contactDetails.address.countrys")


  console.log("isThere : ",isThere)