import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { useCreate } from '../hooks/useCreate';
import ProductForm from '../components/form';

const CreateProductPage = () => {
  const navigate = useNavigate();

  const { addProduct, loading } = useCreate();

  const handleSubmit = async (data: any) => {
    try {
      const res = await addProduct(data);

      console.log('Add Product:', res);

      message.success('Add product successfully');
      navigate('/management/products');
    } catch (error) {
      console.log('Add product failed:', error);
    }
  };

  return (
    <ProductForm
      defaultValues={null}
      mode='create'
      submitLoading={loading}
      onFinish={handleSubmit}
    />
  );
};

export default CreateProductPage;
