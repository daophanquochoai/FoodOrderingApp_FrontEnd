import * as yup from 'yup';

export const SpoilIngredientSchema = yup.object().shape({
    name: yup
      .number()
      .nullable()
      .transform((value, originalValue) =>
        originalValue === "" ? null : value
      )
      .required('Vui lòng chọn ít nhất một nguyên liệu'),

    importHistoryId: yup
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
      .required('Số lượng là bắt buộc'),

    reason: yup.string().optional(),
});