import Button from './components/UI/Button';
import './App.css'
import ProductCard from './components/ProductCard'
import Model from './components/UI/Model';
import { formInputsList, productList } from './data/ProductData';
import { useState } from 'react'
import Input from './components/Input';
import { IProduct } from './interfaces';
import { productValidation } from './validation/productInputValidation';
import ErrorMessages from './components/ErrorMessages';

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
    setInputData(defualtProductData);
    setIsOpen(false);
  }

  //** Create State For Inputs fields */
  const [inputData, setInputData] = useState<IProduct>(defualtProductData);
   //** Create state for errors */
   const [errors, setError] = useState({title: "",description: "",imageURL: "",price: "",});


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
      console.log("Form submitted :)")
      close();
    
    }

  }

  //** Renders */
  const renderProductList = productList.map((product) => {
    return (
      <ProductCard key={product.id} product={product} openModel={open} />
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

  })
  return (
    <>
      <main className='container mx-auto'>
        <section className='my-5 mx-2 grid md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-4'>
          {renderProductList}
        </section>
        <Model isOpen={isOpen} closeModel={close} title='Add New Product'>
          <form action="" onSubmit={handerSubmitbutton}>
            {renderInputList}
            <div className="mt-4 flex space-x-2">
              <Button className="bg-indigo-700 hover:bg-indigo-800" >Submit</Button>
              <Button className="bg-gray-700 hover:bg-gray-800" onClick={close}>Cancel</Button>
            </div>
          </form>
        </Model>
      </main>

    </>
  )
}

export default App
