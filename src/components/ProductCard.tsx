interface IProps {


}

const ProductCard = ({ }: IProps) => {
    return (
        <>
            <article className="border-2 p-2 flex flex-col">
                <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="Product Image" />
                <h3>Nike Shoes</h3>
                <p>As luxury T-Shirt is just as distinctive and can be trimmed with premium materials like Nappa leather and carbon fiber.</p>
                <div className="flex items-center mt-4 mb-2 space-x-1">
                <span className="w-5 h-5 rounded-full bg-indigo-400" />
                <span className="w-5 h-5 rounded-full bg-green-400" />
                <span className="w-5 h-5 rounded-full bg-red-800" />
                </div>
                <div className=" flex items-center justify-between mb-3">
                    <span>50,000$</span>
                    <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="Product Image" className="h-10 w-10 rounded-full "/>
                </div>
               

               
           

            </article>
        </>
    );
};

export default ProductCard;