import { Group, Image, Tabs, Box, Button, TextInput } from '@mantine/core';
import SettingsPanel from './components/SettingsPanel';
import { useEffect, useState } from 'react';

export default function SettingsPage() {
  const [settingString, setSettingString] = useState('');
  const [settingValues, setSettingValues] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // parse all settings from string
    // si ya un setting qui est different entre string et values, setState values
    const newSettingValues = {};
    // ...
    setSettingValues({ ...settingValues, ...newSettingValues });
  }, [settingString]);

  useEffect(() => {
    // parse all settings from string
    // si ya un setting qui est different entre string et values, setState string
  }, [settingValues]);

  return (
    <>
      <Image radius="md" src={null} h={100} fallbackSrc="https://placehold.co/600x400?text=Placeholder" />
      <Box mt="md">
        <Group justify="center">
          Setting string
          <TextInput
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
}
