import React, { useState } from 'react';
import { Button, Input, Select, Form, message, Popconfirm } from 'antd';
import { Controller } from 'react-hook-form';

const FormFoodSize = ({ isEdit, name, control, allSizes, foodSizes, setFoodSizes }) => {
    const [selectedSizeId, setSelectedSizeId] = useState(null);
    const [price, setPrice] = useState('');

    const handleAddSize = () => {
        if (!selectedSizeId || price === '') return;

        const selectedSize = allSizes.find((s) => s.id === selectedSizeId);

        const newSize = {
            id: Date.now(),
            size: selectedSize.name,
            price: parseFloat(price),
        };

        setSelectedSizeId(null);
        setPrice('');

        setFoodSizes([...(foodSizes || []), newSize]);
    };

    const handleUpdate = () => {}; // thieu update

    const handleRemoveFoodSize = (id) => {
        setFoodSizes([...foodSizes.filter((s) => s.id !== id)]);
    };

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <div>
                    <h2 className="text-lg font-semibold">Food Sizes</h2>
                    {foodSizes?.length > 0 &&
                        foodSizes.map((item, index) => (
                            <div
                                key={item.id}
                                className="flex items-center justify-between px-4 py-2 my-2 bg-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                            >
                                <div className="flex items-center gap-4">
                                    <span className="text-sm font-medium text-gray-700">
                                        Size: {item.size}
                                    </span>
                                    <span className="text-sm text-gray-700 font-medium">
                                        Price: ${item.price}
                                    </span>
                                </div>
                                <Popconfirm
                                    title={`Remove size ${item.size} ?`}
                                    onConfirm={() => handleRemoveFoodSize(item.id)}
                                >
                                    <Button danger className="!h-auto !px-3 !py-1 text-sm">
                                        Remove
                                    </Button>
                                </Popconfirm>
                            </div>
                        ))}

                    <div className="my-4 flex items-center gap-2">
                        <Select
                            style={{ width: 120 }}
                            placeholder="Select size"
                            value={selectedSizeId}
                            onChange={(value) => setSelectedSizeId(value)}
                        >
                            {foodSizes && foodSizes.length > 0
                                ? allSizes
                                      ?.filter((s) => !foodSizes.some((fs) => fs.size === s.name))
                                      .map((s) => (
                                          <Select.Option key={s.id} value={s.id}>
                                              {s.name}
                                          </Select.Option>
                                      ))
                                : allSizes.map((s) => (
                                      <Select.Option key={s.id} value={s.id}>
                                          {s.name}
                                      </Select.Option>
                                  ))}
                        </Select>

                        <Input
                            type="number"
                            placeholder="Price"
                            style={{ width: 120 }}
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />

                        <Button onClick={handleAddSize} type="dashed">
                            + Add Food Size
                        </Button>
                    </div>
                </div>
            )}
        />
    );
};

export default FormFoodSize;
