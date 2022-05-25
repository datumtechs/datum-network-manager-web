import debounce from 'lodash/debounce';
import { Select, Spin } from 'antd';
import { useState, useRef, useMemo, FC, useEffect } from 'react'
import { SelectProps } from 'antd/es/select';

export const DebounceSelect: FC<any> = (props: any) => {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);
  const fetchRef = useRef(0);

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: string) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);
      if (props.disabled) return
      props.fetchOptions(value).then(newOptions => {
        if (fetchId !== fetchRef.current) {
          return;
        }
        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, props.debounceTimeout);
  }, [props.fetchOptions, props.debounceTimeout]);

  useEffect(() => {
    if (props.disabled) return
    queryList()
  }, [])

  const queryList = () => {
    props.fetchOptions().then(newOptions => {
      setOptions(newOptions);
    });
  }

  return (
    <Select
      filterOption={false}
      onSearch={debounceFetcher}
      showSearch={true}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props.propsValue}
      onClear={queryList}
      options={options}
    />
  );
}
