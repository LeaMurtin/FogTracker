import React, { useEffect, useState } from 'react';
import { Group, Image, Tabs, Box, Button, TextInput } from '@mantine/core';
import { isEqual } from 'lodash';
import SettingsPanel from './components/SettingsPanel';
import settingList from './settingList';

function compareArrayValues(a: string[], b: string[]) {
  if (a.length !== b.length) {
    return false;
  }
  return a.every((entry) => b.includes(entry)) && b.every((entry) => a.includes(entry));
}

const SettingsPage: React.FC = () => {
  const [settingString, setSettingString] = useState('');
  const [settingValues, setSettingValues] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // parse all settings from string
    // check for invalid string and extract values
    // setState new set of values
    const parsedSettings = settingString.split(' ');
    const newSettingValues: Record<string, boolean> = {};
    const shuffle = parsedSettings.includes('shuffle');
    const crawl = parsedSettings.includes('crawl');
    if (shuffle === crawl) {
      // TODO : envoyer message d'erreur <INVALID SETTING STRING>
      return;
    }
    const mode = shuffle ? 'shuffle' : 'crawl';
    parsedSettings.forEach((setting) => {
      if (settingList[setting]) {
        newSettingValues[`${mode}-${setting}`] = true;
      }
    });
    console.log(settingValues, newSettingValues);
    if (!isEqual(settingValues, newSettingValues)) {
      console.log('COUCOU MAMAN JE PASSE A LA TELE');
      setSettingValues(newSettingValues);
    }
  }, [settingString]);

  useEffect(() => {
    // parse all settings from string
    // si ya un setting qui est different entre string et values, setState string
    const parsedSettings = settingString.split(' ');
    const newSettings: string[] = [];
    const mode = 'shuffle'; //detecter tab actif
    parsedSettings.forEach((setting) => {
      if (!settingList[setting]) {
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
    if (!compareArrayValues(newSettings, parsedSettings)) {
      // console.log("LE PLUS BEAU CEST WIWI");
      const newSettingString = newSettings.join(' ');
      setSettingString(newSettingString);
    }
  }, [settingValues]);

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
        <Tabs defaultValue="shuffle" mt="md">
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
