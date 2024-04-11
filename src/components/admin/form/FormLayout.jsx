import ProductForm from './ProductForm';

const FormLayout = ({ id }) => {
  if (id == 'products') {
    return (
      <>
        <h1 className='form-title'>New Product</h1>
        <ProductForm />
      </>
    )
  } else if (id == 'admins') {
    return (
      <div>Admins</div>
    )
  }
}

export default FormLayout