import { Input } from '@mantine/core';
import React, { useMemo } from 'react';

interface Props {}

const SettingStringInput: React.FC<Props> = ({}) => {
  const defaultValue = useMemo(() => 'toto', []);
  return <Input />;
};

export default SettingStringInput;
