import { Group, Image, Tabs, Box, Button } from '@mantine/core';
import SettingsPanel from './components/SettingsPanel';
import SettingStringInput from './components/SettingStringInput';

export default function SettingsPage() {
  return (
    <>
      <Image radius="md" src={null} h={100} fallbackSrc="https://placehold.co/600x400?text=Placeholder" />
      <Box mt="md">
        <Group justify="center">
          Setting string <SettingStringInput />
        </Group>
        <Tabs defaultValue="shuffle" mt="md">
          <Tabs.List grow>
            <Tabs.Tab value="shuffle">World Shuffle</Tabs.Tab>
            <Tabs.Tab value="crawl">Dungeon Crawl</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="shuffle">
            <SettingsPanel mode="shuffle" />
          </Tabs.Panel>
          <Tabs.Panel value="crawl">
            <SettingsPanel mode="crawl" />
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
