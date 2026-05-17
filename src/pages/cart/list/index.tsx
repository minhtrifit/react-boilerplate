import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ADD_CART_ROUTE } from '@/routes/route.constant';

const CartPage = () => {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col gap-5'>
      <section className='w-full flex flex-wrap items-center justify-between gap-3'>
        <span className='opacity-0'>action</span>

        <Button
          color='primary'
          variant='solid'
          icon={<PlusOutlined />}
          onClick={() => {
            navigate(ADD_CART_ROUTE);
          }}
        >
          Thêm mới
        </Button>
      </section>
    </div>
  );
};

export default CartPage;
