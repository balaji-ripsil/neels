export class Inventory {
    customerId: string;
    products: [{
       productId: string,
       qty: string
    }];
    total: string;
    addressDetails: [{
       streetAddress: string;
       building: string;
       landmark: string;
       city: string;
       state: string;
       pincode: string;
       name: string;
       mobileNumber: string;
    }];
    orderStatus: string;
    domainName: string;
 }
