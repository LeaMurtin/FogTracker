import { AppShell, Autocomplete, Burger, Button, Flex, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import React, { useEffect } from 'react';
import _ from 'lodash';
import { NodeArea } from './types';
import chapel from '../en-entrances/locations000.json';
import graveyard from '../en-entrances/locations001.json';

const MainPage: React.FC = () => {
  const [gpsOpened, { toggle: toggleLeftSection }] = useDisclosure();

  // fake data, will be a list of all areas unlocked by player so far
  const data = Array(100)
    .fill(0)
    .map((_, index) => `Option ${index}`);

  const data2 = [
    { group: 'Limgrave', items: ['Limgrave Overworld', 'Coastal Cave'] },
    { group: 'Liurnia', items: ['Liurnia Overworld', 'Academy Crystal cave'] },
  ];

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      start: '',
      end: '',
    },

    validate: {
      //need to check if input is in the area list in local storage
      // start: (value) => (value.length < 1 ? 'Invalid starting point' : null),
      // end: (value) => (value.length < 1 ? 'Invalid destination' : null),
      start: (value) => {
        if (value.length < 1) {
          return 'Please enter a value';
        }
        if (data.find((option) => option.toLowerCase() === value.toLowerCase())) {
          return null;
        }
        return 'Invalid starting point';
      },
      end: (value) => {
        if (value.length < 1) {
          return 'Please enter a value';
        }
        const items = data2.map((elem) => elem.items).flat();
        if (items.find((option) => option.toLowerCase() === value.toLowerCase())) {
          return null;
        }
        return 'Invalid destination';
      },
    },
  });
  
  function getAreas(jsonEntrances) {
    let areaList = [""];
    let areas : NodeArea[] = []; 
    Object.keys(jsonEntrances.entrances).forEach(entrance => {
    console.log('entrance:', entrance); //entrance id
    console.log('other:', jsonEntrances.entrances[entrance]);
    if (!areaList.includes(jsonEntrances.entrances[entrance].areaTo)) {
      
    }
   });
   return (null);
  }

  useEffect(() => {
    // read url params
    const url = new URL(window.location.href);
    const settingsRaw = url.searchParams.get('settings');
    if (!settingsRaw) {
      return;
    }
    const language = url.searchParams.get('lg');
    const settings = JSON.parse(settingsRaw);
    console.log('settings', settings);
    const allEntrances = _.merge(chapel, graveyard); //faire plus propre pour les imports de json
    console.log('extracted:', allEntrances);
    const allAreas: NodeArea[] = getAreas(allEntrances);

  }, []);


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
            <Autocomplete
              label="Starting Point"
              placeholder="Limgrave overworld"
              data={data}
              maxDropdownHeight={200}
              {...form.getInputProps('start')}
            />
            <Autocomplete
              label="Destination"
              placeholder="Malenia's Arena"
              data={data2}
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
