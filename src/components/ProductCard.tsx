
import Button from "./UI/Button";
import Image from "./Image";
import { IProduct } from "../interfaces";
import { sliceText, sliceTextTitle } from "../utilities";
import CircleColor from "./CircleColor";
import toast, { Toaster } from 'react-hot-toast';

interface IProps {
    product: IProduct,
    setProductToEditData: (val:IProduct) => void,
    openEditModel:()=>void,
    index:number,
    setIndexEditProduct:(val:number)=>void
    products:IProduct[],
    setProducts:(val:IProduct[])=>void,
}

const ProductCard = ({ product, setProductToEditData,openEditModel,index,setIndexEditProduct,products,setProducts}: IProps) => {
    const { title, description, imageURL, price, colors, category } = product;

    //** ----------------------- Renders of colors ----------------------- */
    const renderColorList = colors.map(color => {
        return (
            <CircleColor key={color} color={color} />
        );
    });
    //** ----------------------- Handler -----------------------  */
    const onEdit = ()=>{
        openEditModel()
        setProductToEditData(product);
        setIndexEditProduct(index);
    }
    return (
        <>
            <article className="border rounded-md p-2 flex flex-col mx-auto max-w-sm">
                <Image url={imageURL} alt={"Product Image"} className="border rounded-sm md:h-40" />
                <div className="mt-3">
                    <h3 className="text-xl mb-1">{sliceTextTitle(title)}</h3>
                    <p className="text-gray-500">{sliceText(description)}</p>
                </div>
                <div className="flex items-center mt-4 mb-1 space-x-1">
                    {renderColorList}
                </div>
                <div className=" flex items-center justify-between mb-3">
                    <span className="text-indigo-600 text-xl font-semibold">{price}$</span>
                    <Image url={category.imageURL} alt={category.name} className="h-10 w-10 rounded-full object-bottom" />
                </div>
                <div className="space-x-2 flex justify-between">
                    <Button name="Edit" className="bg-indigo-700" onClick={onEdit} width="w-full" />
                    <Button className="bg-red-700" onClick={()=>{
                     
                        const removedList = products.filter(p => p.id !== product.id);
                        setProducts(removedList);
                        toast('Product Removed Successfully', {
                            duration: 2000,
                            position: 'top-right',             
                            // Styling
                            style: {backgroundColor:"black",color:"white"},
                            // Custom Icon
                            icon: '👏',
                            // Aria
                            ariaProps: {
                              role: 'status',
                              'aria-live': 'polite',
                            },
                          });



                    }}>
                        <span>Remove</span>
                    </Button>
                </div>
                <Toaster />
            </article>
        </>
    );
};

export default ProductCard;