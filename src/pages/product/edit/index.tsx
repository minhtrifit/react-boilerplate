import { useNavigate, useParams } from 'react-router-dom';
import { message } from 'antd';
import { useDetail } from '../hooks/useDetail';
import { useEdit } from '../hooks/useEdit';
import ProductForm from '../components/form';

const EditProductPage = () => {
  const navigate = useNavigate();
  const params = useParams();

  const id = params?.id ?? '';

  const { data, loading } = useDetail(id);
  const { updateProduct, loading: editLoading } = useEdit();

  const handleSubmit = async (data: any) => {
    try {
      const res = await updateProduct(id, data);

      console.log('Update Product:', res);

      message.success('Update product successfully');
      navigate('/management/products');
    } catch (error) {
      console.log('Update product failed:', error);
    }
  };

  if (loading) {
    return <div>Loading</div>;
  }

  if (!loading && data) {
    return (
      <ProductForm
        defaultValues={data}
        mode={'edit'}
        submitLoading={editLoading}
        onFinish={handleSubmit}
      />
    );
  }
};

export default EditProductPage;
