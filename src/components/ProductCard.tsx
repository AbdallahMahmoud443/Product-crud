import Button from "./UI/Button";
import Image from "./Image";
import { IProduct } from "../interfaces";
import { sliceText, sliceTextTitle } from "../utilities";
import CircleColor from "./CircleColor";
interface IProps {
    product: IProduct,
    openModel:()=>void
 
}

const ProductCard = ({product,openModel}: IProps) => {
    const {title,description,imageURL,price,colors} = product;

    const renderColorList = colors.map(color => {
        return (
          <CircleColor key={color} color={color}/>
        );
      });
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
                    <Image url={imageURL} alt={"Product Category"} className="h-10 w-10 rounded-full object-bottom" />
                </div>
                <div className="space-x-2 flex justify-between">
                    <Button name="Edit" className="bg-indigo-700" onClick={openModel} width="w-full" />
                    <Button className="bg-red-700">
                        <span>Delete</span>
                    </Button>

                </div>
            </article>
        </>
    );
};

export default ProductCard;