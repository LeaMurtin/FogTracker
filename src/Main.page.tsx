import { AppShell, Autocomplete, Burger, Button, CSSProperties, Flex, Stack, Switch, SwitchStylesNames, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React from 'react';

const switchStyles: Partial<Record<SwitchStylesNames, CSSProperties>> = {
  label: { fontSize: 'var(--mantine-font-size-md)', padding: 0 },
  track: { width: '80%', margin: 'auto' },
  body: { flexDirection: 'column-reverse', gap: 'var(--mantine-spacing-xs)' },
};

const MainPage: React.FC = () => {
  const [gpsOpened, { toggle: toggleLeftSection }] = useDisclosure();

  // fake data, will be a list of all areas unlocked by player so far
  const data = Array(100)
  .fill(0)
  .map((_, index) => `Option ${index}`);

  return (
    <AppShell
      header={{ height: 80 }}
      footer={{ height: 40 }}
      navbar={{
        width: 350,
        breakpoint: 'xs',
        collapsed: {
          mobile: !gpsOpened,
          desktop: !gpsOpened,
        },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Flex h="100%" px="md" justify="space-between" align="center">
          <Burger opened={gpsOpened} onClick={toggleLeftSection} size="sm" />
          <div>Header</div>
        </Flex>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Stack justify="center">
          Navigation Tool
          <Autocomplete
            // label="You go from"
            placeholder="Starting point"
            data={data}
            maxDropdownHeight={200}
          />
          <Autocomplete
            // label="To"
            placeholder="Destination"
            data={[
              { group: 'Limgrave', items: ['Limgrave Overworld', 'Coastal Cave'] },
              { group: 'Liurnia', items: ['Liurnia Overworld', 'Academy Crystal cave'] },
            ]}
            maxDropdownHeight={200}
          />
          <Button>Find path</Button>
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main>Main</AppShell.Main>

      <AppShell.Footer p="xs">Footer</AppShell.Footer>
    </AppShell>
  );
};

export default MainPage;