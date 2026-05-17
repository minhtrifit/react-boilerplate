import CartsForm from '../components/form';

const CreateCartPage = () => {
  const handleSubmit = async (data: any) => {
    try {
      console.log('Add carts:', data);
    } catch (error) {
      console.log('Add carts failed:', error);
    }
  };

  return (
    <div className='block__container'>
      <CartsForm
        defaultValues={null}
        isEdit={false}
        submitLoading={false}
        onFinish={handleSubmit}
      />
    </div>
  );
};

export default CreateCartPage;
