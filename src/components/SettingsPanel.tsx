import { Grid, Group, Switch } from '@mantine/core';
import React from 'react';
import settingList from '../settingList';

interface Props {
  mode: 'shuffle' | 'crawl';
}

const SettingsPanel: React.FC<Props> = ({ mode }) => {
  return (
    <Grid p="xl">
      {Object.keys(settingList).map((setting) => {
        return (
          settingList[setting].mode.includes(mode) && (
            <Grid.Col span={4} key={setting}>
              <Group>
                <Switch id={`${mode}-${setting}`} />
                <label htmlFor={`${mode}-${setting}`}>{settingList[setting].displayName}</label>
              </Group>
            </Grid.Col>
          )
        );
      })}
    </Grid>
  );
};

export default SettingsPanel;
