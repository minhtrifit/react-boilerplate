import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { message } from 'antd';
import { updateBlog } from '@/store/actions/user.action';
import { BlogType } from '@/types';
import { TextEditor } from '@/components/ui/TextEditor/TextEditor';

const AddBlogPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [value, setValue] = useState<string>('');

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
      <TextEditor
        key='blog_content'
        height={500}
        placeholder={'Nhập nội dung'}
        value={value}
        onChange={(data) => setValue(data)}
      />
    </div>
  );
};

export default AddBlogPage;
