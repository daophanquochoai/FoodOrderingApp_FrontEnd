import { Input, Select, DatePicker } from 'antd';
const { RangePicker } = DatePicker;
import React from 'react';

const FilterField = ({ field, value, onChange }) => {
    switch (field.type) {
        case 'text':
            return (
                <Input
                    placeholder={field.placeholder}
                    value={value}
                    onChange={(e) => onChange(field.key, e.target.value)}
                    allowClear
                />
            );

        case 'select':
            return (
                <Select
                    placeholder={field.placeholder}
                    value={value}
                    onChange={(value) => onChange(field.key, value)}
                    options={field.options}
                    allowClear
                    style={{ minWidth: '120px' }}
                />
            );

        case 'dateRange':
            return <RangePicker value={value} onChange={(dates) => onChange(field.key, dates)} />;

        default:
            break;
    }
};

export default FilterField;
