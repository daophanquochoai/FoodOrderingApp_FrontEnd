import * as yup from 'yup';

export const SpoilIngredientSchema = yup.object().shape({
    name: yup
      .number()
      .nullable()
      .transform((value, originalValue) =>
        originalValue === "" ? null : value
      )
      .required('Vui lòng chọn ít nhất một nguyên liệu'),

    batchCode: yup
      .number()
      .nullable()
      .transform((value, originalValue) =>
        originalValue === "" ? null : value
      )
      .required('Vui lòng chọn mã lô'),

    quantity: yup
      .number()
      .typeError('Vui lòng nhập số lượng hợp lệ')
      .transform((value, originalValue) =>
        String(originalValue).trim() === '' ? undefined : value
      )
      .positive('Số lượng phải lớn hơn 0')
      .required('Số lượng là bắt buộc')
      .test(
            'max-quantity', 
            'Số lượng không được vượt quá giới hạn', 
            function(value) {
                // Sử dụng context để lấy maxQuantity từ bên ngoài
                const { maxQuantity } = this.options.context || {};
                if (!maxQuantity) return true;
                return !value || value <= maxQuantity;
            }
      ),

    reason: yup.string().optional(),
});