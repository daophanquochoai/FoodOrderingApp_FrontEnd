import { Input, Select, DatePicker, InputNumber } from 'antd';
import dayjs from 'dayjs';
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

        case 'number':
            return (
                <InputNumber
                    placeholder={field.placeholder}
                    value={value}
                    onChange={(value) => onChange(field.key, value)}
                />
            );

        case 'select':
            return (
                <Select
                    showSearch
                    placeholder={field.placeholder}
                    value={value}
                    onChange={(value) => onChange(field.key, value)}
                    options={field.options}
                    allowClear
                    style={{ minWidth: '120px' }}
                />
            );

        case 'multiSelect':
            return (
                <Select
                    mode="multiple"
                    showSearch
                    placeholder={field.placeholder}
                    value={value}
                    onChange={(value) => onChange(field.key, value)}
                    options={field.options}
                    allowClear
                    style={{ minWidth: '120px' }}
                />
            );

        case 'dateRange':
            return <RangePicker value={value} onChange={(dates) => onChange(field.key, dates)} placeholder={field.placeholder} />;

        case 'date':
            return <DatePicker value={value ? dayjs(value) : undefined} onChange={(date, dateString) => onChange(field.key, dateString)} placeholder={field.placeholder}/>;

        default:
            break;
    }
};

export default FilterField;
