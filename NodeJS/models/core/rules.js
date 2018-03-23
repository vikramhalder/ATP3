module.exports = {
    registration: {
        fname:    { type: "string", required: true, min: 3, regexp: /^[a-zA-Z0-9.,]+$/ },
        lname:    { type: "string", required: true, min: 3, regexp: /^[a-zA-Z0-9]+$/ },
        username: { type: "string", required: true, min: 3, regexp: /^[a-zA-Z0-9]+$/ },
        location: { type: "string", required: true, min: 3 },
        email:    { type: "string", required: true, email: true, regexp: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ },
        password: { type: "string", required: true, min: 6, regexp: /^[.*]{6,40}$/ }
    },
    product: {
        product_code:     { type: "string", required: true, min: 3 },
        product_title:    { type: "string", required: true, min: 5 },
        product_size:     { type: "string", required: true, min: 1 }, 
        product_price:    { type: "regexp", required: true, regexp: /^[0-9]{1,4}$/ },
        product_discount: { type: "regexp", required: true, regexp: /^[0-9]{1,3}$/ },
        product_catagory: { type: "regexp", required: true, regexp: /^[0-9]{1,4}$/ },
        product_limit:    { type: "regexp", required: true, regexp: /^[0-9]{1,4}$/ }, 
        product_discription: { type: "string", required: true, min: 10 } 
    },
    comment: {
        text: { type: "string", required: true, min: 3 } 
    },
};