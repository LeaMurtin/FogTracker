import React, { useEffect, useState } from 'react';
import { Group, Image, Tabs, Box, Button, TextInput } from '@mantine/core';
import _ from 'lodash';
import SettingsPanel from './components/SettingsPanel';
import settingList from './settingList';

function getDefaultSettings(mode: 'shuffle' | 'crawl' = 'shuffle') {
  const defaultSettings: Record<string, boolean> = {};
  for (const setting in settingList) {
    defaultSettings[mode + '-' + setting] = false;
  }
  return defaultSettings;
}

function compareArrayValues(a: string[], b: string[]) {
  if (a.length !== b.length) {
    return false;
  }
  return a.every((entry) => b.includes(entry)) && b.every((entry) => a.includes(entry));
}

const SettingsPage: React.FC = () => {
  const defaultMode = 'shuffle';
  const [settingString, setSettingString] = useState('');
  const [settingValues, setSettingValues] = useState<Record<string, boolean>>(getDefaultSettings(defaultMode));
  const [activeTab, setActiveTab] = useState<string | null>('shuffle');
  
  useEffect(() => {
    // parse all settings from string
    // check for invalid string and extract values
    // setState new set of values
    const parsedSettings = settingString.split(' ').filter(Boolean);
    const shuffle = parsedSettings.includes('shuffle');
    const crawl = parsedSettings.includes('crawl');
    // console.log('#1 // parsedSettings:', parsedSettings, 'shuffle=', shuffle, 'crawl=', crawl);
    if (shuffle === crawl) {
      // TODO : envoyer message d'erreur <INVALID SETTING STRING>
      console.log('ERROR Mode value');
      // return;
    }
    // const mode = 'shuffle';
    const mode = shuffle ? 'shuffle' : 'crawl';
    const newSettingValues: Record<string, boolean> = getDefaultSettings(mode);
    parsedSettings.forEach((setting) => {
      if (settingList[setting]) {
        newSettingValues[`${mode}-${setting}`] = true;
      }
    });
    if (!_.isEqual(settingValues, newSettingValues)) {
      setSettingValues({ ...newSettingValues });
    }
  }, [settingString]);

  useEffect(() => {
    // parse all settings from string
    // si ya un setting qui est different entre string et values, setState string
    const parsedSettings = settingString.split(' ').filter(Boolean);
    const mode = (activeTab === null) ? 'shuffle' : activeTab;
    // console.log('#2 // parsedSettings:', parsedSettings, mode);
    const newSettings: string[] = [mode];
    parsedSettings.forEach((setting) => {
      if (!settingList[setting] && setting !== 'shuffle' && setting !== 'crawl') {
        newSettings.push(setting);
      } else if (settingList[setting] && settingValues[`${mode}-${setting}`]) {
        newSettings.push(setting);
      }
    });
    for (const setting in settingList) {
      if (settingValues[`${mode}-${setting}`] && !newSettings.includes(setting)) {
        newSettings.push(setting);
      }
    }
    // console.log('#2 // newSettings:', newSettings);
    if (!compareArrayValues(newSettings, parsedSettings)) {
      const newSettingString = newSettings.join(' ');
      setSettingString(newSettingString);
    }
  }, [settingValues, activeTab]);

  return (
    <>
      <Image radius="md" src={null} h={100} fallbackSrc="https://placehold.co/600x400?text=Placeholder" />
      <Box mt="md">
        <Group justify="center">
          Setting string
          <TextInput
            size="xs"
            placeholder="Copy your string from the fog randomizer program"
            w="90vw"
            value={settingString}
            onChange={(event) => setSettingString(event.currentTarget.value)}
          />
        </Group>
        <Tabs value={activeTab} onChange={setActiveTab}>
          <Tabs.List grow>
            <Tabs.Tab value="shuffle">World Shuffle</Tabs.Tab>
            <Tabs.Tab value="crawl">Dungeon Crawl</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="shuffle">
            <SettingsPanel mode="shuffle" settingValues={settingValues} setSettingValues={setSettingValues} />
          </Tabs.Panel>
          <Tabs.Panel value="crawl">
            <SettingsPanel mode="crawl" settingValues={settingValues} setSettingValues={setSettingValues} />
          </Tabs.Panel>
        </Tabs>
        <Group justify="center">
          <Button>Launch (English)</Button>
          <Button>Lancer (Français)</Button>
        </Group>
      </Box>
    </>
  );
};

export default SettingsPage;
