// components/form/FormFloatingSelect.tsx
import React from 'react';
import { Controller } from 'react-hook-form';
import { Select, TreeSelect } from 'antd';

const FormTreeSelect: React.FC<any> = ({
    name,
    control,
    label,
    treeData,
    error,
    helperText,
    onChange,
}) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <div className="flex flex-col gap-1">
                    <label className="mb-1 text-sm font-medium">{label}</label>
                    <TreeSelect
                        {...field}
                        showSearch
                        treeNodeFilterProp="title"
                        style={{ width: '100%' }}
                        value={field.value}
                        styles={{
                            popup: { root: { maxHeight: 400, overflow: 'auto' } },
                        }}
                        placeholder="Category"
                        allowClear
                        treeDefaultExpandAll
                        treeData={treeData}
                    />

                    {error && <p className="text-xs text-red-500 mt-1">* {helperText}</p>}
                </div>
            )}
        />
    );
};

export default FormTreeSelect;
