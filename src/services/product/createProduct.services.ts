import productDTO from '../../dto/product/productDTO'
import errorHelper, { customError } from '../../helpers/error.helper'
import validateHelper from '../../helpers/validateHelper'
import productModel from '../../models/product/product.models'
import categoryModel from '../../models/category/category.models'
import imageModel from '../../models/image/image.models'
import subcategoryModel from '../../models/subcategory/subcategory.models'

const createProduct = async (product: productDTO, images: {url: string}[]) => {
  try {
    await validateHelper(productModel, product)

    const existingProduct = await productModel.findOne({
      where: {
        name: product.name
      }
    })


    if (existingProduct) {
      throw errorHelper.conflictError(
        'El producto ya existe',
        'PRODUCT_ALREADY_EXISTS'
      )
    }

    const category = await categoryModel.findByPk(product.categoryId)

    if (!category) {
      throw errorHelper.notFoundError('No se ha encontrado la categoria', 'NOT_FOUND_ERROR')
    }

    if(product.subcategoryId !== undefined && product.subcategoryId !== null ) {
      console.log('subcategoryId', product.subcategoryId);
      const subcategory = await subcategoryModel.findByPk(product.subcategoryId)

      if (!subcategory) {
        throw errorHelper.notFoundError('No se ha encontrado la subcategoria', 'NOT_FOUND_ERROR')
      }
    }

    const newProduct = await productModel.create({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock ?? 0,
      categoryId: product.categoryId,
      subcategoryId: product.subcategoryId
    })

    console.log('imagenes', images);

    const imagesUrls = images.map((image) => ({
      url: image.url,
      productId: newProduct.id
    }))
    
    // console.log('imagenes', imagesUrls);

    await imageModel.bulkCreate(imagesUrls)

  } catch (error) {
    if (error instanceof customError) {
      throw error
    }
console.log(error);
    throw errorHelper.internalServerError(
      'Error al crear el producto',
      'CREATE_USER_ERROR'
    )
  }
}

export default createProduct
