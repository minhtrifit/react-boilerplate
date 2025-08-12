import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Form, Input, InputNumber, Typography } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

interface PropType {
  defaultValues: any;
  isEdit: boolean;
  submitLoading: boolean;
  onFinish: (data: any) => void;
}

const CartsForm = (props: PropType) => {
  const { defaultValues, isEdit, submitLoading, onFinish } = props;

  const cartItemSchema = z.object({
    title: z.string().min(1, 'Vui lòng nhập tên sản phẩm'),
    quantity: z
      .number()
      .min(1, 'Số lượng phải lớn hơn 0')
      .refine((val) => typeof val === 'number', {
        message: 'Số lượng phải là số',
      }),
  });

  const schema = z.object({
    carts: z.array(cartItemSchema).min(1, 'Cần ít nhất 1 sản phẩm'),
  });

  type FormType = z.infer<typeof schema>;

  const {
    control,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      carts: [{ title: '', quantity: 1 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'carts',
  });

  const onSubmit = async (data: any) => {
    onFinish(data);
    reset();
  };

  const onError = (errors: any) => {
    console.error('Lỗi submit:', errors);

    const firstErrorKey = Object.keys(errors)[0];

    if (firstErrorKey) {
      // Nếu là carts -> focus vào phần tử con đầu tiên bị lỗi
      if (firstErrorKey === 'carts') {
        const firstCartErrorIndex = Number(Object.keys(errors.carts || {})[0]);
        const firstCartFieldKey = Object.keys((errors.carts as any)[firstCartErrorIndex] || {})[0];
        if (firstCartFieldKey) {
          setFocus(`carts.${firstCartErrorIndex}.${firstCartFieldKey}` as any);
        }
      } else {
        setFocus(firstErrorKey as any);
      }
    }
  };

  return (
    <Form
      layout='vertical'
      className='flex flex-col gap-5'
      onFinish={handleSubmit(onSubmit, onError)}
    >
      <span className='font-bold text-xl text-primary-500'>
        {!isEdit ? 'Thêm mới' : 'Chỉnh sửa'} giỏ hàng
      </span>

      <div className='flex flex-col gap-5'>
        {fields.map((field, index) => (
          <div key={field.id} className='h-full flex items-start gap-5'>
            {/* Title */}
            <Form.Item
              label='Tên sản phẩm'
              validateStatus={errors.carts?.[index]?.title ? 'error' : undefined}
              help={errors.carts?.[index]?.title?.message}
            >
              <Controller
                control={control}
                name={`carts.${index}.title`}
                render={({ field }) => <Input placeholder='Nhập tên sản phẩm' {...field} />}
              />
            </Form.Item>

            {/* Quantity */}
            <Form.Item
              label='Số lượng'
              validateStatus={errors.carts?.[index]?.quantity ? 'error' : undefined}
              help={errors.carts?.[index]?.quantity?.message}
            >
              <Controller
                control={control}
                name={`carts.${index}.quantity`}
                render={({ field }) => <InputNumber min={1} {...field} />}
              />
            </Form.Item>

            <div className='mt-[35px]'>
              <MinusCircleOutlined
                onClick={() => remove(index)}
                style={{ color: 'red', fontSize: 18 }}
              />
            </div>
          </div>
        ))}
      </div>

      <Form.Item>
        <Button
          type='dashed'
          onClick={() => append({ title: '', quantity: 1 })}
          icon={<PlusOutlined />}
        >
          Thêm sản phẩm
        </Button>
      </Form.Item>

      {errors.carts?.message && (
        <Typography.Text type='danger'>{errors.carts.message}</Typography.Text>
      )}

      <Form.Item>
        <Button type='primary' htmlType='submit'>
          Lưu
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CartsForm;
