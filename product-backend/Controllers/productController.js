import ProductModals from "../Modals/Product.Modals.js";

// export const allProduct = (req, res) => {
    
    

// }

export const addProduct = async (req, res) => {
    try {

        const { prodTitle, prodPrice, prodDescription, prodImage, prodCategory, id } = req.body;

        if (!prodTitle || !prodPrice || !prodDescription || !prodImage || !prodCategory) {
            return res.status(404).json({ success: false, message: 'All fields required..' })
        }

        const products = await ProductModals({
            pname: prodTitle,
            pprice: prodPrice,
            pdescription: prodDescription,
            pimage: prodImage,
            pcategory: prodCategory,
            userId: id
        });

        await products.save();

        return res.status(200).json({ success: true, message: 'Product Added Succesfully!', error: error.message });

    } catch (error) {
        return res.status(500).json({ success: false, message: 'Register Error', error: error.message });
    }
}