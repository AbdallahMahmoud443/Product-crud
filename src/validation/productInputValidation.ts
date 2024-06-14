
/**
 * Validates a product object for required fields and constraints.
 *
 * @param {Object} product - The product to be validated.
 * @param {string} product.title - The title of the product.
 * @param {string} product.description - The description of the product.
 * @param {string} product.imageURL - The URL of the product's image.
 * @param {string} product.price - The price of the product.
 *
 * @returns {Object} - An object containing error messages for invalid fields.
 * @property {string} title - Error message for the title field.
 * @property {string} description - Error message for the description field.
 * @property {string} imageURL - Error message for the imageURL field.
 * @property {string} price - Error message for the price field.
 */
export const productValidation = (product: {title: string,description: string,imageURL: string,price: string},colors:string[]) => {
    const errors: { title: string, description: string, imageURL: string, price: string,colors:string} = {
        title: "",
        description: "",
        imageURL: "",
        price: "",
        colors:"",
    }
    const validUrl = /^(ftp|http|https):\/\/[^ "]+$/.test(product.imageURL);
    
    if (!product.title.trim() || product.title.length < 10 || product.title.length > 20) {
        errors.title = "Product Title Characters Must Be Between 10 and 20";
    }
    if (!product.description.trim() || product.description.length < 30 || product.description.length > 65) {
        errors.description = "Product description Characters Must Be Between 30 and 65";
    }
    if (!product.price.trim() || Number.isNaN(Number(product.price))) {
        errors.price = "Price value Must Be Number"
    }
    if(!product.imageURL.trim() || !validUrl){
        errors.imageURL ="Invalid Url syntax"
    }
    if(colors.length === 0){
        errors.colors ="Please Select Color"
    }
    return errors;
}