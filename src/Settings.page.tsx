import { Group, Input, Image, Tabs, Box } from '@mantine/core';
import Settings from './components/Settings';

export default function SettingsPage() {
  return (
    <>
      <Image radius="md" src={null} h={100} fallbackSrc="https://placehold.co/600x400?text=Placeholder" />
      <Box mt="md">
        <Group justify="center">
          Setting string <Input w={1250} />
        </Group>
        <Tabs defaultValue="shuffle" mt="md">
          <Tabs.List grow>
            <Tabs.Tab value="shuffle">World Shuffle</Tabs.Tab>
            <Tabs.Tab value="crawl">Dungeon Crawl</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="shuffle">
            <Settings mode="shuffle" />
          </Tabs.Panel>
          <Tabs.Panel value="crawl">
            <Settings mode="crawl" />
          </Tabs.Panel>
        </Tabs>
      </Box>
    </>
  );
}
