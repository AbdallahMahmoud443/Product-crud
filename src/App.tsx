import Button from './components/UI/Button';
import './App.css'
import ProductCard from './components/ProductCard'
import Model from './components/UI/Model';
import { colors, formInputsList, productList } from './data/ProductData';
import { useState } from 'react'
import Input from './components/Input';
import { IProduct } from './interfaces';
import { productValidation } from './validation/productInputValidation';
import ErrorMessages from './components/ErrorMessages';
import CircleColor from './components/CircleColor';
import { v4 as uuid } from "uuid";

function App() {
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

  //** state for open and close model  */
  let [isOpen, setIsOpen] = useState(false);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
    setInputData(defualtProductData);
    setTempColors([])
   
  }

  //** Create State For Inputs fields */
  const [inputData, setInputData] = useState<IProduct>(defualtProductData);
  //** Create state for errors */
  const [errors, setError] = useState({ title: "", description: "", imageURL: "", price: "", });
  //** Create State For Storing Colors */
  const [tempColors, setTempColors] = useState<string[]>([]);

  //** Create State For Product List  */
  const [products, setProducts] = useState<IProduct[]>(productList);

  //** Handlers */
  const handerInputData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
    setError({ ...errors, [name]: "" });
  }

  const handerSubmitbutton = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const { title, description, imageURL, price } = inputData;
    const errors = productValidation({
      title,
      description,
      imageURL,
      price
    });

    const hasErrorMessage = Object.values(errors).some(error => error === '') &&
      Object.values(errors).every(error => error === '')
    if (!hasErrorMessage) {
      setError(errors);
      return;
    } else {
      setProducts((prev) => [{...inputData,colors:tempColors,id:uuid()},...prev])
      close();
    }
  }

  //** Renders */
  const renderProductList = products.map((product) => {
    return (
      <ProductCard key={product.id} product={product} openModel={open}/>
    );
  });

  const renderInputList = formInputsList.map(input => {
    return (
      <div className="my-1" key={input.id}>
        <label htmlFor={input.id} className="block mb-2 text-sm font-medium text-gray-900 ">{input.label}</label>
        <Input type={input.type} id={input.id} name={input.name} value={inputData[input.name]} onChange={handerInputData} />
        <ErrorMessages message={errors[input.name]} />
      </div>
    );

  });

  const renderColorList = colors.map(color => {
    return (
      <CircleColor key={color} color={color} onClick={() => {
        if (tempColors.includes(color)) {
          setTempColors(prev => prev.filter(c => c !== color));
          return;
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

