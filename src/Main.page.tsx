import { AppShell, Autocomplete, Burger, Button, CSSProperties, Flex, Stack, Switch, SwitchStylesNames, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
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

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      start: '',
      end: '',
    },

    validate: { //need to check if input is in the area list in local storage
      start: (value) => (value.length < 1 ? 'Invalid starting point' : null),
      end: (value) => (value.length < 1 ? 'Invalid destination' : null),
    },

  });

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
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <Stack justify="center" align="stretch" gap="md">
            <Autocomplete //would like to use MultiSelect with searchable prop but ERROR
              label="Starting Point"
              placeholder="Limgrave overworld"
              data={data}
              maxDropdownHeight={200}
              {...form.getInputProps('start')}
            />
            <Autocomplete //would like to use MultiSelect with searchable prop but ERROR
              label="Destination"
              placeholder="Malenia's Arena"
              data={[
                { group: 'Limgrave', items: ['Limgrave Overworld', 'Coastal Cave'] },
                { group: 'Liurnia', items: ['Liurnia Overworld', 'Academy Crystal cave'] },
              ]}
              maxDropdownHeight={200}
              {...form.getInputProps('end')}
            />
            <Button type="submit">Find path</Button>
          </Stack>
        </form>
      </AppShell.Navbar>

      <AppShell.Main>Main</AppShell.Main>

      <AppShell.Footer p="xs">Footer</AppShell.Footer>
    </AppShell>
  );
};

export default MainPage;