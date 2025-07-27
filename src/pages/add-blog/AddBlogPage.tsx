import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Editor from './components/Editor/Editor';
import { updateBlog } from '@/store/actions/user.action';
import { BlogType } from '@/types';
import { message } from 'antd';

const AddBlogPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmitBlog = async (content: string) => {
    try {
      console.log('SUBMIT CONTENT:', content);

      const newBlog: BlogType = {
        id: uuidv4(),
        content: content,
      };

      dispatch(updateBlog(newBlog));

      navigate(`/management/blogs/detail/${newBlog.id}`);

      message.success('Thêm bài viết thành công');
    } catch (error) {
      console.log('Add blog failed:', error);

      message.error('Thêm bài viết thất bại');
    }
  };

  return (
    <div>
      <Editor onSubmit={handleSubmitBlog} />
    </div>
  );
};

export default AddBlogPage;
