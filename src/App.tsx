import Button from './components/UI/Button';
import './App.css'
import ProductCard from './components/ProductCard'
import Model from './components/UI/Model';
import { categories, colors, formInputsList, productList } from './data/ProductData';
import { useState } from 'react'
import Input from './components/Input';
import { ICategory, IProduct } from './interfaces';
import { productValidation } from './validation/productInputValidation';
import ErrorMessages from './components/ErrorMessages';
import CircleColor from './components/CircleColor';
import { v4 as uuid } from "uuid";
import SelectBox from './components/UI/SelectBox';

function App() {

  //** ------------------ Variables ------------------ */
  const defualtProductData = {
    id: "",
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    }
  }

  //** ------------------ States ------------------ */
  //** state for open and close model  */
  let [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  //** Create State For Inputs fields */
  const [inputData, setInputData] = useState<IProduct>(defualtProductData);

  //** Create state for errors (appear when submit data to create product )*/
  const [errors, setError] = useState({ title: "", description: "", imageURL: "", price: "",colors:""});

  //** Create State For Storing Colors  (change when add color to product when create product)*/
  const [tempColors, setTempColors] = useState<string[]>([]);

  //** Create State For Product List (change when add product) over lists of products */
  const [products, setProducts] = useState<IProduct[]>(productList);
  //** Create state For Select Box to chnage options */
  const [categorySelected, SetCategorySelected] = useState<ICategory>(categories[0]);


  //** ------------------ Handlers ------------------ */
  //**Todo: Used in write text inside input fields */
  const handerInputData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target; // spesific input
    setInputData({ ...inputData, [name]: value }); //* state include (old data + new data) important
    setError({ ...errors, [name]: "" }); //* to show error when write error will disappear important
  }
  //**Todo: Used in add Product  */
  const handerSubmitbutton = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const { title, description, imageURL, price } = inputData; //* get data from inputData state
    const errors = productValidation({
      title,
      description,
      imageURL,
      price
    },tempColors); //* Check data before insert it by productValidation method on file (productValidation)

    const hasErrorMessage = Object.values(errors).some(error => error === '') &&
      Object.values(errors).every(error => error === '') //* Check if there error or not 

    if (!hasErrorMessage) {
      setError(errors); //* update error state in case of errors
      return; //* important step to add return here prevent to continue
    } else {
      //*! Add new product to old products by update state of products note (must add id,colors to inputData object)
      setProducts((prev) => [{ ...inputData, colors: tempColors, id: uuid(),category:categorySelected}, ...prev]);
      close(); //* close modes
      //* reset inputs and colors
      setInputData(defualtProductData);
      setTempColors([])
    }
  }

  //** ------------------ Render Lists ------------------ */

  //* RenderProductList => to show product in page
  const renderProductList = products.map((product) => {
    return (
      <ProductCard key={product.id} product={product} openModel={open} /> //*! Don't forget key with list */
    );
  });

  //* RrenderInputList => to show input fields in model 
  const renderInputList = formInputsList.map(input => {
    return (
      <div className="my-1" key={input.id}>
        <label htmlFor={input.id} className="block mb-2 text-sm font-medium text-gray-900 ">{input.label}</label>
        <Input type={input.type} id={input.id} name={input.name} value={inputData[input.name]} onChange={handerInputData} />
        <ErrorMessages message={errors[input.name]} />  {/** Error component take error messages return error or nothing  */}
      </div>
    );

  });

  //* RrenderInputList => to show colors circle fields in model 
  const renderColorList = colors.map(color => {
    return (
      <CircleColor key={color} color={color} onClick={() => {
        //*! Action when user click in color must add color in tempColors state (string[]) 
        setError({ ...errors, colors: "" }); //* romve error when select color
        if (tempColors.includes(color)) {
          setTempColors(prev => prev.filter(c => c !== color)); //* Toggle color 
          return; //*! Important  prevent continue 
        }
        setTempColors(prev => [...prev, color]);
      }} />
    );
  });

  return (
    <>
      <main className='container mx-auto'>
        <section className='flex justify-center items-center my-5'>
          <Button name="Bulid Product" className="bg-indigo-700 hover:bg-indigo-800" width='w-fit' onClick={() => open()} />
        </section>
        <section className='my-5 mx-2 grid md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-4'>
          {renderProductList}
        </section>
        <Model isOpen={isOpen} closeModel={close} title='Add New Product'>
          <form action="" onSubmit={handerSubmitbutton}>
            {renderInputList}
            <SelectBox selected={categorySelected} setSelected={SetCategorySelected}/>
            <div className="flex items-center mt-4 mb-1 flex-wrap space-x-1">
              {tempColors.map(color => {
                return (
                  <span key={color} className='px-1 py-0.5 m-1 text-sm text-white rounded-md' style={{ backgroundColor: color }}>{color}</span>
                );
              })}
            </div>
            <div className="flex items-center mt-4 mb-1 flex-wrap space-x-1">
              {renderColorList}
             
            </div>
            <ErrorMessages message={errors.colors} />
            <div className="mt-4 flex  space-x-2">
              <Button className="bg-indigo-700 hover:bg-indigo-800" >Submit</Button>
            </div>
          </form>
        </Model>
      </main>

    </>
  )
}

export default App

