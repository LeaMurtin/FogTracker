import { Grid, Group, Switch } from '@mantine/core';
import React from 'react';
import settingList from '../settingList';

interface Props {
  settingValues: Record<string, boolean>;
  setSettingValues: (values: Record<string, boolean>) => void;
  mode: 'shuffle' | 'crawl';
}

const SettingsPanel: React.FC<Props> = ({ settingValues, setSettingValues, mode }) => {
  return (
    <Grid p="xl">
      {Object.keys(settingList).map((setting) => {
        return (
          settingList[setting].mode.includes(mode) && (
            <Grid.Col span={4} key={setting}>
              <Group>
                <Switch
                  id={`${mode}-${setting}`}
                  checked={settingValues[`${mode}-${setting}`]}
                  onChange={(event) =>
                    setSettingValues({ ...settingValues, [`${mode}-${setting}`]: event.currentTarget.checked })
                  }
                />
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
