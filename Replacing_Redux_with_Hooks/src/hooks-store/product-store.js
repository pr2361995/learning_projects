import { defaultValue } from "../data";
import { initStore } from "./store";

const configProductStore = () => {
    const actions  = {
        TOGGLE_FAV : (curState, productId) =>  {
            const updatedProduts = curState.products.map(product => 
                product.id === productId ? 
                    {...product,isFavorite : !product.isFavorite} 
                : 
                    product)
            return { products : updatedProduts };
        }
    }
    initStore(actions,{
        products : defaultValue
    })
}




export default configProductStore;