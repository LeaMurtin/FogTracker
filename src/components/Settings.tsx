import { Grid, Group, Switch } from '@mantine/core';
import React from 'react';
import settingList from '../settingList';
import styles from '../styles/Settings.styles';

interface Props {
  mode: 'shuffle' | 'crawl';
}

const Settings: React.FC<Props> = ({ mode }) => {
  return (
    <Grid p="xl">
      {Object.keys(settingList).map((setting) => {
        return (
          settingList[setting].mode.includes(mode) && (
            <>
              <Grid.Col span={4}>
                <Group>
                  <Switch id={setting} styles={{ input: { cursor: 'pointer' } }} />
                  <label htmlFor={setting}>{settingList[setting].displayName}</label>
                </Group>
              </Grid.Col>
            </>
          )
        );
      })}
    </Grid>
  );
};

export default Settings;