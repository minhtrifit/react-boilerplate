import { useSearchParams } from 'react-router-dom';
import { useGetProducts } from './hooks/useGetProducts';
import Loading from './components/Loading';

const ProductPage = () => {
  const LIMIT_PRODUCTS_PER_PAGE = 10;

  // const [searchParams, setSearchParams] = useSearchParams();
  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get('search');
  const pageQuery = searchParams.get('page');

  const { data, loading, total } = useGetProducts({
    page: Number(pageQuery ?? 1),
    search: searchQuery,
    limit: LIMIT_PRODUCTS_PER_PAGE,
  });

  console.log(data, total);

  if (loading) {
    return <Loading />;
  }

  return <div>ProductPage</div>;
};

export default ProductPage;
