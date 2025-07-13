import { useSearchParams } from 'react-router-dom';
import { useGetProducts } from './hooks/useGetProducts';
import { Button, Input, Pagination, Table } from 'antd';
import Loading from './components/Loading';
import { useMemo, useState } from 'react';

const { Search } = Input;
const { Column } = Table;

const ProductPage = () => {
  const LIMIT_PRODUCTS_PER_PAGE = 5;
  const TOTAL_PRODUCTS = 10;

  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query');
  const pageQuery = searchParams.get('page');

  const paramsObject = Object.fromEntries(searchParams.entries());

  const [filter, setFilter] = useState({
    page: Number(pageQuery ?? 1),
    query: query ?? '',
  });

  const { data, loading, total, params, setParams } = useGetProducts({
    page: filter.page,
    search: filter.query,
    limit: LIMIT_PRODUCTS_PER_PAGE,
  });

  const TABLE_DATA = useMemo(() => {
    return data?.map((item) => {
      return { ...item, key: item?.id };
    });
  }, [data]);

  const handlePageChange = (page: number) => {
    setFilter({ ...filter, page: page });
    setParams({ ...params, page: page });
    setSearchParams({ ...paramsObject, page: page.toString() });
  };

  const handleChangeFilter = (key: string, value: string) => {
    setFilter({
      ...filter,
      [key]: value,
    });
  };

  const handleApplyFilter = () => {
    console.log('APPLY FILTER:', filter);

    setFilter({ ...filter, page: 1 });

    setParams({
      page: filter.page,
      query: filter.query,
      limit: LIMIT_PRODUCTS_PER_PAGE,
    });

    setSearchParams({ page: filter.page.toString(), query: filter.query });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className='flex flex-col gap-5'>
      <div className='w-full flex items-center gap-5'>
        <Search
          placeholder='Tìm theo tên...'
          value={filter.query}
          onChange={(e) => {
            handleChangeFilter('query', e.target.value);
          }}
          allowClear
          style={{ marginBottom: 16, width: 300 }}
          onSearch={handleApplyFilter}
        />
      </div>

      <Table dataSource={TABLE_DATA} pagination={false} bordered scroll={{ x: 'max-content' }}>
        <Column title='ID' dataIndex='id' key='id' width={80} align='center' />
        <Column title='Tên sản phẩm' dataIndex='title' key='title' width={400} />
        <Column title='Phân loại' dataIndex='category' key='category' width={200} />
        <Column title='Giá' dataIndex='price' key='price' width={200} />
        <Column
          title='Hình ảnh'
          dataIndex='image'
          key='image'
          width={150}
          render={(value, record) => {
            return (
              <div className='w-full flex items-center justify-center'>
                <div className='w-[50px] h-[50px] flex items-center justify-center'>
                  <img
                    className='w-full h-full object-cover'
                    src={value}
                    alt={`${record?.id}-img`}
                  />
                </div>
              </div>
            );
          }}
        />
        <Column
          title='Thao tác'
          key='action'
          width={200}
          render={(_, record) => {
            return (
              <Button color='geekblue' variant='solid'>
                Xem sản phẩm {record?.id}
              </Button>
            );
          }}
        />
      </Table>

      <div className='flex items-center justify-between'>
        <span>
          {total}/{TOTAL_PRODUCTS}
        </span>

        <Pagination
          current={filter.page}
          pageSize={LIMIT_PRODUCTS_PER_PAGE}
          total={TOTAL_PRODUCTS}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ProductPage;
