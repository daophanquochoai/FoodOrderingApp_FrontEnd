import React, { useMemo } from 'react';
import { Line } from '@ant-design/plots';
import { Empty, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  setYearSelected,
  fetchMonthlyRevenue,
  fetchDashboardTotal,
} from '@/store/action/admin/dashboard/dashboard.action';
import {
  selectOrderYears,
  selectMonthlyRevenue,
  selectYearSelected,
} from '@/store/selector/admin/dashboard/dashboard.selector';

const TotalRevenue = () => {
  const dispatch = useDispatch();
  const orderYears = useSelector(selectOrderYears);
  const monthlyRevenue = useSelector(selectMonthlyRevenue);
  const yearSelected = useSelector(selectYearSelected);

  const formatCurrencyShort = (value) => {
    if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)}B`;
    if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
    if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
    return Number(value).toString();
  };

  const defaultMonths = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        month: (i + 1).toString(),
        monthLabel: `Tháng ${i + 1}`,
        revenue: 0,
      })),
    []
  );

  const chartData = useMemo(() => {
    return defaultMonths.map((m) => {
      const real = monthlyRevenue?.find((it) => it?.month?.toString() === m.month);
      let revenue = 0;
      if (real?.revenue !== undefined && real?.revenue !== null) {
        revenue = Number(real.revenue);
        if (Number.isNaN(revenue)) {
          // nếu backend trả string có ký tự khác, try clean
          const cleaned = String(real.revenue).replace(/[^\d.-]/g, '');
          revenue = Number(cleaned) || 0;
        }
      }
      // Nếu backend trả "triệu" và bạn muốn VND, nhân ở đây:
      // revenue = revenue * 1_000_000;

      return { ...m, revenue };
    });
  }, [defaultMonths, monthlyRevenue]);

  const maxRevenue = useMemo(() => {
    const arr = chartData.map((d) => Number(d.revenue) || 0);
    return arr.length ? Math.max(...arr) : 0;
  }, [chartData]);

  const config = useMemo(
    () => ({
        data: chartData,
        xField: 'monthLabel',
        yField: 'revenue',
        shapeField: 'smooth',
        point: {
            shapeField: 'circle',
            sizeField: 2,
        },
        yAxis: {
                min: 0,
                max: maxRevenue > 0 ? maxRevenue * 1.1 : 1,
                tickCount: 5,
                label: {
                formatter: (value) => formatCurrencyShort(Number(value) || 0),
            },
        },
        interaction: {
            tooltip: {
              render: (e, { title, items }) => {
                const list = items.filter((item) => item.value);
                return (
                  <div key={title}>
                    <h4>{title}</h4>
                    {list.map((item) => {
                      const { name, value, color } = item;
                      return (
                        <div>
                          <div style={{ margin: 0, display: 'flex', justifyContent: 'space-between' }}>
                            <div>
                              <span
                                style={{
                                  display: 'inline-block',
                                  width: 6,
                                  height: 6,
                                  borderRadius: '50%',
                                  backgroundColor: color,
                                  marginRight: 6,
                                }}
                              ></span>
                              <span>{name}</span>
                            </div>
                            <b>{value?.toFixed(2)}</b>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              },
            },
          },
        // explicit meta/scale để G2 không tự normalize
        meta: {
            revenue: {
            min: 0,
            max: maxRevenue > 0 ? maxRevenue * 1.1 : 1,
            nice: true,
            },
        },
    }),
    [chartData, maxRevenue]
  );

  const yearOptions =
    orderYears?.map((year) => ({
      value: year.year.toString(),
      label: year.year.toString(),
    })) || [];

  const handleYearChange = (year) => {
    dispatch(setYearSelected(Number(year)));
    dispatch(fetchMonthlyRevenue({ year: Number(year) }));
    dispatch(fetchDashboardTotal(Number(year)));
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="font-semibold text-lg pl-3">Total Revenue</p>
        {yearOptions.length > 0 && (
          <Select
            showSearch
            placeholder="Year"
            value={yearSelected?.toString()}
            options={yearOptions}
            onChange={handleYearChange}
            style={{ minWidth: '120px' }}
          />
        )}
      </div>

      {chartData.length > 0 ? (
        // key giúp ép re-render khi year đổi
        <Line key={yearSelected ?? JSON.stringify(chartData)} {...config} />
      ) : (
        <Empty description="Không có dữ liệu doanh thu" className="py-8" />
      )}
    </div>
  );
};

export default TotalRevenue;
